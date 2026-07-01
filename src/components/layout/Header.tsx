/*
Purpose: Top-level application header with logo, desktop navigation, and settings access.
Props summary: navItems.
Usage example: <Header navItems={items} />
*/
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { HamburgerMenu } from '@/components/layout/HamburgerMenu';
import { Navbar } from '@/components/layout/Navbar';
import { cvData } from '@/data/cv-data';
import type { HeaderProps } from '@/types/cv.types';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Renders the persistent header chrome for all layout variants.
 */
export function Header({ navItems }: HeaderProps) {
  const logoText = cvData.personal.logoText ?? getInitials(cvData.personal.name);

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 focus-ring">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-apptext">{logoText}</p>
            <p className="text-xs text-muted">CV Templates</p>
          </div>
        </Link>

        <Navbar navItems={navItems} />

        <div className="flex items-center gap-2">
          <HamburgerMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
