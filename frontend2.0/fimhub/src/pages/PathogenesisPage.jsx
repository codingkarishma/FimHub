import Reveal from '../components/site/Reveal';

export default function PathogenesisPage() {
  return (
    <div className="page-surface pathogenesis-simple-page">
      <section className="pathogenesis-simple-shell">
        <div className="container-max">
          <Reveal>
            <figure className="pathogenesis-main-figure">
              <div className="pathogenesis-main-frame">
                <img
                  src="/pathogenesis.png"
                  alt="Diagram illustrating UPEC infection, attachment to urothelium, FimH and uroplakin-glycan interaction, umbrella cell entry, and intracellular bacterial colony formation."
                  loading="lazy"
                />
              </div>
            <figcaption>
                The figure traces UPEC pathogenesis from lower urinary tract entry to urothelial attachment, FimH recognition of UPK1A-bound high-mannose glycan, umbrella-cell invasion, and intracellular bacterial colony formation.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
