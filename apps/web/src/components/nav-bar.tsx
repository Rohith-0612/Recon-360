'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Moon, Search, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { useDarkMode } from '@/lib/use-dark-mode';
import { Input } from '@/components/ui/input';

const TABS = [
  { href: '/', label: 'Portfolio' },
  { href: '/trends', label: 'Usage Trends' },
  { href: '/upsell', label: 'Upsell Engine' },
  { href: '/margin', label: 'Margin' },
  { href: '/migration', label: 'Migration' },
  { href: '/alerts', label: 'Alerts' },
  { href: '/value', label: 'Value Report' },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { dark, toggle } = useDarkMode();
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
    <div className="flex flex-wrap items-center gap-3.5 py-3">
      <Link href="/" className="flex items-center gap-2 font-bold text-[17px] tracking-tight shrink-0">
        <span className="grid h-6.5 w-6.5 place-items-center rounded-[7px] bg-gradient-to-br from-brand-blue to-brand-purple text-[13px] font-extrabold text-white">
          R360
        </span>
        Recon&nbsp;360{' '}
        <span className="rounded-md bg-brand-blue/10 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-brand-blue">
          HEALTHCARD+
        </span>
      </Link>

      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Ask: which clients are billed for products they don't use?"
          className="pl-9"
          value={query}
          disabled={searching}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="flex gap-1.5">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'rounded-[9px] border px-3 py-2 text-xs font-semibold whitespace-nowrap',
                active
                  ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <button
        aria-label="Toggle theme"
        onClick={toggle}
        className="rounded-[9px] border border-border bg-card p-2 text-muted-foreground hover:text-foreground"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <span className="rounded-md border border-dashed border-border px-2 py-1 font-mono text-[9px] text-muted-foreground">
        DEMO · illustrative data
      </span>
    </div>
  );
}
