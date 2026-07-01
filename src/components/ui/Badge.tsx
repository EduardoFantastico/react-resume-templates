/*
Purpose: Renders compact skill and tag badges across the layouts.
Props summary: label, emphasis, className.
Usage example: <Badge label="React" />
*/
import type { BadgeProps } from '@/types/cv.types';

/**
 * Displays a single badge with theme-aware styling.
 */
export function Badge({ label, emphasis = 'default', className = '' }: BadgeProps) {
  const toneClassName =
    emphasis === 'accent'
      ? 'bg-primary text-white border-primary shadow-glow'
      : emphasis === 'glass'
        ? 'bg-white/10 text-white border-white/25 backdrop-blur-md'
        : 'bg-surface text-apptext border-border shadow-sm';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold tracking-wide ${toneClassName} ${className}`}
    >
      {label}
    </span>
  );
}
