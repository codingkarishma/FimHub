import { teamContent } from '../content/platformContentV2';
import Reveal from '../components/site/Reveal';
import clsx from 'clsx';
import labLogo from '../assets/profile/Lab-logo.png';
import padhiProfileImage from '../assets/profile/padhi_sir.jpeg';
import shashankProfileImage from '../assets/profile/shashank_bhaiya.jpeg';
import karishmaProfileImage from '../assets/profile/karishma.jpeg';

const profileImagesByName = {
  'Dr. Aditya Kumar Padhi': padhiProfileImage,
  'Shashank Shekhar': shashankProfileImage,
  'Karishma Santani': karishmaProfileImage,
};

function getInitials(name) {
  return name
    .replace(/^Dr\.\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function PersonMark({ name, lead = false, imageSrc }) {
  return (
    <div className={clsx('team-person-mark', imageSrc && 'has-photo', lead && 'is-lead')}>
      {imageSrc ? (
        <img src={imageSrc} alt={`${name} portrait`} loading="lazy" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

function PersonLinks({ email, profileHref, orcid }) {
  if (!email && !profileHref && !orcid) return null;
  return (
    <div className="team-link-row">
      {email && (
        <a href={`mailto:${email}`} className="data-link">Email</a>
      )}
      {profileHref && (
        <a href={profileHref} className="data-link" target="_blank" rel="noreferrer">
          Faculty profile
        </a>
      )}
      {orcid && <span className="team-meta">ORCID {orcid}</span>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="team-section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

export default function TeamPage() {
  const [pi, ...contributors] = teamContent.team;

  return (
    <div className="team-page">
      {/* Hero */}
     {/* Hero */}
<section className="team-hero">
  <div className="container-max team-hero-grid">
    <Reveal>
      <div className="team-hero-copy">
        <p className="eyebrow">{teamContent.hero.kicker}</p>
        <h1>{teamContent.hero.title}</h1>
        <p>{teamContent.hero.description}</p>
      </div>
    </Reveal>

    <Reveal delay={0.08}>
      <figure className="team-hero-visual">
        <img
          src={labLogo}
          alt="LCBD lab logo at IIT (BHU) Varanasi"
          className="team-hero-img"
          loading="lazy"
        />
      </figure>
    </Reveal>
  </div>
</section>

      {/* PI */}
      <section className="team-section">
        <div className="container-max">
          <Reveal>
            <SectionHeading eyebrow="Faculty" title={pi.name} />
          </Reveal>

          <Reveal delay={0.05}>
            <article className="team-pi-panel">
              <PersonMark name={pi.name} imageSrc={profileImagesByName[pi.name]} lead />
              <div className="team-pi-body">
                <p className="team-role">{pi.role}</p>
                <p className="team-institution">{pi.institution}</p>
                <p className="team-contribution">{pi.contributions}</p>
                {pi.focus && <p className="team-focus">{pi.focus}</p>}
                <PersonLinks {...pi} />
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Contributors */}
      <section className="team-section team-section-muted">
        <div className="container-max">
          <Reveal>
            <SectionHeading eyebrow="Project Contributors" title="FimHub Team" />
          </Reveal>

          <div className="team-roster">
            {contributors.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.05}>
                <article className="team-roster-row">
                  <PersonMark
                    name={member.name}
                    imageSrc={profileImagesByName[member.name]}
                  />
                  <div className="team-roster-info">
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-institution">{member.institution}</p>
                  </div>
                  <div className="team-roster-detail">
                    <p className="team-contribution">{member.contributions}</p>
                    {member.focus && (
                      <p className="team-focus">Research focus: {member.focus}</p>
                    )}
                    {member.fellowship && (
                      <p className="team-meta">{member.fellowship}</p>
                    )}
                    <PersonLinks {...member} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About LCBD */}
      <section className="team-section">
        <div className="container-max team-lab-grid">
          <Reveal>
            <SectionHeading eyebrow="About LCBD" title={teamContent.institution.name}>
              <p>{teamContent.institution.summary}</p>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="team-focus-list">
              {teamContent.focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
