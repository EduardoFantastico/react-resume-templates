import type { ThemeName } from '@/types/cv.types';

export interface ThemeDefinition {
  name: ThemeName;
  label: string;
  swatch: string;
  description: string;
}

export const DEFAULT_THEME: ThemeName = 'ink';

export const THEME_DEFINITIONS: ThemeDefinition[] = [
  {
    name: 'ink',
    label: 'Ink',
    swatch: '#111827',
    description: 'Zeitloses Graphit-Schwarz mit klarem Blauakzent.',
  },
  {
    name: 'forest',
    label: 'Forest',
    swatch: '#166534',
    description: 'Tiefes Grün mit ruhiger, organischer Wirkung.',
  },
  {
    name: 'ocean',
    label: 'Ocean',
    swatch: '#0f5ea8',
    description: 'Klar, technisch und mit lebendiger Tiefe.',
  },
  {
    name: 'plum',
    label: 'Plum',
    swatch: '#7c3aed',
    description: 'Satt, modern und mit etwas kreativer Kante.',
  },
  {
    name: 'ember',
    label: 'Ember',
    swatch: '#c2410c',
    description: 'Warme Glut mit starkem visuellen Fokus.',
  },
  {
    name: 'sand',
    label: 'Sand',
    swatch: '#b45309',
    description: 'Heller, warmer Ton mit editorialem Charakter.',
  },
  {
    name: 'bubblegum',
    label: 'Bubblegum',
    swatch: '#db2777',
    description: 'All-in auf Pink – verspielt, mutig und knallig.',
  },
  {
    name: 'neon',
    label: 'Neon',
    swatch: '#a855f7',
    description: 'Elektrisches Lila trifft Cyan – Cyberpunk-Vibe.',
  },
  {
    name: 'rosegold',
    label: 'Rosegold',
    swatch: '#b76e79',
    description: 'Edles Roségold mit warmem, eleganten Glanz.',
  },
  {
    name: 'mint',
    label: 'Mint',
    swatch: '#0d9488',
    description: 'Frisches Minzgrün mit klarer, luftiger Wirkung.',
  },
  {
    name: 'lavender',
    label: 'Lavender',
    swatch: '#8b5cf6',
    description: 'Sanftes Fliederviolett mit ruhig-kreativer Note.',
  },
  {
    name: 'gold',
    label: 'Gold',
    swatch: '#b8860b',
    description: 'Schwarz-Gold-Luxus mit starkem Statement.',
  },
];

export const THEME_STORAGE_KEY = 'react-resume-templates.theme';
