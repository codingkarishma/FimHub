import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHero from '../components/site/PageHero';
import SectionIntro from '../components/site/SectionIntro';
import humanUroplakinModelImage from '../assets/rpec/human-uroplakin-model.png';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const resources = [
  {
    title: 'Human OM3 mutation dataset',
    description: 'Live JSON endpoint for the human OM3 mutation panel.',
    href: `${API_BASE_URL}/api/mutations/human/om3`,
  },
  {
    title: 'Human OM6 mutation dataset',
    description: 'Live JSON endpoint for the human OM6 mutation panel.',
    href: `${API_BASE_URL}/api/mutations/human/om6`,
  },
  {
    title: 'Porcine OM6 mutation dataset',
    description: 'Live JSON endpoint for the porcine OM6 comparison set.',
    href: `${API_BASE_URL}/api/mutations/porcine/om6`,
  },
];

export default function DataResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Data and resources"
        title="The resource page should feel like a library, not a placeholder."
        description="This section brings together the live mutation datasets, structure access points, and the terminology needed to read the portal correctly."
        image={humanUroplakinModelImage}
        imageAlt="Human uroplakin model shown as a visual anchor for the data section."
      />

      <section className="section-shell">
        <div className="container-max">
          <SectionIntro
            eyebrow="Live endpoints"
            title="Current downloadable resources"
            description="These links point to the live backend used by the portal. They are the cleanest way to move from browsing the site into your own downstream analysis."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.title} hoverable={false}>
                <h3 className="text-2xl font-bold text-slate-950">{resource.title}</h3>
                <p className="mt-3 text-base text-slate-600">{resource.description}</p>
                <div className="mt-6">
                  <a href={resource.href} target="_blank" rel="noreferrer">
                    <Button>Open JSON</Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <Card id="mutations" hoverable={false}>
            <p className="eyebrow text-slate-500">Mutation fields</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <p><strong className="text-slate-950">mutation</strong>: amino-acid substitution label such as F1C or Y48F.</p>
              <p><strong className="text-slate-950">Affinity</strong>: raw affinity score stored in the curated dataset.</p>
              <p><strong className="text-slate-950">dAffinity</strong>: change relative to the reference mutation or model baseline.</p>
              <p><strong className="text-slate-950">Stability / dStability</strong>: structural stability indicators used for interpretation.</p>
            </div>
          </Card>

          {/* <Card id="pdb" hoverable={false}>
            <p className="eyebrow text-slate-500">Structure access</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <p>Linked PDB files can be opened directly from the structure lab inside the portal.</p>
              <p>The backend resolves available structures per mutation where those models exist on disk.</p>
              <p>The current web workflow is built for OM3 and OM6 and is ready to absorb OM9 and OM12 later.</p>
            </div>
          </Card> */}
           <Card hoverable={false}>
            <p className="eyebrow text-slate-500">Energy interpretation</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <p>dAffinity is the most useful comparative readout for identifying mutations that strengthen or weaken host recognition.</p>
              <p>dStability helps separate favorable binders from variants that may gain affinity at an unsustainable structural cost.</p>
              <p>The portal keeps both measures visible because biologically interesting mutations often involve that tradeoff.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
