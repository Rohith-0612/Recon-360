import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const usePortfolio = () => useQuery({ queryKey: ['portfolio'], queryFn: api.getPortfolio });

export const useClient = (id: string) =>
  useQuery({ queryKey: ['client', id], queryFn: () => api.getClient(id), enabled: !!id });

export const useTrends = (id: string) =>
  useQuery({ queryKey: ['trends', id], queryFn: () => api.getTrends(id), enabled: !!id });

export const useValueReport = (id: string) =>
  useQuery({ queryKey: ['value-report', id], queryFn: () => api.getValueReport(id), enabled: !!id });

export const useUpsell = () => useQuery({ queryKey: ['upsell'], queryFn: api.getUpsell });

export const useMargin = () => useQuery({ queryKey: ['margin'], queryFn: api.getMargin });

export const useAlerts = () => useQuery({ queryKey: ['alerts'], queryFn: api.getAlerts });

export const useMigrationOverview = () =>
  useQuery({ queryKey: ['migration-overview'], queryFn: api.getMigrationOverview });

export const useMigrationQueue = () => useQuery({ queryKey: ['migration-queue'], queryFn: api.getMigrationQueue });

export const useMigrationAccount = (id: string) =>
  useQuery({
    queryKey: ['migration-account', id],
    queryFn: () => api.getMigrationAccount(id),
    enabled: !!id,
  });
