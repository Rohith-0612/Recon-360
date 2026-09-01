'use client';

import { useRouter } from 'next/navigation';
import { useAlerts } from '@/lib/queries';
import { alertSeverityBadge } from '@/lib/presentation';
import { AlertsSeverityChart } from '@/components/alerts-severity-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function AlertsPage() {
  const router = useRouter();
  const { data, isLoading } = useAlerts();

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Leading-Indicator Alerts</h1>
      <p className="mb-4.5 max-w-[720px] text-sm text-muted-foreground">
        Real-time anomalies caught before they hit the monthly health score — early warning across the book, with
        an owner for each.
      </p>

      <div className="mb-3.5 flex justify-end gap-2">
        {data && (
          <>
            <Badge variant="secondary" className="text-brand-red bg-brand-red/10">
              {data.kpis.high} high
            </Badge>
            <Badge variant="secondary" className="text-brand-green bg-brand-green/10">
              {data.kpis.opportunity} opportunity
            </Badge>
            <Badge variant="secondary" className="text-brand-amber bg-brand-amber/10">
              {data.kpis.medium} medium
            </Badge>
            <Badge variant="secondary" className="text-brand-purple bg-brand-purple/10">
              {data.kpis.uploadSilence} upload-silence
            </Badge>
          </>
        )}
      </div>

      <Card className="mb-4.5 p-5">
        <div className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">By Severity</div>
        {isLoading || !data ? <Skeleton className="h-[130px] w-full" /> : <AlertsSeverityChart kpis={data.kpis} />}
      </Card>

      <Card className="overflow-hidden py-0">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Active alerts
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Client / Product</TableHead>
              <TableHead>What happened</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Detected</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !data
              ? Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : data.alerts.map((a, i) => {
                  const badge = alertSeverityBadge(a.severity);
                  return (
                    <TableRow
                      key={i}
                      className="cursor-pointer"
                      onClick={() => router.push(`/clients/${a.clientId}`)}
                    >
                      <TableCell>
                        <Badge variant="secondary" className={badge.className}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">{a.clientName}</div>
                        <div className="text-[11px] text-muted-foreground">{a.product}</div>
                      </TableCell>
                      <TableCell title={a.tip}>{a.message}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{a.signal}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{a.detectedDaysAgo}d ago</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{a.owner}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <p className="px-4 pb-3.5 text-[11.5px] text-muted-foreground">
          Derived from daily usage movement · illustrative timestamps
        </p>
      </Card>
    </div>
  );
}
