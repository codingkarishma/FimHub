import { pathogenesisPageContent } from '../content/platformContentV2';
import Reveal from '../components/site/Reveal';

function FigureStage({ item }) {
  return (
    <figure className="rounded-[1.5rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4 md:p-5">
      <div
        className={`flex items-center justify-center overflow-hidden rounded-[1.05rem] bg-[color:var(--fh-mid)] ${
          item.frameClassName || 'min-h-[18rem] md:min-h-[22rem]'
        }`}
      >
        <img
          src={item.image}
          alt={item.imageAlt}
          className={item.imageClassName || 'h-full w-full object-contain'}
        />
      </div>
      {item.title && (
        <p className="mt-4 text-sm font-semibold text-[color:var(--fh-text)]">
          {item.title}
        </p>
      )}
      <figcaption
        className={`${item.title ? 'mt-2' : 'mt-4'} text-sm leading-7 text-[color:var(--fh-text-secondary)]`}
      >
        {item.caption}
      </figcaption>
    </figure>
  );
}

function StoryBeat({ beat }) {
  return (
    <section className="border-t border-[color:var(--fh-border)] py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[5rem,0.84fr,1.16fr] lg:gap-10">
        <div className="text-[3rem] font-light leading-none text-[color:var(--fh-border-strong)] md:text-[4.25rem]">
          {beat.number}
        </div>
        <div className="max-w-xl">
          <h3 className="text-2xl font-light leading-tight text-[color:var(--fh-text)] md:text-[2.2rem]">
            {beat.title}
          </h3>
          <p className="mt-5 text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
            {beat.text}
          </p>
        </div>
        <div>
          {beat.figure && <FigureStage item={beat.figure} />}
          {beat.figures && (
            <div className="grid gap-4 md:grid-cols-2">
              {beat.figures.map((figure) => (
                <FigureStage key={figure.title} item={figure} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function PathogenesisPage() {
  return (
    <div className="bg-[color:var(--fh-bg)]">
      <section className="relative overflow-hidden border-b border-[color:var(--fh-border)]">
        <div className="absolute left-[-8rem] top-[-6rem] h-[22rem] w-[22rem] rounded-full bg-[color:var(--fh-mid)] opacity-60 blur-3xl" />
        <div className="absolute right-[-10rem] top-[3rem] h-[26rem] w-[26rem] rounded-full bg-[color:var(--fh-mid)] opacity-50 blur-3xl" />
        <div className="container-max relative py-12 md:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.84fr,1.16fr] lg:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <h1 className="text-4xl font-light leading-[1.02] text-[color:var(--fh-text)] md:text-6xl">
                  {pathogenesisPageContent.hero.title}
                </h1>
                <p className="mt-6 text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-xl">
                  {pathogenesisPageContent.hero.description}
                </p>
                <div className="mt-10 grid gap-4 border-t border-[color:var(--fh-border)] pt-6">
                  {pathogenesisPageContent.hero.statements.map((statement) => (
                    <p
                      key={statement}
                      className="max-w-xl text-sm leading-7 text-[color:var(--fh-text-secondary)] md:text-base"
                    >
                      {statement}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-[1.8rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-4 md:p-6">
                <div className="flex min-h-[20rem] items-center justify-center overflow-hidden rounded-[1.2rem] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--fh-mid)_82%,white_18%),var(--fh-surface))] md:min-h-[28rem]">
                  <img
                    src={pathogenesisPageContent.hero.image}
                    alt={pathogenesisPageContent.hero.imageAlt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-max py-14 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:gap-14">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-light leading-tight text-[color:var(--fh-text)] md:text-[2.5rem]">
                {pathogenesisPageContent.context.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
                {pathogenesisPageContent.context.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="grid gap-5 md:grid-cols-3">
              {pathogenesisPageContent.context.causes.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-[color:var(--fh-border-strong)] pt-4"
                >
                  <h3 className="text-base font-semibold text-[color:var(--fh-text)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-6 border-t border-[color:var(--fh-border)] pt-8 lg:grid-cols-[0.7fr,1.3fr] lg:gap-10">
            <h3 className="text-2xl font-light leading-tight text-[color:var(--fh-text)] md:text-3xl">
              {pathogenesisPageContent.context.focusTitle}
            </h3>
            <p className="max-w-3xl text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
              {pathogenesisPageContent.context.focusText}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[color:var(--fh-border)] bg-[color:var(--fh-surface)]">
        <div className="container-max py-14 md:py-18">
          <Reveal>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-light leading-tight text-[color:var(--fh-text)] md:text-[2.7rem]">
                {pathogenesisPageContent.story.title}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
                {pathogenesisPageContent.story.description}
              </p>
            </div>
          </Reveal>

          <div className="mt-8">
            {pathogenesisPageContent.story.beats.map((beat, index) => (
              <Reveal key={beat.number} delay={index * 0.05}>
                <StoryBeat beat={beat} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-[color:var(--fh-border)] py-12">
              <div className="grid gap-8 lg:grid-cols-[0.78fr,1.22fr] lg:gap-12">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-light leading-tight text-[color:var(--fh-text)] md:text-3xl">
                    {pathogenesisPageContent.story.aftermath.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
                    {pathogenesisPageContent.story.aftermath.text}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-5">
                  {pathogenesisPageContent.story.aftermath.phases.map(
                    (phase, index) => (
                      <div
                        key={phase}
                        className="border-t border-[color:var(--fh-border-strong)] pt-4"
                      >
                        <p className="text-sm font-semibold text-[color:var(--fh-border-strong)]">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
                          {phase}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-max py-14 md:py-18">
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-light leading-tight text-[color:var(--fh-text)] md:text-[2.7rem]">
              {pathogenesisPageContent.projectFocus.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
              {pathogenesisPageContent.projectFocus.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {pathogenesisPageContent.projectFocus.figures.map((figure, index) => (
            <Reveal key={figure.title} delay={index * 0.05}>
              <FigureStage item={figure} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color:var(--fh-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--fh-mid)_70%,white_30%),var(--fh-bg))]">
        <div className="absolute right-[-8rem] top-[-5rem] h-[20rem] w-[20rem] rounded-full bg-white/50 blur-3xl" />
        <div className="container-max relative py-14 md:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:gap-14">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-3xl font-light leading-tight text-[color:var(--fh-text)] md:text-[2.7rem]">
                  {pathogenesisPageContent.india.title}
                </h2>
                <p className="mt-6 text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
                  {pathogenesisPageContent.india.description}
                </p>
                <div className="mt-8 space-y-4">
                  {pathogenesisPageContent.india.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-[color:var(--fh-text-secondary)] md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-10 border-l border-[color:var(--fh-border-strong)] pl-5">
                  <h3 className="text-xl font-light text-[color:var(--fh-text)] md:text-2xl">
                    {pathogenesisPageContent.india.societyTitle}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--fh-text-secondary)] md:text-base">
                    {pathogenesisPageContent.india.societyText}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="grid gap-5 md:grid-cols-3">
                {pathogenesisPageContent.india.stats.map((item) => (
                  <div
                    key={item.value}
                    className="border-t border-[color:var(--fh-border-strong)] pt-5"
                  >
                    <p className="text-3xl font-light text-[color:var(--fh-text)] md:text-4xl">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
