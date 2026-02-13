import { useState } from 'react';
import Card from '../components/ui/Card';

export default function Methods() {
  const [activeTab, setActiveTab] = useState('modeling');

  const tabs = [
    { id: 'modeling', label: 'Structural Modeling' },
    { id: 'glycan', label: 'Glycan Modeling' },
    { id: 'mutation', label: 'Mutation Profiling' },
    { id: 'binding', label: 'Binding Affinity' },
    { id: 'stability', label: 'Stability Analysis' },
  ];

  const content = {
    modeling: {
      title: 'Structural Modeling',
      description: 'Computational approaches to model FimH structure and interactions',
      items: [
        {
          heading: 'Homology Modeling',
          text: 'FimH structures were built using homology modeling from known lectin and pilin domain templates.'
        },
        {
          heading: 'Molecular Dynamics Simulations',
          text: 'All-atom MD simulations of FimH-glycan complexes were performed in explicit solvent for thermodynamic sampling.'
        },
        {
          heading: 'Structure Refinement',
          text: 'Structures were refined using energy minimization and validated against experimental constraints.'
        },
      ]
    },
    glycan: {
      title: 'Glycan Modeling',
      description: 'Parameterization and simulation of carbohydrate ligands',
      items: [
        {
          heading: 'Force Field Parameterization',
          text: 'GLYCAM06 force field was used for modeling high-mannose glycans and uroplakin variants.'
        },
        {
          heading: 'Glycan Preparation',
          text: 'OM3 and OM6 glycan variants were built and optimized based on structural templates.'
        },
        {
          heading: 'Conformational Sampling',
          text: 'Glycan conformations were extensively sampled to account for flexibility during binding.'
        },
      ]
    },
    mutation: {
      title: 'Mutation Profiling',
      description: 'Systematic analysis of FimH mutations',
      items: [
        {
          heading: 'Mutation Library',
          text: 'Point mutations at key binding residues (Y48, Y137, and others) were generated computationally.'
        },
        {
          heading: 'Structural Modeling',
          text: 'Each mutation was modeled using rotamer optimization and side-chain refinement.'
        },
        {
          heading: 'Functional Predictions',
          text: 'Changes in binding properties were predicted based on structural analysis.'
        },
      ]
    },
    binding: {
      title: 'Binding Affinity Calculation',
      description: 'Quantitative estimation of FimH-glycan interactions',
      items: [
        {
          heading: 'MM-PBSA Method',
          text: 'Molecular mechanics Poisson-Boltzmann surface area (MM-PBSA) was used for binding free energy estimation.'
        },
        {
          heading: 'Energy Decomposition',
          text: 'Per-residue and per-atom energy decomposition identified critical interactions.'
        },
        {
          heading: 'Relative Binding Analysis',
          text: 'ΔΔG calculations quantified the effect of mutations on binding affinity.'
        },
      ]
    },
    stability: {
      title: 'Stability Analysis',
      description: 'Evaluation of protein stability effects',
      items: [
        {
          heading: 'Folding Stability',
          text: 'Protein stability predictions using FoldX and Rosetta scoring functions.'
        },
        {
          heading: 'Thermal Stability',
          text: 'Melting temperature (Tm) predictions based on structural analysis.'
        },
        {
          heading: 'Conformational Stability',
          text: 'Catch-bond mechanism stability assessed through mechanical unfolding simulations.'
        },
      ]
    },
  };

  const currentContent = content[activeTab];

  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Methods</h1>
          <p className="text-xl text-gray-600">How we analyzed 50+ mutations to understand FimH binding</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{currentContent.title}</h2>
            <p className="text-lg text-gray-600 mb-8">{currentContent.description}</p>

            <div className="space-y-6">
              {currentContent.items.map((item, idx) => (
                <Card key={idx}>
                  <h3 className="text-xl font-bold mb-3 text-primary-600">{item.heading}</h3>
                  <p className="text-gray-700">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">Software & Tools</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-3 text-accent-600">Simulation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• AMBER 20</li>
                <li>• GROMACS 2021</li>
                <li>• NAMD 3.0</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-accent-600">Analysis</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Python/MDAnalysis</li>
                <li>• VMD</li>
                <li>• UCSF Chimera</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-accent-600">Predictions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• FoldX 5</li>
                <li>• Rosetta</li>
                <li>• PROPKA</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-8">Workflow</h2>
          
          <div className="space-y-4">
            {[
              { step: 1, label: 'Structure Preparation', desc: 'Build and prepare FimH and uroplakin structures' },
              { step: 2, label: 'Glycan Parameterization', desc: 'Set up high-mannose glycan force fields' },
              { step: 3, label: 'Complex Assembly', desc: 'Create FimH-glycan complex models' },
              { step: 4, label: 'MD Simulation', desc: 'Perform molecular dynamics simulations' },
              { step: 5, label: 'Binding Analysis', desc: 'Calculate binding free energies' },
              { step: 6, label: 'Stability Prediction', desc: 'Assess protein stability effects' },
            ].map((item, idx) => (
              <Card key={idx} className="flex items-center gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.label}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
