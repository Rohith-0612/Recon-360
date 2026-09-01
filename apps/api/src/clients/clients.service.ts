import { Injectable, NotFoundException } from '@nestjs/common';
import { CLIENTS, DRIVER_WEIGHTS, MONTHS } from '../data/clients.data';
import { InsightRecord, InsightTag, RawClient, RawProduct } from '../data/types';
import {
  deriveTrend,
  driverColor,
  fmtMoney,
  fmtN,
  healthStatus,
  mapProductStatus,
  renewalUrgency,
} from '../common/scoring.util';
import {
  ClientDetailResponse,
  DriverView,
  PortfolioClient,
  PortfolioResponse,
  ProductTrend,
  ProductView,
  TrendSeriesPoint,
  TrendSignal,
  TrendsResponse,
  ValueReportResponse,
} from './clients.types';

const FLAG_STATUSES = new Set(['billnouse', 'usenobill', 'gap', 'over']);
const MISMATCH_STATUSES = new Set(['billnouse', 'usenobill']);

const DRIVER_DESCRIPTIONS: Record<string, string> = {
  Utilization: 'How much of the purchased capacity or service the client is actually using.',
  'Value Delivered': 'Profitability of the account: Fixed Subscription + Variable Pay − Infra/Cloud Cost.',
  'Timely Payments': 'Whether the client pays invoices on time, with minimal overdue balance.',
  Products: 'Number and depth of products the client has purchased, adopted, and actively uses.',
  Relationship: 'Strength of the client relationship, including engagement, satisfaction, stakeholder support, and renewal confidence.',
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function momPct(series: number[]): number {
  const prev = series[series.length - 2];
  const latest = series[series.length - 1];
  return prev ? ((latest - prev) / prev) * 100 : 0;
}

function insightTag(client: RawClient): InsightTag {
  if (client.action_owner.includes('Finance')) return 'fin';
  if (client.risk_flags.length > 0 || client.health_tier === 'At Risk' || client.health_tier === 'Critical') {
    return 'risk';
  }
  return 'grow';
}

const TAG_ICON: Record<InsightTag, string> = { risk: '⚠', grow: '↗', fin: '⇄' };
const TAG_LABEL: Record<InsightTag, string> = { risk: 'Risk', grow: 'Expansion', fin: 'Reconciliation' };

/** Classifies one evidence sentence by keyword, and gives it a short real-derived title. */
function classifyEvidence(text: string): { tag: InsightTag; title: string } {
  const t = text.toLowerCase();
  if (/mismatch|billed but|paying for volume/.test(t)) return { tag: 'fin', title: 'Billing mismatch' };
  if (/clean ar|consistent engagement|payment history/.test(t)) return { tag: 'fin', title: 'Clean billing & engagement' };
  if (/crm/.test(t)) return { tag: 'risk', title: 'Flagged in CRM' };
  if (/silence|upload gap|upload since/.test(t)) return { tag: 'risk', title: 'Data feed gap' };
  if (/slipping|trending down|declin/.test(t)) return { tag: 'risk', title: 'Adoption declining' };
  if (/renewal/.test(t)) return { tag: 'risk', title: 'Renewal window closing' };
  if (/over commit|over its allotment|over allotment|running \d+% over/.test(t)) return { tag: 'grow', title: 'Running over commit' };
  if (/whitespace|additional product/.test(t)) return { tag: 'grow', title: 'Expansion whitespace' };
  if (/utilization at \d/.test(t)) return { tag: 'risk', title: 'Utilization critically low' };
  if (/high utilization|strong across/.test(t)) return { tag: 'grow', title: 'Utilization signal' };
  if (/utilization/.test(t)) return { tag: 'risk', title: 'Utilization signal' };
  return { tag: 'grow', title: 'Account signal' };
}

/** One card per real evidence sentence (up to 3); the client's single real recommendation is attached to whichever card matches its topic. */
function buildInsights(client: RawClient): InsightRecord[] {
  const primaryTag = insightTag(client);
  const classified = client.evidence.map((text) => ({ text, ...classifyEvidence(text) }));
  const actionIdx = classified.findIndex((c) => c.tag === primaryTag);
  const chosenIdx = actionIdx >= 0 ? actionIdx : classified.length - 1;

  return classified.map((c, i) => {
    if (i === chosenIdx) {
      return {
        tag: primaryTag,
        label: `${TAG_ICON[primaryTag]} ${TAG_LABEL[primaryTag]} · ${client.action_owner}`,
        title: c.title,
        desc: c.text,
        action: `→ ${client.recommended_action}`,
      };
    }
    return {
      tag: c.tag,
      label: `${TAG_ICON[c.tag]} ${TAG_LABEL[c.tag]}`,
      title: c.title,
      desc: c.text,
      action: '',
    };
  });
}

function buildNarrative(client: RawClient): string {
  const evidence = client.evidence[0] ?? '';
  return `${client.name} is currently rated <b>${client.health_tier}</b> at <b>${client.health_score}</b>. ${evidence}. ${client.recommended_action} (${client.action_owner}).`;
}

const AI_QUESTION_BY_TIER: Record<string, (name: string) => string> = {
  Healthy: (name) => `Is ${name} a reference-account candidate?`,
  Watch: (name) => `Anything to watch on ${name}?`,
  'At Risk': (name) => `What's driving ${name}'s risk?`,
  Critical: (name) => `Is ${name} at churn risk?`,
};

function buildAiQuestion(client: RawClient): string {
  const template = AI_QUESTION_BY_TIER[client.health_tier] ?? AI_QUESTION_BY_TIER.Watch;
  return template(client.name);
}

function buildAiAnswer(client: RawClient): string {
  const evidence = client.evidence[0] ?? '';
  return `<b>${client.health_score}</b> (${client.health_tier}). ${evidence}. ${client.recommended_action} (${client.action_owner}).`;
}

@Injectable()
export class ClientsService {
  getAll(): RawClient[] {
    return CLIENTS;
  }

  getClientOrThrow(id: string): RawClient {
    const client = CLIENTS.find((c) => c.id === id);
    if (!client) throw new NotFoundException(`Client "${id}" not found`);
    return client;
  }

  /** Avg month-over-month usage change across a client's products, for the portfolio table's "Usage Growth (30D)" column. */
  private avgUsageGrowthPct(c: RawClient): number {
    const moms = c.products.map((p) => momPct(p.usage_series));
    return Math.round(moms.reduce((t, v) => t + v, 0) / moms.length);
  }

  /** KPI tiles + clients sorted by health score ascending (highest risk first). */
  getPortfolio(): PortfolioResponse {
    const rows: PortfolioClient[] = CLIENTS.map((c) => {
      const productsUsed = c.products.filter((p) => p.used > 0).length;
      const productsOwned = c.products.length;
      const flagCount = c.products.filter((p) => FLAG_STATUSES.has(mapProductStatus(p.status))).length;
      return {
        id: c.id,
        name: c.name,
        sub: `${c.billing_metrics} · SFDC #${c.salesforce_id}`,
        score: c.health_score,
        status: healthStatus(c.health_tier),
        delta: c.score_drivers[0]?.qoq_delta ?? 0,
        acv: fmtMoney(c.arr),
        acvValue: c.arr,
        renewal: `${c.days_to_renewal} days`,
        renewalUrgency: renewalUrgency(c.days_to_renewal),
        productsUsed,
        productsOwned,
        flagCount,
        usageGrowthPct: this.avgUsageGrowthPct(c),
      };
    }).sort((a, b) => a.score - b.score);

    const bookOfBusiness = CLIENTS.reduce((t, c) => t + c.arr, 0);
    const atRiskAccounts = rows.filter((r) => r.score < 60).length;
    const atRiskRenewingSoon = CLIENTS.filter((c) => c.health_score < 60 && c.days_to_renewal < 90).length;

    let billingMismatches = 0;
    const mismatchClients = new Set<string>();
    let whitespaceSignals = 0;
    CLIENTS.forEach((c) => {
      const n = c.products.filter((p) => MISMATCH_STATUSES.has(mapProductStatus(p.status))).length;
      if (n) {
        billingMismatches += n;
        mismatchClients.add(c.id);
      }
      if (c.upsell.signal && c.upsell.acv_uplift) whitespaceSignals += c.upsell.acv_uplift;
    });

    return {
      kpis: {
        bookOfBusiness,
        bookOfBusinessLabel: fmtMoney(bookOfBusiness),
        atRiskAccounts,
        atRiskRenewingSoon,
        billingMismatches,
        billingMismatchClients: mismatchClients.size,
        whitespaceSignals,
        whitespaceSignalsLabel: fmtMoney(whitespaceSignals),
        totalClients: CLIENTS.length,
      },
      clients: rows,
    };
  }

  /** Full 360 detail incl. driver tooltips and the product truth table. */
  getClientDetail(id: string): ClientDetailResponse {
    const c = this.getClientOrThrow(id);
    const productsOwned = c.products.length;
    const productsUsed = c.products.filter((p) => p.used > 0).length;

    const drivers: DriverView[] = c.score_drivers.map((d) => ({
      name: d.driver,
      value: d.score,
      delta: d.qoq_delta,
      color: driverColor(d.score),
      weightPct: DRIVER_WEIGHTS[d.driver] ?? d.weight,
      related: [],
      tooltip: DRIVER_DESCRIPTIONS[d.driver] ?? '',
    }));

    const products: ProductView[] = c.products.map((p) => ({
      id: slugify(p.product),
      name: p.product,
      category: p.unit,
      bought: p.bought,
      used: p.used,
      billed: p.billed,
      util: Math.round(p.utilization * 100),
      trend: deriveTrend(p.usage_series),
      status: mapProductStatus(p.status),
      contracted: p.bought,
      usedVolume: p.used,
      unit: p.unit,
    }));

    const score = c.health_score;
    const delta = c.score_drivers[0]?.qoq_delta ?? 0;

    return {
      id: c.id,
      name: c.name,
      sub: `SFDC #${c.salesforce_id}`,
      billingMetric: c.billing_metrics,
      avatar: c.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase(),
      acv: fmtMoney(c.arr),
      tenure: c.date_onboarded,
      renewal: `${c.days_to_renewal} days`,
      renewalUrgency: renewalUrgency(c.days_to_renewal),
      score,
      previousScore: score - delta,
      status: healthStatus(c.health_tier),
      delta,
      productsOwned,
      productsUsed,
      drivers,
      products,
      aiQuestion: buildAiQuestion(c),
      aiAnswer: buildAiAnswer(c),
      insights: buildInsights(c),
      narrative: buildNarrative(c),
      evidence: c.evidence,
      recommendedAction: c.recommended_action,
      actionOwner: c.action_owner,
      riskFlags: c.risk_flags,
    };
  }

  /** 11 months of real usage data exist per product; the trend chart only shows the most recent CHART_MONTHS. */
  getTrends(id: string): TrendsResponse {
    const CHART_MONTHS = 6;
    const c = this.getClientOrThrow(id);

    let overUsage = 0;
    let upsellSignals = 0;
    let riskSignals = 0;

    const chartMonths = MONTHS.slice(-CHART_MONTHS);

    const products: ProductTrend[] = c.products.map((p) => {
      const series: TrendSeriesPoint[] = p.usage_series.slice(-CHART_MONTHS).map((v, i) => ({
        month: chartMonths[i],
        value: Math.round(v),
      }));
      const util = Math.round(p.utilization * 100);
      const trend = deriveTrend(p.usage_series);
      const vsCommitPct = util - 100;

      let signal: TrendSignal;
      if (util > 100) {
        signal = 'over_usage';
        overUsage++;
      } else if (trend === 'up' && util >= 55) {
        signal = 'upsell';
        upsellSignals++;
      } else if (trend === 'up') {
        signal = 'growing';
      } else if (trend === 'down') {
        signal = 'risk';
        riskSignals++;
      } else {
        signal = 'stable';
      }

      return {
        productId: slugify(p.product),
        name: p.product,
        unit: p.unit,
        series,
        momPct: Math.round(momPct(p.usage_series)),
        vsCommitPct,
        signal,
      };
    });

    return {
      clientId: c.id,
      clientName: c.name,
      products,
      kpis: { overUsage, upsellSignals, riskSignals },
    };
  }

  /** The QBR-style value-report payload for a single client. */
  getValueReport(id: string): ValueReportResponse {
    const c = this.getClientOrThrow(id);
    const roiDriver = c.score_drivers.find((d) => d.driver === 'Value Delivered');
    const relationshipDriver = c.score_drivers.find((d) => d.driver === 'Relationship');
    const roiMultiplier = Math.round(((roiDriver?.score ?? 40) / 40) * 10) / 10;
    const productsOwned = c.products.length;
    const productsUsed = c.products.filter((p) => p.used > 0).length;
    const stakeholders = Math.max(2, Math.round((relationshipDriver?.score ?? 24) / 12));

    const usedItems = c.products
      .filter((p: RawProduct) => p.used > 0)
      .map((p) => ({ name: p.product, usage: `${fmtN(p.used)} ${p.unit}`.trim() }));

    return {
      clientId: c.id,
      clientName: c.name,
      tenure: c.date_onboarded,
      roiMultiplier,
      productsUsed,
      productsOwned,
      stakeholders,
      usedItems,
    };
  }

  /** Fake NL search bar (#q keydown handler): keyword -> best-matching client id. */
  search(query: string): { clientId: string | null } {
    const t = query.toLowerCase();
    const hasStatus = (c: RawClient, status: string) =>
      c.products.some((p) => mapProductStatus(p.status) === status);
    const byScore = (dir: 1 | -1) =>
      CLIENTS.slice().sort((a, b) => dir * (a.health_score - b.health_score))[0];

    let target: RawClient | undefined;
    if (t.includes('billed') && (t.includes("don't") || t.includes('not') || t.includes('mismatch'))) {
      target = CLIENTS.find((c) => hasStatus(c, 'billnouse'));
    } else if (t.includes('overage') || (t.includes('over') && t.includes('usage'))) {
      target = CLIENTS.find((c) => hasStatus(c, 'over'));
    } else if (t.includes('expansion') || t.includes('upsell') || t.includes('grow') || t.includes('whitespace')) {
      target = CLIENTS.filter((c) => c.upsell.signal).sort((a, b) => b.health_score - a.health_score)[0];
    } else if (t.includes('risk') || t.includes('urgent') || t.includes('churn') || t.includes('renew')) {
      target = byScore(1);
    } else if (t.includes('best') || t.includes('reference') || t.includes('healthiest') || t.includes('advocate')) {
      target = byScore(-1);
    }

    return { clientId: target?.id ?? null };
  }
}
