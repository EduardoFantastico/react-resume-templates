/*
Purpose: Dense, monochrome, print-style resume laid out like a typeset document.
Props summary: none; renders the shared CV content.
Usage example: default export used by the classic route.
*/
import { useState } from 'react';

import BaseLayout from '@/layouts/BaseLayout';
import { cvData } from '@/data/cv-data';
import type { SkillCategory } from '@/types/cv.types';

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: 'Sprachen',
  framework: 'Frameworks',
  tool: 'Tools',
  platform: 'Plattformen',
  other: 'Sonstiges',
};

const SOCIAL_LABELS: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  xing: 'Xing',
  x: 'X',
  website: 'Web',
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  const { avatar, name } = cvData.personal;

  if (!avatar || failed) {
    return (
      <div className="flex h-28 w-24 shrink-0 items-center justify-center border-2 border-black text-2xl font-bold">
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      className="h-28 w-24 shrink-0 border-2 border-black object-cover grayscale"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Renders the classic variant: serif type, hard rules, no color, no radius.
 */
export default function ClassicLayout() {
  const { personal, skills, experience, education, projects, certifications, languages } =
    cvData;

  const groupedSkills = skills.reduce<Record<SkillCategory, typeof skills>>(
    (groups, skill) => {
      groups[skill.category].push(skill);
      return groups;
    },
    { language: [], framework: [], tool: [], platform: [], other: [] },
  );

  const socialEntries = Object.entries(personal.social).filter(([, url]) => Boolean(url));

  return (
    <BaseLayout variant="classic" className="bg-white font-serif text-black">
      <div className="mx-auto max-w-5xl text-black">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-black pb-6">
          <div className="min-w-0 space-y-2">
            <p className="text-xs uppercase tracking-[0.35em]">Curriculum Vitae</p>
            <h1 className="text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              {personal.name}
            </h1>
            <p className="text-lg italic">{personal.title}</p>
            <p className="text-xs uppercase tracking-wider text-black/80">
              {[personal.email, personal.phone, personal.location].join('  ·  ')}
            </p>
            {socialEntries.length > 0 ? (
              <p className="text-xs uppercase tracking-wider text-black/80">
                {socialEntries
                  .map(([key, url]) => `${SOCIAL_LABELS[key] ?? key}: ${url?.replace(/^https?:\/\//, '')}`)
                  .join('  ·  ')}
              </p>
            ) : null}
          </div>
          <Portrait />
        </header>

        <section className="border-b border-black py-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.35em]">Profil</h2>
          <p className="max-w-3xl text-sm leading-relaxed">{personal.bio}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">
          <div className="space-y-8 border-black py-6 md:border-r md:pr-8">
            <section className="space-y-4">
              <h2 className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.35em]">
                Berufserfahrung
              </h2>
              <div className="space-y-5 divide-y divide-black/30">
                {experience.map((item) => (
                  <article key={`${item.company}-${item.start}`} className="space-y-1.5 pt-4 first:pt-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-bold">{item.role}</h3>
                      <span className="whitespace-nowrap text-xs uppercase tracking-wide">
                        {item.start} – {item.end}
                      </span>
                    </div>
                    <p className="text-sm italic">
                      {item.company}
                      {item.location ? `, ${item.location}` : ''}
                    </p>
                    <p className="text-sm leading-relaxed">{item.description}</p>
                    <p className="text-xs uppercase tracking-wide text-black/70">
                      {item.tags.join(' · ')}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.35em]">
                Ausbildung
              </h2>
              <div className="space-y-5 divide-y divide-black/30">
                {education.map((item) => (
                  <article
                    key={`${item.institution}-${item.start}`}
                    className="space-y-1.5 pt-4 first:pt-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-bold">{item.degree}</h3>
                      <span className="whitespace-nowrap text-xs uppercase tracking-wide">
                        {item.start} – {item.end}
                      </span>
                    </div>
                    <p className="text-sm italic">
                      {item.institution}
                      {item.location ? `, ${item.location}` : ''}
                    </p>
                    {item.description ? (
                      <p className="text-sm leading-relaxed">{item.description}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.35em]">
                Projekte
              </h2>
              <div className="space-y-5 divide-y divide-black/30">
                {projects.map((project) => (
                  <article key={project.title} className="space-y-1.5 pt-4 first:pt-0">
                    <h3 className="text-base font-bold">
                      {project.title}
                      {project.featured ? ' *' : ''}
                    </h3>
                    <p className="text-sm leading-relaxed">{project.description}</p>
                    <p className="text-xs uppercase tracking-wide text-black/70">
                      {[
                        project.tags.join(' · '),
                        project.liveUrl ? `[Live: ${project.liveUrl.replace(/^https?:\/\//, '')}]` : '',
                        project.repoUrl ? `[Code: ${project.repoUrl.replace(/^https?:\/\//, '')}]` : '',
                      ]
                        .filter(Boolean)
                        .join('  ')}
                    </p>
                  </article>
                ))}
                {projects.some((project) => project.featured) ? (
                  <p className="pt-2 text-xs italic text-black/60">* hervorgehobenes Projekt</p>
                ) : null}
              </div>
            </section>
          </div>

          <div className="space-y-8 py-6 md:pl-8">
            <section className="space-y-3">
              <h2 className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.35em]">
                Skills
              </h2>
              <div className="space-y-2">
                {Object.entries(groupedSkills)
                  .filter(([, entries]) => entries.length > 0)
                  .map(([category, entries]) => (
                    <p key={category} className="text-sm leading-relaxed">
                      <span className="font-bold">{CATEGORY_LABELS[category as SkillCategory]}: </span>
                      {entries.map((skill) => skill.name).join(', ')}
                    </p>
                  ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.35em]">
                Sprachen
              </h2>
              <div className="space-y-1">
                {languages.map((language) => (
                  <p key={language.language} className="text-sm">
                    {language.language} — {language.level}
                  </p>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.35em]">
                Zertifikate
              </h2>
              <div className="space-y-1">
                {certifications.map((certification) => (
                  <p key={certification.name} className="text-sm leading-relaxed">
                    {certification.name}, {certification.issuer} ({certification.year})
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
