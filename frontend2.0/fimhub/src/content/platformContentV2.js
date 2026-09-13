export const siteNavigation = [
  { label: 'Pathogenesis', path: '/pathogenesis' },
  { label: 'Explorer', path: '/explorer' },
  { label: 'Papers', path: '/papers' },
  { label: 'Team', path: '/team' },
  { label: 'Guide', path: '/guide' },
];

export const explorerContent = {
  hero: {
    title: 'Mutation Explorer',
    description: 'Select a model, isolate a site, inspect the structure.',
  },
  sections: {
    modelPanel: {
      title: 'Models',
      description:
        'Each entry summarizes host context, glycan background, mutation coverage, and structure availability.',
    },
    residueWorkspace: {
      title: 'Mutation workspace',
      description:
        'Residues are grouped by wild-type position so every substitution at a site can be reviewed together.',
      residuesLabel: 'Residues',
      mutationsLabel: 'Substitutions',
    },
    structurePanel: {
      title: 'Structure and score',
      description:
        'Interpret the selected structure alongside affinity and stability values for that model.',
      ddgBindingLabel: 'dAffinity',
      ddgStabilityLabel: 'dStability',
      affinityLabel: 'Affinity',
      stabilityLabel: 'Stability',
      deltaAffinityLabel: 'dAffinity',
      deltaStabilityLabel: 'dStability',
      crossModelLabel: 'Shared models',
    },
    comparisonTable: {
      title: 'Cross-model comparison',
      description:
        'Use one substitution across multiple models to separate pocket effects from context-dependent shifts.',
    },
  },
  notes: {
    title: 'Readout notes',
    items: [
      'dAffinity and dStability are reported relative to the wild-type baseline inside the active model.',
      'More negative dAffinity values indicate stronger predicted glycan binding than the model reference.',
      'A linked PDB indicates structural coverage for that substitution, not direct experimental proof.',
    ],
  },
};

export const teamContent = {
  hero: {
    kicker: 'BCE, IIT (BHU) Varanasi',
    title: 'Laboratory for Computational Biology & Biomolecular Design (LCBD)',
    description:
      'FimHub was developed at the Laboratory for Computational Biology & Biomolecular Design (LCBD), School of Biochemical Engineering, IIT (BHU) Varanasi.',
  },

  institution: {
    name: 'Laboratory for Computational Biology & Biomolecular Design (LCBD)',
    location:
      'School of Biochemical Engineering, IIT (BHU) Varanasi, Uttar Pradesh, India',
    summary:
      'LCBD investigates the structure-dynamics-function relationships of complex biological systems through computational protein design, multiscale molecular simulations, and machine learning. We decode disease-causing mutations, predict drug resistance, and engineer high-affinity therapeutic binders — with active work in viral pathogenesis, antimicrobial resistance, and neurodegenerative mechanisms.',
  },

  focusAreas: [
    'Computational Protein Design',
    'Molecular Dynamics & Multiscale Simulations',
    'Viral Drug Resistance & Antimicrobial Resistance',
    'Neurodegenerative Disease Mechanisms',
    'Therapeutic Antibody & Nanobody Engineering',
    'Structural & Translational Bioinformatics',
  ],

  team: [
    {
      name: 'Dr. Aditya Kumar Padhi',
      role: 'Principal Investigator & Assistant Professor',
      institution: 'School of Biochemical Engineering, IIT (BHU) Varanasi',
      orcid: '0000-0001-6732-2547',
      email: 'aditya.bce@iitbhu.ac.in',
      profileHref: 'https://www.iitbhu.ac.in/dept/bce/people/adityabce',
      contributions:
        'Dr. Padhi is an INSA Young Associate (2026) and ISCB Young Scientist Awardee with 60+ peer-reviewed publications and 1600+ citations. His research bridges computational protein design with therapeutic discovery, spanning SARS-CoV-2 drug resistance, ALS mechanisms, and engineered nanobodies. He has served as a JSPS Postdoctoral Fellow at RIKEN, Japan, and currently serves as Editor for Biochemical and Biophysical Research Communications and on editorial advisory boards for PCCP (RSC), FEBS Letters, and Microbiology Spectrum (ASM).',
      focus:
        'Computational protein design, disease mutation analysis, and structure-based therapeutics for infectious and neurodegenerative diseases.',
    },
    {
      name: 'Shashank Shekhar',
      role: 'PhD Research Scholar',
      institution: 'LCBD, IIT (BHU) Varanasi',
      orcid: '0009-0006-8815-9367',
      fellowship:
        'UGC Research Fellowship and IIT (BHU) Varanasi Research Fellowship',
      contributions:
        'Lead researcher for FimHub. Drives data generation, structural analysis, mutation scoring, and biological interpretation for the platform.',
      focus:
        'Uropathogenic E. coli adhesion biology and antimicrobial resistance.',
    },
    {
      name: 'Karishma Santani',
      role: 'IDD Student, School of Biochemical Engineering',
      institution: 'LCBD, IIT (BHU) Varanasi',
      contributions:
        'Built the FimHub frontend, interface, and content architecture. Manages platform data curation and user experience.',
    },
  ],
};
