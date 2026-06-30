import type { CVData } from '@/types/cv.types';

export const cvData: CVData = {
  personal: {
    name: 'Max Mustermann',
    title: 'Angehender Webentwickler | IT-Auszubildender',
    avatar: '/avatar.jpg',
    email: 'max@example.com',
    phone: '+49 123 456789',
    location: 'Berlin, Deutschland',
    bio:
      'Leidenschaftlicher IT-Lernender mit Fokus auf moderne Webtechnologien, sauberen Code und nutzerfreundliche Oberflächen. ' +
      'Ich lerne gern schnell, arbeite strukturiert und setze Projekte mit hoher Sorgfalt um.',
    // English alternative: "Passionate IT learner focused on modern web technologies, clean code, and user-friendly interfaces."
    logoText: 'MM',
    social: {
      github: 'https://github.com/maxmustermann',
      linkedin: 'https://linkedin.com/in/maxmustermann',
      website: 'https://maxmustermann.dev',
    },
  },
  skills: [
    { name: 'TypeScript', level: 80, category: 'language' },
    { name: 'React', level: 78, category: 'framework' },
    { name: 'HTML & CSS', level: 88, category: 'language' },
    { name: 'Tailwind CSS', level: 84, category: 'tool' },
    { name: 'Node.js', level: 70, category: 'platform' },
    { name: 'SQL', level: 66, category: 'language' },
    { name: 'Git & GitHub', level: 82, category: 'tool' },
    { name: 'Figma', level: 58, category: 'other' },
  ],
  experience: [
    {
      company: 'Beispiel GmbH',
      role: 'Fachinformatiker Azubi (Anwendungsentwicklung)',
      start: '09/2023',
      end: 'heute',
      description:
        'Entwicklung interner Webanwendungen mit React und TypeScript, Unterstützung bei API-Integrationen und Pflege von UI-Komponenten.',
      tags: ['React', 'TypeScript', 'REST', 'Git'],
      location: 'Berlin',
    },
    {
      company: 'Schulprojekt TeamLab',
      role: 'Frontend-Entwicklung & Teamkoordination',
      start: '2022',
      end: '2023',
      description:
        'Umsetzung eines Teamportals für Projektplanung, Feedback und Dokumentation mit Fokus auf mobile Nutzung und klare Informationsarchitektur.',
      tags: ['Vite', 'Tailwind', 'UX'],
    },
  ],
  education: [
    {
      institution: 'Berufsschule Berlin',
      degree: 'Fachinformatiker für Anwendungsentwicklung',
      start: '2023',
      end: '2026',
      description:
        'Schwerpunkte: Softwareentwicklung, Datenbanken, Netzwerke, Qualitätssicherung und Projektmanagement.',
    },
    {
      institution: 'Integrierte Gesamtschule Mitte',
      degree: 'Abitur',
      start: '2020',
      end: '2023',
    },
  ],
  projects: [
    {
      title: 'StudyBoard',
      description:
        'Lern- und Aufgabenboard für Azubis mit Fokus auf Priorisierung, Statusübersicht und klaren Tageszielen.',
      tags: ['React', 'TypeScript', 'UX'],
      liveUrl: 'https://example.com/studyboard',
      repoUrl: 'https://github.com/maxmustermann/studyboard',
      image: '/projects/project1.jpg',
      featured: true,
    },
    {
      title: 'JobPulse',
      description:
        'Dashboard zur Sammlung von Bewerbungsständen, Fristen und Feedback für den Ausbildungsstart.',
      tags: ['Vite', 'API', 'Dashboard'],
      repoUrl: 'https://github.com/maxmustermann/jobpulse',
      featured: false,
    },
    {
      title: 'Portfolio Templates',
      description:
        'Mehrere CV-Layouts als Designreferenz mit zentraler Datenquelle und Dark-Mode-Unterstützung.',
      tags: ['Tailwind', 'Design System', 'Motion'],
      liveUrl: 'https://example.com/templates',
      featured: true,
    },
  ],
  certifications: [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: 2024,
    },
    {
      name: 'Scrum Foundation Professional Certificate',
      issuer: 'CertiProf',
      year: 2024,
    },
  ],
  languages: [
    { language: 'Deutsch', level: 'Muttersprache' },
    { language: 'Englisch', level: 'B2 / Beruflich' },
  ],
};
