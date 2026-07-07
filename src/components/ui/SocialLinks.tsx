/*
Purpose: Presents the public profile links with clear external-link affordances.
Props summary: social links object and optional className.
Usage example: <SocialLinks social={cvData.personal.social} />
*/
import { Github, Linkedin, MessageSquareMore, Share2 } from 'lucide-react';

import type { SocialLinksProps } from '@/types/cv.types';

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  xing: Share2,
  x: MessageSquareMore,
} as const;

/**
 * Renders a list of social/profile links when they are present.
 */
export function SocialLinks({ social, className = '' }: SocialLinksProps) {
  const entries = Object.entries(social).filter(
    (entry): entry is [keyof typeof ICON_MAP, string] => {
      const [, url] = entry;
      return Boolean(url);
    },
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {entries.map(([key, url]) => {
        const Icon = ICON_MAP[key];

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm text-apptext transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary focus-ring"
          >
            <Icon className="h-4 w-4" />
            <span className="capitalize">{key}</span>
          </a>
        );
      })}
    </div>
  );
}
