import Card from '../components/ui/Card';
import PageHero from '../components/site/PageHero';
import fimhArchitectureImage from '../assets/rpec/fimh-domain-architecture.png';

const guideCards = [
  {
    title: 'Start with the story',
    text: 'Use the biology pages first if you want context before opening the portal. They explain the disease mechanism, the FimH adhesin, and the host uroplakin target.',
  },
  {
    title: 'Then use the portal',
    text: 'Switch between species and glycan panels, search a mutation, inspect its affinity and stability terms, and open the linked structure where available.',
  },
  {
    title: 'Read values carefully',
    text: 'The most useful comparative values are dAffinity and dStability because they place each mutation in relation to a baseline rather than in isolation.',
  },
];

export default function GuidePage() {
  return (
    <div>
      <PageHero
        eyebrow="Using the site"
        title="FimHub should be easy to read whether you come from biology, modelling, or web browsing."
        description="The guide page explains how to move between the story-driven pages and the live mutation portal without assuming prior familiarity with every term."
        image={fimhArchitectureImage}
        imageAlt="FimH structural architecture used as a guide-page visual."
      />

      <section className="section-shell">
        <div className="container-max grid gap-6 md:grid-cols-3">
          {guideCards.map((card) => (
            <Card key={card.title} hoverable={false}>
              <h3 className="text-2xl font-bold text-slate-950">{card.title}</h3>
              <p className="mt-4 text-base text-slate-600">{card.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <Card hoverable={false}>
            <p className="eyebrow text-slate-500">How to read portal values</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <p><strong className="text-slate-950">Affinity</strong>: the stored affinity term for the selected model.</p>
              <p><strong className="text-slate-950">dAffinity</strong>: how the mutation changes binding relative to the reference state.</p>
              <p><strong className="text-slate-950">Stability / dStability</strong>: whether the mutation preserves or perturbs the structural state.</p>
            </div>
          </Card>

          <Card hoverable={false} className="bg-slate-950 text-white">
            <p className="eyebrow text-slate-400">What to expect next</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <p>More images can be dropped into the asset folders and swapped into any page section.</p>
              <p>OM9 and OM12 can be added later without changing the overall reading flow.</p>
              <p>The predictive layer should eventually sit on top of the same portal instead of in a separate website.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
