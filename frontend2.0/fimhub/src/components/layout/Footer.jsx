import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const storyLinks = [
    { label: 'Home', path: '/' },
    { label: 'Infection Story', path: '/infection-story' },
    { label: 'Why UPEC and FimH', path: '/why-upec-fimh' },
    { label: 'Molecular Mechanism', path: '/molecular-mechanism' },
    { label: 'Mutation Explorer', path: '/mutation-explorer' },
    { label: 'India Context', path: '/indian-research-context' },
    { label: 'Research Significance', path: '/research-significance' },
  ];

  return (
    <footer className="page-backdrop mt-20 border-t border-white/10 bg-[#0d1f1c] text-white">
      <div className="container-max py-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr,0.9fr]">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white">FimHub</h3>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Narrative driven portal for infection biology host recognition mutation impact and translational significance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                FimH
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                OM3 and OM6
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                India context
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Portal map</h4>
            <ul className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
              {storyLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Research lens</h4>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-400">
              <p>Infection is treated as a stepwise system from first contact to recurrence</p>
              <p>Mutation evidence stays linked to binding change structural cost and live structure viewing</p>
              <p>Indian clinical and biofilm context is now part of the main narrative rather than an afterthought</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} FimHub.</p>
          <p>Built as a living research surface for FimH mediated UTI biology.</p>
        </div>
      </div>
    </footer>
  );
}
