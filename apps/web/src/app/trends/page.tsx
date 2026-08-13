'use client';

import { useEffect, useState } from 'react';
import { usePortfolio, useTrends } from '@/lib/queries';
import { trendSignalBadge } from '@/lib/presentation';
import { ClientSelect } from '@/components/client-select';
import { MiniTrendChart } from '@/components/mini-trend-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const SIGNAL_COLOR: Record<string, string> = {
  over_usage: 'var(--brand-red)',
  upsell: 'var(--brand-green)',
  growing: 'var(--brand-green)',
  risk: 'var(--brand-red)',
  stable: 'var(--brand-amber)',
};

export default function TrendsPage() {
  const { data: portfolio } = usePortfolio();
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (!clientId && portfolio?.clients.length) setClientId(portfolio.clients[0].id);
  }, [clientId, portfolio]);

  const { data, isLoading } = useTrends(clientId);

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Usage Explorer</h1>
      <p className="mb-4.5 max-w-[720px] text-sm text-muted-foreground">
        Actual usage volumes — not just percentages — surfaced automatically. Read the trend and spot upsell,
        over-usage, and risk at a glance.
      </p>

      <div className="mb-4.5 flex flex-wrap items-center gap-3">
        <label className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Client</label>
        <ClientSelect value={clientId} onChange={setClientId} />
        {data && (
          <div className="ml-auto flex flex-wrap gap-2">
            {data.kpis.overUsage > 0 && (
              <Badge variant="secondary" className="text-brand-red bg-brand-red/10">
                {data.kpis.overUsage} over-usage
              </Badge>
            )}
            <Badge variant="secondary" className="text-brand-green bg-brand-green/10">
              {data.kpis.upsellSignals} upsell signal{data.kpis.upsellSignals !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="secondary" className="text-brand-red bg-brand-red/10">
              {data.kpis.riskSignals} risk signal{data.kpis.riskSignals !== 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </div>

      <Card className="overflow-hidden py-0">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Monthly Usage by Product — last 6 months (actual numbers)
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              {data?.products[0]?.series.map((s) => (
                <TableHead key={s.month} className="text-right">
                  {s.month}
                </TableHead>
              ))}
              <TableHead className="text-center">Trend</TableHead>
              <TableHead className="text-right">MoM</TableHead>
              <TableHead className="text-right">vs commit</TableHead>
              <TableHead>Signal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !data
              ? Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={11}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : data.products.map((p) => {
                  const signal = trendSignalBadge(p.signal);
                  return (
                    <TableRow key={p.productId}>
                      <TableCell>
                        <div className="font-semibold">{p.name}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">{p.unit}</div>
                      </TableCell>
                      {p.series.map((s) => (
                        <TableCell key={s.month} className="text-right font-mono">
                          {s.value.toLocaleString('en-US')}
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        <MiniTrendChart series={p.series} color={SIGNAL_COLOR[p.signal]} />
                      </TableCell>
                      <TableCell
                        className={`text-right ${p.momPct > 1 ? 'text-brand-green' : p.momPct < -1 ? 'text-brand-red' : 'text-muted-foreground'}`}
                      >
                        {p.momPct > 0 ? '+' : ''}
                        {p.momPct}%
                      </TableCell>
                      <TableCell
                        className={
                          p.vsCommitPct > 0 ? 'text-right font-bold text-brand-red' : 'text-right text-muted-foreground'
                        }
                      >
                        {p.vsCommitPct > 0 ? `+${p.vsCommitPct}%` : `${100 + p.vsCommitPct}%`}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={signal.className}>
                          {signal.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <p className="px-4 pb-3.5 text-[11.5px] text-muted-foreground">
          Volumes in each product's native unit · "vs commit" &gt;100% = over-usage · sourced from usage_billing
          instead of manual Connect exports
        </p>
      </Card>
    </div>
  );
}
