/*
Purpose: A loud, full-viewport hero with a diagonal accent slash and full-bleed image project cards.
Props summary: none; renders the shared CV content.
Usage example: default export used by the creative route.
*/
import { ArrowDown, ExternalLink, Github, Mail } from 'lucide-react';

import BaseLayout from '@/layouts/BaseLayout';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { cvData } from '@/data/cv-data';

/**
 * Renders the creative variant: hero-scale type, a diagonal accent slab, image-backed project cards.
 */
export default function CreativeLayout() {
  const { personal, skills, experience, education, projects, certifications, languages } =
    cvData;

  return (
    <BaseLayout variant="creative" fullBleed>
      <section
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 py-28 sm:px-12 lg:px-20"
        style={{
          background:
            'linear-gradient(160deg, color-mix(in srgb, var(--color-primary) 92%, black) 0%, var(--color-primary) 45%, var(--color-accent) 100%)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -top-1/4 h-[160%] w-2/3 -rotate-[18deg] bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 h-full w-1/3 -rotate-[18deg] border-l-4 border-white/20"
        />

        <div className="relative z-10 max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            {personal.title}
          </p>
          <h1
            className="mt-6 font-display font-black uppercase leading-[0.85] text-white"
            style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}
          >
            {personal.name}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/85">{personal.bio}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
            >
              Kontakt <Mail className="h-4 w-4" />
            </a>
            <SocialLinks
              social={personal.social}
              className="[&_a]:border-white/30 [&_a]:bg-white/10 [&_a]:text-white [&_a]:hover:border-white/60"
            />
          </div>
        </div>

        <ArrowDown className="absolute bottom-10 left-1/2 z-10 h-6 w-6 -translate-x-1/2 animate-float text-white/70" />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="space-y-6">
          <h2 className="font-display text-4xl font-black uppercase text-apptext">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide ${
                  index % 2 === 0
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary text-primary'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6 border-l-4 border-primary pl-6">
            <h2 className="font-display text-3xl font-black uppercase text-apptext">Erfahrung</h2>
            {experience.map((item) => (
              <div key={`${item.company}-${item.start}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {item.start} – {item.end}
                </p>
                <h3 className="mt-1 text-xl font-bold text-apptext">{item.role}</h3>
                <p className="text-sm font-semibold text-muted">{item.company}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="space-y-6 border-l-4 border-accent pl-6">
            <h2 className="font-display text-3xl font-black uppercase text-apptext">Ausbildung</h2>
            {education.map((item) => (
              <div key={`${item.institution}-${item.start}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  {item.start} – {item.end}
                </p>
                <h3 className="mt-1 text-xl font-bold text-apptext">{item.degree}</h3>
                <p className="text-sm font-semibold text-muted">{item.institution}</p>
              </div>
            ))}
            <div className="pt-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Zertifikate</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {certifications.map((certification) => (
                  <li key={certification.name}>
                    {certification.name} · {certification.issuer} · {certification.year}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-display text-4xl font-black uppercase text-apptext">Projekte</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.75rem]"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 transition duration-500 group-hover:scale-105"
                    style={{
                      background:
                        index % 2 === 0
                          ? 'linear-gradient(150deg, var(--color-primary), var(--color-accent))'
                          : 'linear-gradient(150deg, var(--color-accent), var(--color-primary))',
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative z-10 space-y-2 p-6">
                  {project.featured ? (
                    <span className="inline-block rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900">
                      Featured
                    </span>
                  ) : null}
                  <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-sm leading-6 text-white/80">{project.description}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
                      >
                        Live <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
                      >
                        Code <Github className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mt-16 overflow-hidden rounded-[2.5rem] p-10 text-white sm:p-14"
          style={{
            background:
              'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
          }}
        >
          <h2 className="font-display text-4xl font-black uppercase">Sprich mich an</h2>
          <p className="mt-3 max-w-xl text-white/85">
            {personal.email} · {personal.phone} · {personal.location}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {languages.map((language) => `${language.language} (${language.level})`).join(' · ')}
          </p>
          <div className="mt-6">
            <SocialLinks
              social={personal.social}
              className="[&_a]:border-white/30 [&_a]:bg-white/10 [&_a]:text-white [&_a]:hover:border-white/60"
            />
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}
