import { InsightRecord, ProductStatus, TrendClass } from '../data/types';
import { HealthStatus, UrgencyColor } from '../common/scoring.util';

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
  renewal: string;
  renewalUrgency: UrgencyColor;
  productsUsed: number;
  productsOwned: number;
  flagCount: number;
}

export interface PortfolioResponse {
  kpis: PortfolioKpis;
  clients: PortfolioClient[];
}

export interface DriverView {
  name: string;
  value: number;
  delta: number;
  color: string;
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

export interface ClientDetailResponse {
  id: string;
  name: string;
  sub: string;
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
