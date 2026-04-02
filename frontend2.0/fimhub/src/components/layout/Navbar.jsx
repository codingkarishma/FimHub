import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Infection Story', path: '/infection-story' },
    { label: 'Why UPEC and FimH', path: '/why-upec-fimh' },
    { label: 'Mechanism', path: '/molecular-mechanism' },
    { label: 'Mutation Explorer', path: '/mutation-explorer' },
    { label: 'India Context', path: '/indian-research-context' },
    { label: 'Significance', path: '/research-significance' },
  ];

  const closeMobile = () => setMobileOpen(false);
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'bg-[#0d1f1c] text-white' : 'text-slate-700 hover:bg-[#edf4f2] hover:text-slate-950'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/70 bg-[#f6f1e7]/88 backdrop-blur-xl">
      <div className="container-max flex min-h-20 items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0d1f1c] text-sm font-bold uppercase tracking-[0.2em] text-white">
            FH
          </span>
          <div>
            <span className="block text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
              FimHub
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 md:block">
              Scientific research portal
            </span>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-1 rounded-full border border-white/70 bg-white/76 p-2 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.35)]">
          {navigationItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden xl:block">
          <Link to="/mutation-explorer">
            <Button size="sm">
              Open explorer
            </Button>
          </Link>
        </div>

        <button
          className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-5 py-5 xl:hidden">
          <div className="container-max space-y-2 px-0">
            <div className="rounded-[1.6rem] border border-slate-200 bg-[#f8f5ee] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                Current page
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {navigationItems.find((item) => item.path === location.pathname)?.label || 'FimHub'}
              </p>
            </div>

            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3">
              <Link to="/mutation-explorer" onClick={closeMobile}>
                <Button className="w-full">Open explorer</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
