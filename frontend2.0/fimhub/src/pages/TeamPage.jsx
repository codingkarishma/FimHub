import { teamContent } from '../content/platformContentV2';
import Reveal from '../components/site/Reveal';

export default function TeamPage() {
  return (
    <div>
      {/* Intro Section */}
      <section className="py-16 md:py-20">
        <div className="container-max">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-lg leading-7 text-[color:var(--fh-text-secondary)]">
                This website has been developed in the{' '}
                <span className="font-medium text-[color:var(--fh-text)]">
                  Laboratory for Computational Biology and Biomolecular Design
                  (LCBD)
                </span>
                , in the{' '}
                <span className="font-medium text-[color:var(--fh-text)]">
                  School of Biochemical Engineering
                </span>{' '}
                at{' '}
                <span className="font-medium text-[color:var(--fh-text)]">
                  IIT (BHU) Varanasi
                </span>
                .
              </p>
              <p className="mt-2 text-sm text-[color:var(--fh-text-secondary)]">
                {teamContent.institution.location}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-20 border-t border-[color:var(--fh-border)]">
        <div className="container-max">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[color:var(--fh-text)]">
              Team
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:gap-14 md:grid-cols-3">
            {teamContent.team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.05}>
                <div>
                  {/* Photo Placeholder */}
                  <div className="mb-6 aspect-square bg-gradient-to-br from-slate-100 to-slate-150 dark:from-slate-800 dark:to-slate-750 rounded border border-[color:var(--fh-border)] flex items-center justify-center">
                    <p className="text-xs tracking-wide text-[color:var(--fh-text-secondary)] opacity-60">
                      Photo
                    </p>
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-medium tracking-tight text-[color:var(--fh-text)]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-normal text-[color:var(--fh-accent)]">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs tracking-wide text-[color:var(--fh-text-secondary)]">
                    {member.institution}
                  </p>

                  {member.contributions && (
                    <p className="mt-4 text-sm leading-6 text-[color:var(--fh-text-secondary)]">
                      {member.contributions}
                    </p>
                  )}

                  {/* Optional Links */}
                  <div className="mt-4 space-y-1 text-xs text-[color:var(--fh-text-secondary)]">
                    {member.orcid && <p>{member.orcid}</p>}
                    {member.email && (
                      <p>
                        <a
                          href={`mailto:${member.email}`}
                          className="data-link"
                        >
                          {member.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About LCBD Section */}
      <section className="py-16 md:py-20 border-t border-[color:var(--fh-border)]">
        <div className="container-max">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[color:var(--fh-text)]">
                The Laboratory for Computational Biology & Biomolecular Design
                (LCBD)
              </h2>
              <p className="mt-2 text-sm font-normal text-[color:var(--fh-text-secondary)]">
                School of Biochemical Engineering · IIT (BHU) Varanasi
              </p>

              <p className="mt-8 text-lg leading-7 text-[color:var(--fh-text-secondary)]">
                The LCBD develops computational approaches to understand how
                proteins evolve, how mutations drive disease, and how molecular
                systems can be redesigned for therapeutic use. Research spans
                computational protein design, large-scale mutational analysis,
                biomolecular simulation, and translational bioinformatics — with
                applications in infectious disease, antimicrobial resistance,
                and drug target identification.
              </p>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}
