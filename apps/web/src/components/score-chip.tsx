import { BRAND, scoreToColor } from '@/lib/presentation';
import { cn } from '@/lib/utils';

export function ScoreChip({ score }: { score: number }) {
  const color = scoreToColor(score);
  return (
    <span
      className={cn(
        'inline-flex h-9.5 w-9.5 items-center justify-center rounded-[10px] text-sm font-bold',
        BRAND[color],
      )}
    >
      {score}
    </span>
  );
}
