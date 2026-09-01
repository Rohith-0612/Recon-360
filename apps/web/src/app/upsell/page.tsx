'use client';

import { useRouter } from 'next/navigation';
import { useUpsell } from '@/lib/queries';
import { upsellSignalBadge } from '@/lib/presentation';
import { UpsellBarChart } from '@/components/upsell-bar-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function UpsellPage() {
  const router = useRouter();
  const { data, isLoading } = useUpsell();

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Upsell Engine</h1>
      <p className="mb-4.5 max-w-[720px] text-sm text-muted-foreground">
        Turns over-usage and whitespace signals into priced, routed expansion plays — automatically.
      </p>

      <div className="mb-3.5 flex justify-end gap-2">
        {data && (
          <>
            <Badge variant="secondary" className="text-brand-green bg-brand-green/10">
              {data.totalUpliftLabel} pipeline uplift
            </Badge>
            <Badge variant="secondary" className="text-brand-purple bg-brand-purple/10">
              {data.playCount} plays
            </Badge>
          </>
        )}
      </div>

      <Card className="mb-4.5 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Top Opportunities</div>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-red" /> Over-usage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-purple" /> Whitespace
            </span>
          </div>
        </div>
        {isLoading || !data ? <Skeleton className="h-[260px] w-full" /> : <UpsellBarChart plays={data.plays} />}
      </Card>

      <Card className="overflow-hidden py-0">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Auto-generated expansion plays
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client / Product</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Current commit</TableHead>
              <TableHead>Actual usage</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead className="text-right">Est. ACV uplift</TableHead>
              <TableHead>Routed to</TableHead>
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
              : data.plays.map((play, i) => {
                  const badge = upsellSignalBadge(play.signal);
                  return (
                    <TableRow
                      key={i}
                      className="cursor-pointer"
                      onClick={() => router.push(`/clients/${play.clientId}`)}
                    >
                      <TableCell>
                        <div className="font-semibold">{play.clientName}</div>
                        <div className="text-[11px] text-muted-foreground">{play.productName}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={badge.className}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{play.currentCommit}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{play.actualUsage}</TableCell>
                      <TableCell>{play.recommendation}</TableCell>
                      <TableCell className="text-right font-bold text-brand-green">{play.upliftAcvLabel}</TableCell>
                      <TableCell className="text-muted-foreground">{play.routedTo}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <p className="px-4 pb-3.5 text-[11.5px] text-muted-foreground">
          Uplift is an illustrative estimate · quotes would draft into Salesforce, overage into billing
        </p>
      </Card>
    </div>
  );
}
