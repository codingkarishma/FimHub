import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Data() {
  const [filters, setFilters] = useState({
    species: 'all',
    omType: 'all',
    residue: 'all',
  });

  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Data & Resources</h1>
          <p className="text-xl text-gray-600">Download computational results and structural files</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-8">Filter & Browse Data</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div>
              <label className="block font-semibold text-gray-900 mb-3">Species</label>
              <select 
                value={filters.species} 
                onChange={(e) => setFilters({...filters, species: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              >
                <option value="all">All Species</option>
                <option value="human">Human</option>
                <option value="porcine">Porcine</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-3">OM Type</label>
              <select 
                value={filters.omType} 
                onChange={(e) => setFilters({...filters, omType: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="om3">OM3</option>
                <option value="om6">OM6</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-3">Residue</label>
              <select 
                value={filters.residue} 
                onChange={(e) => setFilters({...filters, residue: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              >
                <option value="all">All Residues</option>
                <option value="y48">Y48</option>
                <option value="y137">Y137</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Mutation Dataset</h3>
                  <p className="text-gray-700">Complete FimH mutations with binding energetics and stability predictions</p>
                  <p className="text-sm text-gray-600 mt-2">Format: CSV | Size: 2.4 MB</p>
                </div>
                <Button variant="primary">Download</Button>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">PDB Structure Library</h3>
                  <p className="text-gray-700">Wild-type and mutant FimH structures for visualization and analysis</p>
                  <p className="text-sm text-gray-600 mt-2">Format: PDB | Multiple files</p>
                </div>
                <Button variant="primary">Download All</Button>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Energy Results</h3>
                  <p className="text-gray-700">Detailed binding free energy calculations and stability predictions</p>
                  <p className="text-sm text-gray-600 mt-2">Format: JSON | Size: 1.8 MB</p>
                </div>
                <Button variant="primary">Download</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="mutations" className="py-16 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">Mutation Dataset</h2>
          
          <Card>
            <p className="text-gray-700 mb-4">
              The mutation dataset contains comprehensive information on FimH mutations, including:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Position and amino acid substitution</li>
              <li>• Binding free energy (ΔG)</li>
              <li>• Energy difference from wild-type (ΔΔG)</li>
              <li>• Stability predictions</li>
              <li>• OM3/OM6 preference</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="pdb" className="py-16 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">PDB Structure Library</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-3 text-primary-600">Wild-Type Structures</h3>
              <p className="text-gray-700">
                Reference FimH structures used as baseline for all mutations and analyses.
              </p>
              <Button variant="outline" className="mt-4 w-full">Download WT PDB</Button>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-primary-600">Mutant Structures</h3>
              <p className="text-gray-700">
                Predicted structures of FimH mutations generated through computational modeling.
              </p>
              <Button variant="outline" className="mt-4 w-full">Browse Mutants</Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="energy" className="py-16 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12">Energy Results</h2>
          
          <Card>
            <p className="text-gray-700 mb-4">
              Energy results include binding affinity calculations using:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Molecular dynamics simulations</li>
              <li>• MM-PBSA binding free energy calculations</li>
              <li>• Thermodynamic integration</li>
            </ul>
            <Button variant="primary">Download Energy Data</Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
