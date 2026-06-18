import { useDeferredValue, useState } from 'react';
import papersData from '../data/papers.json';

function buildExternalHref(type, value) {
  if (!value) return null;
  if (type === 'doi') return `https://doi.org/${value}`;
  if (type === 'pubmed') return `https://pubmed.ncbi.nlm.nih.gov/${value}/`;
  return null;
}

function PaperTag({ tag }) {
  const colors = {
    structural: '#0E6B6B',
    'catch-bond': '#2563EB',
    foundational: '#7C3AED',
    'binding-pocket': '#059669',
    OM3: '#0891B2',
    OM6: '#0891B2',
    'anti-adhesion': '#DC2626',
    glycan: '#F59E0B',
    allostery: '#8B5CF6',
    'clinical-variants': '#EA580C',
    uroplakin: '#0EA5E9',
    'cryo-em': '#6366F1',
    receptor: '#10B981',
    pathogenesis: '#EF4444',
    IBC: '#D97706',
    recurrence: '#EC4899',
    epidemiology: '#06B6D4',
    'computational-methods': '#8B5CF6',
    'protein-design': '#6366F1',
    alphafold2: '#5B21B6',
    'structural-modeling': '#3730A3',
    'normal-mode-analysis': '#4C1D95',
    dynamics: '#6D28D9',
    interactions: '#7E22CE',
    'structure-analysis': '#5B21B6',
    conservation: '#4F46E5',
    evolution: '#4338CA',
    methods: '#6366F1',
    FimH: '#0E6B6B',
    'molecular-dynamics': '#3B82F6',
    'mutation-effects': '#EF4444',
    'glycan-binding': '#F59E0B',
  };
  const bgColor = colors[tag] || '#6B7280';
  return (
    <span
      className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        backgroundColor: `${bgColor}20`,
        color: bgColor,
        border: `1px solid ${bgColor}40`,
      }}
    >
      {tag}
    </span>
  );
}

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  const papers = papersData.papers;
  const filtered = papers.filter((paper) => {
    const haystack =
      `${paper.title} ${paper.authors} ${paper.annotation} ${paper.tags.join(' ')}`.toLowerCase();
    return !deferredSearch || haystack.includes(deferredSearch);
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div className="container-max" style={{ padding: '48px 0' }}>
          <div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Papers to explore the FimH adhesin and its role in bacterial pathogenesis
            </h1>
          </div>
        </div>
      </section>

      {/* Search bar only */}
      <section style={{ padding: '24px 0', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container-max">
          <div style={{ maxWidth: '480px' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title, author, keywords..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: '14px',
                color: '#0f172a',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#94a3b8';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
              {papers.length} publications
            </p>
          </div>
        </div>
      </section>

      {/* Paper grid */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-max">
          {filtered.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map((paper) => (
                <article
                  key={paper.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '28px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
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
                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: '#0f172a',
                    }}
                  >
                    {paper.title}
                  </h3>

                  {/* Meta line */}
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 500, color: '#475569' }}>
                      {paper.authors}
                    </span>
                    {' • '}
                    {paper.year}
                    {' • '}
                    <span style={{ fontStyle: 'italic' }}>{paper.journal}</span>
                  </p>

                  {/* Annotation */}
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#475569',
                      flex: 1,
                    }}
                  >
                    {paper.annotation}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {paper.tags.map((tag) => (
                      <PaperTag key={tag} tag={tag} />
                    ))}
                  </div>

                  {/* Links */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid #f1f5f9',
                    }}
                  >
                    {paper.doi && (
                      <a
                        href={buildExternalHref('doi', paper.doi)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#0d9488',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                        onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                      >
                        DOI ↗
                      </a>
                    )}
                    {paper.pubmed && (
                      <a
                        href={buildExternalHref('pubmed', paper.pubmed)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#0d9488',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                        onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                      >
                        PubMed ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 24px',
                color: '#94a3b8',
                fontSize: '14px',
              }}
            >
              No papers matched your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}