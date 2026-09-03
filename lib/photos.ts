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
    // Ankara Regional per the account holder; award independently verified via the
    // official FIRST Inspires results page (frc-events.firstinspires.org/2026/tuak/awards).
    alt: 'Holding the Rookie All-Star award and trophy behind Team AlphaZ robot #11141, draped in the Romanian flag',
    caption: 'Team AlphaZ — Ankara Regional, FIRST Robotics Competition, 2026 (Rookie All-Star Award)',
    date: '2026',
    category: 'robotics',
    orientation: 'portrait',
    featured: true,
    verified: true,
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
    // Specific event/venue not confirmed by the account holder — kept intentionally
    // neutral. Update this one field once the event is identified; nothing else
    // needs to change.
    alt: 'Speaking with a microphone during a technical session',
    caption: 'Speaking at a technical session',
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
