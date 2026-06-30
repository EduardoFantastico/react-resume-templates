/*
Purpose: Displays the profile avatar with an SVG initials fallback when no image is available.
Props summary: name, avatar URL, size, className.
Usage example: <Avatar name="Max Mustermann" avatar="/avatar.jpg" />
*/
import { useMemo, useState } from 'react';

import type { AvatarProps } from '@/types/cv.types';

const AVATAR_SIZES = {
  sm: 'h-16 w-16 text-lg',
  md: 'h-24 w-24 text-2xl',
  lg: 'h-32 w-32 text-3xl',
} as const;

/**
 * Extracts initials from a full name.
 */
function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Renders the user's avatar or a polished initials-based fallback.
 */
export function Avatar({ name, avatar, size = 'md', className = '' }: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = useMemo(() => getInitials(name), [name]);
  const shouldShowFallback = !avatar || hasImageError;
  const sizeClassName = AVATAR_SIZES[size];

  if (shouldShowFallback) {
    return (
      <div
        className={`flex items-center justify-center rounded-3xl bg-primary text-white shadow-glow ${sizeClassName} ${className}`}
        aria-label={name}
      >
        <svg viewBox="0 0 128 128" className="h-full w-full" role="img" aria-hidden="true">
          <circle cx="64" cy="64" r="64" fill="currentColor" opacity="0.12" />
          <text
            x="64"
            y="74"
            textAnchor="middle"
            className="fill-current font-display font-semibold"
            fontSize="44"
          >
            {initials}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      className={`rounded-3xl object-cover shadow-soft ${sizeClassName} ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setHasImageError(true)}
    />
  );
}
