import Card from '../components/ui/Card';
import NarrativeHero from '../components/site/NarrativeHero';
import { indiaContextContent } from '../content/scientificNarrative';

export default function IndianResearchContextPage() {
  return (
    <div className="page-backdrop">
      <NarrativeHero
        eyebrow={indiaContextContent.eyebrow}
        title={indiaContextContent.title}
        lines={indiaContextContent.lines}
        image={indiaContextContent.image}
        imageAlt={indiaContextContent.imageAlt}
      />

      <section className="section-shell">
        <div className="container-max">
          <div className="grid gap-6 md:grid-cols-3">
            {indiaContextContent.signals.map((signal) => (
              <Card key={signal.title} hoverable={false} className="story-card">
                <p className="eyebrow text-[#0f766e]">{signal.title}</p>
                <p className="mt-4 text-lg leading-8 text-slate-700">{signal.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-max grid gap-6 lg:grid-cols-2">
          {indiaContextContent.sections.map((section) => (
            <Card
              key={section.title}
              hoverable={false}
              className={section.eyebrow === 'India Biofilm Society' ? 'story-card-lg bg-[#0d1f1c] text-white' : 'story-card-lg'}
            >
              <p className={`eyebrow ${section.eyebrow === 'India Biofilm Society' ? 'text-[#7dd3c7]' : 'text-[#0f766e]'}`}>
                {section.eyebrow}
              </p>
              <h2 className={`mt-4 text-4xl ${section.eyebrow === 'India Biofilm Society' ? 'text-white' : 'text-slate-950'}`}>
                {section.title}
              </h2>
              <div className="mt-5 space-y-3">
                {section.lines.map((line) => (
                  <p key={line} className={`text-lg leading-8 ${section.eyebrow === 'India Biofilm Society' ? 'text-white/84' : 'text-slate-700'}`}>
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
