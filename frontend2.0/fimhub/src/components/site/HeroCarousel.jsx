import { useEffect, useEffectEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroCarousel({ slides = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] || null;
  const cycleSlides = useEffectEvent(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  });

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      cycleSlides();
    }, 6500);

    return () => window.clearInterval(timer);
  }, [cycleSlides, slides.length]);

  if (!activeSlide) {
    return null;
  }

  return (
    <section className="page-backdrop overflow-hidden bg-[#0d1f1c] text-white">
      <div className="container-max relative py-14 md:py-20">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.28),transparent_52%)]" />
        <div className="absolute right-[-6rem] top-16 h-72 w-72 rounded-full bg-[rgba(245,158,11,0.18)] blur-3xl" />
        <div className="absolute left-[-5rem] bottom-0 h-72 w-72 rounded-full bg-[rgba(94,234,212,0.16)] blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.04fr,0.96fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
              Narrative entry point
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
                className="space-y-5"
              >
                <p className="eyebrow text-[#7dd3c7]">{activeSlide.eyebrow}</p>
                <h1 className="max-w-4xl text-5xl leading-[0.98] text-white md:text-7xl xl:text-[5.4rem]">
                  {activeSlide.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                  {activeSlide.support}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/infection-story">
                <Button size="lg">Start the story</Button>
              </Link>
              <Link to="/mutation-explorer">
                <Button variant="outline" size="lg" className="border-white/20 bg-white/6 text-white hover:bg-white/12">
                  Open explorer
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group flex items-center gap-3 rounded-full border px-3 py-2 text-left transition-colors ${
                      isActive
                        ? 'border-[#7dd3c7]/70 bg-white/10 text-white'
                        : 'border-white/12 bg-white/5 text-white/65 hover:bg-white/8'
                    }`}
                    aria-label={`Show slide ${index + 1}`}
                  >
                    <span className={`h-2.5 rounded-full transition-all ${isActive ? 'w-8 bg-[#7dd3c7]' : 'w-2.5 bg-white/35 group-hover:bg-white/55'}`} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="hero-visual-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide.image}
                  src={activeSlide.image}
                  alt={activeSlide.imageAlt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="h-[20rem] w-full rounded-[2rem] bg-[rgba(247,244,235,0.97)] object-contain p-6 sm:h-[26rem] lg:h-[32rem]"
                />
              </AnimatePresence>
            </div>

            <div className="absolute bottom-5 left-5 rounded-[1.5rem] border border-white/10 bg-[#102a25]/88 px-5 py-4 shadow-[0_28px_90px_-46px_rgba(0,0,0,0.75)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7dd3c7]">
                Story path
              </p>
              <p className="mt-2 max-w-xs text-sm leading-7 text-white/72">
                Infection to mutation to research significance in one continuous flow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
