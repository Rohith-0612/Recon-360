import { cn } from '@/lib/utils';

export function KpiTile({
  label,
  value,
  sub,
  valueClassName,
  icon,
  visual,
  footer,
}: {
  label: string;
  value: string | number;
  sub?: string;
  valueClassName?: string;
  /** Small icon badge identifying the metric, rendered beside the label. */
  icon?: React.ReactNode;
  /** Small derived-data visual (donut/bars) rendered beside the value. */
  visual?: React.ReactNode;
  /** Full-width derived-data visual (stacked bar) rendered below the sub text. */
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
          <div className="min-w-0">
            <div className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{label}</div>
            <div className={cn('mt-1 text-2xl font-bold tracking-tight', valueClassName)}>{value}</div>
          </div>
        </div>
        {visual && <div className="shrink-0">{visual}</div>}
      </div>
      {sub && <div className="mt-1.5 text-[11.5px] text-muted-foreground">{sub}</div>}
      {footer && <div className="mt-2.5">{footer}</div>}
    </div>
  );
}
