'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, FileText, LayoutGrid, Moon, Percent, Shuffle, Sun, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDarkMode } from '@/lib/use-dark-mode';

export const TABS = [
  { href: '/', label: 'Client Radar', icon: LayoutGrid },
  { href: '/upsell', label: 'Upsell Engine', icon: TrendingUp },
  { href: '/margin', label: 'Margin', icon: Percent },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/value', label: 'Value Report', icon: FileText },
  { href: '/migration', label: 'Migration Insight', icon: Shuffle },
];

export function NavBar() {
  const pathname = usePathname();
  const { dark, toggle } = useDarkMode();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 self-start flex-col bg-[#0a0d0a] print:hidden">
      <div className="px-4 pt-5 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg border border-brand-green/40 bg-white/[0.03] px-3 py-2.5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-brand-green/50">
            <Image src="/recon_360_icon_only.svg" alt="Recon 360" width={18} height={18} />
          </span>
          <div className="leading-tight">
            <div className="text-[17px] font-bold text-white">
              Recon <span className="text-brand-green">360</span>
            </div>
            <div className="text-[9px] font-semibold tracking-wider text-white/40 uppercase">By LiveRamp</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {TABS.map((tab) => {
          const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
                active ? 'bg-brand-green/15 text-brand-green' : 'text-white/65 hover:bg-white/5 hover:text-white',
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <button
          aria-label="Toggle theme"
          onClick={toggle}
          className={cn(
            'mb-3 flex h-5 w-9 items-center rounded-full border border-white/15 px-0.5 transition-colors',
            dark ? 'justify-end bg-brand-green/40' : 'justify-start bg-white/10',
          )}
        >
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-white">
            {dark ? <Moon className="h-2.5 w-2.5 text-[#0a0d0a]" /> : <Sun className="h-2.5 w-2.5 text-[#0a0d0a]" />}
          </span>
        </button>
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-white">
            DR
          </span>
          <div className="leading-tight">
            <div className="text-[12px] font-semibold text-white">Dana Ruiz</div>
            <div className="text-[10px] text-white/45">CS Ops</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
