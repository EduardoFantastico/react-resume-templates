/*
Purpose: Typography-forward, print-friendly single-column layout.
Props summary: none; renders the shared CV content.
Usage example: default export used by the minimal route.
*/
import BaseLayout from '@/layouts/BaseLayout';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';

/**
 * Renders a restrained layout with a document-like reading rhythm.
 */
export default function MinimalLayout() {
  return (
    <BaseLayout variant="minimal" className="print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-3xl space-y-8 text-pretty">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </BaseLayout>
  );
}
