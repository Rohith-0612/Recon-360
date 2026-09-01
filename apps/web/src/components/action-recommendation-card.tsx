'use client';

import { buildEvidence, buildRecommendation } from '@/lib/decision-engine';
import { ActionType } from '@/components/action-workflow-dialog';
import { ClientDetailResponse } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TAG_CLASS: Record<string, string> = {
  risk: 'text-brand-red',
  fin: 'text-brand-purple',
  grow: 'text-brand-green',
};

export function ActionRecommendationCard({
  client,
  onAction,
}: {
  client: ClientDetailResponse;
  onAction: (type: ActionType) => void;
}) {
  const evidence = buildEvidence(client);
  const recommendation = buildRecommendation(client);

  return (
    <div className="mt-4.5 grid gap-3.5 md:grid-cols-[1fr_320px]">
      <Card className="p-4">
        <div className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Evidence</div>
        <div className="space-y-2">
          {evidence.map((e, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-lg bg-muted/50 p-2.5">
              <span className="text-sm leading-tight">{e.icon}</span>
              <div>
                <div className="text-[13px]">{e.text}</div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">Source · {e.source}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-dashed p-4">
        <div className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Recommended action
        </div>
        <p className="text-[13.5px]">{recommendation.text}</p>
        <p className={`mt-2 text-[12.5px] font-semibold ${TAG_CLASS[recommendation.tag] ?? 'text-brand-blue'}`}>
          → Owner: {recommendation.owner}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => onAction('salesforce')}>
            Create Salesforce follow-up
          </Button>
          <Button size="sm" variant="outline" onClick={() => onAction('slack')}>
            Send Slack alert to account team
          </Button>
        </div>
      </Card>
    </div>
  );
}
