/**
 * Doctoral studies: the one place these facts live. Read by the homepage,
 * About, Research, Teaching and the JSON-LD. Source: the CV (Education) and
 * the official admission results and research proposal linked below.
 */
export const doctorate = {
  role: 'Doctoral Researcher',
  institution: 'University POLITEHNICA of Bucharest',
  institutionShort: 'POLITEHNICA Bucharest',
  school: 'Doctoral School of Automatic Control and Computers',
  program: 'PhD in Computers and Information Technology',
  start: 'Oct 2026',
  end: 'Present',
  admission: {
    funding: 'state-funded scholarship',
    rank: 8,
    year: 2026,
    field: 'Computers and Information Technology',
    average: '9.68/10',
    committee: '10/10',
    resultsUrl: 'https://drive.google.com/file/d/1eN73ahDEkvOMZr70K5frNGRPOf5qv3AT/view?usp=drivesdk',
  },
  research: {
    title: 'Secure Energy Efficient Scheduling for AI Workloads',
    proposalUrl: 'https://drive.google.com/file/d/1Dl3TUoFMI8qrxPRtQhX5m_a4xF9YC2EA/view?usp=drivesdk',
    summary:
      'A secure and energy-aware runtime for heterogeneous CPU/GPU/QPU AI workloads, integrating confidential computing, fault tolerance, continual learning, and explicit energy accountability.',
  },
  supervision: {
    description: "Coordinating research with Bachelor's students in AI and distributed systems.",
    papersAccepted: 5,
    venue: 'RoEduNet 2026',
  },
} as const;
