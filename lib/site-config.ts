export const siteConfig = {
  /** Canonical professional name. Use this form everywhere on the site. */
  name: 'Costin-Alexandru Deonise',
  shortName: 'Alex Deonise',
  /**
   * Legitimate variants that refer to the same person and appear in press,
   * institutional pages and profile handles. Fed to schema.org alternateName
   * so search engines can resolve them to one entity.
   */
  alternateNames: [
    'Alex Deonise',
    'Costin Alexandru Deonise',
    'Deonise Costin-Alexandru',
    'Deonise Costin Alexandru',
  ],
  tagline: 'AI & Distributed Systems Researcher / Engineer',
  positioning:
    'PhD-track researcher at POLITEHNICA Bucharest, CTO building production AI systems, and Deputy Leader & National Team Coach for Romania’s AI Olympiad (IOAI) delegation.',
  url: 'https://costinalexandru.deonise.ro',
  email: 'deonisealex@gmail.com',

  // --- Identity profiles (sameAs candidates) --------------------------------
  // Only URLs verified to belong to this person. ORCID and DBLP are
  // deliberately absent: no verified profile has been confirmed, and inventing
  // one would poison entity resolution. Add them here once they exist and they
  // flow into the JSON-LD automatically.
  github: 'https://github.com/Maxxtra',
  linkedin: 'https://www.linkedin.com/in/alex-deonise-32500520b/',
  scholar: 'https://scholar.google.com/citations?user=G-lXVqcAAAAJ&hl=en',
  orcid: '',
  dblp: '',

  // --- Other properties -----------------------------------------------------
  algotrack: 'https://algotrack.deonise.ro',
  ogImage: '/og-image.jpg',
  portrait: '/media/portraits/costin-portrait.jpg',
} as const;

/** Verified profile URLs only, for schema.org sameAs. Empty entries dropped. */
export const sameAsProfiles: string[] = [
  siteConfig.scholar,
  siteConfig.linkedin,
  siteConfig.github,
  siteConfig.orcid,
  siteConfig.dblp,
].filter(Boolean);
