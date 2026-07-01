/*
Purpose: A true fixed, color-filled sidebar (30% width, viewport-pinned) paired with a light, airy reading column.
Props summary: none; renders the shared CV content.
Usage example: default export used by the sidebar route.
*/
import { useState } from 'react';
import { CalendarRange, Github, Globe, Linkedin, Mail, MapPin, MessageSquareMore, Phone, Share2 } from 'lucide-react';

import BaseLayout from '@/layouts/BaseLayout';
import { cvData } from '@/data/cv-data';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  xing: Share2,
  x: MessageSquareMore,
  website: Globe,
} as const;

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function SidebarPortrait() {
  const [failed, setFailed] = useState(false);
  const { avatar, name } = cvData.personal;

  if (!avatar || failed) {
    return (
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-3xl font-bold text-white">
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      className="h-24 w-24 rounded-full border-2 border-white/40 object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Renders the sidebar variant: a fixed, saturated info panel beside a light reading column.
 */
export default function SidebarLayout() {
  const { personal, skills, experience, education, projects, certifications } = cvData;
  const socialEntries = Object.entries(personal.social).filter(
    (entry): entry is [keyof typeof SOCIAL_ICONS, string] => Boolean(entry[1]),
  );

  return (
    <BaseLayout variant="sidebar" fullBleed>
      <div className="xl:grid xl:min-h-[calc(100vh-5rem)] xl:grid-cols-[30%_70%]">
        <aside className="space-y-8 bg-primary p-8 text-white sm:p-10 xl:sticky xl:top-20 xl:h-[calc(100vh-5rem)] xl:self-start xl:overflow-y-auto xl:p-10">
          <div className="space-y-4">
            <SidebarPortrait />
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight text-white">
                {personal.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-white/80">{personal.title}</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-white/20 pt-6 text-sm text-white/90">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">{personal.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{personal.location}</span>
            </div>
          </div>

          {socialEntries.length > 0 ? (
            <div className="flex flex-wrap gap-2 border-t border-white/20 pt-6">
              {socialEntries.map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-ring"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          ) : null}

          <div className="space-y-3 border-t border-white/20 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-white/20 pt-6 text-sm text-white/90">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Sprachen</h2>
            {cvData.languages.map((language) => (
              <div key={language.language} className="flex items-center justify-between gap-3">
                <span>{language.language}</span>
                <span className="text-white/70">{language.level}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="space-y-14 px-6 py-12 sm:px-10 sm:py-16 xl:px-14 xl:py-20">
          <section className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Profil</p>
            <h2 className="font-display text-3xl font-semibold text-apptext">Über mich</h2>
            <p className="text-base leading-8 text-muted">{personal.bio}</p>
          </section>

          <section className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Werdegang</p>
            <div className="space-y-10">
              {experience.map((item) => (
                <article key={`${item.company}-${item.start}`} className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <CalendarRange className="h-3.5 w-3.5" />
                    {item.start} – {item.end}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-apptext">{item.role}</h3>
                  <p className="text-sm font-medium text-muted">
                    {item.company}
                    {item.location ? ` · ${item.location}` : ''}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-apptext"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Ausbildung</p>
            <div className="space-y-6">
              {education.map((item) => (
                <article key={`${item.institution}-${item.start}`} className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <CalendarRange className="h-3.5 w-3.5" />
                    {item.start} – {item.end}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-apptext">{item.degree}</h3>
                  <p className="text-sm font-medium text-muted">{item.institution}</p>
                  {item.description ? (
                    <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Projekte</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="space-y-3 rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-apptext">{project.title}</h3>
                    {project.featured ? (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-6 text-muted">{project.description}</p>
                  <p className="text-xs text-muted">{project.tags.join(' · ')}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Zertifikate</p>
            <ul className="space-y-1 text-sm text-muted">
              {certifications.map((certification) => (
                <li key={certification.name}>
                  <span className="font-medium text-apptext">{certification.name}</span> ·{' '}
                  {certification.issuer} · {certification.year}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </BaseLayout>
  );
}
