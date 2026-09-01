'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ProductTrend } from '@/lib/types';
import { productColor } from '@/lib/product-colors';
import { ChartTooltipCard } from './chart-tooltip';

interface TooltipEntry {
  dataKey?: string | number;
  value?: string | number;
  color?: string;
}

interface LegendEntry {
  dataKey?: string | number;
  value?: string;
  color?: string;
}

/**
 * One line per product, indexed to each product's own starting month (Mar = 100).
 * Products span wildly different native units (queries/mo vs. destinations vs. records
 * matched/mo) — plotting raw volumes on one linear axis would flatten the small-volume
 * lines to invisible. Indexing puts every line's *shape* on a shared, comparable scale;
 * the numeric table below keeps the actual per-product volumes.
 */
function pivot(products: ProductTrend[]) {
  if (!products.length) return [];
  return products[0].series.map((point, i) => {
    const row: Record<string, string | number> = { month: point.month };
    products.forEach((p) => {
      const base = p.series[0].value;
      row[p.productId] = base ? Math.round((p.series[i].value / base) * 100) : 0;
    });
    return row;
  });
}

export function ProductTrendChart({
  products,
  active,
  onActiveChange,
}: {
  products: ProductTrend[];
  /** Selected product id, shared with the surrounding page so the same product highlights everywhere. */
  active: string | null;
  onActiveChange: (id: string | null) => void;
}) {
  const data = pivot(products);

  // Draw the isolated (active) product last so its line/fill sits on top of the dimmed ones.
  const ordered = active ? [...products.filter((p) => p.productId !== active), ...products.filter((p) => p.productId === active)] : products;

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <defs>
            {products.map((p) => (
              <linearGradient key={p.productId} id={`trend-fill-${p.productId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" style={{ stopColor: productColor(p.productId), stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: productColor(p.productId), stopOpacity: 0 }} />
              </linearGradient>
            ))}
            <linearGradient id="trend-fill-dim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--muted-foreground)', stopOpacity: 0.12 }} />
              <stop offset="100%" style={{ stopColor: 'var(--muted-foreground)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickFormatter={(v: number) => `${v}%`}
          />
          <ReferenceLine y={100} stroke="var(--muted-foreground)" strokeDasharray="3 3" />
          <Tooltip
            cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
            content={({ active: hovering, label, payload }: { active?: boolean; label?: string | number; payload?: TooltipEntry[] }) => {
              if (!hovering || !payload?.length) return null;
              const rows = (active ? payload.filter((entry) => entry.dataKey === active) : payload).map((entry) => {
                const product = products.find((p) => p.productId === entry.dataKey);
                return {
                  key: String(entry.dataKey),
                  name: product?.name ?? String(entry.dataKey),
                  value: `${entry.value}% of Mar`,
                  color: String(entry.color),
                };
              });
              return <ChartTooltipCard heading={String(label)} rows={rows} />;
            }}
          />
          <Legend
            iconType="plainline"
            wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)', cursor: 'pointer' }}
            onClick={(entry: LegendEntry) => onActiveChange(active === entry.dataKey ? null : ((entry.dataKey as string) ?? null))}
            formatter={(value: string, entry: LegendEntry) => {
              const product = products.find((p) => p.productId === entry.dataKey);
              const dim = active !== null && active !== entry.dataKey;
              return <span style={{ opacity: dim ? 0.35 : 1 }}>{product?.name ?? value}</span>;
            }}
          />
          {ordered.map((p) => {
            const dim = active !== null && active !== p.productId;
            const color = dim ? 'var(--muted-foreground)' : productColor(p.productId);
            const isolated = active === p.productId;
            return (
              <Area
                key={p.productId}
                type="monotone"
                dataKey={p.productId}
                name={p.name}
                stroke={color}
                strokeWidth={dim ? 1.5 : 2.75}
                strokeOpacity={dim ? 0.35 : 1}
                fill={dim ? 'url(#trend-fill-dim)' : `url(#trend-fill-${p.productId})`}
                dot={{ r: dim ? 0 : 4, strokeWidth: 2, stroke: 'var(--card)', fill: color }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--card)' }}
                isAnimationActive={false}
                style={isolated ? { filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 2px ${color})` } : undefined}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
