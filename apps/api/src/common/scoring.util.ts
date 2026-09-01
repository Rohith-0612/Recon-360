import { ProductStatus } from '../data/types';

export type HealthStatus = 'healthy' | 'watch' | 'at_risk' | 'critical';
export type UrgencyColor = 'green' | 'amber' | 'red';
export type DriverColor = 'green' | 'amber' | 'red';

/** Maps mockdata's health_tier ("Healthy"/"Watch"/"At Risk"/"Critical") to the app's status vocabulary. */
export function healthStatus(tier: string): HealthStatus {
  switch (tier) {
    case 'Healthy':
      return 'healthy';
    case 'Watch':
      return 'watch';
    case 'At Risk':
      return 'at_risk';
    default:
      return 'critical';
  }
}

/** Score-driven color for a driver bar/badge — same thresholds used across the app. */
export function driverColor(score: number): DriverColor {
  if (score >= 75) return 'green';
  if (score >= 60) return 'amber';
  return 'red';
}

const PRODUCT_STATUS_MAP: Record<string, ProductStatus> = {
  Healthy: 'healthy',
  'Under-utilized': 'under',
  'Over-usage': 'over',
  'Billed, not used': 'billnouse',
};

/** Maps mockdata's free-text product status to the app's closed ProductStatus vocabulary. */
export function mapProductStatus(raw: string): ProductStatus {
  return PRODUCT_STATUS_MAP[raw] ?? 'under';
}

/** Up/down/flat from the real 11-month usage_series — recent 3-month avg vs. the prior 3-month avg. */
export function deriveTrend(usageSeries: number[]): 'up' | 'down' | 'flat' {
  if (usageSeries.length < 6) return 'flat';
  const recent = usageSeries.slice(-3);
  const prior = usageSeries.slice(-6, -3);
  const recentAvg = recent.reduce((t, v) => t + v, 0) / recent.length;
  const priorAvg = prior.reduce((t, v) => t + v, 0) / prior.length;
  if (priorAvg === 0) return 'flat';
  const change = (recentAvg - priorAvg) / priorAvg;
  if (change > 0.03) return 'up';
  if (change < -0.03) return 'down';
  return 'flat';
}

/** 1250000 -> "$1.3M", 42000 -> "$42K", ported from fmtMoney(). */
export function fmtMoney(v: number): string {
  if (v >= 1e6) return '$' + (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (v >= 1e3) return '$' + Math.round(v / 1e3) + 'K';
  return '$' + Math.round(v);
}

/** Formats a raw usage number, switching to M/B units for million-scale metrics, ported from fmtN(). */
export function fmtN(v: number, mil = false): string {
  if (mil) {
    return v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + 'B' : Math.round(v) + 'M';
  }
  return Math.round(v).toLocaleString('en-US');
}

/** Renewal urgency bucket, derived from real days-to-renewal. */
export function renewalUrgency(daysToRenewal: number): UrgencyColor {
  if (daysToRenewal <= 45) return 'red';
  if (daysToRenewal < 90) return 'amber';
  return 'green';
}

/** Stable string -> uint32 hash, used wherever demo data needs a deterministic-but-varied pick per id. */
export function stringHash(id: string): number {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}
