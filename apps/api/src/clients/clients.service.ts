import { Injectable, NotFoundException } from '@nestjs/common';
import { CLIENTS, PMETA, SCALE, WEIGHTS } from '../data/clients.data';
import { ClientRecord } from '../data/types';
import {
  computeScore,
  fmtMoney,
  fmtN,
  healthStatus,
  monthlySeries,
  parseAcv,
  renDays,
  renewalUrgency,
  TREND_MONTHS,
  usageVolumes,
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

@Injectable()
export class ClientsService {
  getAll(): ClientRecord[] {
    return CLIENTS;
  }

  getClientOrThrow(id: string): ClientRecord {
    const client = CLIENTS.find((c) => c.id === id);
    if (!client) throw new NotFoundException(`Client "${id}" not found`);
    return client;
  }

  /** Ports renderPortfolio(): KPI tiles + clients sorted by score ascending (highest risk first). */
  getPortfolio(): PortfolioResponse {
    const rows: PortfolioClient[] = CLIENTS.map((c) => {
      const score = computeScore(c);
      const productsUsed = c.products.filter((p) => p.used >= 1).length;
      const productsOwned = c.products.filter((p) => p.bought >= 1).length;
      const flagCount = c.products.filter((p) => FLAG_STATUSES.has(p.status)).length;
      return {
        id: c.id,
        name: c.name,
        sub: c.sub,
        score,
        status: healthStatus(score),
        delta: c.delta,
        acv: c.acv,
        renewal: c.renewal,
        renewalUrgency: renewalUrgency(c.renewal),
        productsUsed,
        productsOwned,
        flagCount,
      };
    }).sort((a, b) => a.score - b.score);

    const bookOfBusiness = CLIENTS.reduce((t, c) => t + parseAcv(c.acv), 0);
    const atRiskAccounts = rows.filter((r) => r.score < 60).length;
    const atRiskRenewingSoon = rows.filter((r) => r.score < 60 && renDays(r.renewal) < 90).length;

    let billingMismatches = 0;
    const mismatchClients = new Set<string>();
    let whitespaceSignals = 0;
    CLIENTS.forEach((c) => {
      const acv = parseAcv(c.acv);
      const n = c.products.filter((p) => MISMATCH_STATUSES.has(p.status)).length;
      if (n) {
        billingMismatches += n;
        mismatchClients.add(c.id);
      }
      c.products.forEach((p) => {
        if (p.status === 'usenobill') whitespaceSignals += acv * 0.09;
      });
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

  /** Ports openClient(): full 360 detail incl. driver tooltips and the product truth table. */
  getClientDetail(id: string): ClientDetailResponse {
    const c = this.getClientOrThrow(id);
    const scale = SCALE[c.id] ?? 1;
    const score = computeScore(c);
    const acv = parseAcv(c.acv);
    const monthlySpend = acv / 12;
    const productsOwned = c.products.filter((p) => p.bought >= 1).length;
    const productsUsed = c.products.filter((p) => p.used >= 1).length;

    const drivers: DriverView[] = c.drivers.map((d, i) => {
      let tooltip = '';
      if (i === 0) {
        const contracted = 5.0 * scale;
        const used = (d.value / 100) * contracted;
        tooltip = `${used.toFixed(1)}M / ${contracted.toFixed(1)}M tokens used this month`;
      } else if (i === 1) {
        tooltip = `${productsUsed} of ${productsOwned} products actively used`;
      } else if (i === 2) {
        const mult = d.value / 40;
        const value = monthlySpend * mult;
        tooltip = `${fmtMoney(value)} value vs ${fmtMoney(monthlySpend)} spend this month · ${mult.toFixed(1)}x ROI`;
      } else if (i === 3) {
        if (d.value >= 85) {
          tooltip = '$0 overdue · invoices paid on time';
        } else {
          const overdue = monthlySpend * ((100 - d.value) / 100);
          const dso = Math.round(30 + (100 - d.value) / 2);
          tooltip = `${fmtMoney(overdue)} overdue · ${dso}-day DSO`;
        }
      } else if (i === 4) {
        const stakeholders = Math.max(2, Math.round(d.value / 12));
        const execTouchpoints = Math.max(0, Math.round(d.value / 28));
        tooltip = `${stakeholders} active stakeholders · ${execTouchpoints} exec touchpoints (QTD)`;
      }
      return {
        name: d.name,
        value: d.value,
        delta: d.delta,
        color: d.color,
        weightPct: Math.round(WEIGHTS[i] * 100),
        related: d.related,
        tooltip,
      };
    });

    const products: ProductView[] = c.products.map((p) => {
      const { contracted, used, unit } = usageVolumes(p, PMETA[p.id], scale);
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        bought: p.bought,
        used: p.used,
        billed: p.billed,
        util: p.util,
        trend: p.trend,
        status: p.status,
        contracted,
        usedVolume: used,
        unit,
      };
    });

    return {
      id: c.id,
      name: c.name,
      sub: c.sub,
      avatar: c.avatar,
      acv: c.acv,
      tenure: c.tenure,
      renewal: c.renewal,
      renewalUrgency: renewalUrgency(c.renewal),
      score,
      previousScore: score - c.delta,
      status: healthStatus(score),
      delta: c.delta,
      productsOwned,
      productsUsed,
      drivers,
      products,
      aiQuestion: c.aiQuestion,
      aiAnswer: c.aiAnswer,
      insights: c.insights,
      narrative: c.narrative,
    };
  }

  /** Ports renderTrends(): 6-month usage series per product, derived from the trend class curve. */
  getTrends(id: string): TrendsResponse {
    const c = this.getClientOrThrow(id);
    const scale = SCALE[c.id] ?? 1;

    let overUsage = 0;
    let upsellSignals = 0;
    let riskSignals = 0;

    const products: ProductTrend[] = c.products.map((p) => {
      const meta = PMETA[p.id];
      const series: TrendSeriesPoint[] = monthlySeries(p, meta, scale).map((v, i) => ({
        month: TREND_MONTHS[i],
        value: Math.round(v),
      }));
      const mom = series[4].value ? ((series[5].value - series[4].value) / series[4].value) * 100 : 0;
      const vsCommitPct = p.util - 100;

      let signal: TrendSignal;
      if (p.util > 100) {
        signal = 'over_usage';
        overUsage++;
      } else if (p.trend === 'up' && p.util >= 55) {
        signal = 'upsell';
        upsellSignals++;
      } else if (p.trend === 'up') {
        signal = 'growing';
      } else if (p.trend === 'down') {
        signal = 'risk';
        riskSignals++;
      } else {
        signal = 'stable';
      }

      return {
        productId: p.id,
        name: p.name,
        unit: meta?.unit ?? '',
        series,
        momPct: Math.round(mom),
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

  /** Ports renderValue(): the QBR-style value-report payload for a single client. */
  getValueReport(id: string): ValueReportResponse {
    const c = this.getClientOrThrow(id);
    const scale = SCALE[c.id] ?? 1;
    const roi = c.drivers[2].value;
    const roiMultiplier = Math.round((roi / 40) * 10) / 10;
    const productsOwned = c.products.filter((p) => p.bought >= 1).length;
    const productsUsed = c.products.filter((p) => p.used >= 1).length;
    const stakeholders = Math.max(2, Math.round(c.drivers[4].value / 12));

    const usedItems = c.products
      .filter((p) => p.used > 0)
      .map((p) => {
        const { used, unit } = usageVolumes(p, PMETA[p.id], scale);
        return { name: p.name, usage: `${fmtN(used, PMETA[p.id]?.mil ?? false)} ${unit}`.trim() };
      });

    return {
      clientId: c.id,
      clientName: c.name,
      tenure: c.tenure,
      roiMultiplier,
      productsUsed,
      productsOwned,
      stakeholders,
      usedItems,
    };
  }

  /** Ports the fake NL search bar (#q keydown handler): keyword -> best-matching client id. */
  search(query: string): { clientId: string | null } {
    const t = query.toLowerCase();
    const hasStatus = (c: ClientRecord, status: string) => c.products.some((p) => p.status === status);
    const byScore = (dir: 1 | -1) =>
      CLIENTS.slice().sort((a, b) => dir * (computeScore(a) - computeScore(b)))[0];

    let target: ClientRecord | undefined;
    if (t.includes('billed') && (t.includes("don't") || t.includes('not') || t.includes('mismatch'))) {
      target = CLIENTS.find((c) => hasStatus(c, 'billnouse'));
    } else if (t.includes('overage') || (t.includes('over') && t.includes('usage'))) {
      target = CLIENTS.find((c) => hasStatus(c, 'over'));
    } else if (t.includes('expansion') || t.includes('upsell') || t.includes('grow') || t.includes('whitespace')) {
      target = CLIENTS.filter((c) => hasStatus(c, 'usenobill')).sort(
        (a, b) => computeScore(b) - computeScore(a),
      )[0];
    } else if (t.includes('risk') || t.includes('urgent') || t.includes('churn') || t.includes('renew')) {
      target = byScore(1);
    } else if (t.includes('best') || t.includes('reference') || t.includes('healthiest') || t.includes('advocate')) {
      target = byScore(-1);
    }

    return { clientId: target?.id ?? null };
  }
}
