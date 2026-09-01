'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '@/lib/api';
import { TABS } from '@/components/nav-bar';

function titleFor(pathname: string) {
  const exact = TABS.find((tab) => tab.href === pathname);
  if (exact) return exact.label;
  if (pathname.startsWith('/clients')) return 'Client Radar';
  const prefixed = TABS.find((tab) => tab.href !== '/' && pathname.startsWith(tab.href));
  return prefixed?.label ?? 'Recon 360';
}

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || !query.trim()) return;
    setSearching(true);
    try {
      const { clientId } = await api.search(query);
      if (clientId) router.push(`/clients/${clientId}`);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3 print:hidden">
      <span className="text-[13px] font-semibold text-foreground">{titleFor(pathname)}</span>
      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative min-w-[240px] max-w-[480px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Ask: which clients are billed for products they don't use?"
            className="w-full rounded-md border border-border bg-background py-1.5 pl-9 pr-3 text-[13px] outline-none focus:border-brand-blue"
            value={query}
            disabled={searching}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <span className="rounded-md border border-dashed border-border px-2 py-1 font-mono text-[9px] text-muted-foreground">
          DEMO · illustrative data
        </span>
      </div>
    </div>
  );
}
