export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  actions,
  imageClassName = '',
}) {
  return (
    <section className="page-backdrop overflow-hidden bg-[#0d1f1c] text-white">
      <div className="container-max relative py-16 md:py-22">
        <div className="absolute left-[-8rem] top-10 h-64 w-64 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-72 w-72 rounded-full bg-[rgba(245,158,11,0.18)] blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            {eyebrow && (
              <p className="eyebrow text-[#7dd3c7]">{eyebrow}</p>
            )}
            <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/74 md:text-xl">
              {description}
            </p>
            {actions && (
              <div className="flex flex-col gap-4 sm:flex-row">
                {actions}
              </div>
            )}
          </div>

          {image && (
            <div className="hero-visual-frame">
              <img
                src={image}
                alt={imageAlt}
                className={`max-h-[28rem] w-full rounded-[1.8rem] bg-[#f9f6ef] object-contain sm:max-h-[34rem] ${imageClassName}`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
