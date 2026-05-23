import catchBondImage from '../assets/rpec/fimh-catch-bond.png';
import fimhUpkOmOverviewImage from '../assets/manuscript/fimh-upk-om3-om6-overview.png';
import mutationVolcanoHistogramImage from '../assets/manuscript/mutation-volcano-histogram.png';
import om3DockingInteractionsImage from '../assets/manuscript/om3-docking-interactions.png';
import om6DockingInteractionsImage from '../assets/manuscript/om6-docking-interactions.png';
import type1PilusImage from '../assets/rpec/type1-pilus.png';
import upkComparisonValidationImage from '../assets/manuscript/upk-comparison-validation.png';
import upecInvasionImage from '../assets/rpec/upec-invasion.png';

export const siteNavigation = [
  { label: 'Pathogenesis', path: '/pathogenesis' },
  { label: 'Explorer', path: '/explorer' },
  { label: 'Papers', path: '/papers' },
  { label: 'Team', path: '/team' },
  { label: 'Guide', path: '/guide' },
];

export const homeContent = {
  hero: {
    title: 'How FimH helps UPEC stay attached to the bladder.',
    description:
      'FimHub connects structural models, mutation-level scoring, and host glycan context to explain how FimH reshapes uroplakin recognition across human and porcine systems.',
    image: catchBondImage,
    imageAlt: 'FimH catch-bond schematic used as the home hero visual.',
    primaryCta: { label: 'Explore the Science', href: '/pathogenesis' },
    secondaryCta: { label: 'Open Mutation Explorer', href: '/explorer' },
  },
  insights: [
    {
      stat: '400M+',
      headline: 'Estimated UTI cases worldwide each year',
      description:
        'UTIs remain one of the most common bacterial infections globally.',
    },
    {
      stat: '75%',
      headline: 'Community-acquired cases tied to UPEC',
      description:
        'Uropathogenic E. coli remains the leading cause of uncomplicated bladder infection.',
    },
    {
      stat: '50%',
      headline: 'Women affected at least once in life',
      description:
        'High lifetime exposure keeps recurrence and prevention at the center of UTI research.',
    },
    {
      stat: '545',
      headline: 'FimH mutant designs profiled here',
      description:
        'The study tracks how single substitutions can strengthen, weaken, or redirect glycan recognition.',
    },
  ],
  stats: [
    {
      value: '400M+',
      label: 'UTI cases reported globally each year',
      source: 'Zeng et al. 2022',
    },
    {
      value: '75%',
      label: 'Community-acquired UTIs attributed to UPEC',
      source: 'Medina and Castillo-Pino 2019',
    },
    {
      value: '50%',
      label: 'Women who experience at least one UTI in life',
      source: 'Salvatore et al. 2011',
    },
    {
      value: '545',
      label: 'Mutant designs examined across four UPK-glycan systems',
      source: 'Shekhar, Bhagat and Padhi 2025',
    },
  ],
  trivia: {
    title: 'Scientific hook',
    statement:
      'Under urinary flow, FimH can clamp down more tightly on the bladder surface instead of letting go.',
    citation:
      'Catch-bond behavior reported for FimH in Sauer et al. 2016 and related studies.',
  },
  previewCards: [
    {
      title: 'Pathogenesis',
      description:
        'Follow the route from UTI burden to epithelial docking, invasion, intracellular growth, and recurrence.',
      href: '/pathogenesis',
      image: fimhUpkOmOverviewImage,
      imageAlt:
        'Manuscript figure showing FimH interaction with uroplakin-linked OM3 and OM6 glycans.',
    },
    {
      title: 'Explorer',
      description:
        'Inspect single substitutions, review structural context, and compare shared mutations across models.',
      href: '/explorer',
      image: mutationVolcanoHistogramImage,
      imageAlt:
        'Mutation overview figure with volcano plot and ranked histogram from the manuscript.',
    },
    {
      title: 'Papers',
      description:
        'Browse the literature behind the structural, biological, and computational framing of this work.',
      href: '/papers',
      image: upkComparisonValidationImage,
      imageAlt:
        'Manuscript figure comparing human and porcine uroplakin models and validation.',
    },
  ],
};

export const pathogenesisPageContent = {
  hero: {
    title: 'A common UTI becomes a persistence problem when UPEC holds on.',
    description:
      'This page starts with UTI as a broad clinical problem, then narrows to the moment that makes UPEC different: a successful adhesive contact with the bladder surface.',
    image: upecInvasionImage,
    imageAlt:
      'Illustration of UPEC approaching and attaching to the urothelial surface.',
    statements: [
      'UTI is common, but not every urinary pathogen behaves like UPEC.',
      'UPEC is chosen here because its first decisive step is mechanically and structurally clear.',
      'That lets the infection mechanism be told as a visual chain instead of a wall of text.',
    ],
  },
  context: {
    title: 'UTI, briefly',
    description:
      'Urinary tract infection covers microbial colonization of the urethra, bladder, ureter, or kidney, but uncomplicated disease is most often discussed at the level of the bladder. The important point for this page is simple: infection begins in a wet, high-flow environment where attachment is difficult.',
    causes: [
      {
        title: 'Ascending bacteria',
        text: 'Most uncomplicated infection starts when bacteria move upward from the periurethral region into the bladder.',
      },
      {
        title: 'Complicated settings',
        text: 'Catheters, obstruction, instrumentation, and hospitalization can broaden the pathogen landscape and support persistence.',
      },
      {
        title: 'Why this page follows UPEC',
        text: 'UPEC remains the clearest model because its opening move is sharp: it must attach, resist washout, and turn first contact into invasion.',
      },
    ],
    focusTitle: 'Why this project narrows to FimH',
    focusText:
      'Many organisms can cause UTI, but FimH gives UPEC a clean mechanistic entry point. It lets the infection story move from clinical microbiology to a defined host receptor, a force-sensitive adhesin, and a pocket where small changes can matter.',
  },
  story: {
    title: 'The infection story of UPEC',
    description:
      'The visual sequence below follows the part of pathogenesis this project cares about most: ascent, first contact, receptor recognition, and what becomes possible once adhesion succeeds.',
    beats: [
      {
        number: '01',
        title: 'UPEC reaches the bladder but is still easy to lose',
        text: 'Reaching umbrella cells is not enough. Before stable adhesion, urinary flow works against colonization and transient encounters are constantly broken.',
        figure: {
          image: upecInvasionImage,
          imageAlt:
            'Illustration showing UPEC approaching the bladder epithelium.',
          caption:
            'The earliest stage of pathogenesis is a brief encounter with the urothelial surface.',
        },
      },
      {
        number: '02',
        title: 'FimH is built to start the contact',
        text: 'Type 1 pili extend FimH away from the bacterial surface, and the adhesin can tighten its grip under force. That combination is why the first attachment step is both mechanical and molecular.',
        figures: [
          {
            title: 'Type 1 pilus',
            image: type1PilusImage,
            imageAlt: 'Type 1 pilus diagram with FimH at the distal tip.',
            caption:
              'The pilus presents FimH at the point of first host contact.',
            frameClassName: 'min-h-[18rem] md:min-h-[24rem]',
            imageClassName: 'h-full w-auto object-contain',
          },
          {
            title: 'Catch-bond logic',
            image: catchBondImage,
            imageAlt:
              'Structural comparison of FimH binding states under force.',
            caption:
              'Under flow, the adhesive state can become more stable rather than weaker.',
          },
        ],
      },
      {
        number: '03',
        title: 'Attachment becomes receptor-specific at the uroplakin surface',
        text: 'FimH does not simply stick to membrane. It recognizes high-mannose glycans presented by the uroplakin complex, turning adhesion into a structurally defined host-pathogen interaction.',
        figure: {
          image: fimhUpkOmOverviewImage,
          imageAlt:
            'Overview of FimH interacting with uroplakin-associated OM3 and OM6 glycans.',
          caption:
            'The manuscript overview figure links FimH directly to the UPK-linked OM3 and OM6 glycan contexts studied here.',
          frameClassName: 'min-h-[22rem] md:min-h-[30rem]',
        },
      },
    ],
    aftermath: {
      title: 'Once adhesion holds, the rest of pathogenesis can unfold',
      text: 'Stable contact opens the door to invasion, intracellular community formation, reseeding, and recurrence. This is why the first adhesive event is worth isolating so carefully.',
      phases: [
        'Attach to umbrella cells',
        'Invade superficial cells',
        'Form intracellular communities',
        'Reseed the lumen',
        'Drive recurrent episodes',
      ],
    },
  },
  projectFocus: {
    title: 'Where this study enters the story',
    description:
      'This project zooms in on the binding event itself. The figures below show how the same FimH pocket can be read through two host-linked glycan contexts, with local contact networks that can shift under mutation.',
    figures: [
      {
        title: 'OM3 interaction map',
        image: om3DockingInteractionsImage,
        imageAlt:
          'Docking and interaction map for OM3-linked FimH recognition.',
        caption:
          'The OM3 view emphasizes one residue network around the glycan-binding pocket.',
        frameClassName: 'min-h-[16rem] md:min-h-[21rem]',
      },
      {
        title: 'OM6 interaction map',
        image: om6DockingInteractionsImage,
        imageAlt:
          'Docking and interaction map for OM6-linked FimH recognition.',
        caption:
          'The OM6 view shows a related but distinct local interaction arrangement.',
        frameClassName: 'min-h-[16rem] md:min-h-[21rem]',
      },
    ],
  },
  india: {
    title: 'Why India matters in this story',
    description:
      'In India, UTI research increasingly sits at the intersection of antimicrobial resistance, biofilm persistence, and the search for strategies that do not depend only on killing bacteria after colonization has already succeeded.',
    stats: [
      {
        value: '63.36%',
        label:
          'Multidrug resistance reported in one multicity Indian UPEC cohort',
      },
      {
        value: '62.5%',
        label: 'Biofilm-positive isolates in the same study',
      },
      {
        value: '34.1%',
        label: 'ESBL-positive isolates in the same study',
      },
    ],
    body: [
      'That is why adhesion-focused work matters in the Indian setting. If the first contact can be interrupted, later protected states such as biofilm-associated persistence become harder to establish.',
      'The India Biofilm Society adds an important layer to that effort by building a national network around biofilm science, training, meetings, and interdisciplinary collaboration.',
    ],
    societyTitle: 'India Biofilm Society',
    societyText:
      'A growing platform for researchers, clinicians, and biofilm scientists working across infection control, public health, and applied microbiology in India.',
  },
};

export const explorerContent = {
  hero: {
    title: 'Mutation Explorer',
    description:
      'Select a model, isolate a site, inspect the structure.',
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
    title: 'Laboratory for Computational Biology & Biomolecular Design',
    description:
      'The broad research themes of LCBD at BCE, IIT (BHU) span computational protein and enzyme design, protein engineering, large-scale mutational analysis, health informatics and therapeutics development, and tools and pipelines development.',
    kicker: 'BCE, IIT (BHU) Varanasi',
  },
  institution: {
    name: 'Laboratory for Computational Biology and Biomolecular Design',
    summary:
      'The laboratory works through two major directions: fundamental and translational research, and methods, pipelines, and tools development.',
    location:
      'School of Biochemical Engineering, IIT (BHU) Varanasi, Uttar Pradesh, India',
  },
  focusAreas: [
    'Computational Protein & Enzyme Design',
    'Protein Engineering',
    'Large-Scale Mutational Analysis',
    'Health Informatics & Therapeutics Development',
    'Tools and Pipelines Development',
  ],
  directions: [
    {
      title: 'Fundamental and translational research',
      description:
        'LCBD develops and uses computational protein design approaches to understand the evolution and emergence of macromolecular systems of metabolic, therapeutic, and biotechnological significance. The group also studies structure-dynamics-function relationships in complex biological systems through integrated computational analysis.',
      points: [
        'Computational protein design for mechanistic and translational questions',
        'Structure-dynamics-function analysis of complex biological systems',
        'Large-scale analysis of disease-causing genetic variation, SNPs, and rare variants',
        'Conformational and multi-combinatorial analysis for determinants of molecular function',
      ],
    },
    {
      title: 'Methods, pipelines, and tools development',
      description:
        'The laboratory also builds methods and computational workflows for therapeutic and biotechnological design problems, often in collaboration with experimental biologists and chemists.',
      points: [
        'Design of high-affinity protein binders for therapeutic and biotechnological applications',
        'Use of non-natural amino acids for affinity prediction and maturation',
        'Computational protein design methods with improved scoring and protein flexibility handling',
        'Analysis and prediction of disease-causing and susceptibility mutations',
      ],
    },
  ],
  recentFocus: {
    title: 'Recent focus',
    description:
      'Lately, LCBD has also worked on COVID-19 by studying SARS-CoV-2 proteins, drug-target interactions, and resistance-causing mutations using computational protein design, molecular dynamics simulations, mutational mapping, and related computational biophysics methods.',
  },
  team: [
    {
      name: 'Shashank Shekhar',
      role: 'PhD Research Scholar',
      institution: 'IIT (BHU) Varanasi',
      orcid: '0009-0006-8815-9367',
      fellowship:
        'UGC Research Fellowship and IIT (BHU) Varanasi Research Fellowship',
      contributions:
        'Main researcher and responsible for all the data generation, analysis, and curation that went into the platform.',
    },
    {
      name: 'Karishma Santani',
      role: 'IDD 4th Year, Scool of Biochemical Engineering',
      institution: 'IIT (BHU) Varanasi',
      contributions: 'Website development and data curation.',
    },
    {
      name: 'Dr. Aditya K. Padhi',
      role: 'Assistant Professor',
      institution: 'IIT (BHU) Varanasi',
      orcid: '0000-0001-6732-2547',
      email: 'aditya.bce@iitbhu.ac.in',
      profile: 'IIT (BHU) faculty profile',
      profileHref: 'https://www.iitbhu.ac.in/dept/bce/people/adityabce',
      contributions: 'Principal Investigator and supervision',
    },
  ],
  acknowledgements: [
    'Computational resources provided by IIT (BHU) Varanasi High Performance Computing Facility',
    'FimH structural templates from the Protein Data Bank and SWISS-MODEL repository',
    'AlphaFold2 predictions generated on Google Colab infrastructure',
    'Colleagues in the Biochemical Engineering community for constructive feedback',
  ],
  funding: [
    'UGC Research Fellowship to Shashank Shekhar',
    'IIT (BHU) Varanasi Institute Research Support',
    'DST Science and Engineering Research Board (SERB) grant support',
  ],
};

export const guideContent = {
  hero: {
    title: 'Using the Explorer.',
    description:
      'A short guide to moving through models, sites, mutations, and structure.',
  },
  steps: [
    'Choose one model from the left-side registry.',
    'Select a residue site in the central workspace.',
    'Pick a mutation to load metrics and structure.',
    'Open cross-model comparison when the same mutation appears elsewhere.',
  ],
  definitions: [
    {
      term: 'dAffinity',
      text: 'Predicted change in glycan binding relative to wild type within the active model. More negative values indicate tighter predicted binding.',
    },
    {
      term: 'dStability',
      text: 'Predicted change in protein stability relative to wild type within the same model. More negative values indicate a more stabilizing substitution.',
    },
    {
      term: 'Affinity',
      text: 'The model-level binding score reported for the selected mutant entry.',
    },
    {
      term: 'Stability',
      text: 'The model-level stability score reported for the selected mutant entry.',
    },
    {
      term: 'Phenotype',
      text: 'A simplified label that flags whether a mutation trends toward gain, loss, or a neutral profile in the imported dataset.',
    },
    {
      term: 'Structure file',
      text: 'A linked PDB indicates that a structure asset is available for that specific substitution and model.',
    },
  ],
  methods: [
    'Human uroplakin context was modeled from AlphaFold2 predictions and aligned against the porcine cryo-EM reference to build comparable host systems.',
    'FimH-glycan complexes were assembled from published structural templates for OM3 and OM6 before energy minimization in MOE.',
    'Mutation data reflect single-nucleotide-feasible substitutions scored through a ResScan-style workflow rather than arbitrary combinatorial mutagenesis.',
    'Interaction and structural interpretation should be read as computational evidence intended for mechanism building and hypothesis generation.',
  ],
  figurePanels: [
    {
      title: 'Model comparison and validation',
      caption:
        'Human and porcine uroplakin assemblies are compared directly here, alongside the Ramachandran validation used for the modeled human complex.',
      image: upkComparisonValidationImage,
      imageAlt:
        'Human versus porcine uroplakin comparison with Ramachandran validation.',
    },
    {
      title: 'Docking and contact interpretation',
      caption:
        'Representative docking poses and residue-contact maps show how a selected mutation can alter the local interaction logic around the glycan.',
      image: om6DockingInteractionsImage,
      imageAlt:
        'Docking pose and interaction map for an OM6-linked FimH mutant.',
    },
  ],
  faq: [
    {
      q: 'What do hOM3, hOM6, pOM3, and pOM6 mean?',
      a: 'The prefix marks host background, while the suffix marks oligomannose chain length. Together they define the receptor context used for a model.',
    },
    {
      q: 'Why are stronger binders not always more stable?',
      a: 'Many substitutions improve pocket contacts at the cost of local packing or electrostatics, so affinity gains and stability gains do not automatically coincide.',
    },
    {
      q: 'Why is N135K treated as an important loss-of-binding reference?',
      a: 'It is a naturally observed variant with a strong charge change in the pocket, making it a useful benchmark for an affinity-reducing state.',
    },
    {
      q: 'Why are porcine models included?',
      a: 'The porcine uroplakin framework provides a closely related structural context that helps separate species effects from glycan-length effects.',
    },
    {
      q: 'What does "coming soon" mean for future glycan models?',
      a: 'The registry is designed to accept longer oligomannose contexts later without changing the frontend architecture.',
    },
    {
      q: 'Does this platform predict clinical outcome?',
      a: 'No. It supports structural interpretation and candidate prioritization, but it does not replace experimental validation or clinical evidence.',
    },
  ],
  limitations:
    'All scores shown here are computational predictions. Glycan flexibility, catch-bond dynamics under flow, and multi-mutation trajectories are not fully represented, so the platform should be used as a mechanistic guide rather than a final experimental verdict.',
};
