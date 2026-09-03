export type Award = {
  title: string;
  org: string;
  year: string;
  description?: string;
  // Reserved for later: attach a scanned certificate/diploma to an existing
  // achievement instead of a separate "diplomas gallery" — see lib/README.md.
  certificateImage?: string;
  certificateUrl?: string;
};

// Featured: scholarships and research/paper awards — high-signal, shown prominently.
export const featuredAwards: Award[] = [
  {
    title: 'Adobe Systems Romania Scholarship',
    org: 'University POLITEHNICA of Bucharest',
    year: '2026',
    description:
      'Awarded for outstanding academic achievement, research contributions, and involvement in the national AI, AcadNet, and Cybersecurity Olympiads.',
  },
  {
    title: 'Most Impactful Scientific Paper Award — Engineering Domain',
    org: 'University POLITEHNICA of Bucharest',
    year: '2025',
    description: 'For the Stochastic Taylor Derivative Estimator research.',
  },
  {
    title: "Best Scientific Master's Paper Award — Engineering Domain",
    org: 'University POLITEHNICA of Bucharest',
    year: '2025',
  },
  {
    title: '"Teodor Ceaușu" Scholarship for Excellence in Research and Technological Development',
    org: 'University POLITEHNICA of Bucharest',
    year: '2025',
    description: "Awarded to top master's and PhD students for outstanding research performance.",
  },
];

export const scssPlacements: Award[] = [
  { title: 'Services and Applications in Large-Scale Distributed Systems — 2nd Place', org: 'SCSS', year: '2026' },
  { title: 'Distributed Algorithms — 1st Place', org: 'SCSS', year: '2025' },
  { title: 'Cloud/Fog/Edge Applications and Systems — 1st Place', org: 'SCSS', year: '2023' },
  { title: 'Cloud/Fog/Edge Applications and Systems — 2nd Place', org: 'SCSS', year: '2024' },
];

export const internationalPrograms: Award[] = [
  { title: 'Oxford Machine Learning Summer School', org: 'University of Oxford', year: '2024, 2025' },
  { title: 'The Machine Learning Summer School', org: 'Okinawa, Japan', year: '2024' },
  {
    title: 'East European Machine Learning Summer School',
    org: 'Google DeepMind — Košice, Slovakia',
    year: '2023',
  },
  { title: 'International Conference on Computer Vision (ICCV) — Volunteer', org: 'Paris, France', year: '2023' },
  {
    title: 'Conference on Neural Information Processing Systems (NeurIPS) — Volunteer',
    org: 'New Orleans, US',
    year: '2023',
  },
];

// Secondary/archive: competition placements — real, but lower-signal individually.
export const competitionResults: Award[] = [
  { title: 'International Cybersecurity & AI Hackathon — 3rd Place', org: 'AI-based multi-agent crisis decision', year: '2026' },
  { title: 'Nitro Language Processing Hackathon — Top 8% National', org: '', year: '2023' },
  { title: 'LiRo Machine-Learning Romanian NLP Hackathon — 1st Place National', org: '', year: '2022' },
  { title: 'AWS DeepRacer Hackathon — Top 4.8% National', org: 'National Stage', year: '2022' },
  { title: 'Google Hash Code — Top 5% Worldwide', org: '', year: '2022' },
  { title: 'ACM International Collegiate Programming Contest — Top 37%', org: 'Regional Stage', year: '2020, 2021' },
  { title: 'Google Kick Start — Top 40% Worldwide', org: '', year: '2021' },
  { title: 'Bloomberg BPuzzled — Top 5% National', org: '', year: '2021' },
  { title: 'National Mathematics Olympiad — Top 41% National', org: '', year: '2017' },
];

export const roboticsAwards: Award[] = [
  {
    title: 'Rookie All-Star Award — 2026 FIRST Championship, Daly Division',
    org: 'Houston, US',
    year: '2026',
    description: 'First Romanian team to win an award at a FIRST World Championship event.',
  },
  { title: 'Rookie All-Star Award — Ankara Regional', org: 'FIRST Robotics Competition', year: '2026' },
  { title: 'Quality Award — Başkent Regional', org: 'FIRST Robotics Competition', year: '2026' },
];
