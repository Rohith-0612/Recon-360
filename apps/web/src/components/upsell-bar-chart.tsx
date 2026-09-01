'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UpsellPlay } from '@/lib/types';
import { ChartTooltipCard } from './chart-tooltip';

const SIGNAL_COLOR: Record<string, string> = {
  over_usage: 'var(--brand-red)',
  whitespace: 'var(--brand-purple)',
};

interface ClientTotals {
  clientId: string;
  clientName: string;
  over_usage: number;
  whitespace: number;
}

function fmtCompactMoney(v: number): string {
  if (!v) return '$0';
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${Math.round(v)}`;
}

/** One grouped pair of bars per client — over-usage vs. whitespace uplift, summed across their products. */
function groupByClient(plays: UpsellPlay[]): ClientTotals[] {
  const byClient = new Map<string, ClientTotals>();
  plays.forEach((p) => {
    const row = byClient.get(p.clientId) ?? { clientId: p.clientId, clientName: p.clientName, over_usage: 0, whitespace: 0 };
    row[p.signal] += p.upliftAcv;
    byClient.set(p.clientId, row);
  });
  return Array.from(byClient.values())
    .sort((a, b) => b.over_usage + b.whitespace - (a.over_usage + a.whitespace))
    .slice(0, 8);
}

export function UpsellBarChart({ plays }: { plays: UpsellPlay[] }) {
  const data = groupByClient(plays);

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 48, left: 4 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="clientName"
            interval={0}
            angle={-28}
            textAnchor="end"
            height={64}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickFormatter={fmtCompactMoney}
          />
          <Tooltip
            cursor={{ fill: 'var(--accent)' }}
            content={({ active, label, payload }: { active?: boolean; label?: string; payload?: Array<{ dataKey?: string; value?: number }> }) => {
              if (!active || !payload?.length) return null;
              const rows = payload
                .filter((entry) => (entry.value ?? 0) > 0)
                .map((entry) => ({
                  key: String(entry.dataKey),
                  name: entry.dataKey === 'over_usage' ? 'Over-usage' : 'Whitespace',
                  value: fmtCompactMoney(entry.value ?? 0),
                  color: SIGNAL_COLOR[entry.dataKey as string],
                }));
              return <ChartTooltipCard heading={String(label)} rows={rows} />;
            }}
          />
          <Bar dataKey="over_usage" name="Over-usage" fill={SIGNAL_COLOR.over_usage} radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Bar dataKey="whitespace" name="Whitespace" fill={SIGNAL_COLOR.whitespace} radius={[6, 6, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
