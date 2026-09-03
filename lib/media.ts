export type MediaItem = {
  title: string;
  date: string;
  source: string;
  url: string;
  category: 'Research & Academia' | 'Olympiads & Education' | 'Media' | 'Leadership & Community' | 'Earlier Years';
  blurb: string;
  /** Marks the single lead/hero item at the top of the page. */
  hero?: boolean;
  photoId?: string;
};

// Every entry below is corroborated by an independent, named public source
// (national/local Romanian press, an official competition site, or a
// publisher/DOI page), not self-reported. Sourced via web research,
// cross-checked against the CV, September 2026.
//
// Order matters: the hero item leads, then the rest run in descending order
// of press-outlet prominence (national > regional/institutional > niche).
export const mediaItems: MediaItem[] = [
  {
    title: 'A Pitești native behind Romania\'s AI Olympiad success',
    date: 'August 2026',
    source: 'ePitești.ro',
    url: 'https://epitesti.ro/educatie/alex-deonise-absolvent-al-colegiului-bratianu-din-pitesti-implicat-in-performanta-istorica-a-romaniei-la-olimpiada-internationala-de-inteligenta-artificiala',
    category: 'Earlier Years',
    blurb:
      'The most complete profile found: his roots in Pitești, his 2020 graduation from Colegiul Național "Ion C. Brătianu," his path through POLITEHNICA Bucharest, and his role preparing Romania\'s historic IOAI 2026 delegation.',
    hero: true,
  },
  {
    title: "Romania's best-ever result at the International Olympiad in AI",
    date: 'August 2026',
    source: 'Wall-Street.ro / G4Media.ro',
    url: 'https://www.wall-street.ro/articol/educatie/romania-opt-medalii-la-olimpiada-internationala-de-ai-cine-sunt-fantasticii.html',
    category: 'Olympiads & Education',
    blurb:
      "National press coverage of Romania's 4th-place, 8-medal finish (3 gold, 2 silver, 3 bronze) at IOAI 2026 in Astana names him, alongside fellow coach Antonio Bărbălău, as part of the team preparing the delegation.",
    photoId: 'ioai-astana-2026-team',
  },
  {
    title: "Deputy Team Leader for Romania's historic IOAI 2026 performance",
    date: 'August 2026',
    source: 'InstituțiileStatului.ro',
    url: 'https://www.institutiilestatului.ro/actualitate/pitesteanul-deonise-costin-alexandru-parte-din-echipa-care-a-pregatit-romania-pentru-cea-mai-buna-performanta-din-istorie-la-olimpiada-internationala-de-inteligenta-artificiala/',
    category: 'Olympiads & Education',
    blurb:
      "Profile covering his role as Deputy Team Leader for Romania's IOAI delegation, his POLITEHNICA Bucharest teaching post, and his AlphaZ FRC mentoring. The most detailed single press write-up found.",
  },
  {
    title: 'On coaching the IOAI 2026 delegation',
    date: 'August 2026',
    source: 'Aleph News',
    url: 'https://alephnews.ro/educatie/romania-locul-4-la-olimpiada-internationala-de-inteligenta-artificiala-2026-roland-petrean-conteaza-foarte-mult-strategia-din-timpul-concursului-ce-probleme-au-avut-de-rezolvat-e/',
    category: 'Media',
    blurb:
      'Quoted describing the coaching staff\'s role as secondary to the students\' own achievement: "the credit belongs entirely to them; we are just coaches watching from the sidelines."',
  },
  {
    title: 'AlphaZ makes history for Romanian robotics',
    date: 'May 2026',
    source: 'Curierul Zilei',
    url: 'https://curier.ro/2026/05/05/alphaz-a-facut-istorie-pentru-robotica-romaneasca/',
    category: 'Leadership & Community',
    blurb:
      'Reports Team AlphaZ #11141 as the first Romanian team to win an award at a FIRST Robotics Competition World Championship event, naming him as the team\'s primary mentor.',
    photoId: 'alphaz-trophy',
  },
  {
    title: 'AlphaZ wins Rookie All-Star at the FIRST World Championship, Daly Division',
    date: 'May 2026',
    source: 'InstituțiileStatului.ro',
    url: 'https://www.institutiilestatului.ro/actualitate/alphaz-a-castigat-premiul-rookie-all-star-la-campionatul-mondial-first-robotics-competition-in-divizia-daly/',
    category: 'Leadership & Community',
    blurb:
      'Independent coverage of the Houston win, naming him as lead mentor for the 13-student AlphaZ roster from the Faculty of Automatic Control and Computers.',
  },
  {
    title: 'AlphaZ, celebrated for its FIRST Robotics Competition World Championship award',
    date: 'May 2026',
    source: 'AnchetaOnline.ro',
    url: 'https://anchetaonline.ro/echipa-alphaz-premiata-la-campionatul-mondial-first-robotics-competition-315243/',
    category: 'Leadership & Community',
    blurb:
      'Independent coverage of the Rookie All-Star win at the FIRST World Championship in Houston, naming him as a mentor from the Faculty of Automatic Control and Computers.',
  },
  {
    title: 'President, County Council of Students, Argeș',
    date: 'June 2018',
    source: 'POV21',
    url: 'https://pov21.ro/2018/06/26/tanarul-acesta-din-eyp-este-olimpic-la-mate-si-rezolva-cuburi-rubik-cu-ochii-inchisi-voi-il-cunoasteti/',
    category: 'Earlier Years',
    blurb:
      'As a high-school national math-olympiad medalist, elected president of the Consiliul Județean al Elevilor (County Council of Students) of Argeș, and an active member of the European Youth Parliament Romania. His earliest documented leadership role, years before POLITEHNICA and AI research.',
  },
  {
    title: 'National Artificial Intelligence Olympiad, Scientific Committee',
    date: '2025 – 2026',
    source: 'olimpiada-ai.ro (official)',
    url: 'https://olimpiada-ai.ro/ro/echipa',
    category: 'Olympiads & Education',
    blurb: "The Olympiad's own site lists him on its Scientific Committee, affiliated with POLITEHNICA Bucharest.",
  },
];
