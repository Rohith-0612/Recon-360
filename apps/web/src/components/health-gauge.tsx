'use client';

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { scoreToColor } from '@/lib/presentation';

export function HealthGauge({ score }: { score: number }) {
  const color = scoreToColor(score);
  const data = [{ value: score, fill: `var(--brand-${color})` }];

  return (
    <div className="relative h-[150px] w-[150px]">
      <RadialBarChart
        width={150}
        height={150}
        cx="50%"
        cy="50%"
        innerRadius={65}
        outerRadius={78}
        barSize={13}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background={{ fill: 'var(--muted)' }} dataKey="value" cornerRadius={8} />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight">{score}</span>
        <span className="text-[11px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}
