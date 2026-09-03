export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  links?: ProjectLink[];
  /** Optional id into lib/photos.ts for an editorial image on this project. */
  photoId?: string;
  /** Optional additional photos, shown as a small strip below the summary. */
  secondaryPhotoIds?: string[];
};

export const projects: Project[] = [
  {
    slug: 'algotrack',
    title: 'AlgoTrack',
    period: '2025 – Present',
    summary:
      'A tutoring and education platform for tracking student progress, attendance, and pbInfo problem-set performance, built end to end and deployed in production.',
    bullets: [
      'Full-stack platform (Next.js, PostgreSQL, Railway) covering student progress tracking, attendance, tutoring session management, and cohort analytics.',
      'Companion Chrome extension integrates with pbInfo to pull problem-set and submission data automatically.',
      'Deployed and actively used in production at algotrack.deonise.ro.',
    ],
    stack: ['Next.js', 'PostgreSQL', 'Railway', 'Chrome Extension'],
    links: [{ label: 'algotrack.deonise.ro', href: 'https://algotrack.deonise.ro' }],
  },
  {
    slug: 'stde-multi-gpu-jax',
    title: 'Stochastic Taylor Derivative Estimator for High-Order Differential Operators 2',
    period: 'May 2025',
    summary:
      'Multi-GPU JAX implementation enabling scalable high-order automatic differentiation, validated on high-dimensional many-body Schrödinger PDEs.',
    bullets: [
      'Implemented a multi-GPU version of STDE in JAX using Taylor-mode AD, randomized jet sampling, and pjit/pmap primitives for cross-GPU parallelism.',
      'Achieved a 6.86× runtime speedup and 27% lower GPU memory footprint across 4×V100 GPUs by parallelizing jet-level contractions and minimizing inter-device synchronization.',
      'Sustained numerical precision to machine epsilon with near-linear strong scaling; results published and awarded Best Scientific Paper and Most Impactful Paper (Engineering).',
    ],
    stack: ['JAX', 'CUDA', 'Multi-GPU (pjit/pmap)'],
    links: [{ label: 'Related publication', href: '/publications#stde-high-order-differential-operators' }],
  },
  {
    slug: 'atlasrag',
    title: 'AtlasRAG · Multimodal Retrieval-Augmented Reasoning System',
    period: 'Aug 2025',
    summary:
      'A multimodal RAG framework fusing LLaMA 3.2-70B and Mistral-v0.3 with knowledge-graph grounding and hybrid retrieval, built to cut hallucination and latency.',
    bullets: [
      'Reached 94.1% factual consistency and a 45% reduction in hallucination rate vs. a GPT-5 baseline, combining LLaMA 3.2-70B and Mistral-v0.3 with Neo4j knowledge-graph grounding and hybrid FAISS/BM25 retrieval.',
      'Boosted cross-modal retrieval precision to 88% with text-image-audio fusion (CLIP-ViT, Whisper embeddings) unified through a LangGraph agentic planner.',
      'Lowered end-to-end latency by 61% (p95 = 1.3s) via LoRA fine-tuning, 4-bit GGUF quantization, and asynchronous vector-store caching in a containerized inference mesh.',
    ],
    stack: ['LLaMA 3.2-70B', 'Mistral', 'Neo4j', 'FAISS', 'LangGraph', 'CLIP', 'Whisper'],
  },
  {
    slug: 'alphaz-frc',
    title: 'AlphaZ · FIRST Robotics Competition, Team #11141',
    period: '2026',
    summary:
      "Lead mentor for a rookie FIRST Robotics Competition team, from turret targeting software to a World Championship award, the team's first for a Romanian FRC squad.",
    bullets: [
      'Developed a ballistic targeting system for turret control using projectile-motion equations and dynamic distance estimation, achieving <5% targeting error.',
      'Implemented autonomous detection, alignment, and firing routines, removing manual intervention during match operation.',
      'Trained and deployed a YOLO-based computer vision model for real-time object detection at 90% precision.',
      'Won Rookie All-Star (Ankara Regional), Quality Award (Başkent Regional), and Rookie All-Star at the 2026 FIRST Championship (Daly Division, Houston), the first Romanian team to win an award at a FIRST World Championship event.',
    ],
    stack: ['Java/WPILib', 'Computer Vision (YOLO)', 'Embedded Systems'],
    photoId: 'alphaz-trophy',
  },
  {
    slug: 'aml-detection',
    title: 'Anti Money Laundering Detection',
    period: 'Mar 2024',
    summary:
      'A production-oriented anomaly-detection system for transaction monitoring, trained on 32M+ transactions.',
    bullets: [
      'Achieved 95% precision and 96% recall on 32M+ transactions with a 5-layer sparse autoencoder (BatchNorm, Dropout, MSE + L1 sparsity, AUCPR-optimized thresholding).',
      'Reduced false positives by 18% and improved convergence by 42% via timestamp normalization and cyclical learning-rate scheduling (OneCycle/Adam).',
      'Cut inference latency from 3.2s to 0.8s per transaction, deploying TensorFlow Serving behind Kubernetes HPA with Kafka streaming ingress.',
    ],
    stack: ['TensorFlow', 'Kubernetes', 'Kafka', 'Feast'],
  },
];
