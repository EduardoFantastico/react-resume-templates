/*
Purpose: Bold, colorful layout with strong hero emphasis and vibrant project treatment.
Props summary: none; renders the shared CV content.
Usage example: default export used by the creative route.
*/
import BaseLayout from '@/layouts/BaseLayout';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';

/**
 * Renders the creative variant with a bright hero and expressive section framing.
 */
export default function CreativeLayout() {
  return (
    <BaseLayout variant="creative" fullBleed>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section
          className="overflow-hidden rounded-[2rem] border border-border p-6 shadow-soft sm:p-8 lg:p-10"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, var(--color-bg)) 0%, var(--color-surface) 48%, color-mix(in srgb, var(--color-accent) 12%, var(--color-bg)) 100%)',
          }}
        >
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
            <HeroSection />
            <div className="rounded-[1.75rem] border border-border bg-bg/80 p-5 backdrop-blur">
              <AboutSection layout="stacked" />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <SkillsSection />
          </div>
          <div className="xl:col-span-5">
            <ContactSection />
          </div>
          <div className="xl:col-span-12">
            <ExperienceSection />
          </div>
          <div className="xl:col-span-12">
            <ProjectsSection />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
