/*
Purpose: Visualizes technical skills as grouped text badges with category labels.
Props summary: none; reads directly from cvData.
Usage example: <SkillsSection />
*/
import { motion, useReducedMotion } from 'framer-motion';

import { Badge } from '@/components/ui/Badge';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cvData } from '@/data/cv-data';
import type { SkillCategory } from '@/types/cv.types';

const VIEWPORT = { once: true, amount: 0.2 } as const;
const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: 'Sprachen',
  framework: 'Frameworks',
  tool: 'Tools',
  platform: 'Plattformen',
  other: 'Sonstiges',
};

/**
 * Groups skills by category for a readable skill matrix.
 */
export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const groupedSkills = cvData.skills.reduce<Record<SkillCategory, typeof cvData.skills>>(
    (groups, skill) => {
      groups[skill.category].push(skill);
      return groups;
    },
    {
      language: [],
      framework: [],
      tool: [],
      platform: [],
      other: [],
    },
  );

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
        eyebrow="Kompetenzen"
        title="Skills"
        description="Technische Schwerpunkte werden hier bewusst nur genannt, statt mit ungenauen Prozentwerten bewertet."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="space-y-4 rounded-2xl border border-border bg-bg p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              {CATEGORY_LABELS[category as SkillCategory]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.name} label={skill.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
