/*
Purpose: A playful, interactive layout — visitors drag puzzle blocks from a pile into board slots to assemble the profile themselves.
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
  X,
  type LucideIcon,
} from 'lucide-react';
import { useState, type DragEvent } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { SocialLinks } from '@/components/ui/SocialLinks';
import BaseLayout from '@/layouts/BaseLayout';
import { cvData } from '@/data/cv-data';

type CardKey = 'profil' | 'erfahrung' | 'ausbildung' | 'skills' | 'projekte' | 'kontakt';

type DragPayload =
  | { key: CardKey; from: 'pile' }
  | { key: CardKey; from: 'slot'; slotIndex: number };

interface CardMeta {
  key: CardKey;
  label: string;
  hint: string;
  icon: LucideIcon;
}

const CARDS: CardMeta[] = [
  { key: 'profil', label: 'Profil', hint: 'Wer ich bin', icon: User },
  { key: 'erfahrung', label: 'Erfahrung', hint: 'Wo ich gearbeitet habe', icon: Briefcase },
  { key: 'ausbildung', label: 'Ausbildung', hint: 'Was ich gelernt habe', icon: GraduationCap },
  { key: 'skills', label: 'Skills', hint: 'Was ich kann', icon: Sparkles },
  { key: 'projekte', label: 'Projekte', hint: 'Was ich gebaut habe', icon: FolderKanban },
  { key: 'kontakt', label: 'Kontakt', hint: 'Wie man mich erreicht', icon: Mail },
];

const CARD_BY_KEY = new Map(CARDS.map((card) => [card.key, card]));

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
 * Renders the puzzle variant: real drag-and-drop blocks that plug into board slots and reveal content on the right.
 */
export default function PuzzleLayout() {
  const [slots, setSlots] = useState<(CardKey | null)[]>(() => CARDS.map(() => null));
  const [selectedKey, setSelectedKey] = useState<CardKey | null>(null);
  const [activeKey, setActiveKey] = useState<CardKey | null>(null);
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  const [dragOverPile, setDragOverPile] = useState(false);

  const dockedKeys = slots.filter((key): key is CardKey => key !== null);
  const pile = CARDS.filter((card) => !dockedKeys.includes(card.key));
  const activeCard = activeKey ? (CARD_BY_KEY.get(activeKey) ?? null) : null;

  const placeInSlot = (slotIndex: number, payload: DragPayload) => {
    setSlots((prev) => {
      const next = [...prev];
      if (payload.from === 'pile') {
        if (next[slotIndex] !== null) return prev;
        next[slotIndex] = payload.key;
      } else {
        if (payload.slotIndex === slotIndex) return prev;
        const displaced = next[slotIndex];
        next[slotIndex] = payload.key;
        next[payload.slotIndex] = displaced;
      }
      return next;
    });
    setActiveKey(payload.key);
  };

  const removeFromSlot = (slotIndex: number) => {
    setSlots((prev) => prev.map((key, index) => (index === slotIndex ? null : key)));
    setActiveKey((current) => (slots[slotIndex] === current ? null : current));
  };

  const handlePileCardClick = (key: CardKey) => {
    setSelectedKey((current) => (current === key ? null : key));
  };

  const handleSlotClick = (slotIndex: number) => {
    const occupant = slots[slotIndex];
    if (occupant) {
      setActiveKey(occupant);
      return;
    }
    if (selectedKey) {
      placeInSlot(slotIndex, { key: selectedKey, from: 'pile' });
      setSelectedKey(null);
    }
  };

  const resetDragState = () => {
    setDragPayload(null);
    setDragOverSlot(null);
    setDragOverPile(false);
  };

  return (
    <BaseLayout variant="puzzle" fullBleed>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Puzzle-Lebenslauf</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-apptext sm:text-4xl">
            Setz dir mein Profil selbst zusammen
          </h1>
          <p className="mt-3 leading-7 text-muted">
            Zieh einen Baustein auf einen freien Slot im Board, um ihn einzudocken — oder tippe erst
            den Baustein und dann einen Slot an. Der Inhalt erscheint rechts.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,260px)_minmax(0,1.2fr)]">
          <div
            className={`space-y-5 rounded-3xl transition-colors ${dragOverPile ? 'bg-primary/5 ring-2 ring-primary/40' : ''}`}
            onDragOver={(event) => {
              if (dragPayload?.from !== 'slot') return;
              event.preventDefault();
              setDragOverPile(true);
            }}
            onDragLeave={() => setDragOverPile(false)}
            onDrop={(event) => {
              event.preventDefault();
              if (dragPayload?.from === 'slot') {
                removeFromSlot(dragPayload.slotIndex);
              }
              resetDragState();
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Bausteine</p>
            <div className="space-y-5">
              <AnimatePresence>
                {pile.map((card) => {
                  const Icon = card.icon;
                  const isSelected = selectedKey === card.key;
                  return (
                    <motion.div
                      key={card.key}
                      layoutId={`card-${card.key}`}
                      layout
                      draggable
                      onDragStart={(event: unknown) => {
                        const dragEvent = event as DragEvent<HTMLDivElement>;
                        dragEvent.dataTransfer.setData('text/plain', card.key);
                        dragEvent.dataTransfer.effectAllowed = 'move';
                        setDragPayload({ key: card.key, from: 'pile' });
                      }}
                      onDragEnd={resetDragState}
                      onClick={() => handlePileCardClick(card.key)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`group relative block w-full cursor-grab select-none rounded-2xl border-2 bg-surface py-4 pl-5 pr-8 text-left shadow-soft transition-colors active:cursor-grabbing focus-ring ${
                        isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 bg-surface transition-colors ${
                          isSelected ? 'border-primary' : 'border-border group-hover:border-primary'
                        }`}
                      />
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="font-semibold text-apptext">{card.label}</span>
                      </span>
                      <span className="mt-1 block text-xs text-muted">{card.hint}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {pile.length === 0 ? (
                <p className="rounded-2xl border-2 border-dashed border-border/60 p-5 text-sm text-muted">
                  Alle Bausteine sind eingedockt.
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Board</p>
            <div className="space-y-5">
              {slots.map((occupantKey, slotIndex) => {
                const occupant = occupantKey ? CARD_BY_KEY.get(occupantKey) : null;
                const isHovered = dragOverSlot === slotIndex;
                const isActive = activeKey === occupantKey;

                const acceptsDrag =
                  dragPayload !== null &&
                  (dragPayload.from === 'slot' || occupant === null || occupant === undefined);

                const dragHandlers = {
                  onDragOver: (event: DragEvent<HTMLDivElement>) => {
                    if (!acceptsDrag) return;
                    event.preventDefault();
                    setDragOverSlot(slotIndex);
                  },
                  onDragLeave: () => setDragOverSlot((current) => (current === slotIndex ? null : current)),
                  onDrop: (event: DragEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    if (dragPayload) placeInSlot(slotIndex, dragPayload);
                    resetDragState();
                  },
                };

                if (!occupant) {
                  return (
                    <div
                      key={slotIndex}
                      data-slot-index={slotIndex}
                      {...dragHandlers}
                      onClick={() => handleSlotClick(slotIndex)}
                      className={`relative cursor-pointer rounded-2xl border-2 border-dashed py-4 pl-8 pr-5 transition-colors ${
                        isHovered || selectedKey
                          ? 'border-primary bg-primary/5'
                          : 'border-border/60'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-dashed bg-bg ${
                          isHovered || selectedKey ? 'border-primary' : 'border-border/60'
                        }`}
                      />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Slot {slotIndex + 1}
                      </span>
                    </div>
                  );
                }

                const Icon = occupant.icon;
                return (
                  <motion.div
                    key={slotIndex}
                    data-slot-index={slotIndex}
                    layoutId={`card-${occupant.key}`}
                    layout
                    draggable
                    onDragStart={(event: unknown) => {
                      const dragEvent = event as DragEvent<HTMLDivElement>;
                      dragEvent.dataTransfer.setData('text/plain', occupant.key);
                      dragEvent.dataTransfer.effectAllowed = 'move';
                      setDragPayload({ key: occupant.key, from: 'slot', slotIndex });
                    }}
                    onDragEnd={resetDragState}
                    {...dragHandlers}
                    onClick={() => handleSlotClick(slotIndex)}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className={`relative block w-full cursor-grab select-none rounded-2xl border-2 py-4 pl-8 pr-10 text-left transition-colors active:cursor-grabbing focus-ring ${
                      isActive ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:border-primary'
                    } ${isHovered ? 'ring-2 ring-primary/40' : ''}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 ${
                        isActive ? 'border-primary bg-primary/10' : 'border-border bg-surface'
                      }`}
                    />
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="font-semibold text-apptext">{occupant.label}</span>
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`${occupant.label} entfernen`}
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFromSlot(slotIndex);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.stopPropagation();
                          event.preventDefault();
                          removeFromSlot(slotIndex);
                        }
                      }}
                      className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-border/60 hover:text-apptext focus-ring"
                    >
                      <X className="h-3.5 w-3.5" />
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Menü</p>
            <div className="mt-5 min-h-[20rem] rounded-3xl border border-border bg-surface p-6 sm:p-8">
              {dockedKeys.length > 1 ? (
                <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-6">
                  {slots.map((key, index) => {
                    if (!key) return null;
                    const card = CARD_BY_KEY.get(key);
                    if (!card) return null;
                    const Icon = card.icon;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveKey(key)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-ring ${
                          activeKey === key
                            ? 'border-primary bg-primary text-white'
                            : 'border-border bg-bg text-apptext hover:border-primary'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {card.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              <AnimatePresence mode="wait">
                {activeCard ? (
                  <motion.div
                    key={activeCard.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PuzzlePanel cardKey={activeCard.key} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-2 text-center"
                  >
                    <p className="font-medium text-apptext">Noch nichts angedockt.</p>
                    <p className="max-w-xs text-sm text-muted">
                      Zieh links einen Baustein auf einen Slot, um loszulegen.
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
