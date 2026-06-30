/*
Purpose: Bento-style card layout with stronger visual hierarchy and generous spacing.
Props summary: none; renders the shared CV content.
Usage example: default export used by the modern route.
*/
import BaseLayout from '@/layouts/BaseLayout';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';

/**
 * Renders the modern variant with a bento-like card arrangement.
 */
export default function ModernLayout() {
  return (
    <BaseLayout variant="modern">
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <HeroSection />
        </div>
        <div className="xl:col-span-5">
          <AboutSection />
        </div>
        <div className="xl:col-span-12">
          <SkillsSection />
        </div>
        <div className="xl:col-span-12">
          <ExperienceSection />
        </div>
        <div className="xl:col-span-8">
          <ProjectsSection />
        </div>
        <div className="xl:col-span-4">
          <ContactSection />
        </div>
      </div>
    </BaseLayout>
  );
}
