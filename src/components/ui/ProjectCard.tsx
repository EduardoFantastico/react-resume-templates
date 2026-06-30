/*
Purpose: Highlights a single project with links, tags, and optional image preview.
Props summary: project and className.
Usage example: <ProjectCard project={cvData.projects[0]} />
*/
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import type { ProjectCardProps } from '@/types/cv.types';

/**
 * Renders a project card with motion-friendly hover states.
 */
export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-glow ${className}`}
    >
      {project.image ? (
        <div className="aspect-[16/10] overflow-hidden bg-bg">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-primary via-primaryLight to-accent p-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] opacity-80">Projekt</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{project.title}</h3>
          </div>
        </div>
      )}
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-apptext">{project.title}</h3>
          {project.featured ? <Badge label="Featured" emphasis="accent" /> : null}
        </div>
        <p className="text-sm leading-7 text-muted">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
            >
              Live Demo <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-apptext transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary focus-ring"
            >
              Code <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
      <ArrowUpRight className="pointer-events-none absolute right-4 top-4 h-5 w-5 text-white opacity-0 transition group-hover:opacity-100" />
    </article>
  );
}
