/*
Purpose: Introduces the CV owner with headline, summary, and primary actions.
Props summary: none; reads directly from cvData.
Usage example: <HeroSection />
*/
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { cvData } from '@/data/cv-data';

const VIEWPORT = { once: true, amount: 0.35 } as const;
const DURATION = 0.35;

/**
 * Renders the hero section with subtle scroll animation and primary CTAs.
 */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? { initial: false, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: DURATION },
      };

  return (
    <motion.section {...motionProps} viewport={VIEWPORT} className="space-y-7">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
        <Sparkles className="h-4 w-4" />
        Portfolio / CV Template
      </div>
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-apptext sm:text-5xl lg:text-6xl">
          {cvData.personal.name}
        </h1>
        <p className="max-w-2xl text-lg font-medium text-primary sm:text-xl">
          {cvData.personal.title}
        </p>
        <p className="max-w-3xl text-base leading-8 text-muted">{cvData.personal.bio}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${cvData.personal.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
        >
          Kontakt <Mail className="h-4 w-4" />
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        {['React', 'TypeScript', 'Tailwind', 'Azubi'].map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
      <SocialLinks social={cvData.personal.social} />
    </motion.section>
  );
}
