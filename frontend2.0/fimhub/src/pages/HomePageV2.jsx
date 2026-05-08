import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/site/Reveal';
import StatBar from '../components/site/StatBar';
import TriviaHook from '../components/site/TriviaHook';
import Button from '../components/ui/Button';
import { homeContent } from '../content/platformContentV2';

export default function HomePageV2() {
  const [activeInsight, setActiveInsight] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveInsight((prev) => (prev + 1) % homeContent.insights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const handleNextInsight = () => {
    setDirection(1);
    setActiveInsight((prev) => (prev + 1) % homeContent.insights.length);
  };

  const handlePrevInsight = () => {
    setDirection(-1);
    setActiveInsight(
      (prev) =>
        (prev - 1 + homeContent.insights.length) % homeContent.insights.length,
    );
  };

  return (
    <div className="bg-[color:var(--fh-bg)]">
      <section className="hero-shell">
        <div className="container-max py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-4xl leading-tight text-[color:var(--fh-text)] md:text-5xl lg:text-6xl">
                {homeContent.hero.title}
              </h1>
              <p className="mt-4 text-base text-[color:var(--fh-text-secondary)] md:text-lg">
                {homeContent.hero.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-max">
          <Reveal>
            <StatBar items={homeContent.stats} />
          </Reveal>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-max">
          <div className="mb-8">
            <Reveal>
              <h2 className="text-2xl text-[color:var(--fh-text)] md:text-3xl">
                Key insights about UTI and UPEC
              </h2>
            </Reveal>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)]">
            <div className="min-h-[18rem] px-6 py-10 md:px-10 md:py-12">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeInsight}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="space-y-4"
                >
                  <div className="text-5xl font-bold text-[color:var(--fh-accent)] md:text-6xl">
                    {homeContent.insights[activeInsight].stat}
                  </div>
                  <h3 className="text-2xl text-[color:var(--fh-text)] md:text-3xl">
                    {homeContent.insights[activeInsight].headline}
                  </h3>
                  <p className="max-w-2xl text-base text-[color:var(--fh-text-secondary)] md:text-lg">
                    {homeContent.insights[activeInsight].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-[color:var(--fh-border)] px-6 py-4 md:px-10">
              <button
                onClick={handlePrevInsight}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-[color:var(--fh-border)] text-[color:var(--fh-text)] hover:bg-[color:var(--fh-mid)]"
              >
                {'<-'}
              </button>
              <div className="flex gap-2">
                {homeContent.insights.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeInsight ? 1 : -1);
                      setActiveInsight(idx);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === activeInsight
                        ? 'bg-[color:var(--fh-accent)]'
                        : 'bg-[color:var(--fh-border)]'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextInsight}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-[color:var(--fh-border)] text-[color:var(--fh-text)] hover:bg-[color:var(--fh-mid)]"
              >
                {'->'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-max">
          <Reveal>
            <div className="surface-panel px-6 py-7 md:px-8">
              <TriviaHook
                title={homeContent.trivia.title}
                statement={homeContent.trivia.statement}
                citation={homeContent.trivia.citation}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-max">
          <div className="grid gap-6 lg:grid-cols-3">
            {homeContent.previewCards.map((card, idx) => {
              return (
                <Reveal key={card.title} delay={idx * 0.1}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    className="group flex flex-col overflow-hidden rounded-lg border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] transition-shadow hover:shadow-lg"
                  >
                    <div className="overflow-hidden bg-[color:var(--fh-mid)]">
                      <motion.img
                        src={card.image || homeContent.hero.image}
                        alt={card.imageAlt || card.title}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-[color:var(--fh-text)]">
                        {card.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-[color:var(--fh-text-secondary)]">
                        {card.description}
                      </p>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--fh-border)] py-16 md:py-20">
        <div className="container-max text-center">
          <Reveal>
            <h2 className="text-3xl text-[color:var(--fh-text)] md:text-4xl">
              Ready to inspect the mutation dataset?
            </h2>
            <p className="mt-4 text-[color:var(--fh-text-secondary)]">
              Open the data tables to browse model-specific mutation records
              across the published host and glycan contexts.
            </p>
            <Link to="/data" className="mt-6 inline-block">
              <Button size="lg">View Data Tables</Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
