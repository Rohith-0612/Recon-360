'use client';

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { usePortfolio, useValueReport } from '@/lib/queries';
import { ClientSelect } from '@/components/client-select';
import { Skeleton } from '@/components/ui/skeleton';

export default function ValueReportPage() {
  const { data: portfolio } = usePortfolio();
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (!clientId && portfolio?.clients.length) setClientId(portfolio.clients[0].id);
  }, [clientId, portfolio]);

  const { data, isLoading } = useValueReport(clientId);

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Client Value Report</h1>
      <p className="mb-4.5 max-w-[720px] text-sm text-muted-foreground">
        One-click, client-ready value summary generated from live usage — for QBRs and renewals.
      </p>

      <div className="mb-4.5 flex flex-wrap items-center gap-3 print:hidden">
        <label className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Client</label>
        <ClientSelect value={clientId} onChange={setClientId} />
        {data && (
          <button
            onClick={() => window.print()}
            className="ml-auto flex items-center gap-1.5 rounded-[9px] border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <Printer className="h-3.5 w-3.5" /> Export as PDF
          </button>
        )}
      </div>

      {isLoading || !data ? (
        <Skeleton className="h-[420px] w-full max-w-[780px] rounded-2xl" />
      ) : (
        <div className="max-w-[780px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-6.5">
            <div>
              <div className="text-[19px] font-bold">Your LiveRamp Value Summary</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">
                Prepared for {data.clientName} · Q3 FY26
              </div>
            </div>
            <div className="text-base font-extrabold tracking-tight text-brand-blue">LiveRamp</div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-brand-blue/10 p-6.5">
            <div>
              <div className="text-[30px] font-bold tracking-tight">{data.roiMultiplier}x</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Return on investment</div>
            </div>
            <div>
              <div className="text-[30px] font-bold tracking-tight">
                {data.productsUsed}/{data.productsOwned}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">Products actively adopted</div>
            </div>
            <div>
              <div className="text-[30px] font-bold tracking-tight">{data.tenure}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Partnership tenure</div>
            </div>
          </div>

          <div className="border-t border-border p-4.5 px-6.5">
            <h4 className="mb-2.5 text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
              Value delivered this quarter
            </h4>
            <ul className="list-disc space-y-1.5 pl-4.5 text-sm">
              {data.usedItems.map((item, i) => (
                <li key={i}>
                  <b>{item.name}</b> — {item.usage}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border p-4.5 px-6.5">
            <h4 className="mb-2.5 text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
              Outcomes
            </h4>
            <ul className="list-disc space-y-1.5 pl-4.5 text-sm">
              <li>Consistent identity resolution and activation across your key destinations</li>
              <li>Measured ROI of {data.roiMultiplier}x against your annual investment</li>
              <li>Dedicated support with {data.stakeholders} active stakeholders engaged</li>
            </ul>
          </div>

          <div className="border-t border-border p-4.5 px-6.5 text-xs text-muted-foreground">
            Generated from your live usage through the current period. Share with your LiveRamp team for a deeper
            review.
          </div>
        </div>
      )}
    </div>
  );
}
