import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Reveal from '../components/site/Reveal';
import side2 from '../assets/manuscript/glycan.webp';
import type1PilusImage from '../assets/manuscript/fimH_labelled.webp';
import uroplakinComplexImage from '../assets/manuscript/AUM_with_po_UPK_HiDef.webp';
import fimhUpkOmOverviewImage from '../assets/manuscript/fimh-upk-om3-om6-overview.webp';

// ============================================================
// 1. DATA
// ============================================================
const problemStats = [
  {
    value: '150M',
    label: 'Global UTI cases/year',
    context: 'Clinical scale',
    source: 'Flores-Mireles et al., Nat Rev Microbiol (2015)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4457377/',
  },
  {
    value: '14.9M',
    label: 'India pediatric UTI burden',
    context: 'Regional need',
    source: 'GBD 2021, Trop Med Health (2025)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12642102/',
  },
  {
    value: '80–90%',
    label: 'UPEC-caused UTIs',
    context: 'Primary pathogen',
    source: 'Gebremedhin et al., Infect Agents Cancer (2025)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12467495/',
  },
  {
    value: '545',
    label: 'Mutant models examined',
    context: 'Screening depth',
    source:
      'Shekhar S, Bhagat K, Padhi AK, International Journal of Biological Macromolecules',
    sourceUrl:
      'https://www.sciencedirect.com/science/article/pii/S0141813026023342?via%3Dihub',
  },
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
    text: 'Primary site for bacterial adhesion in Lower UTIs',
    image: uroplakinComplexImage,
  },
  {
    title: 'Glycan',
    subtitle: 'OM3 / OM6 sugars',
    text: 'High-mannose N-glycans that FimH recognizes',
    image: side2,
  },
  {
    title: 'FimH',
    subtitle: 'Type 1 pilus adhesin',
    text: 'Bacterial protein at the fimbrial tip with a mannose-binding pocket',
    image: type1PilusImage,
  },
  {
    title: 'Combined Model',
    subtitle: 'FimH + UPK + Glycan',
    text: 'The full interaction system used in our model panel',
    image: fimhUpkOmOverviewImage,
  },
];

// ============================================================
// 2. PLAYER CAROUSEL COMPONENT
// ============================================================
function PlayerCarousel({ hero = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const activeSlide = playerSlides[activeIndex];

  const goToSlide = (nextIndex) => {
    const normalizedIndex =
      (nextIndex + playerSlides.length) % playerSlides.length;
    setActiveIndex(normalizedIndex);
  };

  // useEffect(() => {
  //   const timer = window.setInterval(() => {
  //     setActiveIndex(
  //       (currentIndex) => (currentIndex + 1) % playerSlides.length,
  //     );
  //   }, 7500);

  //   return () => window.clearInterval(timer);
  // }, []);

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
        ‹
      </button>

      <article
        className="carousel-slide-card"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-slide-image">
          <motion.img
            key={activeSlide.title}
            src={activeSlide.image}
            alt={activeSlide.subtitle}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="carousel-slide-copy">
          <motion.div
            key={`${activeSlide.title}-copy`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-[color:var(--fh-accent)]">
              {String(activeIndex + 1).padStart(2, '0')} / 04
            </p>
            <h3>{activeSlide.title}</h3>
            <strong>{activeSlide.subtitle}</strong>
            <p>{activeSlide.text}</p>
          </motion.div>
        </div>
      </article>

      <button
        type="button"
        className="carousel-arrow"
        onClick={() => goToSlide(activeIndex + 1)}
        aria-label="Next slide"
      >
        ›
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

// ============================================================
// 3. METHOD GRAPHIC COMPONENT
// ============================================================
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

// ============================================================
// 4. MAIN HOMEPAGE COMPONENT
// ============================================================
export default function HomePageV2() {
  return (
    <div className="page-surface clean-home-page">

      {/* ===== HERO SECTION ===== */}
      <section className="home-hero-carousel">
        {/* Looping background video */}
        <video
          className="hero-background-video"
          src="/fimhub_background_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Dark overlay so text stays readable over the video */}
        <div className="hero-background-overlay" aria-hidden="true" />

        <div className="container-max home-hero-carousel-grid">
          <Reveal>
            <div className="hero-copy-rail">
              {/* Brand + FimHub title */}
              <div className="hero-brand">
                <h2 className="hero-title">FimHub</h2>
                <p className="hero-tagline">
                  FimHub organizes and visualizes mutational scanning data for the FimH uroplakin complex
                </p>
              </div>

              {/* 3-line FimHub description */}
              <p className="hero-description">
                We studied how over 545 single point mutations in the FimH binding pocket alter glycan recognition.
                This resource helps researchers understand bacterial adhesion and design better anti adhesion therapies.
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

      {/* ===== WHY IT MATTERS SECTION ===== */}
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
                  {stat.source && (
                    <a
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stat-source"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {stat.source}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== METHOD SECTION ===== */}
      <section className="section-shell home-method-section">
        <div className="container-max">
          <Reveal>
            <div className="single-method-card">
              <div className="section-heading clean-heading method-heading">
                <p className="home-kicker">Method</p>
                <h2>What we did</h2>
                <p className="what_we_did">
                  FimH pocket mutations were compared against Wild Type FimH in complex with Uroplakin-attached-Glycan
                </p>
              </div>
              <MethodGraphic />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== BOTTOM CTA SECTION ===== */}
      <section className="home-bottom-actions">
        <div className="container-max">
          <Reveal>
            <div className="home-final-cta">
              <div>
                <p className="home-kicker">Next step</p>
                <h2>Move from overview to inspection</h2>
              </div>
              <div className="compact-action-row">
                <Link to="/explorer" className="compact-action-link">
                  Explore mutations
                </Link>
                <Link to="/data" className="compact-action-link secondary">
                  Data tables
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}