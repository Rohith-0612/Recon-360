'use client';

import { useState } from 'react';
import { useMargin } from '@/lib/queries';
import { marginFlagBadge, marginPctClass } from '@/lib/presentation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';

function AssumptionSlider({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
      {label} <b className="font-mono text-foreground">{value}%</b>
      <Slider
        className="w-28"
        min={min}
        max={max}
        value={[value]}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
      />
    </label>
  );
}

export default function MarginPage() {
  const [base, setBase] = useState(30);
  const [intensity, setIntensity] = useState(40);
  const [overage, setOverage] = useState(8);
  const { data, isLoading } = useMargin(base, intensity, overage);

  return (
    <div>
      <h1 className="mt-2 mb-1 text-2xl font-semibold tracking-tight">Client Margin Lens</h1>
      <p className="mb-4.5 max-w-[720px] text-sm text-muted-foreground">
        Cost-to-serve layered onto every account to reveal true margin — not just revenue. Surfaces "healthy but
        low-margin" clients no other view shows.
      </p>

      <Card className="mb-3.5 p-3.5">
        <div className="flex flex-wrap items-center gap-5">
          <span className="text-sm font-semibold">Cost-to-serve assumptions</span>
          <AssumptionSlider label="Baseline" value={base} onChange={setBase} min={15} max={45} />
          <AssumptionSlider label="Usage intensity" value={intensity} onChange={setIntensity} min={10} max={60} />
          <AssumptionSlider label="Over-usage penalty" value={overage} onChange={setOverage} min={0} max={20} />
          <span className="ml-auto text-sm text-muted-foreground">Finance can tune → margins recompute live</span>
        </div>
      </Card>

      <div className="mb-3.5 flex justify-end gap-2">
        {data && (
          <>
            <Badge variant="secondary" className="text-brand-green bg-brand-green/10">
              Book margin {data.bookMarginPct}%
            </Badge>
            <Badge variant="secondary" className="text-brand-purple bg-brand-purple/10">
              {data.hiddenLowMarginCount} healthy but low-margin
            </Badge>
            <Badge variant="secondary" className="text-brand-red bg-brand-red/10">
              {data.marginDilutiveCount} margin-dilutive
            </Badge>
          </>
        )}
      </div>

      <Card className="overflow-hidden py-0">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Margin by client (sorted lowest first)
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">ACV</TableHead>
              <TableHead className="text-right">Est. cost-to-serve</TableHead>
              <TableHead className="text-right">Gross margin</TableHead>
              <TableHead className="text-right">Margin %</TableHead>
              <TableHead className="text-center">Health</TableHead>
              <TableHead>Flag</TableHead>
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
              : data.rows.map((r) => {
                  const flag = marginFlagBadge(r.flag);
                  return (
                    <TableRow key={r.clientId}>
                      <TableCell className="font-semibold">{r.clientName}</TableCell>
                      <TableCell className="text-right">{r.acvLabel}</TableCell>
                      <TableCell className="text-right">{r.costToServeLabel}</TableCell>
                      <TableCell className="text-right">{r.grossMarginLabel}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className={marginPctClass(r.marginPct)}>
                          {r.marginPct.toFixed(0)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">{r.healthScore}</TableCell>
                      <TableCell>
                        <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${flag.className}`}>
                          {flag.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <p className="px-4 pb-3.5 text-[11.5px] text-muted-foreground">
          Cost-to-serve estimated from usage intensity (compute/token cost) · illustrative
        </p>
      </Card>
    </div>
  );
}
