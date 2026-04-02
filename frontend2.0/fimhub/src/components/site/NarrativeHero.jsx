export default function NarrativeHero({
  eyebrow,
  title,
  lines = [],
  image,
  imageAlt,
  supportCards = [],
}) {
  return (
    <section className="page-backdrop overflow-hidden bg-[#f3ede3]">
      <div className="container-max relative py-14 md:py-18">
        <div className="absolute left-[-6rem] top-0 h-56 w-56 rounded-full bg-[rgba(20,184,166,0.15)] blur-3xl" />
        <div className="absolute right-[-7rem] top-10 h-72 w-72 rounded-full bg-[rgba(251,191,36,0.12)] blur-3xl" />

        <div className="relative grid items-start gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <p className="eyebrow text-[#0f766e]">{eyebrow}</p>
            <h1 className="max-w-4xl text-5xl leading-[0.98] text-slate-950 md:text-7xl xl:text-[5rem]">
              {title}
            </h1>
            <div className="space-y-3">
              {lines.map((line) => (
                <p key={line} className="text-lg leading-8 text-slate-700 md:text-xl">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="hero-visual-frame bg-white/75">
              <img
                src={image}
                alt={imageAlt}
                className="h-[20rem] w-full rounded-[2rem] bg-[#f9f6ef] object-contain p-6 sm:h-[24rem] lg:h-[28rem]"
              />
            </div>

            {supportCards.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {supportCards.map((card) => (
                  <div key={card.title} className="rounded-[1.6rem] border border-slate-200/80 bg-white/88 p-5 shadow-[0_22px_70px_-44px_rgba(15,23,42,0.45)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
