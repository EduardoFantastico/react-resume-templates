/*
Purpose: Shows highlighted projects in a responsive grid of showcase cards.
Props summary: none; reads directly from cvData.
Usage example: <ProjectsSection />
*/
import { motion, useReducedMotion } from 'framer-motion';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cvData } from '@/data/cv-data';

const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Renders the project showcase grid with featured work highlighted.
 */
export function ProjectsSection() {
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
        eyebrow="Arbeiten"
        title="Projekte"
        description="Ausgewählte Projekte als Referenz für Umsetzung, Struktur und visuelle Qualität."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cvData.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </motion.section>
  );
}
