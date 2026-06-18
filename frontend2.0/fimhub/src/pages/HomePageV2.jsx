import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Reveal from '../components/site/Reveal';
import side2 from '../assets/manuscript/slide2.png';
import type1PilusImage from '../assets/manuscript/slide3.png';
import uroplakinComplexImage from '../assets/manuscript/slide1.png';
import fimhUpkOmOverviewImage from '../assets/manuscript/fimh-upk-om3-om6-overview.png';
const problemStats = [
  { value: '36.7M', label: 'Global UTI cases/year', context: 'Clinical scale' },
  { value: '14.9M', label: 'India pediatric UTI burden', context: 'Regional need' },
  { value: '80-90%', label: 'UPEC-caused UTIs', context: 'Primary pathogen' },
  { value: '545', label: 'Mutant models examined', context: 'Screening depth' },
];

const insightPoints = [
  {
    title: 'Pocket-level focus',
    text: 'Residue changes are framed around the mannose-binding pocket where FimH meets glycan ligands.',
  },
  {
    title: 'Host receptor context',
    text: 'Uroplakin-attached OM3 and OM6 glycans keep the model close to bladder-surface recognition.',
  },
  {
    title: 'Explorer-ready output',
    text: 'The home flow leads directly into mutation, model, and data views for deeper inspection.',
  },
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
    image: side2,
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
    }, 10000);

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
        <strong>Mutational Scanning</strong>
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
              <p className="home-kicker">FimHub interaction atlas</p>
              <h1>FimH-Uroplakin Binding</h1>
              <p className="hero-subhead">
               Mutational scanning across 545 models to map how FimH pocket mutations alter uroplakin-glycan recognition
              </p>
               <div className="hero-proof-line" aria-label="Study scope">
                <span>545 models</span>
                <span>OM3 / OM6 glycans</span>
              </div>
              <div className="hero-action-row">
                <Link to="/explorer" className="hero-cta-link">
                  <Button size="lg" className="home-primary-button">
                    Open Mutation Explorer
                  </Button>
                </Link>
              </div>

            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="home-visual-stack">
              <PlayerCarousel hero />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell home-proof-section">
        <div className="container-max">
          <Reveal>
            <div className="home-section-heading">
              <p className="home-kicker">Why it matters</p>
              <h2>UTI scale meets a mutation-level binding question.</h2>
            </div>
            <div className="stats-grid-clean" aria-label="The problem">
              {problemStats.map((stat) => (
                <div key={stat.label} className="stat-card-clean">
                  <span className="stat-context">{stat.context}</span>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell home-method-section">
        <div className="container-max">
          <Reveal>
            <div className="single-method-card">
              <div className="section-heading clean-heading method-heading">
                <p className="home-kicker">Method</p>
                <h2>What we did</h2>
                <p>
                  FimH pocket mutations were scored against uroplakin-attached glycans across the model panel.
                </p>
              </div>
              <MethodGraphic />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-bottom-actions">
        <div className="container-max">
          <Reveal>
            <div className="home-final-cta">
              <div>
                <p className="home-kicker">Next step</p>
                <h2>Move from overview to inspection.</h2>
              </div>
              <div className="compact-action-row">
                <Link to="/explorer" className="compact-action-link">
                  Explore mutations
                </Link>
                <Link to="/data" className="compact-action-link secondary">
                  View data tables
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
