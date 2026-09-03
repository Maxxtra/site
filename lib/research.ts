export type ResearchDirection = {
  slug: string;
  title: string;
  status: 'published' | 'ongoing';
  period: string;
  problem: string;
  approach: string;
  result: string;
  relatedPublications: string[]; // slugs into lib/publications.ts
  relatedProjects?: string[]; // slugs into lib/projects.ts
};

export const researchDirections: ResearchDirection[] = [
  {
    slug: 'scalable-high-order-automatic-differentiation',
    title: 'Scalable High-Order Automatic Differentiation',
    status: 'published',
    period: '2025',
    problem:
      'High-order derivatives (Hessians, and beyond) are central to PDE-constrained deep learning, but computing them at scale is memory- and compute-prohibitive with standard automatic differentiation.',
    approach:
      'Building on the Stochastic Taylor Derivative Estimator (STDE) method (Shi et al., NeurIPS 2024), implemented a multi-GPU JAX version using Taylor-mode AD, randomized jet sampling, and pjit/pmap primitives for cross-GPU parallelism, then applied it to distributed, fault-aware settings.',
    result:
      'A 6.86× runtime speedup and 27% lower GPU memory footprint across 4×V100 GPUs, with near-linear strong scaling and precision to machine epsilon, validated on high-dimensional many-body Schrödinger PDEs. Also presented a parallel/distributed formulation at RoEduNet 2025.',
    relatedPublications: [
      'parallel-distributed-high-order-derivatives-stde',
      'stde-high-order-differential-operators',
    ],
    relatedProjects: ['stde-multi-gpu-jax'],
  },
  {
    slug: 'privacy-preserving-machine-learning',
    title: 'Privacy-Preserving Machine Learning',
    status: 'published',
    period: '2025',
    problem:
      'Running ML inference on sensitive data (health, finance, government) typically requires exposing plaintext data to the model host, creating a privacy and compliance liability.',
    approach:
      'Studied homomorphic encryption schemes for ML inference — encrypting inputs so a model can compute on them without ever decrypting the underlying data.',
    result:
      'Published findings on the accuracy/latency trade-offs of homomorphic-encryption-based inference in the Annals of the Academy of Romanian Scientists (2025).',
    relatedPublications: ['homomorphic-encryption-privacy-preserving-ml'],
  },
  {
    slug: 'llm-systems-for-structured-language',
    title: 'LLM Systems for Structured Language Understanding',
    status: 'ongoing',
    period: '2024 – Present',
    problem:
      'Turning unstructured or spoken language — meeting audio, documents, natural-language queries — into structured, queryable, trustworthy information is still brittle, especially under constrained (non-frontier) open-weight models.',
    approach:
      'At the Advanced Technology Institute, built LLM-based knowledge-graph extraction pipelines (NER, relation extraction, structured prompting), RAG pipelines for domain-specific QA, and natural-language-to-structured-query systems. Separately, built a speaker-attributed meeting-transcription refinement pipeline combining diarization, ASR, and constrained open-weight LLMs.',
    result:
      'The meeting-transcription refinement work was published in Future Generation Computer Systems (Elsevier, 2026), evaluated on the AMI Meeting Corpus. The knowledge-graph and RAG systems are in active use in applied AI research systems at ATI.',
    relatedPublications: ['speaker-attributed-transcription-refinement'],
  },
  {
    slug: 'speech-and-audio-processing',
    title: 'Speech & Audio Processing',
    status: 'published',
    period: '2022 – 2024',
    problem:
      'Reliable speaker diarization and voice-activity detection are prerequisites for almost everything downstream in speech systems, but production audio is noisy and diverse.',
    approach:
      'Benchmarked voice-activity-detection systems across 1M+ audio clips, built a custom CRDNN detection model, and later applied CNN-based speech-activity detection and Pyannote/Whisper-based diarization pipelines in production at Bitdefender.',
    result:
      'A CRDNN model surpassing SOTA VAD baselines by 1.4% (99.8% detection accuracy); a production diarization/STT pipeline that took manual QA effort from 120h/month to 5h/month processing 49k+ calls.',
    relatedPublications: ['improved-speech-activity-detection-cnn', 'microphone-speaker-analysis'],
  },
];
