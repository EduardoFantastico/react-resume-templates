/*
Purpose: Summarizes direct contact paths and repeats the social links in one place.
Props summary: none; reads directly from cvData.
Usage example: <ContactSection />
*/
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

import { SocialLinks } from '@/components/ui/SocialLinks';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cvData } from '@/data/cv-data';

const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Renders the contact summary and action links.
 */
export function ContactSection() {
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
        eyebrow="Kontakt"
        title="Direkt erreichbar"
        description="Die wichtigsten Kontaktdaten sind kompakt und ohne Umwege auffindbar."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${cvData.personal.email}`}
          className="rounded-2xl border border-border bg-bg p-4 transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary focus-ring"
        >
          <Mail className="h-5 w-5 text-primary" />
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">E-Mail</p>
          <p className="mt-2 break-all text-sm font-medium text-apptext">{cvData.personal.email}</p>
        </a>
        <a
          href={`tel:${cvData.personal.phone}`}
          className="rounded-2xl border border-border bg-bg p-4 transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary focus-ring"
        >
          <Phone className="h-5 w-5 text-primary" />
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">Telefon</p>
          <p className="mt-2 text-sm font-medium text-apptext">{cvData.personal.phone}</p>
        </a>
        <div className="rounded-2xl border border-border bg-bg p-4">
          <MapPin className="h-5 w-5 text-primary" />
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">Ort</p>
          <p className="mt-2 text-sm font-medium text-apptext">{cvData.personal.location}</p>
        </div>
      </div>
      <SocialLinks social={cvData.personal.social} />
    </motion.section>
  );
}
