import { cn } from '@/lib/utils';

export function KpiTile({
  label,
  value,
  sub,
  valueClassName,
}: {
  label: string;
  value: string | number;
  sub?: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className={cn('mt-1 text-2xl font-bold tracking-tight', valueClassName)}>{value}</div>
      {sub && <div className="mt-0.5 text-[11.5px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
