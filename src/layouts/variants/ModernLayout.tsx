/*
Purpose: Bento-grid resume with a full-bleed gradient hero, glassmorphism cards, and big stat numbers.
Props summary: none; renders the shared CV content.
Usage example: default export used by the modern route.
*/
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, Mail, MapPin, Sparkles } from 'lucide-react';

import BaseLayout from '@/layouts/BaseLayout';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { cvData } from '@/data/cv-data';
import type { SkillCategory } from '@/types/cv.types';

const VIEWPORT = { once: true, amount: 0.25 } as const;

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: 'Sprachen',
  framework: 'Frameworks',
  tool: 'Tools',
  platform: 'Plattformen',
  other: 'Sonstiges',
};

function parseStartYear(value: string) {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

/**
 * Renders the modern variant: gradient hero, irregular bento grid, glass cards, stat numbers.
 */
export default function ModernLayout() {
  const shouldReduceMotion = useReducedMotion();
  const { personal, skills, experience, education, projects, certifications, languages } =
    cvData;

  const motionProps = shouldReduceMotion
    ? { initial: false, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
      };

  const groupedSkills = skills.reduce<Record<SkillCategory, typeof skills>>(
    (groups, skill) => {
      groups[skill.category].push(skill);
      return groups;
    },
    { language: [], framework: [], tool: [], platform: [], other: [] },
  );

  const startYears = experience.map((item) => parseStartYear(item.start)).filter(
    (year): year is number => year !== null,
  );
  const earliestYear = startYears.length ? Math.min(...startYears) : new Date().getFullYear();
  const yearsExperience = Math.max(1, new Date().getFullYear() - earliestYear);

  const stats = [
    { label: 'Projekte', value: projects.length },
    { label: 'Jahre Erfahrung', value: yearsExperience },
    { label: 'Skills', value: skills.length },
  ];

  return (
    <BaseLayout variant="modern" fullBleed>
      <div className="relative isolate overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
          style={{ background: 'var(--color-primary)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-40 h-[22rem] w-[22rem] rounded-full opacity-30 blur-3xl"
          style={{ background: 'var(--color-accent)' }}
        />

        <section
          className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-1"
          style={{
            background:
              'linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-accent) 70%, var(--color-primary)) 50%, var(--color-accent) 100%)',
          }}
        >
          <div className="relative overflow-hidden rounded-[2.4rem] bg-slate-950/55 px-6 py-16 sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
            <motion.div {...motionProps} viewport={VIEWPORT} className="relative mx-auto max-w-3xl">
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-glow backdrop-blur-xl sm:p-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar name={personal.name} avatar={personal.avatar} size="md" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    <Sparkles className="h-4 w-4" />
                    Portfolio / CV
                  </div>
                </div>
                <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {personal.name}
                </h1>
                <p className="mt-3 text-lg font-medium text-white/85 sm:text-xl">{personal.title}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{personal.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${personal.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
                  >
                    Kontakt <Mail className="h-4 w-4" />
                  </a>
                  <SocialLinks
                    social={personal.social}
                    className="[&_a]:border-white/25 [&_a]:bg-white/10 [&_a]:text-white [&_a]:hover:border-white/50"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-white backdrop-blur-xl sm:p-6"
                  >
                    <p className="font-display text-3xl font-bold sm:text-5xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="relative z-10 mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-12">
          <motion.section
            {...motionProps}
            viewport={VIEWPORT}
            className="space-y-4 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl md:col-span-5 md:row-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Profil</p>
            <h2 className="font-display text-2xl font-semibold text-apptext">Über mich</h2>
            <p className="text-sm leading-7 text-muted">{personal.bio}</p>
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-primary" />
              {personal.location}
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Zertifikate
              </p>
              {certifications.map((certification) => (
                <p key={certification.name} className="text-sm text-muted">
                  <span className="font-medium text-apptext">{certification.name}</span> ·{' '}
                  {certification.issuer} · {certification.year}
                </p>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Sprachen
              </p>
              {languages.map((language) => (
                <div key={language.language} className="flex justify-between text-sm text-muted">
                  <span>{language.language}</span>
                  <span className="font-medium text-apptext">{language.level}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            viewport={VIEWPORT}
            className="space-y-4 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl md:col-span-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Kompetenzen
            </p>
            <h2 className="font-display text-2xl font-semibold text-apptext">Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(groupedSkills)
                .filter(([, entries]) => entries.length > 0)
                .map(([category, entries]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {CATEGORY_LABELS[category as SkillCategory]}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {entries.map((skill) => (
                        <Badge key={skill.name} label={skill.name} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            viewport={VIEWPORT}
            className="space-y-5 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl md:col-span-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Werdegang
            </p>
            <h2 className="font-display text-2xl font-semibold text-apptext">Erfahrung</h2>
            <div className="space-y-5">
              {experience.map((item) => (
                <div key={`${item.company}-${item.start}`} className="rounded-2xl bg-bg p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-apptext">{item.role}</h3>
                    <span className="text-xs text-muted">
                      {item.start} – {item.end}
                    </span>
                  </div>
                  <p className="text-sm text-primary">{item.company}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            viewport={VIEWPORT}
            className="space-y-5 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl md:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Ausbildung
            </p>
            <h2 className="font-display text-2xl font-semibold text-apptext">Education</h2>
            <div className="space-y-4">
              {education.map((item) => (
                <div key={`${item.institution}-${item.start}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-apptext">{item.degree}</h3>
                    <span className="text-xs text-muted">
                      {item.start} – {item.end}
                    </span>
                  </div>
                  <p className="text-sm text-primary">{item.institution}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            {...motionProps}
            viewport={VIEWPORT}
            className="space-y-5 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl md:col-span-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Arbeiten</p>
            <h2 className="font-display text-2xl font-semibold text-apptext">Projekte</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-primary via-primaryLight to-accent p-5 text-white shadow-soft transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative z-10 flex h-full flex-col justify-between gap-6 rounded-xl bg-black/20 p-4 backdrop-blur-sm">
                    <div>
                      {project.featured ? (
                        <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                          Featured
                        </span>
                      ) : null}
                      <h3 className="mt-3 font-display text-xl font-semibold">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/80">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                        >
                          Live <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                        >
                          Code <Github className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </BaseLayout>
  );
}
