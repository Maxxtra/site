export type TeachingEntry = {
  slug: string;
  role: string;
  org: string;
  period: string;
  description: string;
  highlight?: boolean;
  /** Optional id into lib/photos.ts for an editorial image on this role. */
  photoId?: string;
  /** Optional path under /media/... to a certificate/diploma image. */
  certificateImage?: string;
  /** Optional additional evidence links (e.g. an authored problem on a platform). */
  links?: { label: string; href: string }[];
};

export const teaching: TeachingEntry[] = [
  {
    slug: 'ioai-national-coach',
    role: 'Deputy Leader & National Team Coach, Romanian Delegation',
    org: 'International Olympiad in Artificial Intelligence (IOAI)',
    period: '2026',
    description:
      "Led preparation of Romania's national team as Deputy Leader and Coach, running technical workshops and competition-focused sessions on LLMs, NLP, embeddings, model evaluation, and adversarial ML. The delegation achieved 8/8 medals (3 Gold, 2 Silver, 3 Bronze) and placed 4th worldwide at IOAI 2026 in Astana, the country's best result in the competition's history.",
    highlight: true,
    photoId: 'onia-national-camp-timisoara-1',
    certificateImage: '/media/olympiads/ioai-2026-observer-certificate.jpg',
  },
  {
    slug: 'upb-associate-lecturer',
    role: 'Associate Lecturer, Industry Expert',
    org: 'University POLITEHNICA of Bucharest',
    period: 'Feb 2022 – Present',
    description:
      'Led discussion sections and labs for 1000+ students across Mathematical Modeling, Computer Programming, Programming Paradigms, Parallel and Distributed Algorithms, Communication Protocols, and Numerical Methods.',
    highlight: true,
  },
  {
    slug: 'mlsp-trainer-organizer',
    role: 'Trainer & Organizer',
    org: 'Machine Learning Summer Program (MLSP), POLITEHNICA Bucharest',
    period: '2024 – 2026',
    description:
      'Contributed to student selection, research-project design, mentor matching, and technical training over 3 editions. In 2026, selected 50 students from 144 applicants, with 13 advancing to mentored research projects.',
    highlight: true,
  },
  {
    slug: 'alphaz-frc-mentor',
    role: 'Lead Mentor, AlphaZ FRC Team #11141',
    org: 'FIRST Robotics Competition',
    period: '2026',
    description:
      "Mentored Team AlphaZ through its rookie FIRST Robotics Competition season: software, robot strategy, outreach, and public relations. The team won the Rookie All-Star Award at the Ankara Regional, the Quality Award at the Başkent Regional, and the Rookie All-Star Award at the 2026 FIRST Championship (Daly Division, Houston), the first Romanian team to win an award at a FIRST World Championship event.",
    highlight: true,
    photoId: 'alphaz-trophy',
  },
  {
    slug: 'onia-scientific-committee',
    role: 'Central Committee Member',
    org: 'National Artificial Intelligence Olympiad (ONIA), national stage',
    period: '17–20 Apr 2026',
    description:
      'Developed AI tasks and judging criteria for the national round.',
    certificateImage: '/media/olympiads/onia-2026-committee-diploma.jpg',
  },
  {
    slug: 'ioai-selection-committee',
    role: 'Committee Member, Extended Team Selection & Training Camp',
    org: 'National Team Selection for the International Artificial Intelligence Olympiad',
    period: '21–25 May 2026, Timișoara',
    description:
      'Authored "Arhiva contradicțiilor" ("Archive of Contradictions"), one of six official tasks for Romania\'s IOAI selection rounds. Also helped run the national team training camp in Timișoara, presenting "Contemporary Methods in Artificial Intelligence Systems," and tested qualification problems for correctness and difficulty calibration.',
    certificateImage: '/media/olympiads/onia-timisoara-camp-diploma.jpg',
    links: [
      { label: 'View authored problem', href: 'https://platform.olimpiada-ai.ro/ro/problems/276' },
      { label: 'View training materials', href: 'https://platform.olimpiada-ai.ro/ro/roadmap/practical-exercises' },
    ],
  },
  {
    slug: 'ioai-restricted-team-training',
    role: 'Trainer, Restricted Team Training',
    org: 'International Artificial Intelligence Olympiad, Romanian Delegation',
    period: '5–7 Jun 2026',
    description:
      'Presented "IOAI Survival Kit," a session on approaching unfamiliar ML tasks (baselines, feature engineering, embeddings, pretrained models, rapid validation), and co-ran an NLP pipeline engineering workshop for the restricted team.',
    links: [
      { label: 'View training materials', href: 'https://platform.olimpiada-ai.ro/ro/roadmap/practical-exercises2' },
    ],
  },
  {
    slug: 'infoed-digital-innovation-committee',
    role: 'Central Committee Member',
    org: 'National Olympiad of Digital Innovation and Creation (InfoEd), national stage',
    period: '28–31 Jul 2026, Focșani',
    description: 'Served on the Central Committee for the national stage of the competition.',
    certificateImage: '/media/olympiads/infoed-2026-committee-diploma.jpg',
  },
  {
    slug: 'cybersecurity-olympiad-committee',
    role: 'Scientific Committee Member',
    org: 'National Cybersecurity Olympiad',
    period: '2025, 2026',
    description: 'Defined evaluation standards and designed 3 competition tasks, supporting consistent and fair scoring.',
  },
  {
    slug: 'acadnet-committee',
    role: 'Scientific Committee Member',
    org: 'National Olympiad of Applied Informatics (AcadNet)',
    period: '2025, 2026',
    description:
      'Contributed to the proposal and selection of 30+ algorithmic problems, defining evaluation criteria and scoring rubrics.',
  },
  {
    slug: 'nitro-nlp-mentor',
    role: 'Mentor',
    org: 'Nitro NLP Hackathon',
    period: '2025',
    description: 'Mentored 45 NLP teams, guiding model fine-tuning and evaluation pipelines.',
  },
  {
    slug: 'ren-reviewer',
    role: 'Reviewer',
    org: 'Romanian Education Network',
    period: '2024, 2025',
    description: 'Reviewed and provided feedback on machine learning research papers.',
  },
  {
    slug: 'endoscopy-reviewer',
    role: 'Peer Reviewer',
    org: 'Endoscopy International Open',
    period: '2026',
    description: 'Reviewed submitted scientific manuscripts and provided peer-review feedback.',
  },
];
