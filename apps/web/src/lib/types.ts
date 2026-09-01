export type HealthStatus = 'healthy' | 'watch' | 'at_risk' | 'critical';
export type UrgencyColor = 'green' | 'amber' | 'red';
export type TrendClass = 'up' | 'down' | 'flat';
export type ProductStatus = 'healthy' | 'under' | 'gap' | 'billnouse' | 'usenobill' | 'over';
export type InsightTag = 'risk' | 'grow' | 'fin';

export interface PortfolioKpis {
  bookOfBusiness: number;
  bookOfBusinessLabel: string;
  atRiskAccounts: number;
  atRiskRenewingSoon: number;
  billingMismatches: number;
  billingMismatchClients: number;
  whitespaceSignals: number;
  whitespaceSignalsLabel: string;
  totalClients: number;
}

export interface PortfolioClient {
  id: string;
  name: string;
  sub: string;
  score: number;
  status: HealthStatus;
  delta: number;
  acv: string;
  acvValue: number;
  renewal: string;
  renewalUrgency: UrgencyColor;
  productsUsed: number;
  productsOwned: number;
  flagCount: number;
  usageGrowthPct: number;
}

export interface PortfolioResponse {
  kpis: PortfolioKpis;
  clients: PortfolioClient[];
}

export interface DriverView {
  name: string;
  value: number;
  delta: number;
  color: UrgencyColor;
  weightPct: number;
  related: string[];
  tooltip: string;
}

export interface ProductView {
  id: string;
  name: string;
  category: string;
  bought: number;
  used: number;
  billed: number;
  util: number;
  trend: TrendClass;
  status: ProductStatus;
  contracted: number;
  usedVolume: number;
  unit: string;
}

export interface InsightRecord {
  tag: InsightTag;
  label: string;
  title: string;
  desc: string;
  action: string;
}

export interface ClientDetailResponse {
  id: string;
  name: string;
  sub: string;
  billingMetric: string;
  avatar: string;
  acv: string;
  tenure: string;
  renewal: string;
  renewalUrgency: UrgencyColor;
  score: number;
  previousScore: number;
  status: HealthStatus;
  delta: number;
  productsOwned: number;
  productsUsed: number;
  drivers: DriverView[];
  products: ProductView[];
  aiQuestion: string;
  aiAnswer: string;
  insights: InsightRecord[];
  narrative: string;
  evidence: string[];
  recommendedAction: string;
  actionOwner: string;
  riskFlags: string[];
}

export type TrendSignal = 'over_usage' | 'upsell' | 'growing' | 'risk' | 'stable';

export interface TrendSeriesPoint {
  month: string;
  value: number;
}

export interface ProductTrend {
  productId: string;
  name: string;
  unit: string;
  series: TrendSeriesPoint[];
  momPct: number;
  vsCommitPct: number;
  signal: TrendSignal;
}

export interface TrendsResponse {
  clientId: string;
  clientName: string;
  products: ProductTrend[];
  kpis: { overUsage: number; upsellSignals: number; riskSignals: number };
}

export type UpsellSignal = 'over_usage' | 'whitespace';

export interface UpsellPlay {
  clientId: string;
  clientName: string;
  productName: string;
  signal: UpsellSignal;
  currentCommit: string;
  actualUsage: string;
  recommendation: string;
  upliftAcv: number;
  upliftAcvLabel: string;
  routedTo: string;
}

export interface UpsellResponse {
  plays: UpsellPlay[];
  totalUplift: number;
  totalUpliftLabel: string;
  playCount: number;
}

export type MarginFlag = 'ok' | 'watch' | 'low' | 'hidden';

export interface MarginRow {
  clientId: string;
  clientName: string;
  acv: number;
  acvLabel: string;
  costToServe: number;
  costToServeLabel: string;
  grossMargin: number;
  grossMarginLabel: string;
  marginPct: number;
  healthScore: number;
  flag: MarginFlag;
}

export interface MarginResponse {
  rows: MarginRow[];
  bookMarginPct: number;
  hiddenLowMarginCount: number;
  marginDilutiveCount: number;
}

export type AlertSeverity = 'High' | 'Medium' | 'Opportunity';

export interface AlertRow {
  clientId: string;
  clientName: string;
  product: string;
  message: string;
  signal: string;
  severity: AlertSeverity;
  owner: string;
  detectedDaysAgo: number;
  tip?: string;
}

export interface AlertsResponse {
  alerts: AlertRow[];
  kpis: { high: number; opportunity: number; medium: number; uploadSilence: number };
}

export interface ValueReportUsedItem {
  name: string;
  usage: string;
}

export interface ValueReportResponse {
  clientId: string;
  clientName: string;
  tenure: string;
  roiMultiplier: number;
  productsUsed: number;
  productsOwned: number;
  stakeholders: number;
  usedItems: ValueReportUsedItem[];
}

export type MigrationStage = 'not_started' | 'conversation_held' | 'proposal_submitted' | 'deferred' | 'signed';
export type MigrationSeverity = 'High' | 'Medium';

export interface MigrationKpis {
  totalPortfolioAcv: number;
  totalPortfolioAcvLabel: string;
  atRiskAcv: number;
  atRiskAcvLabel: string;
  atRiskAccountCount: number;
  migrationRequiredCount: number;
  avgMarginPct: number;
}

export interface MigrationTrendPoint {
  month: string;
  value: number;
}

export interface MigrationAlert {
  severity: MigrationSeverity;
  message: string;
}

export interface MigrationOverviewResponse {
  kpis: MigrationKpis;
  usageTrend: MigrationTrendPoint[];
  alerts: MigrationAlert[];
}

export interface MigrationQueueRow {
  clientId: string;
  clientName: string;
  acv: string;
  stage: MigrationStage;
  recommendedAction: string;
  owner: string;
}

export interface TokenPlan {
  ratePerToken: number;
  ratePerTokenLabel: string;
  bundles: number;
  estimatedAcvImpact: number | null;
  estimatedAcvImpactLabel: string | null;
}

export interface MigrationAccountDetail {
  clientId: string;
  clientName: string;
  sub: string;
  acv: string;
  renewal: string;
  renewalUrgency: UrgencyColor;
  healthScore: number;
  healthStatus: HealthStatus;
  usageTrendPct: number;
  currentMarginPct: number;
  migrationRequired: boolean;
  narrative: string;
  stage: MigrationStage;
  tokenPlan: TokenPlan;
  whatToShowClient: string[];
  escalationPath: string;
}
