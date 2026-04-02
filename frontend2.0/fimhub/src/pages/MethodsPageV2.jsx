import { useState } from 'react';
import Card from '../components/ui/Card';
import PageHero from '../components/site/PageHero';
import humanUroplakinModelImage from '../assets/rpec/human-uroplakin-model.png';

const tabs = [
  {
    id: 'objective',
    label: 'Objectives',
    items: [
      'Construct human and porcine uroplakin complexes bound to OM3 and OM6 glycans in complex with FimH.',
      'Study mutation-structure-dynamics-function relationships around the mannose-binding surface.',
      'Build a web resource for potentially positively selected and fitness mutants.',
      'Extend toward experimental validation and later predictive modelling.',
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    items: [
      'Align porcine and human uroplakin sequences to map conserved features and glycosylation sites.',
      'Use structural modelling to build the human uroplakin complex from the porcine reference framework.',
      'Integrate OM3 and OM6 glycan presentations into the host complex in a structurally stable manner.',
      'Assemble FimH-bound host complexes for mutation profiling and later mechanistic analysis.',
    ],
  },
  {
    id: 'analysis',
    label: 'Analysis',
    items: [
      'Mutational profiling of the mannose-binding pocket focuses on residues most likely to alter host recognition.',
      'Binding and stability terms are tracked together so favorable affinity changes can be evaluated against structural cost.',
      'The portal translates this workflow into a readable interface for biological interpretation.',
    ],
  },
];

export default function MethodsPageV2() {
  const [activeTab, setActiveTab] = useState('objective');
  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      <PageHero
        eyebrow="Methods and workflow"
        title="The methods page should explain how the biological question turns into a structural pipeline."
        description="This section translates the workflow into a clearer web format: what was modelled, why those models were needed, and how the current portal fits into the larger project."
        image={humanUroplakinModelImage}
        imageAlt="Human uroplakin model used as a visual for the methods workflow."
      />

      <section className="section-shell">
        <div className="container-max">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Card hoverable={false} className="mt-8">
            <h2 className="text-4xl font-bold text-slate-950">{active.label}</h2>
            <div className="mt-6 space-y-4 text-base text-slate-600">
              {active.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
