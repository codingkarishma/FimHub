import catchBondImage from '../assets/rpec/fimh-catch-bond.png';
import fimhArchitectureImage from '../assets/rpec/fimh-domain-architecture.png';
import humanUroplakinModelImage from '../assets/rpec/human-uroplakin-model.png';
import porcineUroplakinModelImage from '../assets/rpec/porcine-uroplakin-model.png';
import type1PilusImage from '../assets/rpec/type1-pilus.png';
import upecInvasionImage from '../assets/rpec/upec-invasion.png';
import uroplakinComplexImage from '../assets/rpec/uroplakin-complex.png';

export const homeSlides = [
  {
    eyebrow: 'Hero 01',
    title: 'Infection begins with a single molecular interaction',
    support: 'Adhesion at the urothelial surface decides whether colonization starts',
    image: uroplakinComplexImage,
    imageAlt: 'Uroplakin receptor complex used as a visual for the first host contact',
  },
  {
    eyebrow: 'Hero 02',
    title: 'Why does E. coli dominate urinary tract infections',
    support: 'UPEC turns access into precision by coupling pili, adhesion, and persistence',
    image: upecInvasionImage,
    imageAlt: 'Simplified view of UPEC interacting with the urothelial surface',
  },
  {
    eyebrow: 'Hero 03',
    title: 'Small mutations Massive consequences',
    support: 'Single residue changes can redirect binding strength structural cost and host fit',
    image: fimhArchitectureImage,
    imageAlt: 'FimH structural architecture used for the mutation and mechanism story',
  },
  {
    eyebrow: 'Hero 04',
    title: 'Explore FimH Decode infection',
    support: 'Move from infection logic to glycan recognition to mutation impact in one portal',
    image: humanUroplakinModelImage,
    imageAlt: 'Human uroplakin model used as a lead visual for portal exploration',
  },
];

export const homeHookLines = [
  'Urinary tract infections affect millions globally each year',
  'A silent but persistent burden across healthcare systems',
  'Among all pathogens uropathogenic E coli dominates',
  'But why this organism',
  'What gives it such precision in host targeting',
];

export const homePlatformLines = [
  'FimH is not just a protein',
  'It is the first point of contact between pathogen and host',
  'A single binding event can determine infection outcome',
  'This resource enables structured exploration of these interactions',
];

export const storyFlow = [
  'Infection',
  'UTI',
  'UPEC',
  'FimH',
  'Binding',
  'Mutation',
  'Impact',
  'Research significance',
];

export const homeFocusCards = [
  {
    title: 'Explore Mutations',
    text: 'Track residue level changes across the live OM3 OM6 and porcine comparison panels',
    href: '/mutation-explorer',
  },
  {
    title: 'Understand Mechanism',
    text: 'Follow the path from first contact to glycan recognition and shear resistant adhesion',
    href: '/molecular-mechanism',
  },
  {
    title: 'Analyze Binding',
    text: 'Compare how receptor context and sequence variation reshape affinity and specificity',
    href: '/why-upec-fimh',
  },
];

export const infectionStoryContent = {
  eyebrow: 'Infection Story',
  title: 'Infection begins before symptoms are named',
  lines: [
    'A urinary tract infection is a progression not a single event',
    'Arrival becomes adhesion',
    'Adhesion becomes invasion',
    'Persistence becomes recurrence',
  ],
  image: upecInvasionImage,
  imageAlt: 'Illustration of UPEC contact and invasion at the urothelial surface',
  timeline: [
    {
      step: '01',
      title: 'Entry',
      text: 'Periurethral colonization and ascent place bacteria close to the bladder surface',
    },
    {
      step: '02',
      title: 'Foothold',
      text: 'Type 1 pili position FimH for mannose rich receptor capture under flow',
    },
    {
      step: '03',
      title: 'Shelter',
      text: 'Internalization and intracellular communities protect the pathogen from clearance',
    },
    {
      step: '04',
      title: 'Return',
      text: 'Residual populations can reseed the bladder and drive recurrence',
    },
  ],
  sections: [
    {
      eyebrow: 'Why infection matters',
      title: 'Symptoms are late stage signals',
      lines: [
        'The decisive biology happens earlier at the epithelial surface',
        'If first contact succeeds the pathogen gains time protection and space',
        'That early foothold shapes burden recurrence and treatment failure',
      ],
    },
    {
      eyebrow: 'What is UTI',
      title: 'The tract is one system with multiple clinical outcomes',
      lines: [
        'Infection may remain in the lower tract as cystitis',
        'It may ascend toward the kidney and become more severe',
        'The same initiating adhesion event can sit upstream of very different outcomes',
      ],
    },
    {
      eyebrow: 'Why UPEC dominates',
      title: 'It reaches the tract and reads the host surface with unusual accuracy',
      lines: [
        'The intestinal reservoir gives repeated opportunities for entry',
        'Type 1 pili allow stable contact in a mechanically hostile environment',
        'FimH turns host glycans into a selective landing pad',
      ],
    },
    {
      eyebrow: 'Other causes',
      title: 'UTI is broader than one pathogen',
      lines: [
        'Klebsiella Proteus Enterococcus and Staphylococcus can also drive disease',
        'Candida becomes important in catheterized hospitalized or immunocompromised settings',
        'FimHub focuses on UPEC because its adhesion logic is structurally tractable and mutation sensitive',
      ],
    },
  ],
};

export const whyUpecFimHContent = {
  eyebrow: 'Why UPEC and FimH',
  title: 'Dominance comes from fit not chance',
  lines: [
    'UPEC is adapted for the urinary niche',
    'Its advantage is not only arrival but retention',
    'FimH is the molecular reason that retention becomes possible',
  ],
  image: type1PilusImage,
  imageAlt: 'Type 1 pilus architecture with FimH positioned at the adhesive tip',
  pillars: [
    {
      title: 'Precision',
      text: 'FimH recognizes mannosylated receptors on umbrella cells when washout should remove the bacterium',
    },
    {
      title: 'Persistence',
      text: 'Successful attachment opens the path to invasion intracellular residence and repeated infection cycles',
    },
    {
      title: 'Plasticity',
      text: 'Sequence variation allows binding behavior to shift without abandoning the overall adhesion strategy',
    },
  ],
  sections: [
    {
      eyebrow: 'Why E coli is dominant',
      title: 'The organism starts from the right ecological position',
      lines: [
        'Gut residency places E coli near the urinary tract repeatedly',
        'A subset becomes uropathogenic by combining adhesins toxins iron capture and stress adaptation',
        'That combination makes UPEC more than a contaminant and more than a random colonizer',
      ],
    },
    {
      eyebrow: 'What makes UPEC special',
      title: 'It can convert exposure into sustained occupation',
      lines: [
        'It binds under flow rather than only in static conditions',
        'It can enter umbrella cells and generate protected intracellular communities',
        'It frequently returns because persistence strategies survive beyond one treatment window',
      ],
    },
    {
      eyebrow: 'Role of FimH',
      title: 'FimH is the first contact protein that decides whether the story advances',
      lines: [
        'FimH sits at the pilus tip where host recognition begins',
        'Its lectin domain engages mannose rich targets on uroplakin associated glycans',
        'Because it acts first it becomes the clearest point for structural analysis and therapeutic design',
      ],
    },
  ],
};

export const molecularMechanismContent = {
  eyebrow: 'Molecular Mechanism',
  title: 'Binding is the decisive event',
  lines: [
    'FimH does not touch an abstract ligand',
    'It engages a glycosylated host surface under force',
    'Pocket geometry receptor display and mutation all change the outcome',
  ],
  image: catchBondImage,
  imageAlt: 'Catch bond comparison of FimH conformational states',
  highlights: [
    {
      title: 'Binding pocket',
      text: 'A compact mannose binding site and surrounding aromatic gate create the first layer of specificity',
    },
    {
      title: 'Catch bond logic',
      text: 'Mechanical force can shift FimH toward stronger adhesion rather than immediate detachment',
    },
    {
      title: 'Mutation leverage',
      text: 'Small structural adjustments can alter affinity receptor fit and the balance between strength and stability',
    },
  ],
  sections: [
    {
      eyebrow: 'Binding',
      title: 'Recognition begins in the lectin domain',
      lines: [
        'The lectin domain carries the mannose facing pocket',
        'The pilin domain and linker influence how that pocket behaves under force',
        'Structure and mechanics therefore act together rather than separately',
      ],
    },
    {
      eyebrow: 'Glycan interaction',
      title: 'FimH reads a host surface not a free sugar',
      lines: [
        'Uroplakin associated glycans present mannose in a specific spatial context',
        'That context influences approach angle steric access and residence time',
        'The relevant question is not only can FimH bind but how the host presents what it binds',
      ],
    },
    {
      eyebrow: 'OM3 versus OM6',
      title: 'Different glycan displays create different selection pressures',
      lines: [
        'OM3 and OM6 are useful because they expose distinct architectures to the same adhesin family',
        'Those differences can favor different residue level solutions in FimH',
        'The mutation explorer keeps that comparison visible rather than hiding it inside a table',
      ],
    },
    {
      eyebrow: 'When mutations occur',
      title: 'Affinity change is only one part of the story',
      lines: [
        'A stronger binder may also carry structural cost',
        'A stable mutant may still lose host fit if the receptor geometry changes',
        'Meaning comes from reading binding stability and context together',
      ],
    },
  ],
};

export const indiaContextContent = {
  eyebrow: 'Indian Research Context',
  title: 'Why this work matters in India',
  lines: [
    'UTI burden remains high across outpatient hospital and catheter associated settings',
    'Resistance complicates empirical treatment',
    'Biofilm persistence keeps the problem active even when planktonic cells are targeted',
  ],
  image: porcineUroplakinModelImage,
  imageAlt: 'Comparative uroplakin model used here as a systems level visual',
  signals: [
    {
      title: 'Clinical burden',
      text: 'Indian clinical studies continue to report UTI as a common diagnosis with E coli as the predominant isolate',
    },
    {
      title: 'Resistance pressure',
      text: 'ESBL producing E coli and multidrug resistance reduce the confidence of empirical therapy',
    },
    {
      title: 'Biofilm challenge',
      text: 'Catheter associated infection and persistent surface communities keep recurrence and clearance difficult',
    },
  ],
  sections: [
    {
      eyebrow: 'Burden',
      title: 'The problem is broad not isolated',
      lines: [
        'UTI is encountered in routine clinics tertiary centers and long stay care',
        'Women remain heavily affected but hospital and device associated risk broadens the population',
        'That breadth makes mechanism focused prevention valuable',
      ],
    },
    {
      eyebrow: 'Resistance',
      title: 'Antibiotic pressure is reshaping the treatment landscape',
      lines: [
        'Indian datasets repeatedly describe resistant E coli among urinary isolates',
        'Empirical treatment becomes riskier when resistance surveillance lags behind practice',
        'Adhesion targeted strategies offer a route that does not depend only on killing after colonization',
      ],
    },
    {
      eyebrow: 'Biofilms',
      title: 'Persistent communities make simple clearance unlikely',
      lines: [
        'Biofilm related infection matters especially in catheter associated settings',
        'Once persistence programs start the biology becomes harder to reverse',
        'Interrupting the first adhesion event is therefore strategically attractive',
      ],
    },
    {
      eyebrow: 'India Biofilm Society',
      title: 'Biofilm research already has a growing collaborative base in India',
      lines: [
        'India Biofilm Society focuses on biofilm related infections and microbial persistence',
        'It also promotes scientific exchange training and collaboration across Indian institutions',
        'Understanding adhesion mechanisms like FimH is critical in designing next generation therapeutics in India',
      ],
    },
  ],
};

export const researchSignificanceContent = {
  eyebrow: 'Research Significance',
  title: 'From binding event to therapeutic direction',
  lines: [
    'FimHub is built as a learning system and a research surface',
    'It connects structural biology with infection logic',
    'It turns mutation data into biologically readable questions',
  ],
  image: humanUroplakinModelImage,
  imageAlt: 'Human uroplakin model used to frame translational significance',
  pathways: [
    {
      title: 'Why this platform matters',
      text: 'It keeps disease context receptor biology and mutation evidence in one continuous narrative',
    },
    {
      title: 'Drug targeting',
      text: 'FimH remains an attractive anti adhesion target because it acts before invasion and persistence fully develop',
    },
    {
      title: 'Future applications',
      text: 'The same framework can support new glycan panels predictive scoring and region specific resistance interpretation',
    },
  ],
  sections: [
    {
      eyebrow: 'Platform value',
      title: 'A portal is more useful when it teaches while it measures',
      lines: [
        'Researchers need more than a chart',
        'Students need more than a glossary',
        'FimHub is designed to carry both groups from mechanism to interpretation',
      ],
    },
    {
      eyebrow: 'Therapeutic relevance',
      title: 'Anti adhesion logic starts upstream of damage',
      lines: [
        'Blocking FimH aims to stop colonization before invasion deepens',
        'That makes it relevant for non antibiotic and adjunctive strategies',
        'Mutation aware interpretation helps identify where such strategies may fail or improve',
      ],
    },
    {
      eyebrow: 'What comes next',
      title: 'The portal can grow with the science',
      lines: [
        'Additional glycans can be layered into the same comparison system',
        'Predictive models can rank untested mutations before full structural work',
        'Clinical surveillance can eventually connect sequence drift to therapeutic response',
      ],
    },
  ],
};
