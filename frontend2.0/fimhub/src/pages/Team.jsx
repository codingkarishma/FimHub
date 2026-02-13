import Card from '../components/ui/Card';

export default function Team() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">The Team</h1>
          <p className="text-xl text-gray-600">Researchers working to understand and stop bacterial infection</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">About the Lab</h2>
              <p className="text-gray-700 mb-4">
                The FimHub platform was developed by a dedicated research team focused on understanding molecular mechanisms of bacterial pathogenesis and developing innovative computational tools for structural biology.
              </p>
              <p className="text-gray-700 mb-4">
                Our interdisciplinary approach combines computational chemistry, molecular biology, and bioinformatics to elucidate the structural basis of FimH-glycan interactions and predict the effects of mutations on bacterial virulence.
              </p>
              <p className="text-gray-700">
                This research contributes to the broader effort to develop novel anti-adhesion therapeutics for treating and preventing recurrent UTIs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">Research Lab</p>
                <p className="text-gray-600 mt-2">Computational Structural Biology</p>
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
              <h3 className="text-2xl font-bold mb-2">Lab Director</h3>
              <p className="text-gray-700 mb-2 font-semibold">Principal Investigator</p>
              <p className="text-gray-600 text-sm">
                Ph.D. in Biochemistry with expertise in molecular dynamics simulations and protein structure-function relationships.
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
            <h3 className="text-2xl font-bold mb-4 text-primary-600">Institution</h3>
            <p className="text-gray-700 mb-4">
              This research is conducted at [Institution Name], a leading center for biomedical research and education.
            </p>
            
            <h3 className="text-2xl font-bold mb-4 mt-8 text-accent-600">Department</h3>
            <p className="text-gray-700">
              Our work is part of the Department of Computational Biology and Structural Research, dedicated to understanding molecular mechanisms underlying human diseases.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">Research Focus</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-3 text-primary-600">Structural Biology</h3>
              <p className="text-gray-700">
                Understanding protein structures and their functional relevance through computational and experimental methods.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-accent-600">Bacterial Pathogenesis</h3>
              <p className="text-gray-700">
                Investigating molecular mechanisms by which pathogenic bacteria establish infections and cause disease.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-orange-500">Drug Discovery</h3>
              <p className="text-gray-700">
                Developing computational tools to identify novel therapeutic targets for infectious diseases.
              </p>
            </Card>
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
