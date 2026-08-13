import {
  AlertSeverity,
  HealthStatus,
  MarginFlag,
  MigrationSeverity,
  MigrationStage,
  ProductStatus,
  TrendSignal,
  UpsellSignal,
  UrgencyColor,
} from './types';

export const BRAND = {
  green: 'text-brand-green bg-brand-green/10',
  amber: 'text-brand-amber bg-brand-amber/10',
  red: 'text-brand-red bg-brand-red/10',
  purple: 'text-brand-purple bg-brand-purple/10',
  blue: 'text-brand-blue bg-brand-blue/10',
} as const;

export function scoreToColor(score: number): 'green' | 'amber' | 'red' {
  if (score >= 75) return 'green';
  if (score >= 60) return 'amber';
  return 'red';
}

export function healthBadge(status: HealthStatus): { label: string; className: string } {
  if (status === 'healthy') return { label: 'Healthy', className: BRAND.green };
  if (status === 'at_risk') return { label: 'At Risk', className: BRAND.amber };
  return { label: 'Critical', className: BRAND.red };
}

export function urgencyClass(color: UrgencyColor): string {
  return color === 'green' ? 'text-brand-green' : color === 'amber' ? 'text-brand-amber' : 'text-brand-red';
}

export function driverColorClass(color: UrgencyColor): string {
  return color === 'green' ? 'bg-brand-green' : color === 'amber' ? 'bg-brand-amber' : 'bg-brand-red';
}

const PRODUCT_STATUS_META: Record<ProductStatus, { label: string; className: string }> = {
  healthy: { label: 'Healthy', className: BRAND.green },
  under: { label: 'Underutilized', className: BRAND.amber },
  gap: { label: 'Adoption gap', className: BRAND.red },
  billnouse: { label: 'Billed, not used', className: BRAND.purple },
  usenobill: { label: 'Used, not billed', className: BRAND.purple },
  over: { label: '⚡ Over allotment', className: BRAND.red },
};

export function productStatusBadge(status: ProductStatus) {
  return PRODUCT_STATUS_META[status];
}

export function utilizationColorClass(util: number): string {
  if (util > 100) return 'text-brand-red';
  if (util >= 70) return 'text-brand-green';
  if (util >= 40) return 'text-brand-amber';
  if (util >= 15) return 'text-brand-red';
  return 'text-brand-purple';
}

const TREND_SIGNAL_META: Record<TrendSignal, { label: string; className: string }> = {
  over_usage: { label: '⚡ Over-usage', className: BRAND.red },
  upsell: { label: 'Upsell', className: BRAND.green },
  growing: { label: 'Growing', className: BRAND.green },
  risk: { label: 'Risk', className: BRAND.red },
  stable: { label: 'Stable', className: BRAND.amber },
};

export function trendSignalBadge(signal: TrendSignal) {
  return TREND_SIGNAL_META[signal];
}

const UPSELL_SIGNAL_META: Record<UpsellSignal, { label: string; className: string }> = {
  over_usage: { label: '⚡ Over-usage', className: BRAND.red },
  whitespace: { label: 'Whitespace', className: BRAND.purple },
};

export function upsellSignalBadge(signal: UpsellSignal) {
  return UPSELL_SIGNAL_META[signal];
}

const ALERT_SEVERITY_META: Record<AlertSeverity, { label: string; className: string }> = {
  High: { label: 'High', className: BRAND.red },
  Opportunity: { label: 'Opportunity', className: BRAND.red },
  Medium: { label: 'Medium', className: BRAND.amber },
};

export function alertSeverityBadge(severity: AlertSeverity) {
  return ALERT_SEVERITY_META[severity];
}

const MARGIN_FLAG_META: Record<MarginFlag, { label: string; className: string }> = {
  ok: { label: '✓ Healthy margin', className: BRAND.green },
  watch: { label: 'Watch', className: BRAND.amber },
  low: { label: '🔴 Low margin', className: BRAND.red },
  hidden: { label: '⚠ Healthy but low margin', className: BRAND.purple },
};

export function marginFlagBadge(flag: MarginFlag) {
  return MARGIN_FLAG_META[flag];
}

export function marginPctClass(pct: number): string {
  if (pct >= 50) return BRAND.green;
  if (pct >= 40) return BRAND.amber;
  return BRAND.red;
}

const MIGRATION_SEVERITY_META: Record<MigrationSeverity, { label: string; className: string }> = {
  High: { label: 'High', className: BRAND.red },
  Medium: { label: 'Medium', className: BRAND.amber },
};

export function migrationSeverityBadge(severity: MigrationSeverity) {
  return MIGRATION_SEVERITY_META[severity];
}

const MIGRATION_STAGE_META: Record<MigrationStage, { label: string; className: string }> = {
  not_started: { label: 'Not Started', className: BRAND.purple },
  conversation_held: { label: 'Customer Conversation Held', className: BRAND.blue },
  proposal_submitted: { label: 'Proposal Submitted', className: BRAND.amber },
  deferred: { label: 'Deferred', className: BRAND.red },
  signed: { label: 'Signed / Closed Won', className: BRAND.green },
};

export function migrationStageBadge(stage: MigrationStage) {
  return MIGRATION_STAGE_META[stage];
}
