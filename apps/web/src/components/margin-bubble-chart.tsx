'use client';

import {
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { MarginFlag, MarginRow } from '@/lib/types';
import { marginFlagBadge } from '@/lib/presentation';
import { ChartTooltipCard } from './chart-tooltip';

const FLAG_COLOR: Record<MarginFlag, string> = {
  ok: 'var(--brand-green)',
  watch: 'var(--brand-amber)',
  low: 'var(--brand-red)',
  hidden: 'var(--brand-purple)',
};

const FLAG_ORDER: MarginFlag[] = ['ok', 'watch', 'hidden', 'low'];

/** X = health score, Y = margin %, bubble size = ACV, color = margin flag (status, not identity). */
export function MarginBubbleChart({ rows }: { rows: MarginRow[] }) {
  const byFlag = FLAG_ORDER.map((flag) => ({ flag, points: rows.filter((r) => r.flag === flag) })).filter(
    (g) => g.points.length,
  );

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" />
          <XAxis
            type="number"
            dataKey="healthScore"
            name="Health score"
            domain={[30, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            label={{ value: 'Health score →', position: 'insideBottomRight', offset: -4, fontSize: 11, fill: 'var(--muted-foreground)' }}
          />
          <YAxis
            type="number"
            dataKey="marginPct"
            name="Margin %"
            domain={[0, 70]}
            tickLine={false}
            axisLine={false}
            width={40}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            label={{ value: 'Margin % →', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--muted-foreground)' }}
          />
          <ZAxis type="number" dataKey="acv" range={[80, 900]} name="ACV" />
          <ReferenceLine y={50} stroke="var(--muted-foreground)" strokeDasharray="3 3" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3', stroke: 'var(--border)' }}
            content={({
              active,
              payload,
            }: {
              active?: boolean;
              payload?: Array<{ payload: MarginRow }>;
            }) => {
              if (!active || !payload?.length) return null;
              const r = payload[0].payload;
              const badge = marginFlagBadge(r.flag);
              return (
                <ChartTooltipCard
                  heading={r.clientName}
                  rows={[
                    { key: 'acv', name: 'ACV', value: r.acvLabel, color: FLAG_COLOR[r.flag] },
                    { key: 'margin', name: 'Margin %', value: `${r.marginPct.toFixed(0)}%`, color: FLAG_COLOR[r.flag] },
                    { key: 'health', name: 'Health score', value: String(r.healthScore), color: FLAG_COLOR[r.flag] },
                    { key: 'flag', name: 'Flag', value: badge.label, color: FLAG_COLOR[r.flag] },
                  ]}
                />
              );
            }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)' }}
            formatter={(value: string) => marginFlagBadge(value as MarginFlag).label}
          />
          {byFlag.map((g) => (
            <Scatter
              key={g.flag}
              name={g.flag}
              data={g.points}
              fill={FLAG_COLOR[g.flag]}
              fillOpacity={0.75}
              isAnimationActive={false}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
