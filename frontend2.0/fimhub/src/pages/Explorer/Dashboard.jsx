import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import MutationResultsChart from '../../components/MutationResultsChart';
import { getMutations, getMutationDetail } from '../../services/api';

export default function Dashboard() {
  const [species, setSpecies] = useState('human');
  const [glycan, setGlycan] = useState('om3');
  const [selectedMutation, setSelectedMutation] = useState(null);
  const [mutations, setMutations] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch mutations when species or glycan changes
  useEffect(() => {
    const fetchMutations = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching mutations for ${species}/${glycan}`);
        
        const response = await getMutations(species, glycan);
        console.log('API Response:', response);
        
        // Axios returns response object with .data property
        const mutationList = response.data || response || [];
        console.log('Parsed mutations:', Array.isArray(mutationList) ? mutationList.length : 0, 'mutations');
        
        setMutations(mutationList);
        
        // Auto-select first mutation
        if (Array.isArray(mutationList) && mutationList.length > 0) {
          const firstMutation = mutationList[0];
          setSelectedMutation(firstMutation);
          await fetchMutationDetail(firstMutation);
        }
      } catch (err) {
        console.error('Error fetching mutations:', err);
        setError(err.message || 'Failed to load mutations');
      } finally {
        setLoading(false);
      }
    };

    fetchMutations();
  }, [species, glycan]);

  // Fetch mutation details
  const fetchMutationDetail = async (mutation) => {
    try {
      setLoading(true);
      setError(null);
      
      // Extract mutation name - could be from .mutation or .name property
      const mutationName = mutation.mutation || mutation.name || mutation;
      console.log(`Fetching details for ${mutationName}`);
      
      const response = await getMutationDetail(species, glycan, mutationName);
      console.log('Mutation detail response:', response);
      
      // Axios returns response with .data property, but backend might return array or object directly
      let details = null;
      if (response.data) {
        // This is an Axios response object
        if (Array.isArray(response.data)) {
          details = response.data[0];
        } else {
          details = response.data;
        }
      } else if (Array.isArray(response)) {
        details = response[0];
      } else {
        details = response;
      }
      
      console.log('Parsed details:', details);
      setResults(details);
    } catch (err) {
      console.error('Error fetching mutation detail:', err);
      setError(err.message || 'Failed to load mutation details');
    } finally {
      setLoading(false);
    }
  };

  const handleMutationSelect = (mutation) => {
    setSelectedMutation(mutation);
    fetchMutationDetail(mutation);
  };

  // Filter mutations based on search
  const filteredMutations = mutations.filter(mut => {
    const mutName = (mut.mutation || mut.name || mut).toLowerCase();
    return mutName.includes(searchTerm.toLowerCase());
  });


  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-8">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-2">Mutation Explorer</h1>
          <p className="text-lg text-gray-600">See how single amino acid changes affect bacterial adhesion strength</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Error Alert */}
              {error && (
                <Card hoverable={false} className="bg-red-50 border-l-4 border-red-500">
                  <p className="text-red-800 font-semibold text-sm">{error}</p>
                </Card>
              )}

              {/* Species Selection */}
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-primary-600">Species</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="species"
                      value="human"
                      checked={species === 'human'}
                      onChange={(e) => setSpecies(e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="text-gray-700">Human</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="species"
                      value="porcine"
                      checked={species === 'porcine'}
                      onChange={(e) => setSpecies(e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="text-gray-700">Porcine</span>
                  </label>
                </div>
              </Card>

              {/* Glycan Variant Selection */}
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-primary-600">Glycan Variant</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="glycan"
                      value="om3"
                      checked={glycan === 'om3'}
                      onChange={(e) => setGlycan(e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="text-gray-700">OM3 (High Mannose)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="glycan"
                      value="om6"
                      checked={glycan === 'om6'}
                      onChange={(e) => setGlycan(e.target.value)}
                      className="cursor-pointer"
                    />
                    <span className="text-gray-700">OM6 (Low Mannose)</span>
                  </label>
                </div>
              </Card>

              {/* Search and Mutations List */}
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-primary-600">
                  Mutations {mutations.length > 0 && `(${filteredMutations.length})`}
                </h3>
                
                {mutations.length > 0 && (
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                )}

                {loading && !mutations.length && (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  </div>
                )}

                {mutations.length === 0 && !loading && (
                  <p className="text-gray-600 text-sm py-4">No mutations available</p>
                )}

                {mutations.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredMutations.map((mut, idx) => {
                      const mutName = mut.mutation || mut.name || mut;
                      const affinity = mut.Affinity !== undefined ? parseFloat(mut.Affinity).toFixed(2) : 'N/A';
                      const isSelected = selectedMutation?.mutation === mut.mutation || selectedMutation?.name === mut.name;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleMutationSelect(mut)}
                          className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                            isSelected
                              ? 'bg-primary-600 text-white font-semibold'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div>{mutName}</div>
                          <div className={`text-xs mt-1 ${isSelected ? 'text-primary-100' : 'text-gray-600'}`}>
                            ΔG: {affinity} kcal/mol
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Details Card */}
              {selectedMutation && (
                <Card hoverable={false}>
                  <h3 className="text-lg font-bold mb-4 text-primary-600">Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Mutation</p>
                      <p className="font-bold text-gray-900 font-mono">{selectedMutation.mutation || selectedMutation.name || selectedMutation}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Species</p>
                      <p className="font-bold text-gray-900 capitalize">{species}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Glycan</p>
                      <p className="font-bold text-gray-900 uppercase">{glycan}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Results and Charts */}
            <div className="lg:col-span-3 space-y-6">
              {loading && (
                <Card>
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
                      <p className="text-gray-600">Loading mutation data...</p>
                    </div>
                  </div>
                </Card>
              )}

              {!loading && selectedMutation && (
                <>
                  <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-l-4 border-primary-600">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-mono">
                      {selectedMutation.mutation || selectedMutation.name || selectedMutation}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Species: <span className="font-semibold capitalize">{species}</span> | 
                      Glycan: <span className="font-semibold uppercase">{glycan}</span>
                    </p>
                  </Card>

                  <MutationResultsChart mutation={selectedMutation} results={results || selectedMutation} />
                </>
              )}

              {!loading && !selectedMutation && mutations.length === 0 && (
                <Card>
                  <p className="text-gray-600 text-center py-8">
                    No mutations available for {species} {glycan}
                  </p>
                </Card>
              )}

              {!loading && mutations.length > 0 && !selectedMutation && (
                <Card>
                  <p className="text-gray-600 text-center py-8">
                    Select a mutation from the list to view results
                  </p>
                </Card>
              )}

              {/* Download Section */}
              {selectedMutation && results && (
                <Card>
                  <h3 className="text-xl font-bold mb-4 text-primary-600">Download Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button variant="outline" size="sm" className="w-full">
                      📥 WT PDB
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      📥 Mutant PDB
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      📥 CSV Data
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
