import { BRAND, scoreToColor } from '@/lib/presentation';
import { cn } from '@/lib/utils';

export function ScoreChip({ score }: { score: number }) {
  const color = scoreToColor(score);
  return (
    <span
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-bold',
        BRAND[color],
      )}
    >
      {score}
    </span>
  );
}
