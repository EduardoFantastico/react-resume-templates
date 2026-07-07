# React Resume Templates

Modern, client-only CV and portfolio template built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, and Lucide React.

## What this project does

- Serves as a fork-and-customize template and inspiration gallery, not a finished product: pick the variant that matches your style, delete the rest, and make it yours.
- Includes a landing page at `/` that introduces the project to anyone who forks it.
- Presents one central CV data file ([src/data/cv-data.ts](src/data/cv-data.ts)) that drives all layouts.
- Ships five presentation variants: Minimal, Sidebar, Creative, Puzzle, and Terminal.
- Supports light/dark mode, twelve color themes, and responsive behavior from mobile to large desktop screens.
- Stays static and deployable to Vercel, GitHub Pages, or any static host.

## Getting Started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run format:check
```

## Customize the CV

Edit only [src/data/cv-data.ts](src/data/cv-data.ts) for personal content.

- Update `personal` for name, title, contact details, biography, and social links.
- Update `skills`, `experience`, `education`, `projects`, `certifications`, and `languages` to match your profile.
- Use German text by default. English alternatives can be left as comments next to the same fields.
- Keep avatar images optional. If `personal.avatar` is missing or fails to load, the app falls back to initials automatically.

## Theme System

Themes are defined in two places:

- CSS custom properties in [src/styles/index.css](src/styles/index.css)
- Selector metadata in [src/themes/themes.ts](src/themes/themes.ts)

To add a new theme:

1. Add a new `data-theme` block in [src/styles/index.css](src/styles/index.css).
2. Add the new theme entry to [src/themes/themes.ts](src/themes/themes.ts).
3. Ensure the theme name is part of the `ThemeName` union in [src/types/cv.types.ts](src/types/cv.types.ts).

## Layout Variants

Routes:

- `/` — landing page introducing the project (see "Reduce to a Single Variant" below to turn this into your actual portfolio)
- `/minimal`
- `/sidebar`
- `/creative`
- `/puzzle`
- `/terminal`

Each variant route uses the same `cvData` object but renders it with a different visual system.

## Reduce to a Single Variant

Most forks only need one look. To trim the project down to just one variant (e.g. only Terminal):

1. Pick the variant to keep, e.g. [src/layouts/variants/TerminalLayout.tsx](src/layouts/variants/TerminalLayout.tsx).
2. Delete the other files in [src/layouts/variants](src/layouts/variants).
3. In [src/router/AppRouter.tsx](src/router/AppRouter.tsx), remove the unused imports, `NAV_ITEMS` entries, and `<Route>` elements — keep only the variant you're using.
4. Optional: once you no longer need the landing page, delete [src/pages/LandingPage.tsx](src/pages/LandingPage.tsx), remove the "Start" nav item, and point the `/` route at your remaining variant directly.
5. Check the logo link in [src/components/layout/Header.tsx](src/components/layout/Header.tsx) and the nav items in Navbar/HamburgerMenu still make sense with only one variant left.

## Adding a New Variant

1. Create a new file in [src/layouts/variants](src/layouts/variants).
2. Reuse the shared building blocks in [src/components/ui](src/components/ui) (Avatar, Badge, SocialLinks).
3. Add the route to [src/router/AppRouter.tsx](src/router/AppRouter.tsx).
4. Add the nav item so it appears in the header and mobile drawer.

## Folder Overview

- [src/components/layout](src/components/layout)
- [src/components/ui](src/components/ui)
- [src/data/cv-data.ts](src/data/cv-data.ts)
- [src/hooks](src/hooks)
- [src/layouts](src/layouts)
- [src/pages/LandingPage.tsx](src/pages/LandingPage.tsx)
- [src/router/AppRouter.tsx](src/router/AppRouter.tsx)
- [src/styles/index.css](src/styles/index.css)
- [src/themes/themes.ts](src/themes/themes.ts)
- [src/types/cv.types.ts](src/types/cv.types.ts)

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Leave the build command as `npm run build` and the output directory as `dist`.

### GitHub Pages

1. Build the project with `npm run build`.
2. Deploy the contents of `dist` with your preferred GitHub Pages workflow or action.
3. If you host under a subpath, configure the Vite `base` option in [vite.config.ts](vite.config.ts).

## Environment Variables

The app does not require runtime environment variables. See [.env.example](.env.example) for the documented placeholder file.

## Notes

- The avatar path in `cv-data.ts` points to `/avatar.jpg` in `public/`, but the app still works without it because the initials fallback is built in.
- No backend is used. All content is static and local.# react-resume-templates
