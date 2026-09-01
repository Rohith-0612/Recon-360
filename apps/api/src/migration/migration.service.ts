import { Injectable, NotFoundException } from '@nestjs/common';
import { CLIENTS, MONTHS } from '../data/clients.data';
import { RawClient } from '../data/types';
import { deriveTrend, fmtMoney, healthStatus, mapProductStatus, renewalUrgency, stringHash } from '../common/scoring.util';
import { ClientsService } from '../clients/clients.service';
import { MarginService } from '../margin/margin.service';
import { MarginRow } from '../margin/margin.types';
import { UpsellService } from '../upsell/upsell.service';
import {
  MigrationAccountDetail,
  MigrationAlert,
  MigrationOverviewResponse,
  MigrationQueueRow,
  MigrationStage,
  MigrationTrendPoint,
} from './migration.types';

const TOKEN_RATE = 52.85;
const HIGH_ACV_THRESHOLD = 500_000;
const MARGIN_COMPRESSION_THRESHOLD = 45;
const STAGES: MigrationStage[] = ['not_started', 'conversation_held', 'proposal_submitted', 'deferred', 'signed'];
const WHAT_TO_SHOW_CLIENT = [
  'Current usage vs. committed volume',
  'New bundle count and per-token rate',
  'Renewal term and resulting monthly / term commitment',
  'Any billing credits from the transition period',
];

interface ClientAnalysis {
  client: RawClient;
  score: number;
  marginRow: MarginRow;
  hasOverUsage: boolean;
  hasDeclining: boolean;
  migrationRequired: boolean;
  avgMomPct: number;
  stage: MigrationStage;
  escalationPath: string;
  overUplift: number | null;
  overUpliftLabel: string | null;
  overPct: number | null;
}

@Injectable()
export class MigrationService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly marginService: MarginService,
    private readonly upsellService: UpsellService,
  ) {}

  /**
   * Derives migration-readiness for every client from real data already in the system.
   * An account is flagged when it's over its committed volume (needs token pricing to
   * capture the upside), its usage is declining (needs right-sizing to protect renewal), or
   * its real margin is compressed. Stage/token-plan/escalation are still novel, dummy business
   * logic — mockdata has no equivalent for those.
   */
  private analyzeAll(): ClientAnalysis[] {
    const marginByClient = new Map(this.marginService.getMargin().rows.map((r) => [r.clientId, r]));
    const overPlaysByClient = new Map(
      this.upsellService
        .getUpsell()
        .plays.filter((p) => p.signal === 'over_usage')
        .map((p) => [p.clientId, p]),
    );

    return CLIENTS.map((client) => {
      const marginRow = marginByClient.get(client.id) as MarginRow;
      const hasOverUsage = client.products.some((p) => mapProductStatus(p.status) === 'over');
      const hasDeclining = client.products.some((p) => deriveTrend(p.usage_series) === 'down');
      const marginCompressed = marginRow.marginPct < MARGIN_COMPRESSION_THRESHOLD;
      const migrationRequired = hasOverUsage || hasDeclining || marginCompressed;

      const trends = this.clientsService.getTrends(client.id);
      const avgMomPct = Math.round(
        trends.products.reduce((t, p) => t + p.momPct, 0) / trends.products.length,
      );

      const overPlay = overPlaysByClient.get(client.id);
      const overProduct = client.products.find((p) => mapProductStatus(p.status) === 'over');
      const overPct = overProduct ? Math.round(overProduct.utilization * 100) - 100 : null;

      const stage = STAGES[stringHash(`${client.id}:stage`) % STAGES.length];
      const escalationPath = client.arr >= HIGH_ACV_THRESHOLD ? 'Commercial Leadership · Deal Desk' : 'CSM';

      return {
        client,
        score: client.health_score,
        marginRow,
        hasOverUsage,
        hasDeclining,
        migrationRequired,
        avgMomPct,
        stage,
        escalationPath,
        overUplift: overPlay?.upliftAcv ?? null,
        overUpliftLabel: overPlay?.upliftAcvLabel ?? null,
        overPct,
      };
    });
  }

  getOverview(): MigrationOverviewResponse {
    const analysis = this.analyzeAll();
    const totalPortfolioAcv = CLIENTS.reduce((t, c) => t + c.arr, 0);
    const atRisk = analysis.filter((a) => healthStatus(a.client.health_tier) !== 'healthy');
    const atRiskAcv = atRisk.reduce((t, a) => t + a.client.arr, 0);
    const migrationRequired = analysis.filter((a) => a.migrationRequired);
    const avgMarginPct = Math.round(
      analysis.reduce((t, a) => t + a.marginRow.marginPct, 0) / analysis.length,
    );

    const renewalsBelowUsage = analysis.filter((a) => a.hasDeclining && a.migrationRequired).length;
    const marginCompression = analysis.filter((a) => a.marginRow.marginPct < MARGIN_COMPRESSION_THRESHOLD).length;
    const dealDeskReview = migrationRequired.filter((a) => a.escalationPath.includes('Deal Desk')).length;

    const alerts: MigrationAlert[] = [
      { severity: 'High', message: `${renewalsBelowUsage} renewals below usage threshold` },
      { severity: 'High', message: `${marginCompression} margin compression alerts` },
      { severity: 'Medium', message: `${migrationRequired.length} accounts flagged for token migration` },
      { severity: 'Medium', message: `${dealDeskReview} accounts need Deal Desk review` },
    ];

    return {
      kpis: {
        totalPortfolioAcv,
        totalPortfolioAcvLabel: fmtMoney(totalPortfolioAcv),
        atRiskAcv,
        atRiskAcvLabel: fmtMoney(atRiskAcv),
        atRiskAccountCount: atRisk.length,
        migrationRequiredCount: migrationRequired.length,
        avgMarginPct,
      },
      usageTrend: this.portfolioUsageTrend(),
      alerts,
    };
  }

  /** Portfolio-wide usage index by month: sum of every client/product's real usage_series, indexed to the latest month. */
  private portfolioUsageTrend(): MigrationTrendPoint[] {
    const totals = new Array(MONTHS.length).fill(0);
    CLIENTS.forEach((c) => {
      c.products.forEach((p) => {
        p.usage_series.forEach((v, i) => (totals[i] += v));
      });
    });
    const latest = totals[totals.length - 1];
    return MONTHS.map((month, i) => ({ month, value: Math.round((totals[i] / latest) * 100) }));
  }

  getQueue(): MigrationQueueRow[] {
    return this.analyzeAll()
      .filter((a) => a.migrationRequired)
      .sort((a, b) => b.client.arr - a.client.arr)
      .map((a) => ({
        clientId: a.client.id,
        clientName: a.client.name,
        acv: fmtMoney(a.client.arr),
        stage: a.stage,
        recommendedAction: this.recommendedAction(a),
        owner: this.owner(a),
      }));
  }

  getAccountDetail(id: string): MigrationAccountDetail {
    const analysis = this.analyzeAll().find((a) => a.client.id === id);
    if (!analysis) throw new NotFoundException(`Client "${id}" not found`);
    const { client } = analysis;

    const bundles = analysis.overPct ? Math.max(1, Math.round(analysis.overPct / 10)) : 1;
    const reasons: string[] = [];
    if (analysis.hasOverUsage) reasons.push('bursting past its committed volume');
    if (analysis.hasDeclining) reasons.push('usage trending down 3+ months');
    if (analysis.marginRow.marginPct < MARGIN_COMPRESSION_THRESHOLD) {
      reasons.push(`margin compressed to ${analysis.marginRow.marginPct.toFixed(0)}%`);
    }
    const renewal = `${client.days_to_renewal} days`;
    const narrative = analysis.migrationRequired
      ? `${client.name} is flagged for token-pricing migration: ${reasons.join(' and ')}. Renewal is ${renewal} out.`
      : `${client.name} does not currently meet the migration criteria (over-usage, declining usage, or margin compression).`;

    return {
      clientId: client.id,
      clientName: client.name,
      sub: `${client.billing_metrics} · SFDC #${client.salesforce_id}`,
      acv: fmtMoney(client.arr),
      renewal,
      renewalUrgency: renewalUrgency(client.days_to_renewal),
      healthScore: analysis.score,
      healthStatus: healthStatus(client.health_tier),
      usageTrendPct: analysis.avgMomPct,
      currentMarginPct: Math.round(analysis.marginRow.marginPct),
      migrationRequired: analysis.migrationRequired,
      narrative,
      stage: analysis.stage,
      tokenPlan: {
        ratePerToken: TOKEN_RATE,
        ratePerTokenLabel: `$${TOKEN_RATE.toFixed(2)}/token`,
        bundles,
        estimatedAcvImpact: analysis.overUplift,
        estimatedAcvImpactLabel: analysis.overUpliftLabel,
      },
      whatToShowClient: WHAT_TO_SHOW_CLIENT,
      escalationPath: analysis.escalationPath,
    };
  }

  private recommendedAction(a: ClientAnalysis): string {
    if (a.hasOverUsage) return `Move to token pricing — ${Math.max(1, Math.round((a.overPct ?? 10) / 10))} bundle(s) @ $${TOKEN_RATE.toFixed(2)}/token`;
    if (a.hasDeclining) return 'Right-size to token/bundle commitment to match usage';
    return 'Convert to token pricing to correct margin compression';
  }

  private owner(a: ClientAnalysis): string {
    if (a.stage === 'signed') return 'Commercial';
    return a.escalationPath.includes('Deal Desk') ? 'Deal Desk' : 'CSM';
  }
}
