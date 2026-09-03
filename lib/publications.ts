export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  date?: string;
  type: 'journal' | 'conference' | 'session';
  doiUrl?: string;
  mirrorUrl?: string;
  awards?: string[];
  highlight?: boolean;
};

export const publications: Publication[] = [
  {
    slug: 'speaker-attributed-transcription-refinement',
    title:
      'Speaker-attributed meeting transcription refinement with constrained open-weight language models',
    authors: [
      'Costin-Alexandru Deonise',
      'T.M. Coconu',
      'Muhammad Bajwa',
      'Cătălin Negru',
      'B.C. Mocanu',
      'Aniello Castiglione',
      'Florin Pop',
    ],
    venue: 'Future Generation Computer Systems (Elsevier)',
    year: 2026,
    date: 'June 2026',
    type: 'journal',
    doiUrl: 'https://www.sciencedirect.com/science/article/pii/S0167739X26002827',
    mirrorUrl:
      'https://www.researchgate.net/publication/406697008_Speaker-attributed_meeting_transcription_refinement_with_constrained_open-weight_language_models',
    highlight: true,
  },
  {
    slug: 'homomorphic-encryption-privacy-preserving-ml',
    title: 'Homomorphic Encryption for Privacy-Preserving Machine Learning Inference',
    authors: [
      'Costin-Alexandru Deonise',
      'A.M. Roangheși',
      'L.I. Gheorghe',
      'E. Simion',
      'B.C. Mocanu',
      'D. Țurcanu',
      'Florin Pop',
    ],
    venue: 'Annals of the Academy of Romanian Scientists, Series on Science and Technology and Information',
    year: 2025,
    date: 'Vol. 18, No. 2, 2025',
    type: 'journal',
    doiUrl: 'https://aos.ro/doi/informatics-2025-2-50-homomorphic-encryption-for-privacy-preserving-machine-learning-inference',
    highlight: true,
  },
  {
    slug: 'parallel-distributed-high-order-derivatives-stde',
    title:
      'Parallel and Distributed Computation of High-Order Derivatives in Neural Networks using Stochastic Taylor Derivative Estimator',
    authors: ['Costin-Alexandru Deonise', 'J. Kołodziej', 'Florin Pop'],
    venue: '2025 24th RoEduNet Conference: Networking in Education and Research',
    year: 2025,
    type: 'conference',
    doiUrl: 'https://ieeexplore.ieee.org/document/11208395/',
  },
  {
    slug: 'stde-high-order-differential-operators',
    title: 'Stochastic Taylor Derivative Estimator for High-Order Differential Operators',
    authors: ['Costin-Alexandru Deonise', 'Florin Pop'],
    venue: "UPB Students' Scientific Communications Session (SCSS 2025)",
    year: 2025,
    type: 'session',
    awards: ['Best Scientific Paper', 'Most Impactful Paper'],
    doiUrl:
      'https://upb.ro/politehnica-bucuresti-preziaza-excelenta-premiul-de-impact-2025-competitia-dintre-lucrarile-stiintifice-studentesti/',
    highlight: true,
  },
  {
    slug: 'microphone-speaker-analysis',
    title: 'Microphone Speaker Analysis: Audio Segmentation and Frequency Insights',
    authors: ['T.M. Coconu', 'Costin-Alexandru Deonise', 'C. Anghel', 'C. Negru', 'Florin Pop'],
    venue: 'Annals of the Academy of Romanian Scientists',
    year: 2024,
    type: 'journal',
  },
  {
    slug: 'improved-speech-activity-detection-cnn',
    title: 'Improved Speech Activity Detection Model Using Convolutional Neural Networks',
    authors: ['Costin-Alexandru Deonise', 'T.M. Coconu', 'T. Rebedea', 'Florin Pop'],
    venue: '2023 22nd RoEduNet Conference: Networking in Education and Research',
    year: 2023,
    type: 'conference',
    doiUrl: 'https://ieeexplore.ieee.org/document/10274921/',
    mirrorUrl:
      'https://www.researchgate.net/publication/374659730_Improved_Speech_Activity_Detection_Model_Using_Convolutional_Neural_Networks',
  },
];
