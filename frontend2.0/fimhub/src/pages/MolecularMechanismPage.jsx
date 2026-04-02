import Card from '../components/ui/Card';
import NarrativeHero from '../components/site/NarrativeHero';
import { molecularMechanismContent } from '../content/scientificNarrative';

export default function MolecularMechanismPage() {
  return (
    <div className="page-backdrop">
      <NarrativeHero
        eyebrow={molecularMechanismContent.eyebrow}
        title={molecularMechanismContent.title}
        lines={molecularMechanismContent.lines}
        image={molecularMechanismContent.image}
        imageAlt={molecularMechanismContent.imageAlt}
        supportCards={molecularMechanismContent.highlights}
      />

      <section className="section-shell">
        <div className="container-max grid gap-6 lg:grid-cols-2">
          {molecularMechanismContent.sections.map((section) => (
            <Card key={section.title} hoverable={false} className="story-card-lg">
              <p className="eyebrow text-[#0f766e]">{section.eyebrow}</p>
              <h2 className="mt-4 text-4xl text-slate-950">{section.title}</h2>
              <div className="mt-5 space-y-3">
                {section.lines.map((line) => (
                  <p key={line} className="text-lg leading-8 text-slate-700">
                    {line}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
