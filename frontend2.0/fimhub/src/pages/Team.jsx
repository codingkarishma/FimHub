import Card from '../components/ui/Card';

export default function Team() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">The Team</h1>
          {/* <p className="text-xl text-gray-600">Researchers working to understand and stop bacterial infection</p> */}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Laboratory for Computational Biology & Biomolecular Design (LCBD)</h2>
              <p className="text-gray-700 mb-4">
                LCBD at School of Biochemical Engineering, IIT(BHU) specializes in Computational Protein & Enzyme Design, Protein Engineering, and Large-Scale Mutational Analysis. Our research integrates fundamental studies with translational applications in Health Informatics and Therapeutics Development.
              </p>
              <p className="text-gray-700 mb-4">
                Our overarching goals focus on: (1) Fundamental and translational research exploring structure-dynamics-function relationships in complex biological systems, and (2) Development of advanced computational methods, pipelines, and tools for protein design and mutation prediction.
              </p>
              <p className="text-gray-700">
                FimHub exemplifies our commitment to large-scale mutational analysis and understanding disease-causing variations through integrated computational approaches.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">Research Lab</p>
                <p className="text-gray-600 mt-2">Laboratory for Computational Biology and Biomolecular Design</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <div className="mb-4">
                <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">👨‍🔬</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Dr. Aditya Kumar Padhi</h3>
              <p className="text-gray-700 mb-2 font-semibold">Principal Investigator, LCBD</p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-semibold">Assistant Professor</span>, School of Biochemical Engineering, IIT (BHU), Varanasi
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-semibold">Education:</span><br/>Ph.D. in Computational Biology, IIT Delhi<br/>B.Tech. in Biotechnology, BPUT, Odisha
              </p>
              <p className="text-gray-600 text-xs">
                Former JSPS & TBRF postdoctoral fellow at RIKEN's Laboratory for Structural Bioinformatics, Japan
              </p>
            </Card>

            <Card>
              <div className="mb-4">
                <div className="w-20 h-20 bg-accent-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">👩‍🔬</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Research Scholar</h3>
              <p className="text-gray-700 mb-2 font-semibold">PhD Student</p>
              <p className="text-gray-600 text-sm">
                PhD candidate focusing on computational prediction of protein-carbohydrate interactions and FimH mutations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">Institutional Affiliation</h2>

          <Card>
            <h3 className="text-2xl font-bold mb-4 text-primary-600">Laboratory for Computational Biology &amp; Biomolecular Design (LCBD)</h3>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Location:</span> School of Biochemical Engineering, Indian Institute of Technology (BHU) Varanasi
            </p>
            <h4 className="font-semibold text-gray-800 mb-2">Research Themes:</h4>
            <ul className="text-gray-700 mb-4 list-disc list-inside space-y-1">
              <li>Computational Protein &amp; Enzyme Design (CPD)</li>
              <li>Protein Engineering &amp; Biomolecular Simulations</li>
              <li>Large-Scale Mutational Analysis &amp; Disease Variant Prediction</li>
              <li>Health Informatics &amp; Therapeutics Development</li>
              <li>Methods, Pipelines &amp; Tools Development</li>
            </ul>
            <h4 className="font-semibold text-gray-800 mb-2">Core Research Areas:</h4>
            <p className="text-gray-700">
              We develop computational protein design approaches to understand macromolecular machines and investigate structure-dynamics-function relationships. Our work spans the design of high-affinity protein binders, implementation of non-natural amino acids, refinement of CPD scoring functions, and deep analysis of disease-causing mutations using molecular dynamics simulations and computational biophysics.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">Research Focus</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-3 text-primary-600">Computational Protein Design</h3>
              <p className="text-gray-700">
                Deploying CPD strategies to explore the evolution and emergence of macromolecular machines with therapeutic and biotechnological relevance.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-accent-600">Structure–Dynamics–Function</h3>
              <p className="text-gray-700">
                Probing complex biological systems through integrated simulations and gaining fundamental insights into the determinants of molecular function.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-orange-500">Large-Scale Mutational Analysis</h3>
              <p className="text-gray-700">
                Performing comprehensive assessments of disease-causing variations, SNPs, rare variants, and conformational shifts through multi-combinatorial computational pipelines.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-primary-600">Tools &amp; Methods Development</h3>
              <p className="text-gray-700">
                Creating pipelines for high-affinity binder design, advancing CPD scoring functions, integrating non-natural amino acids, and leveraging AI/ML for predictive mutation analysis.
              </p>
            </Card>
          </div>

          <div className="mt-12 bg-primary-50 border-l-4 border-primary-400 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-3 text-primary-600">Recent Publications</h3>
            {/* <p className="text-gray-700 mb-4">
              In our fundamental and translational research track, we apply advanced CPD workflows to decode the evolution of metabolic and therapeutic macromolecular assemblies while mapping their structure–dynamics–function relationships.
            </p>
            <p className="text-gray-700 mb-4">
              Our methods and pipeline development efforts emphasize designing high-affinity protein binders, incorporating non-natural amino acids for affinity maturation, and engineering flexible scoring functions that better capture biomolecular motion.
            </p>
            <p className="text-gray-700">
              Recent projects include comprehensive COVID-19 studies that combine CPD, molecular dynamics simulations, and mutational mapping to understand SARS-CoV-2 protein behavior, drug-target interactions, resistance mechanisms, and disease pathophysiology.
            </p> */}
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12">Collaborators & Acknowledgments</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card hoverable={false}>
              <h3 className="font-bold mb-3 text-primary-600">Computational Support</h3>
              <p className="text-gray-700 text-sm">
                High-performance computing resources provided by [HPC Center].
              </p>
            </Card>

            <Card hoverable={false}>
              <h3 className="font-bold mb-3 text-primary-600">Funding</h3>
              <p className="text-gray-700 text-sm">
                This research is supported by [Funding Agencies/Grants].
              </p>
            </Card>

            <Card hoverable={false}>
              <h3 className="font-bold mb-3 text-primary-600">Experimental Validation</h3>
              <p className="text-gray-700 text-sm">
                Collaboration with [Experimental Partners] for validation studies.
              </p>
            </Card>

            <Card hoverable={false}>
              <h3 className="font-bold mb-3 text-primary-600">Platform Development</h3>
              <p className="text-gray-700 text-sm">
                Web development and UI/UX design by [Development Team].
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Contact & Inquiries</h2>
          <p className="text-lg text-gray-700 mb-8">
            For questions about FimHub, collaborations, or data access, please contact us.
          </p>
          <a href="mailto:contact@fimhub.research" className="inline-block">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Contact Us
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
