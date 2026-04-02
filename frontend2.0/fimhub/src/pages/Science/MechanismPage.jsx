import Card from '../../components/ui/Card';
import PageHero from '../../components/site/PageHero';
import SectionIntro from '../../components/site/SectionIntro';
import upecInvasionImage from '../../assets/rpec/upec-invasion.png';

const mechanismCards = [
  {
    title: 'Arrival in the urinary tract',
    text: 'UPEC ascends toward the bladder and reaches a surface that is rich in glycosylated uroplakin targets.',
  },
  {
    title: 'Mannose-specific adhesion',
    text: 'FimH recognizes mannose presented on host glycans, allowing the bacterium to resist washout and establish a foothold.',
  },
  {
    title: 'Cell entry and replication',
    text: 'Once anchored, the pathogen can trigger uptake and replicate within umbrella cells as protected intracellular bacterial communities.',
  },
  {
    title: 'Persistence and reseeding',
    text: 'A surviving population can later restart infection, which is why recurrence remains such a central clinical issue.',
  },
];

const interventionPoints = [
  'Block FimH binding before invasion begins.',
  'Disrupt glycan recognition instead of relying only on bactericidal pressure.',
  'Use structural models to find residues that tune affinity and persistence.',
];

export default function MechanismPage() {
  return (
    <div>
      <PageHero
        eyebrow="Infection mechanism"
        title="UTI is a sequence of coordinated host-pathogen interactions, not a single event."
        description="The mechanism page explains how a surface contact becomes an intracellular infection cycle. That sequence is what connects FimH structure to real disease behavior."
        image={upecInvasionImage}
        imageAlt="Stylized overview of bacterial adhesion and invasion."
      />

      <section className="section-shell">
        <div className="container-max">
          <SectionIntro
            eyebrow="Stepwise view"
            title="The mechanism is easiest to understand as a progression from contact to persistence."
            description="Each step in the cycle reveals a different kind of vulnerability. The site uses this framing to connect biology pages with the computational portal."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mechanismCards.map((card, index) => (
              <Card key={card.title} hoverable={false}>
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold tracking-[0.2em] text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950">{card.title}</h3>
                    <p className="mt-3 text-base text-slate-600">{card.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[1fr,0.9fr]">
          <Card hoverable={false}>
            <p className="eyebrow text-slate-500">Why flow matters</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950">The bladder is a hostile mechanical environment, and FimH is adapted for that stress.</h2>
            <p className="mt-5 text-base text-slate-600">
              Urine flow should remove bacteria, but FimH is unusual because its interaction can strengthen under force.
              That means the mechanism is not just biochemical. It is also mechanical, which is why structural state changes matter.
            </p>
          </Card>

          <Card hoverable={false} className="bg-slate-950 text-white">
            <p className="eyebrow text-slate-400">Intervention logic</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {interventionPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
