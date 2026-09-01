'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { AlertRow } from '@/lib/types';
import { alertSeverityBadge } from '@/lib/presentation';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export function ClientAlertsDialog({ alerts }: { alerts: AlertRow[] }) {
  const [open, setOpen] = useState(false);

  if (!alerts.length) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md border border-brand-red/25 bg-brand-red/10 px-2.5 py-1.5 text-brand-red transition-opacity hover:opacity-80"
      >
        <Bell className="h-4 w-4" />
        <span className="text-[13px] font-bold">{alerts.length}</span>
      </button>
      <DialogContent className="max-w-[560px]">
        <DialogTitle>Alerts for {alerts[0].clientName}</DialogTitle>
        <DialogDescription>
          {alerts.length} active alert{alerts.length !== 1 ? 's' : ''} · leading-indicator signals for this account
        </DialogDescription>
        <div className="mt-3.5 max-h-[420px] space-y-2.5 overflow-y-auto">
          {alerts.map((a, i) => {
            const badge = alertSeverityBadge(a.severity);
            return (
              <div key={i} className="rounded-lg border border-border p-3" title={a.tip}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={badge.className}>
                      {badge.label}
                    </Badge>
                    <span className="text-[12.5px] font-semibold">{a.product}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{a.detectedDaysAgo}d ago</span>
                </div>
                <p className="mt-1.5 text-[13px]">{a.message}</p>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{a.signal}</span>
                  <span>Owner: {a.owner}</span>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
