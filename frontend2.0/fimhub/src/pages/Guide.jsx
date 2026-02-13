import Card from '../components/ui/Card';

export default function Guide() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">How to Use FimHub</h1>
          <p className="text-xl text-gray-600">A guide to exploring mutation data and understanding the results</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="max-w-3xl">
            {/* Dashboard Section */}
            <Card className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-primary-600">Using the Dashboard</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Navigation</h3>
                  <p className="text-gray-700 mb-3">
                    The dashboard provides an interactive interface to explore FimH mutations:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Species Toggle:</strong> Switch between Human and Porcine uroplakin models</li>
                    <li>• <strong>Glycan Toggle:</strong> Compare OM3 vs OM6 glycan binding</li>
                    <li>• <strong>Residue Selector:</strong> Focus on specific binding pocket residues</li>
                    <li>• <strong>Mutation Dropdown:</strong> Select specific mutations to analyze</li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-bold mb-3">Structure Visualization</h3>
                  <p className="text-gray-700">
                    The 3D viewer shows FimH protein structure with color-coded elements. Toggle between wild-type and mutant structures to see the effect of mutations on binding geometry.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-bold mb-3">Results Panel</h3>
                  <p className="text-gray-700">
                    Displays quantitative data for selected mutations including binding energy, stability predictions, and OM preference scores.
                  </p>
                </div>
              </div>
            </Card>

            {/* Understanding Results Section */}
            <Card className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-primary-600">Understanding Results</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-accent-600">ΔG (Binding Free Energy)</h3>
                  <p className="text-gray-700 mb-3">
                    Absolute binding free energy in kcal/mol. More negative values indicate stronger binding:
                  </p>
                  <div className="bg-primary-50 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>ΔG &lt; -8.0:</strong> Strong binding<br/>
                      <strong>-8.0 to -5.0:</strong> Moderate binding<br/>
                      <strong>&gt; -5.0:</strong> Weak binding
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-bold mb-3 text-accent-600">ΔΔG (Mutation Effect)</h3>
                  <p className="text-gray-700 mb-3">
                    Energy difference between mutant and wild-type binding. Positive ΔΔG indicates loss of binding:
                  </p>
                  <div className="bg-accent-50 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>ΔΔG &lt; -1.0:</strong> Enhanced binding<br/>
                      <strong>-1.0 to +1.0:</strong> Neutral effect<br/>
                      <strong>ΔΔG &gt; +1.0:</strong> Reduced binding
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-bold mb-3 text-accent-600">Stability</h3>
                  <p className="text-gray-700">
                    Predicted change in protein folding stability (ΔΔG_fold in kcal/mol). Positive values indicate destabilization.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-bold mb-3 text-accent-600">OM Preference</h3>
                  <p className="text-gray-700">
                    Relative binding preference towards OM3 vs OM6 glycan variants. Values range from -1 (OM6 preference) to +1 (OM3 preference).
                  </p>
                </div>
              </div>
            </Card>

            {/* Glycan Info Section */}
            <Card className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-primary-600">OM3 vs OM6 Glycans</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-orange-600 mb-2">OM3 (Orange)</h3>
                  <p className="text-gray-700">
                    OM3 uroplakin variant with higher high-mannose glycan content. Generally binds FimH with higher affinity.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">OM6 (Blue)</h3>
                  <p className="text-gray-700">
                    OM6 uroplakin variant with lower glycan diversity. Shows altered FimH-binding selectivity.
                  </p>
                </div>

                <p className="text-gray-600 text-sm mt-4 italic">
                  The distinction between OM3 and OM6 represents natural glycosylation variants in the uroplakin population.
                </p>
              </div>
            </Card>

            {/* Download Section */}
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-primary-600">Downloading Files</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">PDB Structures</h3>
                  <p className="text-gray-700">
                    Download wild-type or mutant FimH structures for visualization in PyMOL, Chimera, or other molecular viewers.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold mb-2">CSV Data</h3>
                  <p className="text-gray-700">
                    Export mutation data in CSV format for further analysis in spreadsheet applications or Python/R.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold mb-2">Full Datasets</h3>
                  <p className="text-gray-700">
                    Access the complete mutation dataset, energy results, and PDB structure library from the Data page.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <Card hoverable={false}>
              <h3 className="text-lg font-bold mb-2">What do negative ΔG values mean?</h3>
              <p className="text-gray-700">
                Negative ΔG indicates favorable, spontaneous binding. More negative values mean stronger binding affinity.
              </p>
            </Card>

            <Card hoverable={false}>
              <h3 className="text-lg font-bold mb-2">How reliable are these predictions?</h3>
              <p className="text-gray-700">
                Predictions are based on molecular dynamics simulations and computational methods. Wet-lab validation is recommended for critical findings.
              </p>
            </Card>

            <Card hoverable={false}>
              <h3 className="text-lg font-bold mb-2">Can I use these structures for publications?</h3>
              <p className="text-gray-700">
                Yes, but please cite the FimHub platform and provide appropriate attribution to the research team.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
