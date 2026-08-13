'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Info } from 'lucide-react';
import { useClient } from '@/lib/queries';
import {
  driverColorClass,
  healthBadge,
  productStatusBadge,
  urgencyClass,
  utilizationColorClass,
} from '@/lib/presentation';
import { HealthGauge } from '@/components/health-gauge';
import { TrustedHtml } from '@/components/trusted-html';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

function Fact({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div>
      <div className="text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className={`text-[15px] font-semibold ${valueClassName ?? ''}`}>{value}</div>
    </div>
  );
}

function Mark({ v }: { v: number }) {
  if (v >= 1) return <span className="font-bold text-brand-green">✓</span>;
  if (v > 0) return <span className="font-bold text-brand-amber">◐</span>;
  return <span className="font-bold text-muted-foreground">—</span>;
}

function utilBarClass(util: number) {
  if (util > 100) return 'bg-brand-red';
  if (util >= 70) return 'bg-brand-green';
  if (util >= 40) return 'bg-brand-amber';
  if (util >= 15) return 'bg-brand-red';
  return 'bg-brand-purple';
}

function insightTagClass(tag: string) {
  return tag === 'risk' ? 'text-brand-red' : tag === 'grow' ? 'text-brand-green' : 'text-brand-purple';
}

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: c, isLoading } = useClient(params.id);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

  if (isLoading || !c) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const badge = healthBadge(c.status);
  const relatedSet = selectedDriver !== null ? new Set(c.drivers[selectedDriver].related) : null;
  const selectedDriverInfo = selectedDriver !== null ? c.drivers[selectedDriver] : null;
  const driverLabel = selectedDriverInfo
    ? selectedDriverInfo.related.length
      ? `showing products driving: ${selectedDriverInfo.name}`
      : 'no product-specific driver'
    : '';

  return (
    <div>
      <div className="mb-3.5 flex items-center gap-2 text-sm font-semibold">
        <Link href="/" className="text-brand-blue hover:underline">
          Portfolio
        </Link>
        <span className="text-muted-foreground">›</span>
        <span className="text-muted-foreground">{c.name}</span>
      </div>

      <Card className="mb-4.5 flex-row flex-wrap items-center gap-4 p-5">
        <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[11px] bg-brand-blue/10 text-base font-extrabold text-brand-blue">
          {c.avatar}
        </div>
        <div>
          <div className="text-lg font-semibold">{c.name}</div>
          <div className="text-xs text-muted-foreground">{c.sub}</div>
        </div>
        <div className="ml-auto flex flex-wrap gap-6">
          <Fact label="ACV" value={c.acv} />
          <Fact label="Tenure" value={c.tenure} />
          <Fact label="Renewal" value={c.renewal} valueClassName={urgencyClass(c.renewalUrgency)} />
          <Fact label="Products" value={`${c.productsUsed} of ${c.productsOwned}`} />
        </div>
      </Card>

      <Card className="mb-4.5 p-4">
        <div className="text-[13px] text-muted-foreground">
          ✦ <b className="text-foreground">Auto-summary:</b> {c.aiQuestion}
        </div>
        <div className="mt-2 border-t border-border pt-2.5 text-[13.5px]">
          <TrustedHtml html={c.aiAnswer} />
        </div>
      </Card>

      <div className="grid gap-4.5 md:grid-cols-[290px_1fr]">
        <Card className="items-center justify-center p-5 text-center">
          <div className="mb-3 self-start text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Overall Health
          </div>
          <div className="flex flex-col items-center">
            <HealthGauge score={c.score} />
            <Badge variant="secondary" className={`mt-2.5 ${badge.className}`}>
              ● {badge.label}
            </Badge>
            <div
              className={`mt-2 text-[12.5px] font-semibold ${c.delta > 0 ? 'text-brand-green' : c.delta < 0 ? 'text-brand-red' : 'text-muted-foreground'}`}
            >
              {c.delta > 0 ? '▲ +' : c.delta < 0 ? '▼ ' : '▬ '}
              {Math.abs(c.delta)} pts vs. last quarter
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Last quarter <b className="text-foreground">{c.previousScore}</b> → today{' '}
              <b className="text-foreground">{c.score}</b>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Score Drivers
          </div>
          <div className="flex items-center gap-2.5 pb-2 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            <span className="flex-1">Signal</span>
            <span className="w-[70px]" />
            <span className="w-[30px] text-right">Score</span>
            <span className="w-[32px] text-right">Δ QoQ</span>
          </div>
          {c.drivers.map((d, i) => (
            <div
              key={d.name}
              onClick={() => setSelectedDriver(selectedDriver === i ? null : i)}
              className={`-mx-2 flex cursor-pointer items-center gap-2.5 rounded-lg border-t border-border px-2 py-2.5 first:border-t-0 ${
                selectedDriver === i ? 'bg-brand-blue/10' : 'hover:bg-accent'
              }`}
            >
              <span className="flex-1 text-[13.5px]">
                {d.name}
                <span className="ml-1.5 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {d.weightPct}%
                </span>
                {d.tooltip && (
                  <Info
                    className="ml-1.5 inline h-3 w-3 cursor-help align-middle text-muted-foreground"
                    title={d.tooltip}
                  />
                )}
              </span>
              <span className="h-1.5 w-[70px] overflow-hidden rounded bg-muted">
                <span className={`block h-full ${driverColorClass(d.color)}`} style={{ width: `${d.value}%` }} />
              </span>
              <span className={`w-[30px] text-right font-mono text-[15px] font-bold ${urgencyClass(d.color)}`}>
                {d.value}
              </span>
              <span
                className={`w-[32px] text-right font-mono text-xs ${d.delta > 0 ? 'text-brand-green' : d.delta < 0 ? 'text-brand-red' : 'text-muted-foreground'}`}
              >
                {d.delta > 0 ? '▲' : d.delta < 0 ? '▼' : '▬'}
                {Math.abs(d.delta)}
              </span>
            </div>
          ))}
          <p className="mt-3 text-[11.5px] text-muted-foreground">
            ↳ Click a driver to isolate the products behind it
          </p>
        </Card>
      </div>

      <Card className="mt-4.5 overflow-hidden py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border py-4">
          <CardTitle className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
            Product Truth Layer — Bought · Used · Billed
          </CardTitle>
          {driverLabel && <span className="text-sm font-semibold text-brand-blue">{driverLabel}</span>}
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Bought</TableHead>
              <TableHead className="text-center">Used</TableHead>
              <TableHead className="text-center">Billed</TableHead>
              <TableHead className="text-right">Utilization</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {c.products.map((p) => {
              const dim = relatedSet && !relatedSet.has(p.id);
              const productBadge = productStatusBadge(p.status);
              return (
                <TableRow key={p.id} className={dim ? 'opacity-30' : ''}>
                  <TableCell>
                    <div className="font-semibold">{p.name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{p.category}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Mark v={p.bought} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Mark v={p.used} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Mark v={p.billed} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="inline-block h-1.5 w-[60px] overflow-hidden rounded bg-muted">
                        <span
                          className={`block h-full ${utilBarClass(p.util)}`}
                          style={{ width: `${Math.min(p.util, 100)}%` }}
                        />
                      </span>
                      <b className={utilizationColorClass(p.util)}>{p.util}%</b>
                    </div>
                    <div className="mt-1 font-mono text-[11px] whitespace-nowrap text-muted-foreground">
                      {p.bought >= 1
                        ? `${p.usedVolume.toLocaleString('en-US')} / ${p.contracted.toLocaleString('en-US')} ${p.unit}`
                        : `${p.usedVolume.toLocaleString('en-US')} ${p.unit} · no contract`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={productBadge.className}>
                      {productBadge.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4.5 grid gap-3.5 md:grid-cols-3">
        {c.insights.map((ins, i) => (
          <Card key={i} className="p-4">
            <div className={`font-mono text-[10px] font-bold tracking-wide uppercase ${insightTagClass(ins.tag)}`}>
              {ins.label}
            </div>
            <h3 className="mt-2 text-[14.5px] font-semibold">{ins.title}</h3>
            <p className="mt-1 text-[12.5px] text-muted-foreground">{ins.desc}</p>
            <span className="mt-2 block text-[12.5px] font-semibold text-brand-blue">{ins.action}</span>
          </Card>
        ))}
      </div>

      <div className="mt-4.5 rounded-r-xl border-l-[3px] border-brand-blue bg-brand-blue/10 p-4">
        <span className="font-mono text-[10px] font-bold tracking-widest text-brand-blue uppercase">
          ✦ Auto-generated QBR narrative
        </span>
        <p className="mt-1.5 text-sm">
          <TrustedHtml html={c.narrative} />
        </p>
      </div>
    </div>
  );
}
