import { ClientRecord, ProductMeta, ProductRecord } from '../data/types';
import { WEIGHTS } from '../data/clients.data';

export type HealthStatus = 'healthy' | 'at_risk' | 'critical';
export type UrgencyColor = 'green' | 'amber' | 'red';

/** Weighted sum of the 5 drivers (Utilization/Adoption/ROI/AR/Relationship), ported from computeScore() in the prototype. */
export function computeScore(client: ClientRecord): number {
  return Math.round(client.drivers.reduce((total, d, i) => total + d.value * WEIGHTS[i], 0));
}

export function healthStatus(score: number): HealthStatus {
  if (score >= 75) return 'healthy';
  if (score >= 60) return 'at_risk';
  return 'critical';
}

/** "$770K" / "$1.32M" -> 770000 / 1320000, ported from parseACV(). */
export function parseAcv(acv: string): number {
  const n = parseFloat(acv.replace(/[^0-9.]/g, '')) || 0;
  if (/m/i.test(acv)) return n * 1e6;
  if (/k/i.test(acv)) return n * 1e3;
  return n;
}

/** 1250000 -> "$1.3M", 42000 -> "$42K", ported from fmtMoney(). */
export function fmtMoney(v: number): string {
  if (v >= 1e6) return '$' + (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (v >= 1e3) return '$' + Math.round(v / 1e3) + 'K';
  return '$' + Math.round(v);
}

/** Formats a raw usage number, switching to M/B units for million-scale metrics, ported from fmtN(). */
export function fmtN(v: number, mil: boolean): string {
  if (mil) {
    return v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + 'B' : Math.round(v) + 'M';
  }
  return Math.round(v).toLocaleString('en-US');
}

/** "310 days" -> 310, ported from renDays(). */
export function renDays(renewal: string): number {
  const m = renewal.match(/\d+/);
  return m ? +m[0] : 999;
}

/** Renewal urgency bucket, derived from days-to-renewal (the prototype hardcoded this per record). */
export function renewalUrgency(renewal: string): UrgencyColor {
  const days = renDays(renewal);
  if (days <= 45) return 'red';
  if (days < 90) return 'amber';
  return 'green';
}

/** Contracted vs. used volume for a product this month, ported from usageStr(). */
export function usageVolumes(
  product: ProductRecord,
  meta: ProductMeta | undefined,
  scale: number,
): { contracted: number; used: number; unit: string } {
  const base = meta?.base ?? 100;
  const unit = meta?.unit ?? '';
  const contracted = Math.round(base * scale);
  const used = Math.round((product.util / 100) * contracted);
  return { contracted, used, unit };
}

/** Deterministic "days since last file upload" per client, ported from daysSinceUpload() in renderAlerts(). */
export function daysSinceUpload(clientId: string): number {
  return 8 + (stringHash(clientId) % 42);
}

/** Stable string -> uint32 hash, reused wherever demo data needs a deterministic-but-varied pick per id. */
export function stringHash(id: string): number {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

export const TREND_MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const TREND_FACTORS: Record<string, number[]> = {
  up: [0.62, 0.71, 0.8, 0.88, 0.94, 1.0],
  down: [1.42, 1.29, 1.18, 1.1, 1.04, 1.0],
  flat: [0.97, 1.02, 0.99, 1.03, 0.98, 1.0],
};

/** 6-month raw volume series for a product, driven by its trend class curve. Shared by per-client trends and portfolio-wide aggregates. */
export function monthlySeries(product: ProductRecord, meta: ProductMeta | undefined, scale: number): number[] {
  const contracted = (meta?.base ?? 100) * scale;
  const latest = (product.util / 100) * contracted;
  const factors = TREND_FACTORS[product.trend] ?? TREND_FACTORS.flat;
  return factors.map((f) => latest * f);
}
