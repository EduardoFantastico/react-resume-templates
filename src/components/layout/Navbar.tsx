/*
Purpose: Desktop navigation tabs for switching between the CV layout variants.
Props summary: navItems.
Usage example: <Navbar navItems={items} />
*/
import { NavLink } from 'react-router-dom';

import type { NavbarProps } from '@/types/cv.types';

/**
 * Renders route tabs with a distinct active state.
 */
export function Navbar({ navItems }: NavbarProps) {
  return (
    <nav aria-label="CV Variants" className="hidden items-center gap-2 lg:flex">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            [
              'rounded-full px-4 py-2 text-sm font-medium transition-transform duration-150 focus-ring',
              isActive
                ? 'bg-primary text-white shadow-glow'
                : 'bg-surface text-apptext hover:-translate-y-0.5 hover:border-primary',
            ].join(' ')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
