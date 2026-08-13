'use client';

import { usePortfolio } from '@/lib/queries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClientOption {
  id: string;
  name: string;
}

export function ClientSelect({
  value,
  onChange,
  clients: clientsProp,
}: {
  value: string;
  onChange: (id: string) => void;
  /** Restrict the options to a specific list instead of the full portfolio. */
  clients?: ClientOption[];
}) {
  const { data } = usePortfolio();
  const clients = clientsProp
    ? [...clientsProp].sort((a, b) => a.name.localeCompare(b.name))
    : [...(data?.clients ?? [])].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Select value={value} onValueChange={(v) => v && onChange(v as string)}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select client…">
          {(id: string | null) => clients.find((c) => c.id === id)?.name ?? 'Select client…'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {clients.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
