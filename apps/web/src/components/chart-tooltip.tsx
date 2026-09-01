'use client';

interface TooltipRow {
  key: string;
  name: string;
  value: string;
  color: string;
}

/** Shared tooltip shell: value leads (bold), name follows (secondary), line-key not a filled box. */
export function ChartTooltipCard({ heading, rows }: { heading: string; rows: TooltipRow[] }) {
  return (
    <div className="min-w-[160px] rounded-lg border border-border bg-popover p-2.5 text-popover-foreground shadow-md">
      <div className="mb-1.5 text-[11px] font-semibold text-muted-foreground">{heading}</div>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between gap-3 text-[12.5px]">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="inline-block h-[2px] w-3 rounded-full" style={{ backgroundColor: r.color }} />
              {r.name}
            </span>
            <span className="font-mono font-semibold text-foreground">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
