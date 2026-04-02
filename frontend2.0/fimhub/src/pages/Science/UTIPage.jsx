import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import PageHero from '../../components/site/PageHero';
import SectionIntro from '../../components/site/SectionIntro';
import upecInvasionImage from '../../assets/rpec/upec-invasion.png';

const burdenCards = [
  {
    title: 'A common disease',
    text: 'UTIs involve the urethra, bladder, ureter, and kidneys, making them one of the most familiar bacterial infections in everyday clinical care.',
  },
  {
    title: 'Usually caused by UPEC',
    text: 'Uropathogenic Escherichia coli is the main culprit because it can recognize and exploit the bladder surface with unusual efficiency.',
  },
  {
    title: 'Hard to stop once established',
    text: 'The real problem is not just exposure to bacteria. It is the transition from attachment to invasion and intracellular persistence.',
  },
];

const attackSteps = [
  {
    number: '01',
    title: 'Attachment',
    text: 'Type 1 fimbriae bring FimH to the bacterial tip, where it captures mannose-rich host targets on the urothelium.',
  },
  {
    number: '02',
    title: 'Internalization',
    text: 'After stable binding, host cells can take up the bacterium, turning a surface interaction into a sheltered intracellular event.',
  },
  {
    number: '03',
    title: 'Community growth',
    text: 'Intracellular bacterial communities form inside umbrella cells and help the pathogen evade clearance.',
  },
  {
    number: '04',
    title: 'Recurrence',
    text: 'A residual population can survive, re-emerge, and restart the infection cycle even after treatment.',
  },
];

export default function UTIPage() {
  return (
    <div>
      <PageHero
        eyebrow="UTI biology"
        title="Why UPEC causes urinary tract infection so efficiently."
        description="FimHub focuses on the earliest molecular step in UTI: bacterial adhesion to the bladder surface. That single event shapes invasion, persistence, recurrence, and treatment failure."
        image={upecInvasionImage}
        imageAlt="Schematic of UPEC interacting with receptors on the urothelial surface."
        actions={
          <>
            <a href="#overview">
              <Button size="lg" className="border-white bg-transparent text-white hover:bg-white/10">
                Read the overview
              </Button>
            </a>
            <a href="#sequence">
              <Button size="lg" className="border-white bg-transparent text-white hover:bg-white/10">
                See the infection sequence
              </Button>
            </a>
          </>
        }
      />

      <section id="overview" className="section-shell">
        <div className="container-max">
          <SectionIntro
            eyebrow="Why this page matters"
            title="UTI becomes much harder to manage once adhesion succeeds."
            description="This site treats infection as a sequence rather than a vague disease label. First bacteria attach, then they invade, then they persist. That is why FimH matters so much."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {burdenCards.map((card) => (
              <Card key={card.title} hoverable={false}>
                <h3 className="text-2xl font-bold text-slate-950">{card.title}</h3>
                <p className="mt-4 text-base text-slate-600">{card.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[1.08fr,0.92fr]">
          <Card hoverable={false} className="soft-grid overflow-hidden">
            <div className="rounded-[1.5rem] bg-white p-6">
              <p className="eyebrow text-slate-500">Clinical framing</p>
              <h3 className="mt-3 text-3xl font-bold text-slate-950">Antibiotic resistance is only part of the problem.</h3>
              <p className="mt-4 text-slate-600">
                The deeper problem is biological shelter. Once bacteria cross into the urothelium, drug exposure and immune access both become less effective.
                That is why an adhesion-first view is useful for both research and communication.
              </p>
            </div>
          </Card>

          <Card hoverable={false} className="bg-slate-950 text-white">
            <p className="eyebrow text-slate-400">Takeaway</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
              <p>Cystitis in the lower urinary tract is strongly shaped by surface recognition events.</p>
              <p>Pyelonephritis and more severe outcomes can follow when the early foothold is not interrupted.</p>
              <p>The FimH story is therefore not a side detail. It is the entry point to the whole disease mechanism.</p>
            </div>
          </Card>
        </div>
      </section>

      <section id="sequence" className="section-shell">
        <div className="container-max">
          <SectionIntro
            eyebrow="The sequence"
            title="The infection process becomes clearer when it is broken into four biological moves."
            description="This is the same logic that supports the rest of the site: FimH structure, uroplakin glycans, model construction, and mutation profiling."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {attackSteps.map((step) => (
              <Card key={step.number} hoverable={false}>
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold tracking-[0.2em] text-white">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950">{step.title}</h3>
                    <p className="mt-3 text-base text-slate-600">{step.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
