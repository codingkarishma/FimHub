import Card from '../components/ui/Card';
import NarrativeHero from '../components/site/NarrativeHero';
import { infectionStoryContent } from '../content/scientificNarrative';

export default function InfectionStoryPage() {
  return (
    <div className="page-backdrop">
      <NarrativeHero
        eyebrow={infectionStoryContent.eyebrow}
        title={infectionStoryContent.title}
        lines={infectionStoryContent.lines}
        image={infectionStoryContent.image}
        imageAlt={infectionStoryContent.imageAlt}
      />

      <section className="section-shell">
        <div className="container-max">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {infectionStoryContent.timeline.map((item) => (
              <Card key={item.step} hoverable={false} className="story-card">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                  {item.step}
                </p>
                <h2 className="mt-4 text-3xl text-slate-950">{item.title}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-max grid gap-6 lg:grid-cols-2">
          {infectionStoryContent.sections.map((section) => (
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
