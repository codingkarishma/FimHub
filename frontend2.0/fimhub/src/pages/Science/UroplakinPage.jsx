import Card from '../../components/ui/Card';
import PageHero from '../../components/site/PageHero';
import SectionIntro from '../../components/site/SectionIntro';
import uroplakinComplexImage from '../../assets/rpec/uroplakin-complex.png';
import humanUroplakinModelImage from '../../assets/rpec/human-uroplakin-model.png';
import porcineUroplakinModelImage from '../../assets/rpec/porcine-uroplakin-model.png';

const comparisonCards = [
  {
    title: 'OM3-rich presentation',
    text: 'A higher-mannose presentation provides a stronger or more accessible glycan landscape for FimH engagement.',
  },
  {
    title: 'OM6-rich presentation',
    text: 'A different oligomannose arrangement can alter how the host surface is read by FimH and related structural variants.',
  },
];

export default function UroplakinPage() {
  return (
    <div>
      <PageHero
        eyebrow="Host target"
        title="Uroplakin is the glycosylated host surface that FimH is built to recognize."
        description="The project is not just about free glycans. It is about glycans as they are presented on the uroplakin complex, which is why host-side structure matters so much."
        image={uroplakinComplexImage}
        imageAlt="Structural rendering of the uroplakin complex."
      />

      <section className="section-shell">
        <div className="container-max">
          <SectionIntro
            eyebrow="Why uroplakin matters"
            title="The real biological target is a membrane complex, not an isolated sugar."
            description="UPK1A carries the high-mannose glycan signal that helps anchor FimH. Understanding that presentation is necessary for explaining why some host surfaces are more permissive than others."
          />

          {/* <div className="mt-10 grid gap-6 md:grid-cols-2">
            {comparisonCards.map((card) => (
              <Card key={card.title} hoverable={false}>
                <h3 className="text-2xl font-bold text-slate-950">{card.title}</h3>
                <p className="mt-3 text-base text-slate-600">{card.text}</p>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <Card hoverable={false} className="overflow-hidden">
            <p className="eyebrow text-slate-500">Human model</p>
            <img
              src={humanUroplakinModelImage}
              alt="Human uroplakin model used in the project workflow."
              className="mt-5 w-full rounded-[1.5rem] bg-white object-contain p-4"
            />
          </Card>

          <Card hoverable={false} className="overflow-hidden">
            <p className="eyebrow text-slate-500">Porcine reference</p>
            <img
              src={porcineUroplakinModelImage}
              alt="Porcine uroplakin structural reference used in the project workflow."
              className="mt-5 w-full rounded-[1.5rem] bg-white object-contain p-4"
            />
          </Card>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[1fr,0.9fr]">
          <Card hoverable={false}>
            <p className="eyebrow text-slate-500">Modelling logic</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950">Human and porcine uroplakin models make the mutation problem tractable.</h2>
            <p className="mt-5 text-base text-slate-600">
              Because the fully resolved human complex with the exact glycan presentation is not available, structural modelling becomes the bridge between biological question and mutation analysis.
            </p>
          </Card>

          <Card hoverable={false} className="bg-slate-950 text-white">
            <p className="eyebrow text-slate-400">Key idea</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <p>Host glycosylation is part of the disease mechanism, not background decoration.</p>
              <p>Species comparison helps validate structural assumptions and identify shared recognition logic.</p>
              <p>OM3 and OM6 matter because glycan presentation changes the binding landscape seen by FimH.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
