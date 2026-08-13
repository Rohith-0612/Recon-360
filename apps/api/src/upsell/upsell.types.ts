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
