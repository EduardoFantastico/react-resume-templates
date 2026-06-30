/*
Purpose: Traditional two-column resume layout with a compact information sidebar.
Props summary: none; renders the shared CV content.
Usage example: default export used by the classic route.
*/
import { Award, Mail, MapPin, Phone } from 'lucide-react';

import BaseLayout from '@/layouts/BaseLayout';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cvData } from '@/data/cv-data';

/**
 * Renders the classic resume variant with a left info rail and right content column.
 */
export default function ClassicLayout() {
  return (
    <BaseLayout variant="classic">
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-soft xl:sticky xl:top-28 xl:self-start">
          <div className="space-y-4 text-center xl:text-left">
            <Avatar
              name={cvData.personal.name}
              avatar={cvData.personal.avatar}
              size="lg"
              className="mx-auto xl:mx-0"
            />
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-apptext">
                {cvData.personal.name}
              </h2>
              <p className="text-sm text-primary">{cvData.personal.title}</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-apptext">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-3">
              <Mail className="h-4 w-4 text-primary" />
              <span className="break-all">{cvData.personal.email}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-3">
              <Phone className="h-4 w-4 text-primary" />
              <span>{cvData.personal.phone}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{cvData.personal.location}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.slice(0, 6).map((skill) => (
                <Badge key={skill.name} label={skill.name} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              <Award className="h-4 w-4" />
              Sprachen
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              {cvData.languages.map((language) => (
                <li key={language.language} className="flex items-center justify-between gap-3">
                  <span>{language.language}</span>
                  <span className="font-medium text-apptext">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-6">
          <HeroSection />
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
