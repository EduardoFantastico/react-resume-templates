import type { ReactNode } from 'react';

export const LAYOUT_VARIANTS = ['minimal', 'sidebar', 'creative', 'puzzle', 'terminal'] as const;
export type LayoutVariant = (typeof LAYOUT_VARIANTS)[number];

export const THEME_NAMES = [
  'ink',
  'forest',
  'ocean',
  'plum',
  'ember',
  'sand',
  'bubblegum',
  'neon',
  'rosegold',
  'mint',
  'lavender',
  'gold',
] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export type SkillCategory = 'language' | 'framework' | 'tool' | 'platform' | 'other';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  xing?: string;
  x?: string;
  website?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  avatar?: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  logoText?: string;
  social: SocialLinks;
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  tags: string[];
  location?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: number;
  url?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface CVData {
  personal: PersonalInfo;
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}

export interface LayoutNavItem {
  label: string;
  path: `/${LayoutVariant}` | '/';
}

export interface AvatarProps {
  name: string;
  avatar?: string;
  size?: AvatarSize;
  className?: string;
}

export interface BadgeProps {
  label: string;
  emphasis?: 'default' | 'accent' | 'glass';
  className?: string;
}

export interface SocialLinksProps {
  social: SocialLinks;
  className?: string;
}

export interface HeaderProps {
  navItems: LayoutNavItem[];
}

export interface NavbarProps {
  navItems: LayoutNavItem[];
}

export interface HamburgerMenuProps {
  navItems: LayoutNavItem[];
}

export interface BaseLayoutProps {
  variant: LayoutVariant;
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
}
