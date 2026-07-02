/*
Purpose: Interactive terminal emulator — visitors run slash-commands inside a fixed-size window to reveal CV sections.
Props summary: none; renders the shared CV content via a simulated shell, themed with the active color/dark-mode tokens.
Usage example: default export used by the terminal route.
*/
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from 'react';

import BaseLayout from '@/layouts/BaseLayout';
import { cvData } from '@/data/cv-data';

const PROMPT_USER = 'visitor';

const BOOT_LINES = [
  'Initialisiere Portfolio-Shell...',
  'Lade Profildaten... OK',
  'Verbindung hergestellt.',
  'Willkommen! Tippe /help fuer eine Liste aller Befehle.',
];

type Tone = 'output' | 'error' | 'muted';

interface Entry {
  id: string;
  kind: 'command' | 'response';
  content: ReactNode;
}

function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug || 'portfolio';
}

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return '';
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

function Text({ tone = 'output', children }: { tone?: Tone; children: ReactNode }) {
  const toneClass = tone === 'error' ? 'text-red-500' : tone === 'muted' ? 'text-muted' : 'text-apptext';
  return <p className={toneClass}>{children}</p>;
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-border bg-bg px-1.5 py-0.5 text-[11px] uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">{children}</p>;
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-apptext underline decoration-primary underline-offset-4 hover:text-primary"
    >
      {children}
    </a>
  );
}

function AboutOutput() {
  const { personal } = cvData;
  return (
    <div className="space-y-3">
      <SectionHeading>about.txt</SectionHeading>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-lg font-bold text-apptext">{personal.name}</span>
        <span className="text-muted">{personal.title}</span>
      </div>
      <p className="max-w-2xl leading-relaxed text-apptext">{personal.bio}</p>
      <p className="text-muted">
        <span className="text-muted">Standort:</span> {personal.location}
      </p>
    </div>
  );
}

const SKILL_CATEGORY_LABELS: Record<string, string> = {
  language: 'Sprachen',
  framework: 'Frameworks',
  tool: 'Tools',
  platform: 'Plattformen',
  other: 'Weiteres',
};

function SkillsOutput() {
  const grouped = new Map<string, typeof cvData.skills>();
  cvData.skills.forEach((skill) => {
    const bucket = grouped.get(skill.category) ?? [];
    bucket.push(skill);
    grouped.set(skill.category, bucket);
  });

  return (
    <div className="space-y-4">
      <SectionHeading>skills.sh</SectionHeading>
      {[...grouped.entries()].map(([category, items]) => (
        <div key={category} className="space-y-1.5">
          <p className="text-xs text-muted">{SKILL_CATEGORY_LABELS[category] ?? category}</p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((skill) => (
              <Tag key={skill.name}>{skill.name}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceOutput() {
  return (
    <div className="space-y-4">
      <SectionHeading>experience.log</SectionHeading>
      {cvData.experience.map((item) => (
        <div key={`${item.company}-${item.start}`} className="space-y-1.5 border-l-2 border-border pl-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-semibold text-apptext">{item.role}</span>
            <span className="text-muted">@ {item.company}</span>
          </div>
          <p className="text-xs text-muted">
            {item.start} - {item.end}
            {item.location ? `  |  ${item.location}` : ''}
          </p>
          <p className="leading-relaxed text-apptext">{item.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationOutput() {
  return (
    <div className="space-y-4">
      <SectionHeading>education.db</SectionHeading>
      {cvData.education.map((item) => (
        <div key={`${item.institution}-${item.start}`} className="space-y-1.5 border-l-2 border-border pl-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-semibold text-apptext">{item.degree}</span>
            <span className="text-muted">@ {item.institution}</span>
          </div>
          <p className="text-xs text-muted">
            {item.start} - {item.end}
            {item.location ? `  |  ${item.location}` : ''}
          </p>
          {item.description ? <p className="leading-relaxed text-apptext">{item.description}</p> : null}
        </div>
      ))}
    </div>
  );
}

function ProjectsOutput() {
  return (
    <div className="space-y-4">
      <SectionHeading>projects.md</SectionHeading>
      {cvData.projects.map((project) => (
        <div key={project.title} className="space-y-1.5 border-l-2 border-border pl-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-apptext">{project.title}</span>
            {project.featured ? <Tag>Featured</Tag> : null}
          </div>
          <p className="leading-relaxed text-apptext">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 pt-0.5 text-xs">
            {project.liveUrl ? <ExternalLink href={project.liveUrl}>Live -&gt;</ExternalLink> : null}
            {project.repoUrl ? <ExternalLink href={project.repoUrl}>Code -&gt;</ExternalLink> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificationsOutput() {
  return (
    <div className="space-y-2">
      <SectionHeading>certifications.pem</SectionHeading>
      {cvData.certifications.map((c) => (
        <div key={c.name} className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-muted">-</span>
          <span className="text-apptext">{c.name}</span>
          <span className="text-muted">
            {c.issuer} · {c.year}
          </span>
        </div>
      ))}
    </div>
  );
}

function LanguagesOutput() {
  return (
    <div className="space-y-2">
      <SectionHeading>languages.json</SectionHeading>
      {cvData.languages.map((l) => (
        <div key={l.language} className="flex gap-2">
          <span className="text-muted">-</span>
          <span className="text-apptext">{l.language}</span>
          <span className="text-muted">{l.level}</span>
        </div>
      ))}
    </div>
  );
}

function ContactOutput() {
  const { personal } = cvData;
  const social = Object.entries(personal.social).filter((entry): entry is [string, string] => Boolean(entry[1]));
  return (
    <div className="space-y-3">
      <SectionHeading>contact.vcf</SectionHeading>
      <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5">
        <span className="text-muted">email</span>
        <ExternalLink href={`mailto:${personal.email}`}>{personal.email}</ExternalLink>
        <span className="text-muted">phone</span>
        <span className="text-apptext">{personal.phone}</span>
        <span className="text-muted">location</span>
        <span className="text-apptext">{personal.location}</span>
        {social.map(([key, url]) => (
          <div key={key} className="contents">
            <span className="text-muted">{key}</span>
            <ExternalLink href={url}>{url}</ExternalLink>
          </div>
        ))}
      </div>
    </div>
  );
}

function LsOutput() {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(FILES).map((file) => (
        <span key={file} className="rounded border border-border bg-bg px-2 py-1 text-xs text-apptext">
          {file}
        </span>
      ))}
    </div>
  );
}

const HELP_ROWS: [string, string][] = [
  ['help', 'Zeigt diese Befehlsuebersicht'],
  ['about', 'Kurzprofil & Bio (Alias: whoami)'],
  ['skills', 'Technische Faehigkeiten'],
  ['experience', 'Berufserfahrung'],
  ['education', 'Ausbildung'],
  ['projects', 'Projekte'],
  ['certifications', 'Zertifikate'],
  ['languages', 'Sprachen'],
  ['contact', 'Kontakt & Social-Links (Alias: social)'],
  ['ls', 'Listet verfuegbare Dateien'],
  ['cat <datei>', 'Zeigt Inhalt einer Datei, z. B. /cat skills.sh'],
  ['clear', 'Leert das Terminal'],
  ['date', 'Aktuelles Datum & Uhrzeit'],
  ['echo <text>', 'Gibt <text> aus'],
];

function HelpOutput() {
  return (
    <div className="space-y-2">
      <SectionHeading>Verfuegbare Befehle</SectionHeading>
      <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5">
        {HELP_ROWS.map(([cmd, desc]) => (
          <div key={cmd} className="contents">
            <span className="font-semibold text-apptext">/{cmd}</span>
            <span className="text-muted">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const FILES: Record<string, () => ReactNode> = {
  'about.txt': AboutOutput,
  'skills.sh': SkillsOutput,
  'experience.log': ExperienceOutput,
  'education.db': EducationOutput,
  'projects.md': ProjectsOutput,
  'certifications.pem': CertificationsOutput,
  'languages.json': LanguagesOutput,
  'contact.vcf': ContactOutput,
};

const COMMANDS: Record<string, (arg: string) => ReactNode> = {
  help: () => <HelpOutput />,
  about: () => <AboutOutput />,
  whoami: () => <AboutOutput />,
  skills: () => <SkillsOutput />,
  experience: () => <ExperienceOutput />,
  education: () => <EducationOutput />,
  projects: () => <ProjectsOutput />,
  certifications: () => <CertificationsOutput />,
  languages: () => <LanguagesOutput />,
  contact: () => <ContactOutput />,
  social: () => <ContactOutput />,
  ls: () => <LsOutput />,
  dir: () => <LsOutput />,
  cat: (arg) => {
    if (!arg) return <Text tone="error">cat: fehlender Dateiname. Versuch es mit /ls.</Text>;
    const Renderer = FILES[arg];
    return Renderer ? <Renderer /> : <Text tone="error">cat: {arg}: Datei nicht gefunden.</Text>;
  },
  date: () => <Text>{new Date().toLocaleString('de-DE')}</Text>,
  echo: (arg) => <Text>{arg}</Text>,
  sudo: () => (
    <Text tone="error">{PROMPT_USER} is not in the sudoers file. This incident will be reported.</Text>
  ),
  exit: () => (
    <Text tone="muted">Verbindung getrennt... nur Spass, lade die Seite neu fuer einen Neustart.</Text>
  ),
  logout: () => (
    <Text tone="muted">Verbindung getrennt... nur Spass, lade die Seite neu fuer einen Neustart.</Text>
  ),
};

const COMMAND_NAMES = Object.keys(COMMANDS).sort();

function completeInput(value: string): string | null {
  const parts = value.split(/\s+/);

  if (parts.length === 1) {
    const partial = parts[0].toLowerCase();
    if (!partial) return null;
    const matches = COMMAND_NAMES.filter((name) => name.startsWith(partial));
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) {
      const prefix = longestCommonPrefix(matches);
      return prefix.length > partial.length ? prefix : null;
    }
    return null;
  }

  if (parts.length === 2 && parts[0].toLowerCase() === 'cat') {
    const partial = parts[1];
    const matches = Object.keys(FILES).filter((file) => file.startsWith(partial));
    if (matches.length === 1) return `${parts[0]} ${matches[0]}`;
    if (matches.length > 1) {
      const prefix = longestCommonPrefix(matches);
      return prefix.length > partial.length ? `${parts[0]} ${prefix}` : null;
    }
  }

  return null;
}

function runCommand(raw: string): 'CLEAR' | ReactNode {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withoutSlash = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  const [cmd, ...rest] = withoutSlash.split(/\s+/);
  const arg = rest.join(' ');
  const key = cmd.toLowerCase();

  if (key === 'clear' || key === 'cls') return 'CLEAR';

  const handler = COMMANDS[key];
  if (!handler) {
    return (
      <Text tone="error">
        bash: {cmd}: Befehl nicht gefunden. Tippe /help fuer eine Uebersicht.
      </Text>
    );
  }
  return handler(arg);
}

function Prompt({ slug }: { slug: string }) {
  return (
    <span className="shrink-0 font-semibold">
      <span className="text-apptext">
        {PROMPT_USER}@{slug}
      </span>
      <span className="text-muted">:</span>
      <span className="text-muted">~</span>
      <span className="text-muted">$</span>
    </span>
  );
}

function EntryRow({ entry, slug }: { entry: Entry; slug: string }) {
  if (entry.kind === 'command') {
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <Prompt slug={slug} />
        <span className="text-apptext">
          <span className="text-muted">/</span>
          {entry.content}
        </span>
      </div>
    );
  }

  return <div>{entry.content}</div>;
}

/**
 * Renders the terminal variant: a fixed-size shell window that answers slash-commands.
 */
export default function TerminalLayout() {
  const { personal } = cvData;
  const slug = slugify(personal.logoText || personal.name);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [caretPos, setCaretPos] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pushEntry(entry: Omit<Entry, 'id'>) {
    idRef.current += 1;
    const id = `entry-${idRef.current}`;
    setEntries((prev) => [...prev, { ...entry, id }]);
  }

  useEffect(() => {
    const timers = BOOT_LINES.map((line, index) =>
      window.setTimeout(() => {
        pushEntry({ kind: 'response', content: <Text tone="muted">{line}</Text> });
      }, index * 220),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [entries]);

  function focusInput(event: MouseEvent<HTMLDivElement>) {
    if (window.getSelection()?.toString()) return;
    if (event.target !== event.currentTarget && (event.target as HTMLElement).closest('a')) return;
    inputRef.current?.focus();
  }

  function syncCaret(event: SyntheticEvent<HTMLInputElement>) {
    const el = event.currentTarget;
    setCaretPos(el.selectionStart ?? el.value.length);
  }

  function placeCaretAtEnd(value: string) {
    setCaretPos(value.length);
    window.requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(value.length, value.length);
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input;
    pushEntry({ kind: 'command', content: command });
    if (command.trim()) setCommandHistory((prev) => [...prev, command]);
    setInput('');
    setCaretPos(0);
    setHistoryIndex(null);

    const result = runCommand(command);
    if (result === 'CLEAR') {
      setEntries([]);
      return;
    }
    if (result) {
      pushEntry({ kind: 'response', content: result });
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const next = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(commandHistory[next]);
      placeCaretAtEnd(commandHistory[next]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      if (next >= commandHistory.length) {
        setHistoryIndex(null);
        setInput('');
        placeCaretAtEnd('');
      } else {
        setHistoryIndex(next);
        setInput(commandHistory[next]);
        placeCaretAtEnd(commandHistory[next]);
      }
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const completed = completeInput(input);
      if (completed) {
        setInput(completed);
        placeCaretAtEnd(completed);
      }
    }
  }

  return (
    <BaseLayout variant="terminal" fullBleed>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex h-[70vh] min-h-[460px] max-h-[680px] w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
          <div className="flex shrink-0 items-center gap-2 border-b border-border bg-bg px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <p className="flex-1 truncate text-center font-mono text-xs text-muted">
              {PROMPT_USER}@{slug}: ~
            </p>
          </div>

          <div
            ref={scrollRef}
            onClick={focusInput}
            className="min-h-0 flex-1 cursor-text space-y-3 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed sm:px-6"
          >
            {entries.map((entry) => (
              <EntryRow key={entry.id} entry={entry} slug={slug} />
            ))}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-border bg-bg px-4 py-3 font-mono text-sm"
          >
            <Prompt slug={slug} />
            <span className="shrink-0 text-muted">/</span>
            <span className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setCaretPos(event.target.selectionStart ?? event.target.value.length);
                }}
                onKeyDown={handleKeyDown}
                onKeyUp={syncCaret}
                onClick={syncCaret}
                onSelect={syncCaret}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="command eingeben..."
                aria-label="Terminal-Eingabe"
                className="w-full bg-transparent font-mono text-sm text-apptext caret-transparent outline-none placeholder:text-border"
              />
              <span
                className="pointer-events-none absolute bottom-0 top-0 h-full w-[0.55em] animate-blink bg-apptext"
                style={{ left: `${caretPos}ch` }}
              />
            </span>
          </form>
        </div>

        <p className="mt-4 text-center font-mono text-xs text-muted">
          Tipp: Tippe <span className="font-semibold text-apptext">/help</span> fuer alle Befehle - Pfeiltasten fuer den Verlauf - Tab zum Vervollstaendigen
        </p>
      </div>
    </BaseLayout>
  );
}
