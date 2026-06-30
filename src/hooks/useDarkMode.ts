import { useEffect, useState } from 'react';

/**
 * Persists dark mode preference and mirrors it on the <html> element.
 *
 * @returns Dark mode state plus a toggler and setter.
 */
export function useDarkMode() {
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedMode = window.localStorage.getItem('react-resume-templates.dark-mode');
    if (storedMode !== null) {
      return storedMode === 'true';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
    window.localStorage.setItem('react-resume-templates.dark-mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkModeState((previous) => !previous);
  };

  return {
    darkMode,
    setDarkMode: setDarkModeState,
    toggleDarkMode,
  };
}
