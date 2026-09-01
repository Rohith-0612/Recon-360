'use client';

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

interface Segment {
  value: number;
  color: string;
  label: string;
}

/** Horizontal part-to-whole bar — e.g. ARR split by health status. Real derived counts only. */
export function MiniStackedBar({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((t, s) => t + s.value, 0) || 1;
  return (
    <div
      className="flex h-2 w-full overflow-hidden rounded-full bg-muted"
      title={segments.map((s) => `${s.label}: ${Math.round((s.value / total) * 100)}%`).join(' · ')}
    >
      {segments.map((s, i) => (
        <span
          key={i}
          className="h-full first:rounded-l-full last:rounded-r-full"
          style={{ width: `${(s.value / total) * 100}%`, backgroundColor: s.color }}
        />
      ))}
    </div>
  );
}

/** Small bar-per-bucket comparison — e.g. account count by health status. */
export function MiniStatusBars({ segments }: { segments: Segment[] }) {
  const max = Math.max(...segments.map((s) => s.value), 1);
  return (
    <div className="flex h-8 items-end gap-1" title={segments.map((s) => `${s.label}: ${s.value}`).join(' · ')}>
      {segments.map((s, i) => (
        <span
          key={i}
          className="w-2.5 rounded-t-[3px]"
          style={{ height: `${Math.max((s.value / max) * 100, 10)}%`, backgroundColor: s.color }}
        />
      ))}
    </div>
  );
}

/** Small radial meter — a single ratio against a limit (e.g. gross margin %). */
export function MiniMeter({ pct, color, size = 40 }: { pct: number; color: string; size?: number }) {
  const data = [{ value: Math.min(pct, 100), fill: color }];
  return (
    <RadialBarChart
      width={size}
      height={size}
      cx="50%"
      cy="50%"
      innerRadius={size * 0.34}
      outerRadius={size * 0.5}
      barSize={size * 0.16}
      data={data}
      startAngle={90}
      endAngle={-270}
    >
      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
      <RadialBar background={{ fill: 'var(--muted)' }} dataKey="value" cornerRadius={size * 0.08} />
    </RadialBarChart>
  );
}
