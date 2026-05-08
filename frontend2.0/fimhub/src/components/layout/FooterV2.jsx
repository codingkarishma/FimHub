import { Link } from 'react-router-dom';
import { siteNavigation } from '../../content/platformContentV2';

export default function FooterV2() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[color:var(--fh-border)] bg-[color:var(--fh-mid)]">
      <div className="container-max py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr,0.9fr]">
          <div>
            <h3 className="font-serif text-2xl text-[color:var(--fh-text)]">FimHub</h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[color:var(--fh-text-secondary)]">
              Research website for UTI pathogenesis, FimH adhesion, glycan recognition, and mutation-level structural interpretation.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-[color:var(--fh-text-secondary)]">
              Navigation
            </h4>
            <div className="mt-4 grid gap-2">
              {siteNavigation.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-[color:var(--fh-text-secondary)] transition-colors hover:text-[color:var(--fh-text)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-[color:var(--fh-text-secondary)]">
              Scope
            </h4>
            <div className="mt-4 grid gap-2 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
              <p>Figure-led pathogenesis reading.</p>
              <p>Registry-driven mutation explorer.</p>
              <p>Curated paper library and methods guide.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[color:var(--fh-border)] pt-4 text-sm text-[color:var(--fh-text-secondary)]">
          <p>{currentYear} FimHub.</p>
        </div>
      </div>
    </footer>
  );
}
