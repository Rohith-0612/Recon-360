'use client';

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { DriverView } from '@/lib/types';
import { ChartTooltipCard } from './chart-tooltip';

const SHORT_NAME: Record<string, string> = {
  Utilization: 'Util.',
  'Value Delivered': 'Value Delivered',
  'Timely Payments': 'Timely Payments',
  'Products': 'Products',
  Relationship: 'Rel.'
};

export function DriverRadarChart({ drivers }: { drivers: DriverView[] }) {
  const data = drivers.map((d) => ({ subject: SHORT_NAME[d.name] ?? d.name, value: d.value, fullName: d.name }));

  return (
    <div className="h-[190px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="65%" margin={{ top: 4, right: 20, bottom: 4, left: 20 }}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10.5, fill: 'var(--muted-foreground)' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} tickCount={3} />
          <Tooltip
            content={({
              active,
              payload,
            }: {
              active?: boolean;
              payload?: Array<{ payload: { fullName: string; value: number } }>;
            }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload;
              return (
                <ChartTooltipCard
                  heading={p.fullName}
                  rows={[{ key: 'v', name: 'Score', value: String(p.value), color: 'var(--brand-blue)' }]}
                />
              );
            }}
          />
          <Radar
            dataKey="value"
            stroke="var(--brand-blue)"
            strokeWidth={2}
            fill="var(--brand-blue)"
            fillOpacity={0.15}
            dot={{ r: 3.5, strokeWidth: 0, fill: 'var(--brand-blue)' }}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
