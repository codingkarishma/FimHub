import { Link } from 'react-router-dom';
import HeroCarousel from '../components/site/HeroCarousel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
  homeFocusCards,
  homeHookLines,
  homePlatformLines,
  homeSlides,
  storyFlow,
} from '../content/scientificNarrative';

export default function HomePage() {
  return (
    <div className="page-backdrop">
      <HeroCarousel slides={homeSlides} />

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[1.02fr,0.98fr]">
          <Card hoverable={false} className="story-card-lg">
            <p className="eyebrow text-[#0f766e]">The hook</p>
            <div className="mt-6 space-y-3">
              {homeHookLines.map((line) => (
                <p key={line} className="text-xl leading-8 text-slate-800 md:text-2xl md:leading-9">
                  {line}
                </p>
              ))}
            </div>
          </Card>

          <Card hoverable={false} className="story-card-lg bg-[#0d1f1c] text-white">
            <p className="eyebrow text-[#7dd3c7]">Why this platform</p>
            <div className="mt-6 space-y-3">
              {homePlatformLines.map((line) => (
                <p key={line} className="text-xl leading-8 text-white/88 md:text-2xl md:leading-9">
                  {line}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-max">
          <div className="rounded-[2.25rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.45)] md:p-8">
            <p className="eyebrow text-[#0f766e]">Scientific flow</p>
            <h2 className="mt-3 text-4xl text-slate-950 md:text-5xl">
              Infection to impact in one continuous narrative
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {storyFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flow-pill">{item}</span>
                  {index < storyFlow.length - 1 && <span className="hidden text-slate-300 md:inline">/</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[#0f766e]">Explore next</p>
              <h2 className="mt-3 text-4xl text-slate-950 md:text-5xl">
                Three entry points into the portal
              </h2>
            </div>
            <Link to="/infection-story">
              <Button variant="outline">Read the full story</Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homeFocusCards.map((card) => (
              <Card key={card.title} className="story-card">
                <p className="eyebrow text-[#0f766e]">{card.title}</p>
                <p className="mt-4 text-lg leading-8 text-slate-700">{card.text}</p>
                <div className="mt-8">
                  <Link to={card.href}>
                    <Button>{card.title}</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
