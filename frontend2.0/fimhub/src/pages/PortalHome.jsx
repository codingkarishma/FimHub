import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHero from '../components/site/PageHero';
import SectionIntro from '../components/site/SectionIntro';
import { getMutations } from '../services/api';
import upecInvasionImage from '../assets/rpec/upec-invasion.png';
import type1PilusImage from '../assets/rpec/type1-pilus.png';
import fimhArchitectureImage from '../assets/rpec/fimh-domain-architecture.png';
import catchBondImage from '../assets/rpec/fimh-catch-bond.png';
import uroplakinComplexImage from '../assets/rpec/uroplakin-complex.png';
import humanUroplakinModelImage from '../assets/rpec/human-uroplakin-model.png';
import porcineUroplakinModelImage from '../assets/rpec/porcine-uroplakin-model.png';

const datasets = [
  { key: 'human_om3', label: 'Human OM3', species: 'human', glycan: 'om3', note: 'Human model with OM3-linked glycans.' },
  { key: 'human_om6', label: 'Human OM6', species: 'human', glycan: 'om6', note: 'Human model with OM6-linked glycans.' },
  { key: 'porcine_om6', label: 'Porcine OM6', species: 'porcine', glycan: 'om6', note: 'Cross-species comparison against the porcine model.' },
];

const storySections = [
  {
    eyebrow: 'UTI context',
    title: 'UPEC starts the disease by winning the first contact with the urothelium.',
    text: 'Urinary tract infections involve the urethra, bladder, ureter, and kidneys, but the important molecular step is early adhesion. Once UPEC attaches to the bladder surface, it can invade umbrella cells and build intracellular communities.',
    image: upecInvasionImage,
    alt: 'Simplified schematic of UPEC engaging receptors on the urothelial surface.',
    href: '/science/uti',
  },
  {
    eyebrow: 'Attachment machinery',
    title: 'Type 1 fimbriae place FimH exactly where host recognition begins.',
    text: 'FimA builds the shaft and FimH sits at the adhesive tip. That makes FimH the most direct molecular entry point for explaining infection, host targeting, and glycan preference.',
    image: type1PilusImage,
    alt: 'Diagram of a type 1 pilus with the FimH lectin domain at the tip.',
    href: '/science/mechanism',
  },
  {
    eyebrow: 'Protein architecture',
    title: 'The lectin domain, pilin domain, and mannose-binding pocket define the mutational landscape.',
    text: 'The binding pocket and tyrosine gate are where structural interpretation becomes useful. This is the region where mutation profiling can directly change how we read host recognition and fitness.',
    image: fimhArchitectureImage,
    alt: 'Structural representation of the FimH adhesin with its major domains.',
    href: '/science/fimh',
  },
  {
    eyebrow: 'Mechanical biology',
    title: 'FimH behaves as a catch-bond system, so conformation matters as much as sequence.',
    text: 'The tensed state shows lower affinity, while domain dissociation moves the protein toward a higher-affinity relaxed state. That is why residue-level changes can have outsized biological effects.',
    image: catchBondImage,
    alt: 'Comparison of two FimH conformational states used to explain the catch-bond mechanism.',
    href: '/science/fimh',
  },
  {
    eyebrow: 'Host receptor',
    title: 'Uroplakin glycans turn a simple ligand story into a true host-complex problem.',
    text: 'UPK1A carries the high-mannose glycan that anchors FimH. The biological interaction is therefore not FimH with isolated mannose, but FimH with a glycosylated membrane complex on umbrella cells.',
    image: uroplakinComplexImage,
    alt: 'Structural rendering of the uroplakin complex.',
    href: '/science/uroplakin',
  },
];

const resourceCards = [
  {
    title: 'Science pages first',
    text: 'The site explains infection, host binding, and structure before asking the visitor to read a chart or table.',
  },
  {
    title: 'Portal for retrieval',
    text: 'A visitor can jump directly to mutation search, binding shifts, and linked PDB files from the same workbench.',
  },
  {
    title: 'Built to grow',
    text: 'OM3 and OM6 are live now, while OM9, OM12, and predictive structure work can be added without redesigning the site again.',
  },
];

const roadmap = [
  { label: 'Live now', value: 'OM3 and OM6', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'Current use', value: 'Knowledge hub + visualization portal', tone: 'bg-sky-50 text-sky-700 border-sky-200' },
  { label: 'Next phase', value: 'OM9, OM12, predictive modelling', tone: 'bg-amber-50 text-amber-700 border-amber-200' },
];

export default function PortalHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadCounts() {
      const results = await Promise.all(
        datasets.map(async (dataset) => {
          try {
            const response = await getMutations(dataset.species, dataset.glycan);
            const total = Array.isArray(response?.data) ? response.data.length : 0;
            return [dataset.key, total];
          } catch {
            return [dataset.key, null];
          }
        })
      );

      if (!cancelled) {
        setCounts(Object.fromEntries(results));
      }
    }

    loadCounts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page-backdrop">
      <PageHero
        // eyebrow="One Place for FimH"
        title="One home for FimH uroplakin glycans, mutations, data and structures."
        description="FimHub is being shaped as an information-first website for people who want to understand why FimH matters in UTI biology, browse the current OM3 and OM6 results, and move into structures and data without losing context."
        image={humanUroplakinModelImage}
        imageAlt="Human uroplakin model used as a lead image for the FimHub homepage."
        imageClassName="object-contain"
        actions={
          <>
            <Link to="/explorer/dashboard">
              <Button size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Open the portal
              </Button>
            </Link>
            <a href="#story-map">
              <Button variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Read the biology
              </Button>
            </a>
          </>
        }
      />

      <section className="relative -mt-10 pb-6">
        <div className="container-max relative z-10 grid gap-4 md:grid-cols-3">
          {datasets.map((dataset) => (
            <div key={dataset.key} className="metric-tile">
              <p className="eyebrow text-slate-500">{dataset.label}</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{counts[dataset.key] ?? '...'}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{dataset.note}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="section-shell">
        <div className="container-max">
          <SectionIntro
            eyebrow="Why this website exists"
            title="The current goal is accessibility: one place where FimH can be understood, browsed, and revisited easily."
            description="This site is not only a dashboard. It is meant to work as a scientific blog, a project summary, a structure viewer, and a searchable data surface for the FimH story."
          />
          {/* <div className="mt-10 grid gap-6 md:grid-cols-3">
            {resourceCards.map((card) => (
              <Card key={card.title} hoverable={false}>
                <h3 className="text-2xl text-slate-950">{card.title}</h3>
                <p className="mt-4 text-base text-slate-600">{card.text}</p>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

      <section id="story-map" className="section-shell">
        <div className="container-max space-y-10">
          <SectionIntro
            eyebrow="Story map"
            title="The biology should unfold in a logical sequence."
            description="Each section below is a reader-facing explanation that also connects directly to one of the science pages. The idea is to let someone learn the concept first, then continue into the detailed page or the portal."
          />

          {storySections.map((section, index) => (
            <Card key={section.title} hoverable={false} className="overflow-hidden p-0">
              <div className={`grid items-center gap-0 lg:grid-cols-[0.92fr,1.08fr] ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="h-full bg-slate-50 p-6 md:p-8">
                  <img
                    src={section.image}
                    alt={section.alt}
                    className="h-full min-h-[260px] w-full rounded-[1.5rem] bg-white object-contain p-4 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <p className="eyebrow text-slate-500">{section.eyebrow}</p>
                  <h3 className="mt-3 text-3xl text-slate-950 md:text-4xl">{section.title}</h3>
                  <p className="mt-5 text-base leading-8 text-slate-700">{section.text}</p>
                  <div className="mt-7">
                    <Link to={section.href}>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
