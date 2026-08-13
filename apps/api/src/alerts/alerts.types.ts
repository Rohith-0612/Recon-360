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
