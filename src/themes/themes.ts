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
];

export const THEME_STORAGE_KEY = 'react-resume-templates.theme';
