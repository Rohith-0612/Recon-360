import { HealthStatus, UrgencyColor } from '../common/scoring.util';

export type MigrationStage =
  | 'not_started'
  | 'conversation_held'
  | 'proposal_submitted'
  | 'deferred'
  | 'signed';

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
