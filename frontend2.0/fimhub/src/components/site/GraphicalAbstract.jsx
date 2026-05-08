export default function GraphicalAbstract({
  title,
  caption,
  image,
  imageAlt,
  steps = [],
  children,
}) {
  return (
    <section className="surface-panel p-6 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[1.05fr,0.95fr]">
        <div>
          <h2 className="text-3xl text-[color:var(--fh-text)] md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--fh-text-secondary)]">{caption}</p>

          {steps.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {steps.map((step) => (
                <span key={step} className="flow-pill">
                  {step}
                </span>
              ))}
            </div>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>

        <div className="figure-frame">
          <img src={image} alt={imageAlt} className="h-full w-full object-contain" />
        </div>
      </div>
    </section>
  );
}
