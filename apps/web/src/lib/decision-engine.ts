import { ClientDetailResponse, InsightTag } from './types';

export interface EvidenceItem {
  icon: string;
  text: string;
  source: string;
}

export interface Recommendation {
  text: string;
  owner: string;
  tag: InsightTag;
}

const PRODUCT_STATUS_EVIDENCE: Record<string, { icon: string; severity: number; text: (name: string, util: number) => string }> = {
  over: { icon: '⚡', severity: 4, text: (name, util) => `${name} is ${util - 100}% over its allotment — billable overage trigger.` },
  billnouse: { icon: '💳', severity: 4, text: (name, util) => `${name} is billed but only ${util}% used — reconciliation risk.` },
  gap: { icon: '⚠', severity: 3, text: (name, util) => `${name} has an adoption gap at ${util}% utilization.` },
  under: { icon: '📉', severity: 2, text: (name, util) => `${name} utilization is ${util}% — under-adopted.` },
  usenobill: { icon: '💡', severity: 1, text: (name, util) => `${name} is used (${util}%) without a contract — expansion signal.` },
};

export function buildEvidence(client: ClientDetailResponse): EvidenceItem[] {
  if (client.evidence?.length) {
    return client.evidence.map((text) => ({ icon: '📄', text, source: 'Account evidence' }));
  }

  const items: (EvidenceItem & { severity: number })[] = [];

  for (const p of client.products) {
    const meta = PRODUCT_STATUS_EVIDENCE[p.status];
    if (!meta) continue;
    items.push({
      icon: meta.icon,
      text: meta.text(p.name, p.util),
      source: 'Product Truth Layer · bought vs. used vs. billed',
      severity: meta.severity,
    });
  }

  for (const d of client.drivers) {
    if (d.color === 'red' || (d.color === 'amber' && d.delta < 0)) {
      items.push({
        icon: d.color === 'red' ? '📉' : '📊',
        text: `${d.name} score is ${d.value} (${d.delta > 0 ? '▲' : d.delta < 0 ? '▼' : '▬'}${Math.abs(d.delta)} vs. last quarter) — key detractor.`,
        source: 'Score Drivers',
        severity: d.color === 'red' ? 3 : 2,
      });
    }
  }

  if (client.renewalUrgency === 'red') {
    items.push({
      icon: '⏱',
      text: `Renewal in ${client.renewal} — high urgency.`,
      source: 'Renewal tracker',
      severity: 4,
    });
  }

  if (!items.length) {
    return [
      {
        icon: '✅',
        text: 'No material risk signals — usage, billing, and adoption are all within healthy range.',
        source: 'Product Truth Layer · Score Drivers',
      },
    ];
  }

  return items
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 4)
    .map(({ icon, text, source }) => ({ icon, text, source }));
}

// 'fin' insights are frequently just "clean billing, no action needed" for healthy accounts,
// so they rank below 'grow' — 'risk' still wins whenever present.
const TAG_PRIORITY: InsightTag[] = ['risk', 'grow', 'fin'];

export function buildRecommendation(client: ClientDetailResponse): Recommendation {
  if (client.recommendedAction) {
    return {
      text: client.recommendedAction,
      owner: client.actionOwner || 'CSM',
      tag: client.insights[0]?.tag ?? 'grow',
    };
  }

  const insight =
    TAG_PRIORITY.map((tag) => client.insights.find((i) => i.tag === tag)).find(Boolean) ?? client.insights[0];

  const owner = insight.label.includes(' · ') ? insight.label.split(' · ').pop()!.trim() : 'CSM';

  return {
    text: `${insight.desc} ${insight.action.replace(/^→\s*/, '')}.`,
    owner,
    tag: insight.tag,
  };
}
