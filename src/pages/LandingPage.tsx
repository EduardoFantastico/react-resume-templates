/*
Purpose: Public landing page at "/" explaining the project, how to reuse it, and linking to the live variants and source.
Props summary: none.
Usage example: default export used by the root route.
*/
import {
  ArrowRight,
  ExternalLink,
  FileCode2,
  GitFork,
  Github,
  Globe,
  Layers,
  MoonStar,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { cvData } from '@/data/cv-data';

const REPO_URL = 'https://github.com/EduardoFantastico/react-resume-templates';
const CV_DATA_URL = `${REPO_URL}/blob/main/src/data/cv-data.ts`;
const OWN_CV_URL = 'https://eddy.rip';

interface OnboardingStep {
  title: string;
  description: string;
  icon: typeof GitFork;
  href?: string;
  linkLabel?: string;
}

const STEPS: OnboardingStep[] = [
  {
    title: 'Repo forken oder klonen',
    description:
      'Auf GitHub auf „Fork" klicken oder lokal per git clone kopieren. Keine Lizenzkosten, kein Backend, keine Abhängigkeit von diesem Projekt.',
    icon: GitFork,
    href: `${REPO_URL}/fork`,
    linkLabel: 'Jetzt forken',
  },
  {
    title: 'cv-data.ts ausfüllen',
    description:
      'Eine einzige Datei mit deinen Daten — Name, Bio, Erfahrung, Projekte, Skills. Alle Layouts lesen daraus, du musst nichts sonst anfassen.',
    icon: FileCode2,
    href: CV_DATA_URL,
    linkLabel: 'Datei ansehen',
  },
  {
    title: 'Theme & Layout wählen',
    description:
      'Zwölf Farbthemen, Dark Mode und fünf komplett unterschiedliche Layouts direkt im Einstellungsmenü oben rechts durchprobieren — und dich am Ende für die eine Variante entscheiden, die zu dir passt.',
    icon: Palette,
  },
  {
    title: 'Kostenlos deployen',
    description:
      'Rein statisch — npm run build und der dist-Ordner läuft auf Vercel, GitHub Pages oder jedem anderen Static Host.',
    icon: Rocket,
  },
];

const VARIANTS = [
  {
    path: '/minimal',
    label: 'Minimal',
    description: 'Reduzierter Editorial-Stil — eine Spalte, viel Weißraum, klare Typografie.',
  },
  {
    path: '/sidebar',
    label: 'Sidebar',
    description: 'Fixierte, farbige Sidebar neben einer luftigen, hellen Lesespalte.',
  },
  {
    path: '/creative',
    label: 'Creative',
    description: 'Lauter Fullscreen-Hero mit diagonalem Akzent und Bildkarten für Projekte.',
  },
  {
    path: '/puzzle',
    label: 'Puzzle',
    description:
      'Spielerisch: Besucher ziehen Pentomino-Puzzleteile, um das Profil selbst zusammenzusetzen.',
  },
  {
    path: '/terminal',
    label: 'Terminal',
    description: 'Interaktives Terminal — Slash-Befehle schalten die CV-Abschnitte frei.',
  },
] as const;

const FEATURES = [
  {
    icon: Layers,
    title: 'Eine zentrale Datenquelle',
    description: 'Alle Layouts rendern denselben cvData-Datensatz — einmal pflegen, überall aktuell.',
  },
  {
    icon: Palette,
    title: '12 Farbthemen',
    description: 'Von Ink über Neon bis Rosegold — jederzeit live umschaltbar, ohne Reload.',
  },
  {
    icon: MoonStar,
    title: 'Dark Mode inklusive',
    description: 'Folgt der Systemeinstellung oder lässt sich manuell speichern.',
  },
  {
    icon: ShieldCheck,
    title: 'Rein statisch',
    description: 'Kein Server, keine Datenbank, keine Umgebungsvariablen — läuft überall.',
  },
  {
    icon: Sparkles,
    title: 'React, TypeScript, Tailwind',
    description: 'Vertraute, moderne Grundlagen plus Framer Motion für feine Übergänge.',
  },
  {
    icon: Globe,
    title: 'Frei hostbar',
    description: 'Vercel, GitHub Pages oder ein beliebiger Static Host — deine Wahl.',
  },
] as const;

/**
 * Renders the marketing/onboarding landing page shown at the root route.
 */
export default function LandingPage() {
  return (
    <div className="font-sans">
      <section
        className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        style={{
          background:
            'linear-gradient(160deg, color-mix(in srgb, var(--color-primary) 90%, black) 0%, var(--color-primary) 50%, var(--color-accent) 100%)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -top-1/3 h-[160%] w-2/3 -rotate-[18deg] bg-white/10"
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Open-Source CV-Vorlage
          </p>
          <h1 className="mt-8 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Fünf Stile zum Ausprobieren. Am Ende: nur noch deiner.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Diese Seite zeigt fünf grundverschiedene CV-Layouts nebeneinander — als Inspiration,
            nicht als Endprodukt. Fork das Repo, vergleich die Varianten, entscheide dich für eine
            (z. B. nur Terminal) und wirf den Rest raus. Trag danach deine eigenen Daten in die
            zentrale <code className="rounded bg-white/15 px-1.5 py-0.5 text-base">cv-data.ts</code>{' '}
            ein.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/minimal"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
            >
              Vorlagen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
            >
              <Github className="h-4 w-4" /> Repo forken
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            So funktioniert&apos;s
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-apptext sm:text-4xl">
            In vier Schritten zu deinem eigenen CV
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted">
                  Schritt {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-apptext">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-muted">{step.description}</p>
              {step.href ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  {step.linkLabel} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="varianten" className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Varianten
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-apptext sm:text-4xl">
              Varianten zum Durchprobieren
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Jede Variante rendert denselben Beispiel-Lebenslauf mit komplett anderer visueller
              Sprache — probier sie live durch, bevor du dich entscheidest.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dashed border-primary/40 bg-bg p-5 text-center text-sm leading-7 text-muted">
            Alle fünf Varianten liegen hier nebeneinander, damit du vergleichen kannst. In deinem
            eigenen Fork reicht in der Regel eine: lösch die nicht gebrauchten Dateien in{' '}
            <code className="rounded bg-surface px-1.5 py-0.5">src/layouts/variants/</code> und
            entfern ihre Routen/Nav-Einträge in{' '}
            <code className="rounded bg-surface px-1.5 py-0.5">src/router/AppRouter.tsx</code>.
            Genaue Schritte stehen im README.
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VARIANTS.map((variant) => (
              <Link
                key={variant.path}
                to={variant.path}
                className="group flex flex-col rounded-3xl border border-border bg-bg p-6 shadow-soft transition-transform duration-150 hover:-translate-y-1 focus-ring"
              >
                <h3 className="text-lg font-semibold text-apptext">{variant.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{variant.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Live ansehen{' '}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Enthalten
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-apptext sm:text-4xl">
            Alles, was ein modernes CV-Projekt braucht
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-border bg-surface p-6 shadow-soft"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-apptext">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-[2.5rem] border border-border bg-surface p-10 text-center shadow-soft sm:p-14">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
            <Globe className="h-6 w-6" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Zur Inspiration
          </p>
          <h2 className="font-display text-2xl font-bold text-apptext sm:text-3xl">
            Deine Seite braucht deine Handschrift
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Eine gute persönliche Seite sieht nicht wie eine Vorlage aus, sondern wie die Person
            dahinter. Meine eigene Seite unter eddy.rip ist komplett unabhängig von diesem Repo
            entstanden — ganz bewusst individuell. Nutz diese Templates als Startpunkt, aber hör
            dort nicht auf: Bau weiter, bis es sich wie deins anfühlt.
          </p>
          <a
            href={OWN_CV_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
          >
            eddy.rip besuchen <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-10 text-center text-white sm:p-14"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
          }}
        >
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Bereit loszulegen?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Das Repo ist öffentlich, MIT-lizenziert und frei forkbar — kein Zugriff, keine
            Freigabe, kein Account nötig.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${REPO_URL}/fork`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
            >
              <GitFork className="h-4 w-4" /> Repo forken
            </a>
            <a
              href={CV_DATA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5 focus-ring"
            >
              <FileCode2 className="h-4 w-4" /> cv-data.ts ansehen
            </a>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/60">
            {cvData.personal.name} · Referenz-Lebenslauf in diesem Repo
          </p>
        </div>
      </section>
    </div>
  );
}
