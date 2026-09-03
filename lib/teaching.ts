export type TeachingEntry = {
  slug: string;
  role: string;
  org: string;
  period: string;
  description: string;
  highlight?: boolean;
  /** Optional id into lib/photos.ts for an editorial image on this role. */
  photoId?: string;
};

export const teaching: TeachingEntry[] = [
  {
    slug: 'ioai-national-coach',
    role: 'National Team Coach, Romanian Delegation',
    org: 'International Olympiad in Artificial Intelligence (IOAI)',
    period: '2026',
    description:
      "Trained and prepared Romania's national team through technical workshops and competition-focused sessions on LLMs, NLP, embeddings, model evaluation, and adversarial ML. The delegation achieved 8/8 medals (3 Gold, 2 Silver, 3 Bronze) and placed 4th worldwide at IOAI 2026 in Astana — the country's best result in the competition's history.",
    highlight: true,
    photoId: 'onia-national-camp-timisoara-1',
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
      "Mentored Team AlphaZ through its rookie FIRST Robotics Competition season — software, robot strategy, outreach, and public relations. The team won the Rookie All-Star Award at the Ankara Regional, the Quality Award at the Başkent Regional, and the Rookie All-Star Award at the 2026 FIRST Championship (Daly Division, Houston) — the first Romanian team to win an award at a FIRST World Championship event.",
    highlight: true,
    photoId: 'alphaz-trophy',
  },
  {
    slug: 'onia-scientific-committee',
    role: 'Scientific Committee Member',
    org: 'National Artificial Intelligence Olympiad (ONIA)',
    period: '2025, 2026',
    description: 'Developed AI tasks and judging criteria for national-level competition rounds.',
  },
  {
    slug: 'ioai-selection-committee',
    role: 'Organizing Committee Member',
    org: 'National Team Selection for the International Artificial Intelligence Olympiad',
    period: '2025, 2026',
    description:
      'Tested 5+ qualification problems, ensuring correctness and appropriate difficulty calibration for international-level selection rounds.',
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
