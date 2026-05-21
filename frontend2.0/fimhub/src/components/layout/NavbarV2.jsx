import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteNavigation } from '../../content/platformContentV2';

export default function NavbarV2() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `border-b-2 px-1 py-2 text-[20px] font-semibold leading-none transition-colors ${
      isActive
        ? 'border-[color:var(--fh-accent)] text-[color:var(--fh-text)]'
        : 'border-transparent text-[color:var(--fh-text-secondary)] hover:border-[color:var(--fh-border-strong)] hover:text-[color:var(--fh-text)]'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--fh-border)] bg-[#fbfbf8]/95 backdrop-blur">
      <div className="container-max flex min-h-[4.75rem] items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color:var(--fh-border-strong)] bg-[color:var(--fh-surface)] text-base font-bold text-[color:var(--fh-text)]">
            FH
          </span>
          <div>
            <span className="block text-[26px] font-bold tracking-tight text-[color:var(--fh-text)]">
              FimHub
            </span>
            <span className="block text-[18px] font-semibold text-[color:var(--fh-text-secondary)]">
              FimH adhesion research resource
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {siteNavigation.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] text-[color:var(--fh-text)] xl:hidden"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] xl:hidden">
          <div className="container-max grid gap-2 py-4">
            {siteNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `border border-[color:var(--fh-border)] px-4 py-3 text-[20px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-[color:var(--fh-accent-soft)] text-[color:var(--fh-text)]'
                      : 'bg-[color:var(--fh-surface)] text-[color:var(--fh-text-secondary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
