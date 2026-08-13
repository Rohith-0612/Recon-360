'use client';

import { useEffect, useState } from 'react';
import { useMigrationAccount, useMigrationOverview, useMigrationQueue } from '@/lib/queries';
import { healthBadge, migrationSeverityBadge, migrationStageBadge, urgencyClass } from '@/lib/presentation';
import { KpiTile } from '@/components/kpi-tile';
import { ClientSelect } from '@/components/client-select';
import { UsageTrendBarChart } from '@/components/usage-trend-bar-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

function PanelRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-[12.5px] text-muted-foreground">{children}</div>
    </div>
  );
}

export default function MigrationPage() {
  const { data: overview, isLoading: overviewLoading } = useMigrationOverview();
  const { data: queue, isLoading: queueLoading } = useMigrationQueue();
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (!clientId && queue?.length) setClientId(queue[0].clientId);
  }, [clientId, queue]);

  const { data: account, isLoading: accountLoading } = useMigrationAccount(clientId);

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Token Migration</h1>
      <p className="mb-4.5 max-w-[720px] text-sm text-muted-foreground">
        Portfolio health, usage, margin, and token-pricing migration in one view — derived from the same client
        data as the rest of the portfolio.
      </p>

      <div className="mb-4.5 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {overviewLoading || !overview ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[74px] rounded-xl" />)
        ) : (
          <>
            <KpiTile label="Total Portfolio ACV" value={overview.kpis.totalPortfolioAcvLabel} sub="across the full portfolio" />
            <KpiTile
              label="At-Risk ACV"
              value={overview.kpis.atRiskAcvLabel}
              sub={`${overview.kpis.atRiskAccountCount} accounts need review`}
              valueClassName="text-brand-red"
            />
            <KpiTile
              label="Migration Required"
              value={overview.kpis.migrationRequiredCount}
              sub="Accounts in scope for token pricing"
              valueClassName="text-brand-amber"
            />
            <KpiTile label="Avg Margin" value={`${overview.kpis.avgMarginPct}%`} sub="under default cost-to-serve assumptions" />
          </>
        )}
      </div>

      <div className="mb-4.5 grid gap-4.5 md:grid-cols-[1.2fr_1fr]">
        <Card className="p-5">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Usage Trends</div>
            <span className="text-xs text-muted-foreground">Portfolio usage index by month</span>
          </div>
          {overviewLoading || !overview ? (
            <Skeleton className="h-[220px] w-full" />
          ) : (
            <UsageTrendBarChart data={overview.usageTrend} />
          )}
          <p className="mt-2 text-[11.5px] text-muted-foreground">
            Indexed to the latest month (Aug = 100) · aggregated from every client/product's usage curve.
          </p>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Portfolio Alerts</div>
            <span className="text-xs text-muted-foreground">Action-oriented</span>
          </div>
          <ul className="space-y-2.5">
            {overviewLoading || !overview
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-5 w-full" />)
              : overview.alerts.map((a, i) => {
                  const badge = migrationSeverityBadge(a.severity);
                  return (
                    <li key={i} className="flex items-center gap-2.5 text-[13.5px]">
                      <Badge variant="secondary" className={badge.className}>
                        {badge.label}
                      </Badge>
                      {a.message}
                    </li>
                  );
                })}
          </ul>
        </Card>
      </div>

      <div className="mb-4.5 grid gap-4.5 md:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Account Drill-down</div>
            {queue && <ClientSelect value={clientId} onChange={setClientId} clients={queue.map((q) => ({ id: q.clientId, name: q.clientName }))} />}
          </div>
          {accountLoading || !account ? (
            <Skeleton className="h-[160px] w-full rounded-xl" />
          ) : (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{account.clientName}</div>
                <Badge variant="secondary" className={healthBadge(account.healthStatus).className}>
                  {healthBadge(account.healthStatus).label}
                </Badge>
              </div>
              <p className="mt-1.5 text-[12.5px] text-muted-foreground">{account.narrative}</p>
              <div className="mt-3.5 grid grid-cols-4 gap-2.5">
                <div>
                  <div className="text-[10.5px] font-semibold text-muted-foreground uppercase">ACV</div>
                  <div className="text-[15px] font-semibold">{account.acv}</div>
                </div>
                <div>
                  <div className="text-[10.5px] font-semibold text-muted-foreground uppercase">Usage Trend</div>
                  <div
                    className={`text-[15px] font-semibold ${account.usageTrendPct < 0 ? 'text-brand-red' : 'text-brand-green'}`}
                  >
                    {account.usageTrendPct > 0 ? '+' : ''}
                    {account.usageTrendPct}%
                  </div>
                </div>
                <div>
                  <div className="text-[10.5px] font-semibold text-muted-foreground uppercase">Current Margin</div>
                  <div className="text-[15px] font-semibold">{account.currentMarginPct}%</div>
                </div>
                <div>
                  <div className="text-[10.5px] font-semibold text-muted-foreground uppercase">Renewal</div>
                  <div className={`text-[15px] font-semibold ${urgencyClass(account.renewalUrgency)}`}>
                    {account.renewal}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Migration Panel</div>
          {accountLoading || !account ? (
            <Skeleton className="h-[320px] w-full rounded-xl" />
          ) : (
            <div className="grid gap-2.5">
              <PanelRow title={`Migration Req: ${account.migrationRequired ? 'Required' : 'Not Required'}`}>
                {account.migrationRequired
                  ? 'This account is in scope and should be moved to token pricing.'
                  : "This account doesn't currently meet the migration criteria."}
              </PanelRow>
              <PanelRow title="Suggested Token Plan">
                {account.tokenPlan.ratePerTokenLabel} · {account.tokenPlan.bundles} bundle
                {account.tokenPlan.bundles !== 1 ? 's' : ''}
                {account.tokenPlan.estimatedAcvImpactLabel
                  ? ` · Estimated ACV impact: +${account.tokenPlan.estimatedAcvImpactLabel}`
                  : ''}
              </PanelRow>
              <PanelRow title="What to Show the Client">{account.whatToShowClient.join(', ')}</PanelRow>
              <PanelRow title="Escalation Path">{account.escalationPath}</PanelRow>
              <PanelRow title="Migration Stage">{migrationStageBadge(account.stage).label}</PanelRow>
            </div>
          )}
        </Card>
      </div>

      <Card className="overflow-hidden py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Migration Queue
          </CardTitle>
          <span className="text-sm text-muted-foreground">{queue?.length ?? 0} accounts in scope</span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Migration Req</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Recommended Action</TableHead>
              <TableHead className="text-right">ACV</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueLoading || !queue
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : queue.map((row) => {
                  const stage = migrationStageBadge(row.stage);
                  return (
                    <TableRow
                      key={row.clientId}
                      className={`cursor-pointer ${row.clientId === clientId ? 'bg-brand-blue/10' : ''}`}
                      onClick={() => setClientId(row.clientId)}
                    >
                      <TableCell className="font-semibold">{row.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-brand-amber bg-brand-amber/10">
                          Required
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={stage.className}>
                          {stage.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.recommendedAction}</TableCell>
                      <TableCell className="text-right">{row.acv}</TableCell>
                      <TableCell className="text-muted-foreground">{row.owner}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <p className="px-4 pb-3.5 text-[11.5px] text-muted-foreground">
          Examples across the portfolio · migration status derived from usage, over-usage, and margin signals
        </p>
      </Card>
    </div>
  );
}
