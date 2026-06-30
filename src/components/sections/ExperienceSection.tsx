/*
Purpose: Displays work history and education in paired timeline blocks.
Props summary: none; reads directly from cvData.
Usage example: <ExperienceSection />
*/
import { motion, useReducedMotion } from 'framer-motion';

import { Timeline } from '@/components/ui/Timeline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cvData } from '@/data/cv-data';
import type { TimelineEntry } from '@/types/cv.types';

const VIEWPORT = { once: true, amount: 0.2 } as const;

function mapExperienceEntries() {
  return cvData.experience.map<TimelineEntry>((item) => ({
    title: item.role,
    subtitle: item.company,
    start: item.start,
    end: item.end,
    description: item.description,
    tags: item.tags,
    location: item.location,
  }));
}

function mapEducationEntries() {
  return cvData.education.map<TimelineEntry>((item) => ({
    title: item.degree,
    subtitle: item.institution,
    start: item.start,
    end: item.end,
    description: item.description,
    location: item.location,
  }));
}

/**
 * Renders career and education history with consistent timeline styling.
 */
export function ExperienceSection() {
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
        eyebrow="Werdegang"
        title="Erfahrung & Ausbildung"
        description="Bisherige Praxisstationen und die laufende Ausbildung werden im selben Kontext sichtbar."
      />
      <div className="grid gap-8 xl:grid-cols-2">
        <Timeline title="Berufserfahrung" entries={mapExperienceEntries()} />
        <Timeline title="Ausbildung" entries={mapEducationEntries()} />
      </div>
    </motion.section>
  );
}
