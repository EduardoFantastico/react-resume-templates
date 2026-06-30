/*
Purpose: Presents a concise profile summary, certifications, and language overview.
Props summary: none; reads directly from cvData.
Usage example: <AboutSection />
*/
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Languages, MapPin } from 'lucide-react';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { cvData } from '@/data/cv-data';

const VIEWPORT = { once: true, amount: 0.25 } as const;

type AboutSectionLayout = 'grid' | 'stacked';

interface AboutSectionProps {
  layout?: AboutSectionLayout;
}

/**
 * Renders the profile summary, location, certifications, and language list.
 */
export function AboutSection({ layout = 'grid' }: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? { initial: false, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
      };

  return (
    <motion.section
      {...motionProps}
      viewport={VIEWPORT}
      className="space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-soft"
    >
      <SectionTitle
        eyebrow="Profil"
        title="Über mich"
        description="Kurzprofil, Standort und ergänzende Qualifikationen auf einen Blick."
      />
      <div
        className={layout === 'stacked' ? 'grid gap-4' : 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'}
      >
        <div className="min-w-0 rounded-2xl border border-border bg-bg p-4">
          <div className="flex items-center gap-3 text-sm font-medium text-apptext">
            <MapPin className="h-4 w-4 text-primary" />
            Standort
          </div>
          <div className="mt-3 rounded-2xl border border-border bg-surface px-3 py-2 text-xs leading-snug text-muted">
            <span className="block break-words font-medium text-apptext">
              {cvData.personal.location}
            </span>
            <span className="block break-words">Deutschland</span>
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border border-border bg-bg p-4">
          <div className="flex items-center gap-3 text-sm font-medium text-apptext">
            <Award className="h-4 w-4 text-primary" />
            Zertifikate
          </div>
          <div className="mt-3 grid gap-2">
            {cvData.certifications.map((certification) => (
              <div
                key={certification.name}
                className="min-w-0 rounded-2xl border border-border bg-surface px-3 py-2 text-xs leading-snug text-muted"
              >
                <span className="block break-words font-medium text-apptext">
                  {certification.name}
                </span>
                <span className="block break-words">
                  {certification.issuer} · {certification.year}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border border-border bg-bg p-4">
          <div className="flex items-center gap-3 text-sm font-medium text-apptext">
            <Languages className="h-4 w-4 text-primary" />
            Sprachen
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {cvData.languages.map((language) => (
              <li
                key={language.language}
                className="grid gap-1 rounded-2xl border border-border bg-surface px-3 py-2"
              >
                <span className="min-w-0 break-words font-medium text-apptext">
                  {language.language}
                </span>
                <span className="min-w-0 break-words text-xs leading-snug text-muted">
                  {language.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
