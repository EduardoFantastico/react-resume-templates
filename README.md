# React Resume Templates

Modern, client-only CV and portfolio template built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, and Lucide React.

## What this project does

- Presents one central CV data file that drives all layouts.
- Ships five presentation variants: Classic, Modern, Minimal, Sidebar, and Creative.
- Supports light/dark mode, five color themes, and responsive behavior from mobile to large desktop screens.
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

- `/` redirects to `/classic`
- `/classic`
- `/modern`
- `/minimal`
- `/sidebar`
- `/creative`

Each route uses the same `cvData` object but renders it with a different visual system.

## Adding a New Variant

1. Create a new file in [src/layouts/variants](src/layouts/variants).
2. Reuse the shared sections in [src/components/sections](src/components/sections).
3. Add the route to [src/router/AppRouter.tsx](src/router/AppRouter.tsx).
4. Add the nav item so it appears in the header and mobile drawer.

## Folder Overview

- [src/components/layout](src/components/layout)
- [src/components/sections](src/components/sections)
- [src/components/ui](src/components/ui)
- [src/data/cv-data.ts](src/data/cv-data.ts)
- [src/hooks](src/hooks)
- [src/layouts](src/layouts)
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
