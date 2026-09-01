import { Injectable } from '@nestjs/common';
import { CLIENTS } from '../data/clients.data';
import { RawClient } from '../data/types';
import { mapProductStatus } from '../common/scoring.util';
import { AlertRow, AlertsResponse, AlertSeverity } from './alerts.types';

const RENEWAL_RE = /^Renewal in (\d+)d$/;
const UPLOAD_GAP_RE = /^Upload gap \(([\d.]+) mo\)$/;
const UPLOAD_SILENCE_RE = /^Upload silence \(([\d.]+) mo\)$/;

const SEVERITY_ORDER: Record<AlertSeverity, number> = { High: 0, Opportunity: 1, Medium: 2 };

function alertsForFlag(c: RawClient, flag: string): Omit<AlertRow, 'detectedDaysAgo'>[] {
  const evidenceTip = c.evidence.join(' ');

  const renewalMatch = flag.match(RENEWAL_RE);
  if (renewalMatch) {
    const days = Number(renewalMatch[1]);
    return [{
      clientId: c.id,
      clientName: c.name,
      product: 'Renewal',
      message: `Renewal in ${days} days — protect proactively`,
      signal: `renewal · ${days}d`,
      severity: days <= 45 ? 'High' : 'Medium',
      owner: 'CSM',
      tip: evidenceTip,
    }];
  }

  if (flag === 'Flagged risk (CRM)') {
    return [{
      clientId: c.id,
      clientName: c.name,
      product: 'CRM',
      message: 'Flagged as risk in CRM',
      signal: 'CRM risk flag',
      severity: 'High',
      owner: 'CSM',
      tip: evidenceTip,
    }];
  }

  const uploadSilenceMatch = flag.match(UPLOAD_SILENCE_RE);
  if (uploadSilenceMatch) {
    return [{
      clientId: c.id,
      clientName: c.name,
      product: 'File ingestion',
      message: `No file uploaded in ${uploadSilenceMatch[1]} months — data feed has gone silent`,
      signal: `stale feed · ${uploadSilenceMatch[1]}mo`,
      severity: 'High',
      owner: 'CSM + Solutions',
      tip: evidenceTip,
    }];
  }

  const uploadGapMatch = flag.match(UPLOAD_GAP_RE);
  if (uploadGapMatch) {
    return [{
      clientId: c.id,
      clientName: c.name,
      product: 'File ingestion',
      message: `No file uploaded in ${uploadGapMatch[1]} months`,
      signal: `stale feed · ${uploadGapMatch[1]}mo`,
      severity: 'Medium',
      owner: 'CSM',
      tip: evidenceTip,
    }];
  }

  if (flag === 'Over-usage') {
    const overProduct = c.products.find((p) => mapProductStatus(p.status) === 'over');
    const util = overProduct ? Math.round(overProduct.utilization * 100) : 100;
    return [{
      clientId: c.id,
      clientName: c.name,
      product: overProduct?.product ?? 'Product',
      message: 'Over-usage spike above commit',
      signal: `+${util - 100}% over`,
      severity: 'Opportunity',
      owner: 'Sales + Finance',
      tip: evidenceTip,
    }];
  }

  if (flag === 'Billing mismatch') {
    return [{
      clientId: c.id,
      clientName: c.name,
      product: 'Billing',
      message: 'Billed but not consumed — needs reconciliation',
      signal: 'billing mismatch',
      severity: 'Medium',
      owner: 'Finance',
      tip: evidenceTip,
    }];
  }

  return [];
}

@Injectable()
export class AlertsService {
  /** File-ingestion staleness + per-product usage/billing anomalies, derived from each client's real risk_flags, severity-sorted. */
  getAlerts(): AlertsResponse {
    const alerts: Omit<AlertRow, 'detectedDaysAgo'>[] = CLIENTS.flatMap((c) =>
      c.risk_flags.flatMap((flag) => alertsForFlag(c, flag)),
    );

    alerts.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
    const withDays: AlertRow[] = alerts.map((a, i) => ({ ...a, detectedDaysAgo: (i % 5) + 1 }));

    return {
      alerts: withDays,
      kpis: {
        high: withDays.filter((a) => a.severity === 'High').length,
        opportunity: withDays.filter((a) => a.severity === 'Opportunity').length,
        medium: withDays.filter((a) => a.severity === 'Medium').length,
        uploadSilence: withDays.filter((a) => a.product === 'File ingestion').length,
      },
    };
  }
}
