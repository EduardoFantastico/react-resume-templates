/*
Purpose: A playful, interactive layout — visitors drag pentomino-shaped puzzle pieces onto a 5x6 board to assemble the profile themselves.
Props summary: none; renders the shared CV content.
Usage example: default export used by the puzzle route.
*/
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  ExternalLink,
  FolderKanban,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react';
import { useState, type DragEvent, type KeyboardEvent } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { SocialLinks } from '@/components/ui/SocialLinks';
import BaseLayout from '@/layouts/BaseLayout';
import { cvData } from '@/data/cv-data';

type CardKey = 'profil' | 'erfahrung' | 'ausbildung' | 'skills' | 'projekte' | 'kontakt';

type Cell = readonly [row: number, col: number];

interface CardMeta {
  key: CardKey;
  label: string;
  hint: string;
  icon: LucideIcon;
  /** Pentomino shape as relative [row, col] offsets, normalized to start at (0, 0). */
  shape: readonly Cell[];
}

interface Placement {
  key: CardKey;
  /** Grid coordinates of the shape's (0, 0) offset. */
  row: number;
  col: number;
}

interface DragPayload {
  key: CardKey;
  /** Which cell of the shape the pointer grabbed, so drops land precisely. */
  grabRow: number;
  grabCol: number;
}

const GRID_ROWS = 5;
const GRID_COLS = 6;

// Six distinct pentominoes (F, I, N, Z, P, V) verified to tile a 5x6 rectangle
// with zero overlap and zero gaps — solving the board is genuinely possible.
const CARDS: CardMeta[] = [
  {
    key: 'profil',
    label: 'Profil',
    hint: 'Wer ich bin',
    icon: User,
    shape: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
  },
  {
    key: 'erfahrung',
    label: 'Erfahrung',
    hint: 'Wo ich gearbeitet habe',
    icon: Briefcase,
    shape: [[0, 0], [1, 0], [1, 1], [1, 2], [2, 1]],
  },
  {
    key: 'ausbildung',
    label: 'Ausbildung',
    hint: 'Was ich gelernt habe',
    icon: GraduationCap,
    shape: [[0, 1], [1, 0], [1, 1], [2, 0], [3, 0]],
  },
  {
    key: 'skills',
    label: 'Skills',
    hint: 'Was ich kann',
    icon: Sparkles,
    shape: [[0, 1], [0, 2], [1, 1], [2, 0], [2, 1]],
  },
  {
    key: 'projekte',
    label: 'Projekte',
    hint: 'Was ich gebaut habe',
    icon: FolderKanban,
    shape: [[0, 0], [1, 0], [1, 1], [2, 0], [2, 1]],
  },
  {
    key: 'kontakt',
    label: 'Kontakt',
    hint: 'Wie man mich erreicht',
    icon: Mail,
    shape: [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]],
  },
];

const CARD_BY_KEY = new Map(CARDS.map((card) => [card.key, card]));

// Theme colors are plain CSS custom properties (not Tailwind's alpha-aware
// rgb() form), so `bg-primary/70` generates no rule at all. color-mix()
// (already used for ::selection in src/styles/index.css) works instead.
const TONE: Record<CardKey, string> = {
  profil: 'bg-primary text-white',
  erfahrung: 'bg-accent text-white',
  ausbildung: 'bg-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] text-white',
  skills: 'bg-[color-mix(in_srgb,var(--color-accent)_70%,transparent)] text-white',
  projekte: 'bg-primaryLight text-apptext',
  kontakt: 'bg-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] text-apptext',
};

function boundingSize(shape: readonly Cell[]) {
  const rows = Math.max(...shape.map(([row]) => row)) + 1;
  const cols = Math.max(...shape.map(([, col]) => col)) + 1;
  return { rows, cols };
}

function cellsFor(card: CardMeta, row: number, col: number): Cell[] {
  return card.shape.map(([dr, dc]) => [row + dr, col + dc]);
}

function activateOnKey(fn: () => void) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fn();
    }
  };
}

function PuzzlePanel({ cardKey }: { cardKey: CardKey }) {
  const { personal, skills, experience, education, projects, certifications, languages } = cvData;

  switch (cardKey) {
    case 'profil':
      return (
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar name={personal.name} avatar={personal.avatar} size="md" />
            <div>
              <h3 className="font-display text-2xl font-bold text-apptext">{personal.name}</h3>
              <p className="text-sm font-medium text-primary">{personal.title}</p>
            </div>
          </div>
          <p className="leading-8 text-muted">{personal.bio}</p>
        </div>
      );
    case 'erfahrung':
      return (
        <div className="space-y-8">
          {experience.map((item) => (
            <article key={`${item.company}-${item.start}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {item.start} – {item.end}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-apptext">{item.role}</h3>
              <p className="text-sm font-medium text-muted">
                {item.company}
                {item.location ? ` · ${item.location}` : ''}
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      );
    case 'ausbildung':
      return (
        <div className="space-y-8">
          {education.map((item) => (
            <article key={`${item.institution}-${item.start}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {item.start} – {item.end}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-apptext">{item.degree}</h3>
              <p className="text-sm font-medium text-muted">{item.institution}</p>
              {item.description ? (
                <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      );
    case 'skills':
      return (
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <Badge key={skill.name} label={skill.name} />
          ))}
        </div>
      );
    case 'projekte':
      return (
        <div className="space-y-6">
          {projects.map((project) => (
            <article key={project.title} className="rounded-2xl border border-border bg-bg p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-apptext">{project.title}</h3>
                {project.featured ? (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
              <p className="mt-2 text-xs text-muted">{project.tags.join(' · ')}</p>
              <div className="mt-3 flex flex-wrap gap-4">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Live <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Code <Github className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      );
    case 'kontakt':
      return (
        <div className="space-y-6">
          <div className="space-y-3 text-sm text-apptext">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${personal.email}`} className="hover:text-primary">
                {personal.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${personal.phone}`} className="hover:text-primary">
                {personal.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>{personal.location}</span>
            </div>
          </div>
          <SocialLinks social={personal.social} />
          <div className="space-y-1 border-t border-border pt-4 text-sm text-muted">
            {languages.map((language) => (
              <p key={language.language}>
                {language.language} · {language.level}
              </p>
            ))}
          </div>
          {certifications.length > 0 ? (
            <ul className="space-y-1 border-t border-border pt-4 text-sm text-muted">
              {certifications.map((certification) => (
                <li key={certification.name}>
                  <span className="font-medium text-apptext">{certification.name}</span> ·{' '}
                  {certification.issuer} · {certification.year}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}

/**
 * Renders the puzzle variant: pentomino-shaped blocks that drag onto a 5x6 board and reveal content on the right.
 */
export default function PuzzleLayout() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [selectedKey, setSelectedKey] = useState<CardKey | null>(null);
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);
  const [dragOverPile, setDragOverPile] = useState(false);

  const dockedKeys = CARDS.filter((card) =>
    placements.some((placement) => placement.key === card.key),
  ).map((card) => card.key);
  const pile = CARDS.filter((card) => !dockedKeys.includes(card.key));

  const isValidPlacement = (card: CardMeta, row: number, col: number, ignoreKey: CardKey) => {
    const cells = cellsFor(card, row, col);
    for (const [r, c] of cells) {
      if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return false;
    }
    for (const other of placements) {
      if (other.key === ignoreKey) continue;
      const otherCard = CARD_BY_KEY.get(other.key);
      if (!otherCard) continue;
      const otherCells = cellsFor(otherCard, other.row, other.col);
      for (const [r, c] of cells) {
        if (otherCells.some(([or, oc]) => or === r && oc === c)) return false;
      }
    }
    return true;
  };

  const resetDragState = () => {
    setDragPayload(null);
    setHoverCell(null);
    setDragOverPile(false);
  };

  const tryPlace = (key: CardKey, row: number, col: number) => {
    const card = CARD_BY_KEY.get(key);
    if (!card || !isValidPlacement(card, row, col, key)) return false;
    setPlacements((prev) => [...prev.filter((p) => p.key !== key), { key, row, col }]);
    return true;
  };

  const removeFromGrid = (key: CardKey) => {
    setPlacements((prev) => prev.filter((p) => p.key !== key));
  };

  const handlePileDragStart = (key: CardKey) => (event: unknown) => {
    const dragEvent = event as DragEvent<HTMLDivElement>;
    dragEvent.dataTransfer.setData('text/plain', key);
    dragEvent.dataTransfer.effectAllowed = 'move';
    // Anchor on the shape's first *filled* cell (not the bounding-box corner,
    // which is empty for shapes like N/Z/V) so the drop lands where expected.
    const [grabRow, grabCol] = CARD_BY_KEY.get(key)?.shape[0] ?? [0, 0];
    setDragPayload({ key, grabRow, grabCol });
  };

  const handlePieceDragStart = (key: CardKey, grabRow: number, grabCol: number) => (event: unknown) => {
    const dragEvent = event as DragEvent<HTMLDivElement>;
    dragEvent.dataTransfer.setData('text/plain', key);
    dragEvent.dataTransfer.effectAllowed = 'move';
    setDragPayload({ key, grabRow, grabCol });
  };

  const handleCellDragOver = (row: number, col: number) => (event: DragEvent<HTMLDivElement>) => {
    if (!dragPayload) return;
    event.preventDefault();
    setHoverCell({ row, col });
  };

  const handleCellDrop = (row: number, col: number) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragPayload) {
      tryPlace(dragPayload.key, row - dragPayload.grabRow, col - dragPayload.grabCol);
    }
    resetDragState();
  };

  const handleCellClick = (row: number, col: number) => {
    if (!selectedKey) return;
    const [grabRow, grabCol] = CARD_BY_KEY.get(selectedKey)?.shape[0] ?? [0, 0];
    if (tryPlace(selectedKey, row - grabRow, col - grabCol)) {
      setSelectedKey(null);
    }
  };

  const preview = (() => {
    if (!dragPayload || !hoverCell) return null;
    const card = CARD_BY_KEY.get(dragPayload.key);
    if (!card) return null;
    const row = hoverCell.row - dragPayload.grabRow;
    const col = hoverCell.col - dragPayload.grabCol;
    return {
      cells: cellsFor(card, row, col),
      valid: isValidPlacement(card, row, col, dragPayload.key),
    };
  })();
  const previewValid = preview?.valid ?? false;

  return (
    <BaseLayout variant="puzzle" fullBleed>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Puzzle-Lebenslauf</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-apptext sm:text-4xl">
            Setz dir mein Profil selbst zusammen
          </h1>
          <p className="mt-3 leading-7 text-muted">
            Zieh die sechs Pentomino-Bausteine ins 5×6-Feld. Jeder Baustein zeigt rechts im Menü
            seinen Inhalt, sobald er im Feld liegt. Mit etwas Tüfteln passen alle sechs
            überlappungsfrei zusammen — du kannst sie aber auch einfach frei hin und her ziehen.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,360px)]">
          <div
            className={`space-y-5 rounded-3xl p-1 transition-colors ${
              dragOverPile ? 'bg-primary/5 ring-2 ring-primary/40' : ''
            }`}
            onDragOver={(event) => {
              if (!dragPayload) return;
              event.preventDefault();
              setDragOverPile(true);
            }}
            onDragLeave={() => setDragOverPile(false)}
            onDrop={(event) => {
              event.preventDefault();
              if (dragPayload) removeFromGrid(dragPayload.key);
              resetDragState();
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Bausteine</p>
            <div className="space-y-4">
              <AnimatePresence>
                {pile.map((card) => {
                  const { rows, cols } = boundingSize(card.shape);
                  const Icon = card.icon;
                  const isSelected = selectedKey === card.key;
                  return (
                    <motion.div
                      key={card.key}
                      layoutId={`card-${card.key}`}
                      layout
                      draggable
                      role="button"
                      tabIndex={0}
                      onDragStart={handlePileDragStart(card.key)}
                      onDragEnd={resetDragState}
                      onClick={() => setSelectedKey((current) => (current === card.key ? null : card.key))}
                      onKeyDown={activateOnKey(() =>
                        setSelectedKey((current) => (current === card.key ? null : card.key)),
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`flex cursor-grab items-center gap-3 rounded-2xl border-2 bg-surface p-4 text-left shadow-soft active:cursor-grabbing focus-ring ${
                        isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
                      }`}
                    >
                      <div
                        className="grid shrink-0 gap-[3px]"
                        style={{
                          gridTemplateColumns: `repeat(${cols}, 13px)`,
                          gridTemplateRows: `repeat(${rows}, 13px)`,
                        }}
                      >
                        {Array.from({ length: rows * cols }).map((_, index) => {
                          const r = Math.floor(index / cols);
                          const c = index % cols;
                          const filled = card.shape.some(([sr, sc]) => sr === r && sc === c);
                          return (
                            <span
                              key={index}
                              className={`rounded-[3px] ${filled ? TONE[card.key] : ''}`}
                            />
                          );
                        })}
                      </div>
                      <div className="min-w-0">
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4 shrink-0 text-primary" />
                          <span className="truncate font-semibold text-apptext">{card.label}</span>
                        </span>
                        <span className="mt-1 block text-xs text-muted">{card.hint}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {pile.length === 0 ? (
                <p className="rounded-2xl border-2 border-dashed border-border/60 p-5 text-sm text-muted">
                  Alle Bausteine liegen im Feld.
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Feld · 5×6
              </p>
              <p className="text-xs font-semibold text-muted">{dockedKeys.length} / 6 platziert</p>
            </div>
            <div
              className="mx-auto grid w-full max-w-xl gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
                aspectRatio: `${GRID_COLS} / ${GRID_ROWS}`,
              }}
            >
              {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, index) => {
                const row = Math.floor(index / GRID_COLS);
                const col = index % GRID_COLS;
                return (
                  <div
                    key={`ph-${row}-${col}`}
                    style={{ gridColumn: col + 1, gridRow: row + 1 }}
                    role={selectedKey ? 'button' : undefined}
                    tabIndex={selectedKey ? 0 : undefined}
                    onDragOver={handleCellDragOver(row, col)}
                    onDrop={handleCellDrop(row, col)}
                    onClick={() => handleCellClick(row, col)}
                    onKeyDown={selectedKey ? activateOnKey(() => handleCellClick(row, col)) : undefined}
                    className={`rounded-lg border border-dashed border-border/50 bg-bg/40 ${
                      selectedKey ? 'cursor-pointer hover:border-primary hover:bg-primary/5' : ''
                    }`}
                  />
                );
              })}

              <AnimatePresence>
                {placements.map((placement) => {
                  const card = CARD_BY_KEY.get(placement.key);
                  if (!card) return null;
                  const Icon = card.icon;
                  return card.shape.map(([dr, dc], index) => {
                    const row = placement.row + dr;
                    const col = placement.col + dc;
                    return (
                      <motion.div
                        key={`${placement.key}-${index}`}
                        layout
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`${card.label} zurück in den Stapel legen`}
                        style={{ gridColumn: col + 1, gridRow: row + 1 }}
                        onDragStart={handlePieceDragStart(placement.key, dr, dc)}
                        onDragEnd={resetDragState}
                        onDragOver={handleCellDragOver(row, col)}
                        onDrop={handleCellDrop(row, col)}
                        onClick={() => removeFromGrid(placement.key)}
                        onKeyDown={activateOnKey(() => removeFromGrid(placement.key))}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                        className={`flex cursor-grab items-center justify-center rounded-lg shadow-sm active:cursor-grabbing focus-ring ${TONE[card.key]}`}
                      >
                        {index === 0 ? <Icon className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                      </motion.div>
                    );
                  });
                })}
              </AnimatePresence>

              {preview
                ? preview.cells
                    .filter(([r, c]) => r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS)
                    .map(([r, c], index) => (
                      <div
                        key={`preview-${index}`}
                        style={{ gridColumn: c + 1, gridRow: r + 1 }}
                        className={`pointer-events-none rounded-lg ring-2 ${
                          previewValid ? 'bg-primary/20 ring-primary' : 'bg-rose-500/20 ring-rose-500'
                        }`}
                      />
                    ))
                : null}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Menü</p>
            <div className="mt-5 min-h-[20rem] rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <AnimatePresence initial={false}>
                {dockedKeys.length > 0 ? (
                  <div className="space-y-8">
                    {dockedKeys.map((key, index) => {
                      const card = CARD_BY_KEY.get(key);
                      if (!card) return null;
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className={index > 0 ? 'border-t border-border pt-8' : ''}
                        >
                          <div className="mb-4 flex items-center gap-2.5">
                            <Icon className="h-4 w-4 shrink-0 text-primary" />
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-apptext">
                              {card.label}
                            </h3>
                          </div>
                          <PuzzlePanel cardKey={card.key} />
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-2 text-center"
                  >
                    <p className="font-medium text-apptext">Noch nichts platziert.</p>
                    <p className="max-w-xs text-sm text-muted">
                      Zieh links einen Baustein ins Feld, um loszulegen.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
