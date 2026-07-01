/*
Purpose: Persistent footer shown beneath every layout variant.
Props summary: none.
Usage example: <Footer />
*/
import { cvData } from '@/data/cv-data';
import { SocialLinks } from '@/components/ui/SocialLinks';

/**
 * Renders the shared footer chrome that closes out every layout.
 */
export function Footer() {
  const { personal } = cvData;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted">
          © {year} {personal.name} · {personal.title}
        </p>
        <SocialLinks social={personal.social} />
      </div>
    </footer>
  );
}
