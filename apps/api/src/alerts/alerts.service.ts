import { Injectable } from '@nestjs/common';
import { CLIENTS } from '../data/clients.data';
import { daysSinceUpload } from '../common/scoring.util';
import { AlertRow, AlertsResponse, AlertSeverity } from './alerts.types';

const UPLOAD_TIP =
  "Source: Connect 'Last Upload Date' per audience (Data Management → Audiences). Pulled from file-ingestion event logs via the Data Pipeline Visibility API, joined to the SFDC account for CSM routing. Baseline cadence from usage_billing history in BigQuery.";

const SEVERITY_ORDER: Record<AlertSeverity, number> = { High: 0, Opportunity: 1, Medium: 2 };

@Injectable()
export class AlertsService {
  /** Ports renderAlerts(): file-ingestion staleness + per-product usage/billing anomalies, severity-sorted. */
  getAlerts(): AlertsResponse {
    const alerts: Omit<AlertRow, 'detectedDaysAgo'>[] = [];

    CLIENTS.forEach((c) => {
      const du = daysSinceUpload(c.id);
      if (du > 45) {
        alerts.push({
          clientId: c.id,
          clientName: c.name,
          product: 'File ingestion',
          message: `No file uploaded in ${du} days — data feed has gone silent`,
          signal: `stale feed · ${du}d`,
          severity: 'High',
          owner: 'CSM + Solutions',
          tip: UPLOAD_TIP,
        });
      } else if (du > 30) {
        alerts.push({
          clientId: c.id,
          clientName: c.name,
          product: 'File ingestion',
          message: `No file uploaded in ${du} days`,
          signal: `stale feed · ${du}d`,
          severity: 'Medium',
          owner: 'CSM',
          tip: UPLOAD_TIP,
        });
      }

      c.products.forEach((p) => {
        if (p.trend === 'down' && p.util < 40) {
          alerts.push({
            clientId: c.id,
            clientName: c.name,
            product: p.name,
            message: 'Usage collapsed — likely integration/onboarding failure',
            signal: `${100 - p.util}% below normal`,
            severity: 'High',
            owner: 'CSM + Solutions',
          });
        } else if (p.trend === 'down') {
          alerts.push({
            clientId: c.id,
            clientName: c.name,
            product: p.name,
            message: 'Usage declining 3+ months',
            signal: 'trending down',
            severity: 'Medium',
            owner: 'CSM',
          });
        } else if (p.util > 100) {
          alerts.push({
            clientId: c.id,
            clientName: c.name,
            product: p.name,
            message: 'Over-usage spike above commit',
            signal: `+${p.util - 100}% over`,
            severity: 'Opportunity',
            owner: 'Sales + Finance',
          });
        } else if (p.status === 'billnouse') {
          alerts.push({
            clientId: c.id,
            clientName: c.name,
            product: p.name,
            message: 'Billed but not consumed',
            signal: 'needs reconciliation',
            severity: 'Medium',
            owner: 'Finance',
          });
        }
      });
    });

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
