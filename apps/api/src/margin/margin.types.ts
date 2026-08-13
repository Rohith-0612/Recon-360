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
  assumptions: { basePct: number; intensityPct: number; overagePenaltyPct: number };
  rows: MarginRow[];
  bookMarginPct: number;
  hiddenLowMarginCount: number;
  marginDilutiveCount: number;
}
