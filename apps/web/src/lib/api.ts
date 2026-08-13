import {
  AlertsResponse,
  ClientDetailResponse,
  MarginResponse,
  MigrationAccountDetail,
  MigrationOverviewResponse,
  MigrationQueueRow,
  PortfolioResponse,
  TrendsResponse,
  UpsellResponse,
  ValueReportResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Request to ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getPortfolio: () => getJson<PortfolioResponse>('/portfolio'),
  getClient: (id: string) => getJson<ClientDetailResponse>(`/clients/${id}`),
  getTrends: (id: string) => getJson<TrendsResponse>(`/clients/${id}/trends`),
  getValueReport: (id: string) => getJson<ValueReportResponse>(`/clients/${id}/value-report`),
  getUpsell: () => getJson<UpsellResponse>('/upsell'),
  getMargin: (base: number, intensity: number, overage: number) =>
    getJson<MarginResponse>(`/margin?base=${base}&intensity=${intensity}&overage=${overage}`),
  getAlerts: () => getJson<AlertsResponse>('/alerts'),
  search: (q: string) => getJson<{ clientId: string | null }>(`/search?q=${encodeURIComponent(q)}`),
  getMigrationOverview: () => getJson<MigrationOverviewResponse>('/migration/overview'),
  getMigrationQueue: () => getJson<MigrationQueueRow[]>('/migration/queue'),
  getMigrationAccount: (id: string) => getJson<MigrationAccountDetail>(`/migration/accounts/${id}`),
};
