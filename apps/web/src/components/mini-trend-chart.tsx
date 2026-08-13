'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { TrendSeriesPoint } from '@/lib/types';

export function MiniTrendChart({ series, color }: { series: TrendSeriesPoint[]; color: string }) {
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
