'use client';

import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/lib/queries';
import { healthBadge, urgencyClass } from '@/lib/presentation';
import { KpiTile } from '@/components/kpi-tile';
import { ScoreChip } from '@/components/score-chip';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function PortfolioPage() {
  const { data, isLoading } = usePortfolio();
  const router = useRouter();

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Client Portfolio Health</h1>
      <p className="mb-4.5 max-w-[640px] text-sm text-muted-foreground">
        One reconciled view across Salesforce contracts, usage_billing, and invoicing. Click any client to open
        their Recon 360 card.
      </p>

      <div className="mb-4.5 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {isLoading || !data ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[74px] rounded-xl" />)
        ) : (
          <>
            <KpiTile label="Book of Business" value={data.kpis.bookOfBusinessLabel} sub={`across ${data.kpis.totalClients} accounts`} />
            <KpiTile
              label="At-Risk Accounts"
              value={data.kpis.atRiskAccounts}
              sub={`${data.kpis.atRiskRenewingSoon} renewing < 90 days`}
              valueClassName="text-brand-red"
            />
            <KpiTile
              label="Billing Mismatches"
              value={data.kpis.billingMismatches}
              sub={`across ${data.kpis.billingMismatchClients} clients`}
              valueClassName="text-brand-purple"
            />
            <KpiTile
              label="Whitespace Signals"
              value={data.kpis.whitespaceSignalsLabel}
              sub="used-not-owned upsell"
              valueClassName="text-brand-green"
            />
          </>
        )}
      </div>

      <Card className="overflow-hidden py-0">
        <CardHeader className="flex-row items-center justify-between border-b py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Clients ({data?.clients.length ?? 0})
          </CardTitle>
          <span className="text-sm text-muted-foreground">sorted by risk</span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="text-center">Health</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">ACV</TableHead>
              <TableHead className="text-center">Renewal</TableHead>
              <TableHead className="text-right">Products used</TableHead>
              <TableHead className="text-center">Flags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !data
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : data.clients.map((c) => {
                  const badge = healthBadge(c.status);
                  return (
                    <TableRow
                      key={c.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/clients/${c.id}`)}
                    >
                      <TableCell>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.sub}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <ScoreChip score={c.score} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={badge.className}>
                          {badge.label}
                        </Badge>{' '}
                        <span
                          className={`font-mono text-xs ${c.delta > 0 ? 'text-brand-green' : c.delta < 0 ? 'text-brand-red' : 'text-muted-foreground'}`}
                        >
                          {c.delta > 0 ? '▲' : c.delta < 0 ? '▼' : '▬'}
                          {Math.abs(c.delta)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{c.acv}</TableCell>
                      <TableCell className={`text-center font-semibold ${urgencyClass(c.renewalUrgency)}`}>
                        {c.renewal}
                      </TableCell>
                      <TableCell className="text-right">
                        {c.productsUsed} / {c.productsOwned}
                      </TableCell>
                      <TableCell className="text-center">
                        {c.flagCount ? (
                          <Badge variant="secondary" className="text-brand-purple bg-brand-purple/10">
                            {c.flagCount}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
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
