import { useEffect, useRef, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function StructurePage() {
  const containerRef = useRef(null);
  const [displayStyle, setDisplayStyle] = useState('cartoon');
  const [colorScheme, setColorScheme] = useState('ss');
  const [isLoading, setIsLoading] = useState(true);
  const viewerRef = useRef(null);

  useEffect(() => {
    // Load 3Dmol.js
    const script = document.createElement('script');
    script.src = 'https://3Dmol.csb.pitt.edu/build/3Dmol-min.js';
    script.onload = initializeViewer;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeViewer = async () => {
    if (!window.$3Dmol || !containerRef.current) {
      console.error('3Dmol not loaded or container missing');
      setIsLoading(false);
      return;
    }

    try {
      // Create viewer
      const viewer = window.$3Dmol.createViewer(containerRef.current, {
        backgroundColor: '#f3f4f6',
        antialias: true,
      });
      viewerRef.current = viewer;

      // Fetch PDB file
      const response = await fetch('https://files.rcsb.org/download/1UVE.pdb');
      const pdbData = await response.text();

      // Add model
      viewer.addModel(pdbData, 'pdb');
      
      // Set initial style
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      viewer.zoomTo();
      viewer.render();

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing viewer:', error);
      setIsLoading(false);
    }
  };

  const updateStyle = (style) => {
    if (!viewerRef.current) return;
    
    const styles = {
      cartoon: { cartoon: { color: 'spectrum' } },
      stick: { stick: {} },
      ballstick: { sphere: {}, stick: { radius: 0.15 } },
      surface: { cartoon: { color: 'spectrum' }, surface: { opacity: 0.9 } },
    };

    viewerRef.current.setStyle({}, styles[style] || styles.cartoon);
    viewerRef.current.render();
    setDisplayStyle(style);
  };

  const updateColor = (scheme) => {
    if (!viewerRef.current) return;
    
    const colorSchemes = {
      ss: { cartoon: { color: 'spectrum' } },
      bfactor: { cartoon: { colorfunc: () => 'orange' } },
      hydro: { cartoon: { color: 'spectrum' } },
      charge: { cartoon: { color: 'spectrum' } },
    };

    viewerRef.current.setStyle({}, colorSchemes[scheme] || colorSchemes.ss);
    viewerRef.current.render();
    setColorScheme(scheme);
  };
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">3D Structure Viewer</h1>
          <p className="text-xl text-gray-600">Explore FimH protein structure and mutations in interactive 3D</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Viewer Area */}
            <div className="lg:col-span-2">
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4">3D Protein Structure</h3>
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
                  style={{ position: 'relative', width: '100%', height: '400px' }}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Display Style</p>
                    <select 
                      value={displayStyle}
                      onChange={(e) => updateStyle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="cartoon">Cartoon</option>
                      <option value="stick">Stick</option>
                      <option value="ballstick">Ball & Stick</option>
                      <option value="surface">Surface</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Color Scheme</p>
                    <select 
                      value={colorScheme}
                      onChange={(e) => updateColor(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="ss">Secondary Structure</option>
                      <option value="bfactor">B-Factor</option>
                      <option value="hydro">Hydrophobicity</option>
                      <option value="charge">Charge</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-primary-600">Structures</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Displaying: FimH (PDB: 1UVE)</p>
                  <p className="text-xs mt-2">Wild-type FimH adhesin protein with bound carbohydrate ligands</p>
                </div>
              </Card>

              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-accent-600">Highlighting</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="cursor-pointer" />
                    <span className="text-gray-700 text-sm">Active Site</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="cursor-pointer" />
                    <span className="text-gray-700 text-sm">Mutation Site</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="cursor-pointer" />
                    <span className="text-gray-700 text-sm">Glycan Binding</span>
                  </label>
                </div>
              </Card>

              <Card hoverable={false}>
                <h3 className="text-lg font-bold mb-4 text-primary-600">Actions</h3>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full" size="sm">Download PDB</Button>
                  <Button variant="secondary" className="w-full" size="sm">Screenshot</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-bg">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-8">Protein Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-4 text-primary-600">Lectin Domain</h3>
              <p className="text-gray-700 mb-4">
                N-terminal domain (residues 1-150) containing the carbohydrate-binding site.
              </p>
              <div className="bg-primary-50 p-3 rounded text-sm">
                <p className="font-semibold text-primary-900 mb-2">Key Residues:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Y48 - Mannose gate</li>
                  <li>• Y137 - Mannose gate</li>
                  <li>• D54 - Metal coordination</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4 text-primary-600">Pilin Domain</h3>
              <p className="text-gray-700 mb-4">
                C-terminal domain (residues 160-279) anchoring FimH to the fimbrial rod.
              </p>
              <div className="bg-primary-50 p-3 rounded text-sm">
                <p className="font-semibold text-primary-900 mb-2">Characteristics:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Pilin fold structure</li>
                  <li>• Force transmission</li>
                  <li>• Catch-bond regulation</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4 text-accent-600">Linker Region</h3>
              <p className="text-gray-700 mb-4">
                Flexible connector enabling domain movement and catch-bond mechanism.
              </p>
              <div className="bg-accent-50 p-3 rounded text-sm">
                <p className="font-semibold text-accent-900 mb-2">Function:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Conformational flexibility</li>
                  <li>• Stress sensing</li>
                  <li>• State transitions</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4 text-accent-600">Binding Pocket</h3>
              <p className="text-gray-700 mb-4">
                High-affinity recognition site for mannose residues on uroplakin.
              </p>
              <div className="bg-accent-50 p-3 rounded text-sm">
                <p className="font-semibold text-accent-900 mb-2">Architecture:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Tyrosine gate (Y48/Y137)</li>
                  <li>• Metal coordination sites</li>
                  <li>• Mannose-binding cleft</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-8">Comparison Tools</h2>
          
          <Card>
            <h3 className="text-xl font-bold mb-6 text-primary-600">Structure Alignment</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="font-semibold text-gray-900 mb-3">Structure 1</p>
                <select className="w-full p-2 border border-gray-300 rounded-lg mb-3">
                  <option>Wild-type (Human)</option>
                  <option>Y48A</option>
                  <option>Y137A</option>
                </select>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Structure 2</p>
                <select className="w-full p-2 border border-gray-300 rounded-lg mb-3">
                  <option>Select mutation...</option>
                  <option>Y48A</option>
                  <option>Y137A</option>
                  <option>Y48F</option>
                </select>
              </div>
            </div>

            <Button variant="primary" className="w-full">Align & Compare</Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
