import { useEffect, useRef, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function StructurePage() {
  const containerRef = useRef(null);
  const [structures, setStructures] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState('om3');
  const [isLoading, setIsLoading] = useState(true);
  const pluginRef = useRef(null);

  // Load structure list from backend
  useEffect(() => {
    const fetchStructures = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/mutations/human/${selectedDataset}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        
        // Filter out wild-type mutations where original amino acid equals mutant (e.g., F1F)
        const filteredData = data.filter(mutation => {
          const m = mutation.mutation || '';
          if (m.length < 3) return false; // Need at least 3 chars (e.g., F1C)
          const original = m[0];
          const mutant = m[m.length - 1];
          return original !== mutant; // Only keep where they differ
        });
        
        console.log(`Loaded ${filteredData.length} mutations for ${selectedDataset} (filtered from ${data.length})`);
        setStructures(filteredData.slice(0, 100)); // Show first 100
        if (filteredData.length > 0) {
          setSelectedStructure(filteredData[0]);
        }
      } catch (error) {
        console.error('Error fetching structures:', error);
        setStructures([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStructures();
  }, [selectedDataset]);

  // Load 3Dmol viewer
  useEffect(() => {
    if (!selectedStructure) return;

    const loadViewer = async () => {
      if (!containerRef.current) return;

      try {
        // Load 3Dmol.js library
        if (!window.$3Dmol) {
          const script = document.createElement('script');
          script.src = 'https://3Dmol.csb.pitt.edu/build/3Dmol-min.js';
          script.async = true;
          
          script.onload = () => initializeViewer();
          script.onerror = () => {
            console.error('Failed to load 3Dmol library');
            if (containerRef.current) {
              containerRef.current.innerHTML = '<p style="color: #999; padding: 2rem; text-align: center;">Error loading 3D viewer</p>';
            }
          };
          
          document.head.appendChild(script);
        } else {
          initializeViewer();
        }
      } catch (error) {
        console.error('Error loading viewer:', error);
      }
    };

    const initializeViewer = async () => {
      if (!containerRef.current || !window.$3Dmol) return;

      try {
        const viewer = window.$3Dmol.createViewer(containerRef.current, {
          backgroundColor: '#f3f4f6'
        });

        // Build PDB filename from mutation name (e.g., F1C -> F1C.pdb)
        const mutationName = selectedStructure.mutation || 'F1C';
        const pdbFilename = `${mutationName}.pdb`;
        const dir = selectedDataset === 'om3' ? 'Human_OM3_PDBs' : 'Human_OM6_PDBs';
        const pdbUrl = `${API_BASE_URL}/pdb/${dir}/${pdbFilename}`;
        
        console.log(`Loading: ${pdbUrl}`);

        try {
          const response = await fetch(pdbUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const pdbData = await response.text();
          
          viewer.addModel(pdbData, 'pdb');
          viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
          viewer.zoomTo();
          viewer.render();
        } catch (err) {
          console.error('Error loading PDB:', err);
          if (containerRef.current) {
            containerRef.current.innerHTML = '<p style="color: #999; padding: 2rem; text-align: center;">Cannot load: ' + pdbFilename + '</p>';
          }
        }
      } catch (error) {
        console.error('Error initializing viewer:', error);
      }
    };

    loadViewer();
  }, [selectedStructure, selectedDataset]);

  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">3D Structure Viewer</h1>
          <p className="text-xl text-gray-600">Explore FimH protein structures from your dataset</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-6">
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-primary-600">Dataset</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedDataset('om3')}
                    className={`w-full p-2 rounded text-left font-semibold transition-colors ${
                      selectedDataset === 'om3'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    OM3
                  </button>
                  <button
                    onClick={() => setSelectedDataset('om6')}
                    className={`w-full p-2 rounded text-left font-semibold transition-colors ${
                      selectedDataset === 'om6'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    OM6
                  </button>
                </div>
              </Card>

              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-accent-600">Mutations</h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto border border-gray-200 rounded p-2">
                  {structures.length === 0 ? (
                    <p className="text-gray-500 text-sm p-4">No mutations loaded</p>
                  ) : (
                    structures.map((struct, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedStructure(struct)}
                        className={`w-full p-2 rounded text-left text-sm transition-colors ${
                          selectedStructure?.mutation === struct.mutation
                            ? 'bg-accent-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {struct.mutation || `Mutation ${idx + 1}`}
                      </button>
                    ))
                  )}
                </div>
              </Card>
            </div>

            {/* Viewer Area */}
            <div className="lg:col-span-3">
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4">3D Structure</h3>
                {isLoading && (
                  <div className="bg-gray-50 rounded-lg h-96 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                      <p className="text-gray-600">Loading structure...</p>
                    </div>
                  </div>
                )}
                <div
                  ref={containerRef}
                  className="bg-gray-50 rounded-lg h-96 mb-4"
                  style={{ position: 'relative', width: '100%' }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Mutation Info</p>
                    {selectedStructure && (
                      <div className="bg-primary-50 p-3 rounded text-sm space-y-1">
                        <p><span className="font-semibold">Name:</span> {selectedStructure.mutation}</p>
                        <p><span className="font-semibold">Affinity:</span> {selectedStructure.Affinity?.toFixed(2)}</p>
                        <p><span className="font-semibold">Stability:</span> {selectedStructure.Stability?.toExponential(2)}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Actions</p>
                    <div className="space-y-2">
                      <Button variant="secondary" className="w-full" size="sm">
                        Download PDB
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        Export View
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-8">Structure Information</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-4 text-primary-600">Lectin Domain</h3>
              <p className="text-gray-700">
                N-terminal carbohydrate-binding domain containing the FimH binding site.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4 text-accent-600">Pilin Domain</h3>
              <p className="text-gray-700">
                C-terminal domain responsible for anchoring FimH to the pilus.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4 text-orange-500">Mutations</h3>
              <p className="text-gray-700">
                Explore how mutations affect protein structure and function.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
