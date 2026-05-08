import { useDeferredValue, useState } from 'react';
import papersData from '../data/papers.json';

function buildExternalHref(type, value) {
  if (!value) return null;
  if (type === 'doi') return `https://doi.org/${value}`;
  if (type === 'pubmed') return `https://pubmed.ncbi.nlm.nih.gov/${value}/`;
  return null;
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

  return (
    <div>
      <section className="hero-shell">
        <div className="container-max py-12 md:py-14">
          <div className="max-w-4xl">
            <h1 className="text-4xl leading-[1.02] text-[color:var(--fh-text)] md:text-5xl">
              Reference library
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--fh-text-secondary)] md:text-lg">
              Browse the core papers behind the platform, from UTI biology and uroplakin recognition to FimH structure and mutation analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell !py-10">
        <div className="container-max">
          <section className="surface-panel px-5 py-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-serif text-2xl text-[color:var(--fh-text)]">
                  Library
                </h2>
                <p className="mt-2 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
                  Search by title, author, or topic, then narrow the reading list by category.
                </p>
              </div>
              <div className="flex flex-col gap-4 xl:min-w-[26rem] xl:items-end">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search title, author, or topic"
                  className="w-full rounded-md border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] px-3 py-2.5 text-sm text-[color:var(--fh-text)] outline-none transition-colors focus:border-[color:var(--fh-accent)] xl:max-w-md"
                />
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[color:var(--fh-text-secondary)]">
                  <p>{papers.length} records</p>
                  <p>{filtered.length} shown</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                    activeCategory === category
                      ? 'border-[color:var(--fh-accent)] bg-[color:var(--fh-accent-soft)] text-[color:var(--fh-text)]'
                      : 'border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] text-[color:var(--fh-text-secondary)] hover:border-[color:var(--fh-accent)] hover:text-[color:var(--fh-text)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-max">
          <section className="surface-panel px-5 py-6">
            <div className="divide-y divide-[color:var(--fh-border)]">
              {filtered.map((paper) => (
                <article key={paper.id} className="grid gap-4 py-5 first:pt-0 last:pb-0 lg:grid-cols-[0.88fr,1.12fr]">
                  <div>
                    <h2 className="text-2xl text-[color:var(--fh-text)]">{paper.title}</h2>
                    <p className="mt-2 text-sm text-[color:var(--fh-text-secondary)]">
                      {paper.authors} ({paper.year}) | {paper.journal} | {paper.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm leading-7 text-[color:var(--fh-text-secondary)]">{paper.annotation}</p>
                    <div className="mt-5 flex flex-wrap gap-4 text-sm">
                      {paper.doi && (
                        <a
                          href={buildExternalHref('doi', paper.doi)}
                          target="_blank"
                          rel="noreferrer"
                          className="data-link"
                        >
                          DOI
                        </a>
                      )}
                      {paper.pubmed && (
                        <a
                          href={buildExternalHref('pubmed', paper.pubmed)}
                          target="_blank"
                          rel="noreferrer"
                          className="data-link"
                        >
                          PubMed
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && (
                <div className="py-8">
                  <p className="text-sm text-[color:var(--fh-text-secondary)]">No papers matched the current filter state.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
