import { useEffect, useState } from 'react';

import { DEFAULT_THEME, THEME_DEFINITIONS, THEME_STORAGE_KEY } from '@/themes/themes';
import type { ThemeName } from '@/types/cv.types';

/**
 * Synchronizes the selected color theme with localStorage and the root <html> element.
 *
 * @returns The active theme plus setters and the available theme definitions.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_THEME;
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    return storedTheme ?? DEFAULT_THEME;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    themes: THEME_DEFINITIONS,
    setTheme: setThemeState,
  };
}
