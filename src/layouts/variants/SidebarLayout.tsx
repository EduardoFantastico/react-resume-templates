/*
Purpose: Left sticky sidebar with scrollable content on the right.
Props summary: none; renders the shared CV content.
Usage example: default export used by the sidebar route.
*/
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import BaseLayout from '@/layouts/BaseLayout';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { cvData } from '@/data/cv-data';

/**
 * Renders the sidebar-driven layout with persistent personal context.
 */
export default function SidebarLayout() {
  return (
    <BaseLayout variant="sidebar">
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-soft xl:sticky xl:top-28 xl:self-start">
          <div className="space-y-4">
            <Avatar name={cvData.personal.name} avatar={cvData.personal.avatar} size="lg" />
            <div>
              <h2 className="font-display text-2xl font-semibold text-apptext">
                {cvData.personal.name}
              </h2>
              <p className="mt-1 text-sm text-primary">{cvData.personal.title}</p>
            </div>
            <p className="text-sm leading-7 text-muted">{cvData.personal.bio}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Schnellansicht
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.slice(0, 8).map((skill) => (
                <Badge key={skill.name} label={skill.name} />
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>
    </BaseLayout>
  );
}
