import { Link } from 'react-router-dom';
import Reveal from '../components/site/Reveal';
import Button from '../components/ui/Button';
import { guideContent } from '../content/platformContentV2';

function ExplorerGuideMap() {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4 md:p-5">
      <div className="rounded-[1.2rem] border border-[color:var(--fh-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--fh-mid)_74%,white_26%),var(--fh-bg))] p-4 md:p-5">
        <div className="border-b border-[color:var(--fh-border)] pb-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--fh-text-secondary)]">
            Explorer
          </p>
          <h2 className="mt-2 text-2xl font-light text-[color:var(--fh-text)]">
            Mutation Explorer
          </h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
            Select a model, isolate a site, inspect the structure.
          </p>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[13rem,minmax(0,1fr),15rem]">
          <section className="rounded-[1.1rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4">
            <p className="text-sm font-semibold text-[color:var(--fh-text)]">
              1. Models
            </p>
            <div className="mt-4 space-y-2">
              <div className="rounded-full border border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] px-4 py-2 text-sm text-[color:var(--fh-text-secondary)]">
                Human
              </div>
              <div className="rounded-full border border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] px-4 py-2 text-sm text-[color:var(--fh-text-secondary)]">
                OM3
              </div>
              <div className="rounded-[1rem] border border-[color:var(--fh-accent)] bg-[color:var(--fh-accent-soft)] px-4 py-3">
                <p className="text-sm font-semibold text-[color:var(--fh-text)]">
                  hOM3
                </p>
                <p className="mt-1 text-xs text-[color:var(--fh-text-secondary)]">
                  choose a model first
                </p>
              </div>
            </div>
          </section>

          <div className="space-y-4">
            <section className="rounded-[1.1rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4">
              <p className="text-sm font-semibold text-[color:var(--fh-text)]">
                2. Selection
              </p>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[color:var(--fh-text-secondary)]">
                    Residues
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['N46', 'T51', 'I52', 'N135'].map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          item === 'N135'
                            ? 'border-[color:var(--fh-accent)] bg-[color:var(--fh-accent-soft)] text-[color:var(--fh-text)]'
                            : 'border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] text-[color:var(--fh-text-secondary)]'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[color:var(--fh-text-secondary)]">
                    Mutations
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['N135K', 'N135A', 'N135Q'].map((item, index) => (
                      <span
                        key={item}
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          index === 0
                            ? 'border-[color:var(--fh-accent)] bg-[color:var(--fh-accent-soft)] text-[color:var(--fh-text)]'
                            : 'border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] text-[color:var(--fh-text-secondary)]'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[1.1rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[color:var(--fh-text)]">
                  3. Structure view
                </p>
                <span className="text-xs text-[color:var(--fh-text-secondary)]">
                  Open PDB
                </span>
              </div>
              <div className="mt-4 flex h-[14rem] items-center justify-center rounded-[1rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-mid)]">
                <p className="text-sm text-[color:var(--fh-text-secondary)]">
                  linked structure loads here
                </p>
              </div>
            </section>
          </div>

          <section className="rounded-[1.1rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4">
            <p className="text-sm font-semibold text-[color:var(--fh-text)]">
              4. Mutation panel
            </p>
            <div className="mt-4 space-y-3">
              {[
                ['Affinity', '-8.21'],
                ['dAffinity', '-0.42'],
                ['Stability', '-1.04'],
                ['dStability', '+0.18'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-t border-[color:var(--fh-border)] pt-3 text-sm"
                >
                  <span className="text-[color:var(--fh-text-secondary)]">
                    {label}
                  </span>
                  <span className="text-[color:var(--fh-text)]">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function GuidePageV2() {
  const keyDefinitions = guideContent.definitions.filter((item) =>
    ['dAffinity', 'dStability', 'Affinity', 'Stability', 'Structure file'].includes(item.term),
  );

  return (
    <div className="bg-[color:var(--fh-bg)]">
      <section className="border-b border-[color:var(--fh-border)]">
        <div className="container-max py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-light leading-tight text-[color:var(--fh-text)] md:text-5xl">
                {guideContent.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
                {guideContent.hero.description}
              </p>
              <div className="mt-7">
                <Link to="/explorer">
                  <Button size="lg">Open Explorer</Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-max py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr,1.28fr] lg:gap-14">
          <Reveal>
            <div className="max-w-xl">
              <h2 className="text-2xl font-light leading-tight text-[color:var(--fh-text)] md:text-3xl">
                Navigation
              </h2>
              <div className="mt-6 space-y-4">
                {guideContent.steps.map((step, index) => (
                  <div
                    key={step}
                    className="border-t border-[color:var(--fh-border)] pt-4"
                  >
                    <p className="text-sm font-semibold text-[color:var(--fh-text)]">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ExplorerGuideMap />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[color:var(--fh-border)]">
        <div className="container-max py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.78fr,1.22fr] lg:gap-14">
            <Reveal>
              <div className="max-w-xl">
                <h2 className="text-2xl font-light leading-tight text-[color:var(--fh-text)] md:text-3xl">
                  Key terms
                </h2>
                <p className="mt-5 text-base leading-8 text-[color:var(--fh-text-secondary)]">
                  These are the only readouts you need to interpret the current
                  explorer workflow.
                </p>
              </div>
            </Reveal>

            <div className="space-y-5">
              {keyDefinitions.map((item, index) => (
                <Reveal key={item.term} delay={index * 0.04}>
                  <div className="border-t border-[color:var(--fh-border)] pt-4">
                    <p className="text-sm font-semibold text-[color:var(--fh-text)]">
                      {item.term}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--fh-border)]">
        <div className="container-max py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-light leading-tight text-[color:var(--fh-text)] md:text-3xl">
                Limits
              </h2>
              <p className="mt-5 text-sm leading-8 text-[color:var(--fh-text-secondary)] md:text-base">
                {guideContent.limitations}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
