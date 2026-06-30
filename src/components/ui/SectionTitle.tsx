/*
Purpose: Standardizes section headings, subtitles, and supporting copy.
Props summary: eyebrow, title, description, align, className.
Usage example: <SectionTitle eyebrow="Profil" title="Über mich" />
*/
import type { SectionTitleProps } from '@/types/cv.types';

/**
 * Renders a reusable section title block.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`space-y-2 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-apptext sm:text-3xl">
        {title}
      </h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-muted">{description}</p> : null}
    </div>
  );
}
