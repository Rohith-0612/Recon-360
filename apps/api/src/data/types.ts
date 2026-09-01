export type TrendClass = 'up' | 'down' | 'flat';
export type ProductStatus = 'healthy' | 'under' | 'gap' | 'billnouse' | 'usenobill' | 'over';
export type InsightTag = 'risk' | 'grow' | 'fin';

export interface InsightRecord {
  tag: InsightTag;
  label: string;
  title: string;
  desc: string;
  action: string;
}

export interface RawScoreDriver {
  driver: string;
  weight: number;
  score: number;
  qoq_delta: number;
}

export interface RawProduct {
  product: string;
  bought: number;
  used: number;
  billed: number;
  unit: string;
  utilization: number;
  status: string;
  usage_series: number[];
}

export interface RawMargin {
  margin_pct: number;
  cost_to_serve_pct: number;
  quadrant: string;
}

export interface RawUpsell {
  signal: string | null;
  commit?: number;
  actual?: number;
  unit?: string;
  recommendation?: string;
  acv_uplift?: number;
  owner?: string;
  note?: string;
}

export interface RawClient {
  id: string;
  name: string;
  salesforce_id: string;
  status: string;
  arr: number;
  mrr: number;
  acv: number;
  date_onboarded: string;
  renewal_date: string;
  days_to_renewal: number;
  last_upload_date: string;
  months_since_upload: number;
  billing_metrics: string;
  crm_risk: string;
  contracted_products: string[];
  health_score: number;
  health_tier: string;
  score_drivers: RawScoreDriver[];
  products: RawProduct[];
  evidence: string[];
  recommended_action: string;
  action_owner: string;
  margin: RawMargin;
  upsell: RawUpsell;
  risk_flags: string[];
}

export interface RawPortfolio {
  as_of: string;
  total_clients: number;
  total_arr: number;
  total_mrr: number;
  gross_margin_pct: number;
  critical_accounts: number;
  at_risk_accounts: number;
  watch_accounts: number;
  healthy_accounts: number;
  revenue_at_risk: number;
  upsell_pipeline: number;
  renewing_within_90d: number;
  flagged_accounts: number;
  avg_health: number;
  tier_legend: Record<string, string>;
}
