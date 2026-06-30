/*
Purpose: Shows chronological experience or education entries on a vertical timeline.
Props summary: title, entries, className.
Usage example: <Timeline title="Berufserfahrung" entries={timelineEntries} />
*/
import { CalendarRange, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import type { TimelineProps } from '@/types/cv.types';

/**
 * Renders a vertical timeline with structured date and tag metadata.
 */
export function Timeline({ title, entries, className = '' }: TimelineProps) {
  return (
    <section className={`space-y-5 ${className}`}>
      <h3 className="font-display text-xl font-semibold text-apptext">{title}</h3>
      <div className="space-y-6 border-l border-border pl-5">
        {entries.map((entry) => (
          <article
            key={`${entry.title}-${entry.start}-${entry.end}`}
            className="relative space-y-3"
          >
            <span className="absolute -left-[1.7rem] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-bg" />
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-apptext">{entry.title}</h4>
              <p className="text-sm font-medium text-primary">{entry.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarRange className="h-3.5 w-3.5" />
                {entry.start} - {entry.end}
              </span>
              {entry.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {entry.location}
                </span>
              ) : null}
            </div>
            {entry.description ? (
              <p className="text-sm leading-7 text-muted">{entry.description}</p>
            ) : null}
            {entry.tags ? (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} label={tag} />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
