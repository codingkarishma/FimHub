import { useDeferredValue, useState } from 'react';
import papersData from '../data/papers.json';

function buildExternalHref(type, value) {
  if (!value) return null;
  if (type === 'doi') return `https://doi.org/${value}`;
  if (type === 'pubmed') return `https://pubmed.ncbi.nlm.nih.gov/${value}/`;
  return null;
}

const TAG_COLORS = {
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

function PaperTag({ tag }) {
  const bgColor = TAG_COLORS[tag] || '#6B7280';
  return (
    <span
      className="inline-block rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-transform duration-150 hover:scale-105"
      style={{
        backgroundColor: `${bgColor}18`,
        color: bgColor,
        border: `1px solid ${bgColor}35`,
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
    <div className="min-h-screen bg-slate-50 antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(13,148,136,0.08), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(99,102,241,0.07), transparent 60%)',
          }}
        />
        <div className="container-max relative py-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
            Literature Library
          </p>
        <h1 className="w-full text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-slate-900 sm:text-[38px]">
            Papers to explore the FimH adhesin and its role in bacterial pathogenesis
          </h1>
         <p className="mt-4 w-full text-[15px] leading-relaxed text-slate-500 color-slate-1000 sm:text-[20px]">
          Want to dig deeper? Below is a list of papers you can read to learn more about how FimH works.</p>
        </div>
      </section>

      {/* Search */}
      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="container-max py-5">
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search title, author, keywords…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-teal-500/60 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <p className="hidden shrink-0 text-xs font-medium text-slate-400 sm:block">
              {filtered.length === papers.length
                ? `${papers.length} publications`
                : `${filtered.length} of ${papers.length} publications`}
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-max py-10 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((paper) => (
              <article
                key={paper.id}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.15)]"
              >
                {/* Title */}
                <h3 className="text-[16.5px] font-semibold leading-snug tracking-[-0.01em] text-slate-900">
                  {paper.title}
                </h3>

                {/* Meta */}
                <p className="text-[12.5px] leading-relaxed text-slate-500">
                  <span className="font-medium text-slate-600">{paper.authors}</span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  <span className="tabular-nums">{paper.year}</span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  <span className="italic">{paper.journal}</span>
                </p>

                {/* Annotation */}
                <p className="flex-1 text-[13.5px] leading-[1.65] text-slate-500">
                  {paper.annotation}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <PaperTag key={tag} tag={tag} />
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  {paper.doi && (
                    <a
                      href={buildExternalHref('doi', paper.doi)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1.5 text-[12px] font-semibold text-teal-700 transition-colors hover:bg-teal-100"
                    >
                      DOI
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                  {paper.pubmed && (
                    <a
                      href={buildExternalHref('pubmed', paper.pubmed)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1.5 text-[12px] font-semibold text-teal-700 transition-colors hover:bg-teal-100"
                    >
                      PubMed
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700">No papers matched your search</p>
            <p className="mt-1 text-xs text-slate-400">
              Try a different keyword, author, or tag.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}