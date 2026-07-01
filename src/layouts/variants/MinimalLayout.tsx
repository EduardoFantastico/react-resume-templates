/*
Purpose: Restrained, typography-only resume — a single reading column, no chrome.
Props summary: none; renders the shared CV content.
Usage example: default export used by the minimal route.
*/
import BaseLayout from '@/layouts/BaseLayout';
import { cvData } from '@/data/cv-data';

const SOCIAL_LABELS: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  xing: 'Xing',
  x: 'X',
  website: 'Web',
};

/**
 * Renders the minimal variant: one prose column, plain text, one accent line.
 */
export default function MinimalLayout() {
  const { personal, skills, experience, education, projects, certifications, languages } =
    cvData;

  const socialEntries = Object.entries(personal.social).filter(([, url]) => Boolean(url));
  const contactLine = [personal.email, personal.phone, personal.location].join('  —  ');

  return (
    <BaseLayout variant="minimal" className="font-system print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-prose space-y-20 py-10 sm:space-y-24 sm:py-20">
        <header className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-apptext sm:text-4xl">
            {personal.name}
          </h1>
          <span className="block h-0.5 w-12 bg-primary" />
          <p className="text-lg text-muted">{personal.title}</p>
          <p className="leading-8 text-apptext">{personal.bio}</p>
          <p className="text-sm text-muted">
            {contactLine}
            {socialEntries.length > 0 ? '  —  ' : ''}
            {socialEntries.map(([key, url], index) => (
              <span key={key}>
                <a href={url} target="_blank" rel="noreferrer" className="text-apptext underline decoration-primary underline-offset-4 hover:text-primary">
                  {SOCIAL_LABELS[key] ?? key}
                </a>
                {index < socialEntries.length - 1 ? '  —  ' : ''}
              </span>
            ))}
          </p>
        </header>

        <section className="space-y-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Erfahrung</p>
          <div className="space-y-10">
            {experience.map((item) => (
              <div key={`${item.company}-${item.start}`}>
                <p className="font-medium text-apptext">
                  {item.role} — {item.company}
                </p>
                <p className="text-sm text-muted">
                  {item.start} — {item.end}
                  {item.location ? `  —  ${item.location}` : ''}
                </p>
                <p className="mt-3 leading-8 text-apptext">{item.description}</p>
                <p className="mt-2 text-sm text-muted">{item.tags.join('  —  ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Ausbildung</p>
          <div className="space-y-10">
            {education.map((item) => (
              <div key={`${item.institution}-${item.start}`}>
                <p className="font-medium text-apptext">
                  {item.degree} — {item.institution}
                </p>
                <p className="text-sm text-muted">
                  {item.start} — {item.end}
                  {item.location ? `  —  ${item.location}` : ''}
                </p>
                {item.description ? (
                  <p className="mt-3 leading-8 text-apptext">{item.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Skills</p>
          <p className="leading-8 text-apptext">
            {skills.map((skill) => skill.name).join('  —  ')}
          </p>
        </section>

        <section className="space-y-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Projekte</p>
          <div className="space-y-10">
            {projects.map((project) => (
              <div key={project.title}>
                <p className="font-medium text-apptext">{project.title}</p>
                <p className="mt-3 leading-8 text-apptext">{project.description}</p>
                <p className="mt-2 text-sm text-muted">
                  {project.tags.join('  —  ')}
                  {project.liveUrl ? (
                    <>
                      {'  —  '}
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-apptext underline decoration-primary underline-offset-4 hover:text-primary">
                        Live
                      </a>
                    </>
                  ) : null}
                  {project.repoUrl ? (
                    <>
                      {'  —  '}
                      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-apptext underline decoration-primary underline-offset-4 hover:text-primary">
                        Code
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Weiteres</p>
          <p className="leading-8 text-apptext">
            {certifications.map((certification) => `${certification.name} (${certification.issuer}, ${certification.year})`).join('  —  ')}
          </p>
          <p className="leading-8 text-apptext">
            {languages.map((language) => `${language.language}: ${language.level}`).join('  —  ')}
          </p>
        </section>

        <footer className="space-y-3 pt-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Kontakt</p>
          <p className="leading-8 text-apptext">
            <a href={`mailto:${personal.email}`} className="underline decoration-primary underline-offset-4 hover:text-primary">
              {personal.email}
            </a>
            {'  —  '}
            <a href={`tel:${personal.phone}`} className="underline decoration-primary underline-offset-4 hover:text-primary">
              {personal.phone}
            </a>
          </p>
        </footer>
      </div>
    </BaseLayout>
  );
}
