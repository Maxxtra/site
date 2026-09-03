export type ExperienceEntry = {
  slug: string;
  org: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    slug: 'qflex-cto',
    org: 'Qflex Technologies',
    role: 'Chief Technology Officer',
    location: 'Bucharest, RO',
    start: 'Aug 2026',
    end: 'Present',
    bullets: [
      'Lead technical strategy and delivery of custom AI solutions for enterprise clients, from AI audits and system architecture to production-ready implementations.',
      'Design AI-driven systems for document understanding, knowledge retrieval, intelligent device configuration, and reliability testing using fault-injection and resilience frameworks.',
    ],
  },
  {
    slug: 'upb-lecturer',
    org: 'University POLITEHNICA of Bucharest',
    role: 'Associate Lecturer, Industry Expert',
    location: 'Bucharest, RO',
    start: 'Feb 2022',
    end: 'Present',
    bullets: [
      'Lead discussion sections and labs for 1000+ students across Mathematical Modeling, Computer Programming, Programming Paradigms, Parallel and Distributed Algorithms, Communication Protocols, and Numerical Methods.',
      'Assist the course instructor with grading, including planning and evaluating homework, quizzes, and lab reports.',
    ],
  },
  {
    slug: 'ati-ai-engineer',
    org: 'Research Institute',
    role: 'Artificial Intelligence Engineer',
    location: 'Bucharest, RO',
    start: 'Sep 2024',
    end: 'Aug 2026',
    bullets: [
      'Improved entity-centric information extraction by developing LLM-based knowledge graph pipelines with LLaMA, structured prompting, NER, and relation extraction.',
      'Built RAG pipelines with embeddings, document chunking, vector retrieval, and LLM-based answer generation for applied AI research systems.',
      'Extended spaCy-based NLP pipelines for Romanian and multilingual information extraction with custom entity labels and evaluation workflows.',
    ],
  },
  {
    slug: 'bitdefender-ml-engineer',
    org: 'Bitdefender',
    role: 'Junior Machine Learning Engineer',
    location: 'Bucharest, RO',
    start: 'Jul 2023',
    end: 'Sep 2024',
    bullets: [
      'Processed 49k+ sales calls and increased review throughput 3× (40 to 120 calls/day) with a production pipeline for speaker diarization, STT, and automated sentiment/speaker tagging, cutting manual QA effort from 120h/month to 5h/month.',
      'Built a Reddit scraper and LLM-driven pipeline (embeddings, K-means, summarization) that clustered 7k product feedback snippets, improving classification precision from 70% to 97%.',
    ],
  },
  {
    slug: 'ati-ai-engineer-intern-2023',
    org: 'Research Institute',
    role: 'Artificial Intelligence Engineer Intern',
    location: 'Bucharest, RO',
    start: 'Jun 2023',
    end: 'Sep 2023',
    bullets: [
      'Built a modular audio processing toolkit (VAD, STT, diarization), reducing per-file processing time by 35%.',
      'Automated segmentation and transcription for 10k+ audio segments using Pyannote, Whisper, and Pandas, improving diarization accuracy to 92%.',
    ],
  },
  {
    slug: 'ati-ai-engineer-intern-2022',
    org: 'Research Institute',
    role: 'Artificial Intelligence Engineer Intern',
    location: 'Bucharest, RO',
    start: 'Jun 2022',
    end: 'Sep 2022',
    bullets: [
      'Designed and benchmarked an AI evaluation framework across 1M+ audio clips and 4 state-of-the-art VAD systems.',
      'Built a custom CRDNN model achieving 99.8% detection accuracy, surpassing SOTA baselines by 1.4%.',
    ],
  },
  {
    slug: 'orion-innovation-intern',
    org: 'Orion Innovation',
    role: 'Software Engineer Intern',
    location: 'Bucharest, RO',
    start: 'Oct 2021',
    end: 'Jan 2022',
    bullets: [
      'Engineered server-side and UI full-stack applications using Vue.js, Spring/Java, Hibernate, and Java 8/ES6.',
      'Cut average debugging time from 7 to 2 days (71%) by introducing distributed execution patterns (BSP, MapReduce) and containerized microservices with Cloud SQL back-ends.',
    ],
  },
];
