import Card from '../components/ui/Card';
import PageHero from '../components/site/PageHero';
import porcineUroplakinModelImage from '../assets/rpec/porcine-uroplakin-model.png';

const focusAreas = [
  'Computational protein and biomolecular design',
  'Structure-dynamics-function analysis',
  'Large-scale mutational profiling',
  'Translational model building for disease mechanisms',
];

export default function TeamPageV2() {
  return (
    <div>
      <PageHero
        eyebrow="People behind the project"
        title="FimHub comes from a structural biology and computational design workflow, not just a website build."
        description="This page keeps the team information readable and ties the web resource back to the Laboratory for Computational Biology and Biomolecular Design at IIT (BHU) Varanasi."
        image={porcineUroplakinModelImage}
        imageAlt="Porcine uroplakin model used as the visual for the team page."
      />

      <section className="section-shell">
        <div className="container-max grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <Card hoverable={false}>
            <p className="eyebrow text-slate-500">Institution</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950">Laboratory for Computational Biology and Biomolecular Design</h2>
            <p className="mt-5 text-base text-slate-600">
              The lab is based in the School of Biochemical Engineering at IIT (BHU) Varanasi and works at the intersection of structural biology, biomolecular modelling, protein design, and mutation analysis.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-slate-100 p-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card hoverable={false} className="bg-slate-950 text-white">
            <p className="eyebrow text-slate-400">Project context</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <p>FimHub is meant to grow from a communication resource into a predictive platform.</p>
              <p>The current phase is focused on making OM3 and OM6 modelling results accessible and interpretable.</p>
              <p>The longer-term goal is to connect modelling, mutation analysis, and experimental validation in one public-facing system.</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-max grid gap-6 md:grid-cols-2">
          <Card hoverable={false}>
            <h3 className="text-2xl font-bold text-slate-950">Dr. Aditya Kumar Padhi</h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Principal investigator</p>
            <p className="mt-4 text-base text-slate-600">
              Assistant Professor, School of Biochemical Engineering, IIT (BHU) Varanasi, leading the LCBD research program and the structural workflow behind the project.
            </p>
          </Card>

          <Card hoverable={false}>
            <h3 className="text-2xl font-bold text-slate-950">Shashank Shekhar</h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Research scholar</p>
            <p className="mt-4 text-base text-slate-600">
              PhD scholar working on the modelling, mutation analysis, and resource development aspects of the FimH project.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
