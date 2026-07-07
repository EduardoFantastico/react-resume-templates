/*
Purpose: Hosts the mobile slide-in settings panel with theme and dark mode controls.
Props summary: navItems.
Usage example: <HamburgerMenu navItems={items} />
*/
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, MoonStar, SunMedium, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import { THEME_DEFINITIONS } from '@/themes/themes';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useTheme } from '@/hooks/useTheme';
import type { HamburgerMenuProps } from '@/types/cv.types';

const PANEL_TRANSITION = { duration: 0.35, ease: 'easeOut' } as const;

/**
 * Renders the slide-in settings drawer and its trigger button.
 */
export function HamburgerMenu({ navItems }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { theme, setTheme } = useTheme();
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const panelMotion = shouldReduceMotion
    ? { initial: false, animate: { x: 0 }, exit: { x: 0 } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } };

  const panel = (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Overlay schließen"
            className="fixed inset-0 z-40 cursor-default bg-slate-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={PANEL_TRANSITION}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            {...panelMotion}
            transition={PANEL_TRANSITION}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col gap-6 overflow-y-auto border-l border-border bg-bg p-6 shadow-soft"
            role="dialog"
            aria-modal="true"
            aria-label="Einstellungen"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Einstellungen
                </p>
                <p className="mt-1 text-sm text-muted">Design, Modus und Layout wechseln</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-apptext focus-ring"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <section className="space-y-4 rounded-3xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-apptext">Dark Mode</p>
                  <p className="text-xs text-muted">Bevorzugt dunkle Oberflächen.</p>
                </div>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-150 focus-ring ${darkMode ? 'bg-primary text-white' : 'bg-bg text-apptext'}`}
                  aria-pressed={darkMode}
                  aria-label="Dark Mode umschalten"
                >
                  {darkMode ? <MoonStar className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
                </button>
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-border bg-surface p-4">
              <div>
                <p className="text-sm font-semibold text-apptext">Farbthema</p>
                <p className="text-xs text-muted">Zwölf kombinierbare Theme-Sets.</p>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                {THEME_DEFINITIONS.map((definition) => {
                  const isActive = definition.name === theme;

                  return (
                    <button
                      key={definition.name}
                      type="button"
                      onClick={() => setTheme(definition.name)}
                      aria-label={definition.label}
                      aria-pressed={isActive}
                      className={`relative h-12 w-12 rounded-full border-2 transition-transform duration-150 focus-ring ${isActive ? 'border-primary scale-105' : 'border-transparent'}`}
                      style={{ backgroundColor: definition.swatch }}
                      title={definition.description}
                    >
                      {isActive ? (
                        <span className="absolute inset-1 rounded-full border border-white/80" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-border bg-surface p-4">
              <p className="text-sm font-semibold text-apptext">Layouts</p>
              <nav className="grid gap-2" aria-label="CV Variants Mobile">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      [
                        'rounded-2xl border px-4 py-3 text-sm font-medium transition-transform duration-150 focus-ring',
                        isActive
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-bg text-apptext hover:border-primary',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </section>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Einstellungen öffnen"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-apptext transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {typeof document !== 'undefined' ? createPortal(panel, document.body) : null}
    </>
  );
}
