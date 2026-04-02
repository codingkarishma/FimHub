import Card from '../../components/ui/Card';
import PageHero from '../../components/site/PageHero';
import SectionIntro from '../../components/site/SectionIntro';
import fimhArchitectureImage from '../../assets/rpec/fimh-domain-architecture.png';
import catchBondImage from '../../assets/rpec/fimh-catch-bond.png';
import type1PilusImage from '../../assets/rpec/type1-pilus.png';

const domainCards = [
  {
    title: 'Lectin domain',
    text: 'This N-terminal region contains the mannose-binding pocket and the conserved residue network that controls specificity.',
  },
  {
    title: 'Linker segment',
    text: 'The linker transmits force between domains and helps explain why conformational state changes alter binding behavior.',
  },
  {
    title: 'Pilin domain',
    text: 'This domain integrates FimH into the type 1 pilus architecture and anchors the adhesin to the fimbrial tip.',
  },
];

export default function FimHSciencePage() {
  return (
    <div>
      <PageHero
        eyebrow="FimH adhesin"
        title="FimH is the molecular handle that lets UPEC hold on to the bladder surface."
        description="This page connects protein architecture to host recognition. The goal is to make the structure understandable to non-specialists without losing the mechanistic logic behind the project."
        image={fimhArchitectureImage}
        imageAlt="Structural representation of the FimH adhesin."
      />

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <Card hoverable={false} className="overflow-hidden">
            <img
              src={type1PilusImage}
              alt="Type 1 pilus architecture showing FimH at the tip."
              className="mx-auto max-h-[32rem] w-full object-contain"
            />
          </Card>

          <div>
            <SectionIntro
              eyebrow="Position in the pathogen"
              title="FimH sits at the adhesive tip of the type 1 pilus."
              description="That positioning matters. The pilus extends the adhesin away from the bacterial surface and gives it mechanical reach while keeping host recognition highly specific."
            />

            <div className="mt-8 grid gap-6">
              {domainCards.map((card) => (
                <Card key={card.title} hoverable={false}>
                  <h3 className="text-2xl font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-base text-slate-600">{card.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <Card hoverable={false} className="overflow-hidden">
            <img
              src={catchBondImage}
              alt="Comparison of FimH conformational states involved in catch-bond behavior."
              className="w-full rounded-[1.5rem] object-contain"
            />
          </Card>

          <Card hoverable={false} className="bg-slate-950 text-white">
            <p className="eyebrow text-slate-400">Catch-bond behavior</p>
            <h2 className="mt-3 text-4xl font-bold text-white">FimH does not behave like a simple sticky patch.</h2>
            <p className="mt-5 text-base text-slate-300">
              Under force, the relationship between the lectin and pilin domains changes. That reshaping is one reason FimH can remain effective in the mechanical environment of the urinary tract.
            </p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              <p>The lower-affinity state is linked to domain association.</p>
              <p>The higher-affinity state emerges when the conformational relationship shifts under stress.</p>
              <p>This is why site-specific mutations can have system-level consequences for infection.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
