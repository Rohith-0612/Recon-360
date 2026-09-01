'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, DollarSign, Percent, Users, type LucideIcon } from 'lucide-react';
import { usePortfolio, useMargin } from '@/lib/queries';
import { healthBadge, marginPctClass, marginPctColorVar, renewalRiskBadge } from '@/lib/presentation';
import { KpiTile } from '@/components/kpi-tile';
import { MiniMeter, MiniStackedBar, MiniStatusBars } from '@/components/kpi-visuals';
import { ScoreChip } from '@/components/score-chip';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { HealthStatus, PortfolioClient } from '@/lib/types';

const STATUS_COLOR: Record<HealthStatus, string> = {
  healthy: 'var(--brand-green)',
  watch: 'var(--brand-amber)',
  at_risk: 'var(--brand-amber)',
  critical: 'var(--brand-red)',
};
const STATUS_LABEL: Record<HealthStatus, string> = {
  healthy: 'Healthy',
  watch: 'Watch',
  at_risk: 'At Risk',
  critical: 'Critical',
};

function IconBadge({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <span
      className="grid h-7 w-7 place-items-center rounded-lg"
      style={{ backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <Icon className="h-3.5 w-3.5" style={{ color }} />
    </span>
  );
}

function byStatus(clients: PortfolioClient[], pick: (c: PortfolioClient) => number) {
  return (['healthy', 'watch', 'at_risk', 'critical'] as HealthStatus[]).map((status) => ({
    value: clients.filter((c) => c.status === status).reduce((t, c) => t + pick(c), 0),
    color: STATUS_COLOR[status],
    label: STATUS_LABEL[status],
  }));
}

export default function PortfolioPage() {
  const { data, isLoading } = usePortfolio();
  const { data: margin } = useMargin();
  const router = useRouter();

  const marginByClient = new Map(margin?.rows.map((r) => [r.clientId, r.marginPct]) ?? []);
  const arrSegments = data ? byStatus(data.clients, (c) => c.acvValue) : [];
  const accountSegments = data ? byStatus(data.clients, () => 1) : [];
  const atRiskSegments = data
    ? [
        { value: data.kpis.atRiskRenewingSoon, color: 'var(--brand-red)', label: 'renewing < 90 days' },
        {
          value: data.kpis.atRiskAccounts - data.kpis.atRiskRenewingSoon,
          color: 'var(--brand-amber)',
          label: 'other at-risk',
        },
      ]
    : [];

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Client Radar</h1>
      <p className="mb-4.5 max-w-[640px] text-sm text-muted-foreground">
        One reconciled view across Salesforce, usage, and billing data.
      </p>

      <div className="mb-4.5 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {isLoading || !data ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[92px] rounded-xl" />)
        ) : (
          <>
            <KpiTile
              label="Total ARR"
              value={data.kpis.bookOfBusinessLabel}
              sub={`across ${data.kpis.totalClients} accounts`}
              icon={<IconBadge icon={DollarSign} color="var(--brand-green)" />}
              footer={<MiniStackedBar segments={arrSegments} />}
            />
            <KpiTile
              label="Gross Margin %"
              value={margin ? `${margin.bookMarginPct}%` : '—'}
              sub="under default cost-to-serve assumptions"
              valueClassName={margin ? marginPctClass(margin.bookMarginPct).split(' ')[0] : ''}
              icon={<IconBadge icon={Percent} color={margin ? marginPctColorVar(margin.bookMarginPct) : 'var(--brand-blue)'} />}
              visual={margin && <MiniMeter pct={margin.bookMarginPct} color={marginPctColorVar(margin.bookMarginPct)} />}
            />
            <KpiTile
              label="Accounts"
              value={data.kpis.totalClients}
              sub="by health status"
              icon={<IconBadge icon={Users} color="var(--brand-blue)" />}
              visual={<MiniStatusBars segments={accountSegments} />}
            />
            <KpiTile
              label="At-Risk Accounts"
              value={data.kpis.atRiskAccounts}
              sub={`${data.kpis.atRiskRenewingSoon} renewing < 90 days`}
              valueClassName="text-brand-red"
              icon={<IconBadge icon={AlertTriangle} color="var(--brand-red)" />}
              visual={<MiniStatusBars segments={atRiskSegments} />}
            />
          </>
        )}
      </div>

      <Card className="overflow-hidden py-0">
        <CardHeader className="flex-row items-center justify-between border-b py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Client Overview ({data?.clients.length ?? 0})
          </CardTitle>
          <span className="text-sm text-muted-foreground">sorted by risk</span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">ACV</TableHead>
              <TableHead className="text-right">Usage Growth (30D)</TableHead>
              <TableHead className="text-right">Margin %</TableHead>
              <TableHead className="text-center">Health</TableHead>
              <TableHead className="text-center">Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !data
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : data.clients.map((c) => {
                  const badge = healthBadge(c.status);
                  const risk = renewalRiskBadge(c.renewalUrgency);
                  const clientMarginPct = marginByClient.get(c.id);
                  return (
                    <TableRow key={c.id} className="cursor-pointer" onClick={() => router.push(`/clients/${c.id}`)}>
                      <TableCell>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.sub}</div>
                      </TableCell>
                      <TableCell className="text-right">{c.acv}</TableCell>
                      <TableCell
                        className={`text-right font-mono ${c.usageGrowthPct > 0 ? 'text-brand-green' : c.usageGrowthPct < 0 ? 'text-brand-red' : 'text-muted-foreground'}`}
                      >
                        {c.usageGrowthPct > 0 ? '+' : ''}
                        {c.usageGrowthPct}%
                      </TableCell>
                      <TableCell className="text-right">
                        {clientMarginPct !== undefined ? (
                          <Badge variant="secondary" className={marginPctClass(clientMarginPct)}>
                            {clientMarginPct.toFixed(0)}%
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <ScoreChip score={c.score} />
                          <Badge variant="secondary" className={badge.className}>
                            {badge.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={risk.className}>
                          {risk.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
