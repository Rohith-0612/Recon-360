'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Recommendation } from '@/lib/decision-engine';
import { ClientDetailResponse } from '@/lib/types';
import { healthBadge } from '@/lib/presentation';

export type ActionType = 'salesforce' | 'slack';

const STEPS: Record<ActionType, string[]> = {
  salesforce: [
    'Validating request',
    'Applying policy + permissions',
    'Sending to Workato',
    'Creating Salesforce task',
    'Posting Slack confirmation',
  ],
  slack: ['Validating request', 'Applying policy + permissions', 'Sending to Workato', 'Posting to #account-team-alerts'],
};

const STEP_DELAY_MS = 550;

function randomTaskId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `00T5f${suffix}`;
}

export function ActionWorkflowDialog({
  open,
  onOpenChange,
  actionType,
  client,
  recommendation,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: ActionType | null;
  client: ClientDetailResponse;
  recommendation: Recommendation;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<{ label: string; value: string; slack: string } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!open || !actionType) return;

    setStepIndex(0);
    setResult(null);
    const steps = STEPS[actionType];
    const badge = healthBadge(client.status);

    steps.forEach((_, i) => {
      const timer = setTimeout(() => setStepIndex(i + 1), STEP_DELAY_MS * (i + 1));
      timers.current.push(timer);
    });

    const finishTimer = setTimeout(() => {
      const taskId = randomTaskId();

      if (actionType === 'salesforce') {
        setResult({
          label: 'SALESFORCE TASK CREATED',
          value: `${taskId} · "Recon 360: ${badge.label} — ${client.name}"`,
          slack: `🔴 ${client.name} flagged ${badge.label}. Follow-up task ${taskId} assigned to ${recommendation.owner}. View evidence in Recon 360.`,
        });
      } else {
        setResult({
          label: 'SLACK ALERT POSTED',
          value: `#account-team-alerts · msg ${taskId}`,
          slack: `🔴 ${client.name} flagged ${badge.label} — ${recommendation.text} Owner: ${recommendation.owner}.`,
        });
      }
    }, STEP_DELAY_MS * (steps.length + 1));
    timers.current.push(finishTimer);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, actionType]);

  if (!actionType) return null;
  const steps = STEPS[actionType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{actionType === 'salesforce' ? 'Creating Salesforce follow-up' : 'Sending Slack alert'}</DialogTitle>
        <DialogDescription>
          Client: {client.name} · Owner: {recommendation.owner}
        </DialogDescription>

        <div className="mt-3.5">
          {steps.map((step, i) => {
            const doneStep = i < stepIndex;
            const activeStep = i === stepIndex;
            return (
              <div
                key={step}
                className={`flex items-center gap-2.5 py-1.5 text-[13.5px] transition-colors ${
                  doneStep || activeStep ? 'text-foreground' : 'text-muted-foreground'
                } ${activeStep ? 'font-semibold' : ''}`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full border-2 text-[11px] ${
                    doneStep ? 'border-brand-green bg-brand-green text-white' : 'border-border'
                  }`}
                >
                  {doneStep ? <CheckIcon className="size-3" /> : i + 1}
                </span>
                {step}
              </div>
            );
          })}
        </div>

        {result && (
          <div className="mt-3.5 rounded-xl bg-brand-green/10 p-3.5">
            <div className="font-mono text-[11px] text-muted-foreground">{result.label}</div>
            <div className="mt-1 font-mono text-[13px] font-semibold">{result.value}</div>
            <div className="mt-2.5 rounded-lg bg-muted/60 p-2.5 text-[12px]">
              <div className="font-bold">#account-team-alerts</div>
              <div className="mt-0.5">{result.slack}</div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          {result && (
            <Button size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
