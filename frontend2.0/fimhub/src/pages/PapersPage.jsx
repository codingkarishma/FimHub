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
    'structural': '#0E6B6B',
    'catch-bond': '#2563EB',
    'foundational': '#7C3AED',
    'binding-pocket': '#059669',
    'OM3': '#0891B2',
    'OM6': '#0891B2',
    'anti-adhesion': '#DC2626',
    'glycan': '#F59E0B',
    'allostery': '#8B5CF6',
    'clinical-variants': '#EA580C',
    'uroplakin': '#0EA5E9',
    'cryo-em': '#6366F1',
    'receptor': '#10B981',
    'pathogenesis': '#EF4444',
    'IBC': '#D97706',
    'recurrence': '#EC4899',
    'epidemiology': '#06B6D4',
    'computational-methods': '#8B5CF6',
    'protein-design': '#6366F1',
    'alphafold2': '#5B21B6',
    'structural-modeling': '#3730A3',
    'normal-mode-analysis': '#4C1D95',
    'dynamics': '#6D28D9',
    'interactions': '#7E22CE',
    'structure-analysis': '#5B21B6',
    'conservation': '#4F46E5',
    'evolution': '#4338CA',
    'methods': '#6366F1',
    'FimH': '#0E6B6B',
    'molecular-dynamics': '#3B82F6',
    'mutation-effects': '#EF4444',
    'glycan-binding': '#F59E0B',
  };
  const bgColor = colors[tag] || '#6B7280';
  return (
    <span className="inline-block rounded-full px-2.5 py-1 text-xs font-medium" style={{
      backgroundColor: `${bgColor}20`,
      color: bgColor,
      border: `1px solid ${bgColor}40`
    }}>
      {tag}
    </span>
  );
}

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  const papers = papersData.papers;
  const categories = ['All', ...new Set(papers.map((paper) => paper.category))];
  const filtered = papers.filter((paper) => {
    const matchesCategory = activeCategory === 'All' || paper.category === activeCategory;
    const haystack = `${paper.title} ${paper.authors} ${paper.annotation} ${paper.tags.join(' ')}`.toLowerCase();
    const matchesSearch = !deferredSearch || haystack.includes(deferredSearch);
    return matchesCategory && matchesSearch;
  });
  
  const featured = filtered.filter(p => p.featured);
  const regular = filtered.filter(p => !p.featured);

  return (
    <div>
      <section className="hero-shell">
        <div className="container-max py-12 md:py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl leading-[1.02] text-[color:var(--fh-text)] md:text-5xl">
              Literature
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--fh-text-secondary)] md:text-lg">
              Peer-reviewed references supporting FimH structural analysis, glycan recognition, uroplakin interactions, and computational methods.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell !py-12">
        <div className="container-max">
          <div className="surface-panel px-6 py-6">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search title, author, keywords..."
                  className="w-full rounded-lg border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] px-4 py-3 text-sm text-[color:var(--fh-text)] outline-none transition-all focus:border-[color:var(--fh-accent)] focus:ring-2 focus:ring-[color:var(--fh-accent-soft)] xl:max-w-md"
                />
                <p className="mt-2 text-xs text-[color:var(--fh-text-secondary)]">
                  {papers.length} total • {filtered.length} shown
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'border-[color:var(--fh-accent)] bg-[color:var(--fh-accent-soft)] text-[color:var(--fh-text)]'
                      : 'border-[color:var(--fh-border)] bg-transparent text-[color:var(--fh-text-secondary)] hover:border-[color:var(--fh-accent)] hover:text-[color:var(--fh-text)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section-shell !py-12">
          <div className="container-max">
            <h2 className="mb-6 text-lg font-semibold text-[color:var(--fh-text)]">Featured</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {featured.map((paper) => (
                <article 
                  key={paper.id} 
                  className="surface-panel rounded-lg border border-[color:var(--fh-border)] p-6 transition-all hover:border-[color:var(--fh-accent)] hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold leading-snug text-[color:var(--fh-text)] mb-3">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-[color:var(--fh-text-secondary)] mb-3">
                    <span className="font-medium">{paper.authors}</span> • {paper.year} • {paper.journal}
                  </p>
                  <p className="text-sm leading-6 text-[color:var(--fh-text-secondary)] mb-4">
                    {paper.annotation}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <PaperTag key={tag} tag={tag} />
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {paper.doi && (
                      <a
                        href={buildExternalHref('doi', paper.doi)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[color:var(--fh-accent)] hover:underline"
                      >
                        DOI
                      </a>
                    )}
                    {paper.pubmed && (
                      <a
                        href={buildExternalHref('pubmed', paper.pubmed)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[color:var(--fh-accent)] hover:underline"
                      >
                        PubMed
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 pt-12">
        <div className="container-max">
          {regular.length > 0 && (
            <div>
              <h2 className="mb-6 text-lg font-semibold text-[color:var(--fh-text)]">References</h2>
              <div className="surface-panel rounded-lg overflow-hidden border border-[color:var(--fh-border)]">
                <div className="divide-y divide-[color:var(--fh-border)]">
                  {regular.map((paper) => (
                    <article key={paper.id} className="p-6 transition-colors hover:bg-[color:var(--fh-accent-soft)]">
                      <h3 className="text-base font-semibold text-[color:var(--fh-text)] leading-snug mb-2">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-[color:var(--fh-text-secondary)] mb-3">
                        <span className="font-medium">{paper.authors}</span> • {paper.year} • {paper.journal}
                      </p>
                      <p className="text-sm leading-6 text-[color:var(--fh-text-secondary)] mb-3">
                        {paper.annotation}
                      </p>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex flex-wrap gap-2">
                          {paper.tags.map((tag) => (
                            <PaperTag key={tag} tag={tag} />
                          ))}
                        </div>
                        <div className="flex gap-4 text-sm">
                          {paper.doi && (
                            <a
                              href={buildExternalHref('doi', paper.doi)}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-[color:var(--fh-accent)] hover:underline"
                            >
                              DOI
                            </a>
                          )}
                          {paper.pubmed && (
                            <a
                              href={buildExternalHref('pubmed', paper.pubmed)}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-[color:var(--fh-accent)] hover:underline"
                            >
                              PubMed
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
          {filtered.length === 0 && (
            <div className="surface-panel rounded-lg border border-[color:var(--fh-border)] p-8 text-center">
              <p className="text-sm text-[color:var(--fh-text-secondary)]">No papers matched your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
