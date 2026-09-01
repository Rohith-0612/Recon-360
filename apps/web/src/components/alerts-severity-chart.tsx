'use client';

import { AlertTriangle, TrendingUp, AlertCircle } from 'lucide-react';

interface SeverityRow {
  key: string;
  label: string;
  value: number;
  color: string;
  Icon: typeof AlertTriangle;
}

export function AlertsSeverityChart({
  kpis,
}: {
  kpis: { high: number; opportunity: number; medium: number };
}) {
  const rows: SeverityRow[] = [
    { key: 'high', label: 'High', value: kpis.high, color: 'var(--brand-red)', Icon: AlertTriangle },
    { key: 'opportunity', label: 'Opportunity', value: kpis.opportunity, color: 'var(--brand-green)', Icon: TrendingUp },
    { key: 'medium', label: 'Medium', value: kpis.medium, color: 'var(--brand-amber)', Icon: AlertCircle },
  ];
  const total = rows.reduce((sum, r) => sum + r.value, 0) || 1;

  return (
    <div>
      <div className="flex h-4 gap-0.5 overflow-hidden rounded-lg bg-muted">
        {rows.map((r) => (
          <div key={r.key} style={{ width: `${(r.value / total) * 100}%`, backgroundColor: r.color }} />
        ))}
      </div>
      <div className="mt-3.5 grid grid-cols-3 gap-2.5">
        {rows.map((r) => (
          <div key={r.key} className="rounded-[10px] p-3" style={{ backgroundColor: `color-mix(in srgb, ${r.color} 10%, transparent)` }}>
            <div className="text-[22px] font-extrabold" style={{ color: r.color }}>
              {r.value}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: r.color }}>
              <r.Icon className="h-3.5 w-3.5" />
              {r.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
