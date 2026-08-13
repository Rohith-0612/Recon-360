'use client';

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts';
import { MigrationTrendPoint } from '@/lib/types';

function barColor(value: number, max: number): string {
  const pct = (value / max) * 100;
  if (pct >= 95) return 'var(--brand-blue)';
  if (pct >= 80) return 'var(--brand-green)';
  if (pct >= 65) return 'var(--brand-amber)';
  return 'var(--brand-red)';
}

export function UsageTrendBarChart({ data }: { data: MigrationTrendPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
          />
          <Bar dataKey="value" radius={[8, 8, 3, 3]} maxBarSize={48}>
            {data.map((d, i) => (
              <Cell key={i} fill={barColor(d.value, max)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
