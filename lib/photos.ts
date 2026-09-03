export type PhotoCategory = 'olympiads' | 'robotics' | 'university' | 'research' | 'portraits';

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date?: string;
  category: PhotoCategory;
  orientation: 'landscape' | 'portrait' | 'square';
  featured?: boolean;
  /** false = context is not independently confirmed; caption is intentionally neutral. */
  verified: boolean;
};

// Real, supplied photographs only — no stock imagery. Captions are read directly
// off visible banners/slides where possible; otherwise kept neutral until confirmed.
export const photos: Photo[] = [
  {
    id: 'ioai-astana-2026-team',
    src: '/media/olympiads/ioai-astana-2026-team.jpg',
    alt: "Team Romania at IOAI Astana 2026, holding the Romanian flag, wearing medals",
    caption: 'Team Romania, International Olympiad in AI — Astana, 2026',
    date: '2026',
    category: 'olympiads',
    orientation: 'landscape',
    featured: true,
    verified: true,
  },
  {
    id: 'onia-national-camp-timisoara-1',
    src: '/media/olympiads/onia-national-camp-timisoara-1.jpg',
    alt: 'Presenting "Contemporary Methods in Artificial Intelligence Systems" at the National Team Camp',
    caption: 'National Team Camp, Timișoara — 2026',
    date: '2026',
    category: 'olympiads',
    orientation: 'portrait',
    featured: true,
    verified: true,
  },
  {
    id: 'onia-national-camp-timisoara-2',
    src: '/media/olympiads/onia-national-camp-timisoara-2.jpg',
    alt: 'Presenting "NLP Fundamentals" at the National Team Camp',
    caption: 'National Team Camp, Timișoara — 2026',
    date: '2026',
    category: 'olympiads',
    orientation: 'portrait',
    verified: true,
  },
  {
    id: 'alphaz-trophy',
    src: '/media/robotics/alphaz-trophy.jpg',
    alt: 'Holding the "Uncover the Future" award and trophy behind Team AlphaZ robot #11141, draped in the Romanian flag',
    caption: 'Team AlphaZ, FIRST Robotics Competition — 2026',
    date: '2026',
    category: 'robotics',
    orientation: 'portrait',
    featured: true,
    verified: true,
  },
  {
    id: 'alphaz-istanbul-regional',
    src: '/media/robotics/alphaz-istanbul-regional.jpg',
    // Event name/date read directly off the event banner in the photo — not independently
    // confirmed against the CV's listed Ankara/Başkent/Houston events. Flagged for the user.
    alt: 'Team AlphaZ group photo at the İstanbul Bosphorus regional event, with Romanian and Ukrainian flags',
    caption: 'Team AlphaZ — İstanbul Bosphorus Regional, FIRST Robotics Competition, 2026',
    date: '2026',
    category: 'robotics',
    orientation: 'landscape',
    verified: false,
  },
  {
    id: 'graduation-diploma',
    src: '/media/university/graduation-diploma.jpg',
    alt: 'Receiving a diploma on stage, wearing a Faculty of Automatic Control and Computers graduation sash',
    caption: 'Graduation, Faculty of Automatic Control and Computers — Class of 2024',
    date: '2024',
    category: 'university',
    orientation: 'landscape',
    featured: true,
    verified: true,
  },
  {
    id: 'graduation-ceremony-crowd',
    src: '/media/university/graduation-ceremony-crowd.jpg',
    alt: 'Graduating class in caps and gowns at the POLITEHNICA Bucharest graduation ceremony',
    caption: 'Graduation ceremony, Faculty of Automatic Control and Computers, POLITEHNICA Bucharest',
    date: '2024',
    category: 'university',
    orientation: 'landscape',
    verified: true,
  },
  {
    id: 'conference-session',
    src: '/media/research/conference-session.jpg',
    // Specific event/venue not confirmed — kept intentionally neutral.
    alt: 'Speaking with a microphone during a conference session',
    caption: 'Speaking at a conference session',
    category: 'research',
    orientation: 'landscape',
    verified: false,
  },
  {
    id: 'costin-portrait',
    src: '/media/portraits/costin-portrait.jpg',
    alt: 'Portrait of Costin-Alexandru Deonise',
    caption: 'Costin-Alexandru Deonise',
    category: 'portraits',
    orientation: 'square',
    verified: true,
  },
];

export function getPhoto(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}
