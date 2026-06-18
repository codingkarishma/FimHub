import { Link } from 'react-router-dom';
import Reveal from '../components/site/Reveal';
import Button from '../components/ui/Button';

const quickStartSteps = [
  {
    number: '01',
    title: 'Open the Explorer',
    text: 'Navigate to the Mutation Explorer. This is the central workspace where all models, residue sites, mutations, scores, and structures are connected.',
    action: 'Go to Explorer',
    href: '/explorer',
  },
  {
    number: '02',
    title: 'Choose a Model',
    text: 'Select your host–glycan system from the left panel. Available options include Human OM3, Human OM6, Porcine OM3, and Porcine OM6. Each model represents a distinct structural context for FimH binding.',
    action: null,
    href: null,
  },
  {
    number: '03',
    title: 'Select a Residue',
    text: 'Click any residue position in the grid to view all available substitutions at that site. The residue selector filters by wild-type amino acid and position number.',
    action: null,
    href: null,
  },
  {
    number: '04',
    title: 'Pick a Mutation',
    text: 'Choose a specific substitution to load its thermodynamic profile: binding affinity, stability, phenotype classification, and linked structural data.',
    action: null,
    href: null,
  },
  {
    number: '05',
    title: 'Read the Charts',
    text: 'Compare Affinity vs ΔAffinity and Stability vs ΔStability side-by-side for all substitutions at your selected position. Use the structure viewer when a PDB file is available.',
    action: null,
    href: null,
  },
];

const terminology = [
  {
    term: 'Affinity',
    definition: 'Absolute binding score for the selected mutant. Lower (more negative) values indicate stronger predicted glycan binding.',
  },
  {
    term: 'ΔAffinity (dAffinity)',
    definition: 'Change in binding free energy relative to wild type. Negative values suggest improved binding; positive values suggest weakened binding.',
  },
  {
    term: 'Stability',
    definition: 'Absolute protein stability score for the mutant. Reflects the thermodynamic favorability of the folded state.',
  },
  {
    term: 'ΔStability (dStability)',
    definition: 'Change in stability relative to wild type. Negative values indicate destabilization; positive values indicate stabilization.',
  },
  {
    term: 'Structure File',
    definition: 'A linked PDB coordinate file available for direct download and 3D visualization in the structure viewer.',
  },
  {
    term: 'Cross-Model Comparison',
    definition: 'Compare the same mutation across all curated host–glycan models to assess binding consistency and structural availability.',
  },
];

export default function GuidePageV2() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
     <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#0f172a', textAlign: 'center', paddingTop: '48px' }}>
        FimHub User Guide
      </h1>
      {/* Quick Start Steps */}
      <section style={{ padding: '48px 0 64px' }}>
        <div className="container-max">
          <Reveal>
            <div style={{ marginBottom: '36px' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#64748b',
                  marginBottom: '10px',
                }}
              >
                Start Here
              </p>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '8px',
                }}
              >
                Five Steps to a Result
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '560px' }}>
                Follow this sequence. Each step builds on the previous one.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {quickStartSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04}>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '24px 28px',
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr auto',
                    gap: '24px',
                    alignItems: 'start',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  }}
                >
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#e2e8f0',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      lineHeight: 1,
                      paddingTop: '2px',
                    }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: '17px',
                        fontWeight: 600,
                        color: '#0f172a',
                        marginBottom: '6px',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: '#475569',
                        maxWidth: '560px',
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                  {step.action && step.href && (
                    <div style={{ paddingTop: '4px' }}>
                      <Link
                        to={step.href}
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#0d9488',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                        onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                      >
                        {step.action} →
                      </Link>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Terminology */}
      <section style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '48px 0 64px' }}>
        <div className="container-max">
          <Reveal>
            <div style={{ marginBottom: '36px' }}>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '8px',
                }}
              >
                What the Numbers Mean
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '560px' }}>
                Definitions for the core metrics displayed in the explorer.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {terminology.map((item, index) => (
              <Reveal key={item.term} delay={index * 0.03}>
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    padding: '20px 24px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                >
                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '8px',
                    }}
                  >
                    {item.term}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#475569',
                    }}
                  >
                    {item.definition}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: '#0f172a', padding: '48px 0' }}>
        <div className="container-max">
          <Reveal>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#94a3b8',
                    marginBottom: '10px',
                  }}
                >
                  Ready to begin?
                </p>
                <h2
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#f8fafc',
                    marginBottom: '6px',
                  }}
                >
                  Explore mutations now.
                </h2>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  Use FimHub as a computational guide for FimH structural analysis.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/explorer" style={{ textDecoration: 'none' }}>
                  <Button size="lg" variant="primary">
                    Open Explorer
                  </Button>
                </Link>
                <Link to="/papers" style={{ textDecoration: 'none' }}>
                  <Button size="lg" variant="outline" style={{ borderColor: '#475569', color: 'black' }}>
                    Read Papers
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}