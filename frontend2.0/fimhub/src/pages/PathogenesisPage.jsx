import Reveal from '../components/site/Reveal';

export default function PathogenesisPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      {/* stretched container: wider max-width, slightly less side padding on large screens */}
      <section className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-10">

        {/* ── Intro ── */}
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mt-5 text-lg leading-relaxed text-gray-600 sm:text-xl">
              Uropathogenic <em className="font-semibold italic">E. coli</em> (UPEC) doesn’t just wash away with urine.
              It climbs, grips, sneaks inside, and builds hidden colonies. Here is the step-by-step story.
            </p>
          </div>
        </Reveal>

        {/* ── Main Figure: stretched frame ── */}
        <Reveal delay={0.1}>
          <figure className="mx-auto mb-14">
            <div className="rounded-xl bg-white p-4 sm:p-8 shadow-md ring-1 ring-gray-200">
              <img
                src="/pathogenesis.png"
                alt="UPEC pathogenesis diagram showing lower tract entry, urothelial attachment via FimH and high-mannose glycan, umbrella-cell invasion, and intracellular bacterial colony formation."
                loading="lazy"
                className="w-full rounded-lg"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm italic text-gray-400">
              From urethral ascent to intracellular persistence: the complete UPEC infection cycle.
            </figcaption>
          </figure>
        </Reveal>

        {/* ── Story Steps: stretched grid ── */}
        <Reveal delay={0.2}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Step 1 */}
            <div className="rounded-lg border-t-4 border-red-500 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                1
              </span>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Entry</h3>
              <p className="text-base leading-relaxed text-gray-600">
                UPEC travels up the urethra and enters the bladder, surviving the constant flow of urine.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-lg border-t-4 border-blue-600 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                2
              </span>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Grip</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Hair-like hooks on the bacteria latch onto sugar molecules on the bladder lining, locking them in place.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-lg border-t-4 border-purple-600 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                3
              </span>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Invasion</h3>
              <p className="text-base leading-relaxed text-gray-600">
                The bladder cell swallows the bacterium, pulling it inside a protective bubble.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-lg border-t-4 border-amber-500 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                4
              </span>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Hide & Persist</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Inside, bacteria multiply into tight clusters, hidden from antibiotics and the immune system.
              </p>
            </div>

          </div>
        </Reveal>

      </section>
    </div>
  );
}