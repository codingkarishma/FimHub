import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Reveal from '../components/site/Reveal';
import fimhUpkOmOverviewImage from '../assets/manuscript/fimh-upk-om3-om6-overview.png';
import type1PilusImage from '../assets/rpec/type1-pilus.png';
import uroplakinComplexImage from '../assets/rpec/uroplakin-complex.png';

const problemStats = [
  { value: '36.7M+', label: 'Global UTI cases/year' },
  { value: '14.9M', label: 'India pediatric UTI burden' },
  { value: '80-90%', label: 'UPEC-caused UTIs' },
  { value: '545', label: 'Mutant models examined' },
];

const playerSlides = [
  {
    title: 'Uroplakin',
    subtitle: 'Bladder surface receptor',
    text: 'Presents glycan context for bacterial attachment.',
    image: uroplakinComplexImage,
  },
  {
    title: 'Glycan',
    subtitle: 'OM3 / OM6 sugars',
    text: 'High-mannose N-glycans that FimH recognizes.',
    image: fimhUpkOmOverviewImage,
  },
  {
    title: 'FimH',
    subtitle: 'Type 1 pilus adhesin',
    text: 'Bacterial protein at the fimbrial tip with a mannose-binding pocket.',
    image: type1PilusImage,
  },
  {
    title: 'Combined Model',
    subtitle: 'FimH + UPK + Glycan',
    text: 'The full interaction system used in our model panel.',
    image: fimhUpkOmOverviewImage,
  },
];

function PlayerCarousel({ hero = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const activeSlide = playerSlides[activeIndex];

  const goToSlide = (nextIndex) => {
    const normalizedIndex = (nextIndex + playerSlides.length) % playerSlides.length;
    setActiveIndex(normalizedIndex);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % playerSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;
    const delta = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 45) {
      goToSlide(activeIndex + (delta > 0 ? 1 : -1));
    }
    setTouchStart(null);
  };

  return (
    <div className={`home-carousel-clean ${hero ? 'hero-carousel' : ''}`}>
      <button
        type="button"
        className="carousel-arrow"
        onClick={() => goToSlide(activeIndex - 1)}
        aria-label="Previous slide"
      >
        &lt;
      </button>

      <motion.article
        key={activeSlide.title}
        className="carousel-slide-card"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-slide-image">
          <img src={activeSlide.image} alt={activeSlide.subtitle} loading="lazy" />
        </div>
        <div className="carousel-slide-copy">
          <p className="eyebrow text-[color:var(--fh-accent)]">
            {String(activeIndex + 1).padStart(2, '0')} / 04
          </p>
          <h3>{activeSlide.title}</h3>
          <strong>{activeSlide.subtitle}</strong>
          <p>{activeSlide.text}</p>
        </div>
      </motion.article>

      <button
        type="button"
        className="carousel-arrow"
        onClick={() => goToSlide(activeIndex + 1)}
        aria-label="Next slide"
      >
        &gt;
      </button>

      <div className="carousel-dots" aria-label="Carousel slide controls">
        {playerSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => goToSlide(index)}
            aria-label={`Show ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
}

function MethodGraphic() {
  return (
    <div className="single-method-graphic">
      <div className="fimh-pocket-graphic">
        <span>FimH</span>
        <strong>MBP</strong>
        <small>mannose-binding pocket</small>
      </div>
      <div className="method-arrow">
        <span>Mutations introduced in MBP</span>
      </div>
      <div className="glycan-score-graphic">
        <span>UPK-attached glycans</span>
        <strong>Affinity scored</strong>
      </div>
    </div>
  );
}

export default function HomePageV2() {
  return (
    <div className="page-surface clean-home-page">
      <section className="home-hero-carousel">
        <div className="container-max home-hero-carousel-grid">
          <Reveal>
            <div className="hero-copy-rail">
              <h1>FimH &amp; Uroplakin Interaction</h1>
              <p className="hero-subhead">
                Mutational scanning across 545 models to map how FimH pocket mutations alter uroplakin-glycan recognition.
              </p>
              <Link to="/explorer" className="hero-cta-link">
                <Button size="lg">Open Mutation Explorer</Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <PlayerCarousel hero />
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max">
          <Reveal>
            <div className="stats-grid-clean" aria-label="The problem">
              {problemStats.map((stat) => (
                <div key={stat.label} className="stat-card-clean">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max">
          <Reveal>
            <div className="single-method-card">
              <div className="section-heading clean-heading">
                <h2>What we did</h2>
              </div>
              <MethodGraphic />
              <p>
                FimH pocket mutations were scored against uroplakin-attached glycans across the model panel.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-bottom-actions">
        <div className="container-max">
          <Reveal>
            <div className="compact-action-row">
              <Link to="/explorer" className="compact-action-link">
                Explore mutations
              </Link>
              <Link to="/data" className="compact-action-link secondary">
                View data tables
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
