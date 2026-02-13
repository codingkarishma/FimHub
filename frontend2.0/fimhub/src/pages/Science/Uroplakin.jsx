import Card from '../../components/ui/Card';
import { OM3VsOM6Diagram } from '../../components/Diagrams';

export default function Uroplakin() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Uroplakins: The Target</h1>
          <p className="text-xl text-gray-600">Why your bladder cells are vulnerable, and what makes some people susceptible to recurrent UTIs</p>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">What Are Uroplakins?</h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Uroplakins are proteins on the surface of your bladder cells. They're everywhere—coating the surface in a dense layer. 
              Think of them as the "skin" of your bladder.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              These proteins have sugar molecules (glycans) attached to them. Specifically, they have <strong>mannose</strong> sugar molecules 
              sticking out into the space above the cell surface—and that's exactly what FimH is looking for.
            </p>

            <div className="bg-blue-50 border-l-4 border-primary-600 p-6 mb-8">
              <p className="text-lg text-gray-800 font-semibold mb-2">The Problem:</p>
              <p className="text-gray-700">
                Bacteria didn't randomly evolve to grab mannose. They evolved to target uroplakins because uroplakins are everywhere on bladder cells. 
                It's like targeting the most common door on the building.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-6">Two Types of Uroplakins</h3>

            <div className="space-y-6">
              <Card>
                <h3 className="text-xl font-bold mb-3 text-orange-600">OM3 Uroplakin</h3>
                <p className="text-gray-700 mb-2">
                  Lots of mannose sugar molecules on the surface. FimH loves this—it's like a buffet of binding sites.
                </p>
                <p className="text-sm text-gray-600 font-semibold">People with more OM3 tend to get UTIs more frequently.</p>
              </Card>

              <Card>
                <h3 className="text-xl font-bold mb-3 text-blue-600">OM6 Uroplakin</h3>
                <p className="text-gray-700 mb-2">
                  Fewer mannose molecules. Less attractive to FimH, so bacteria have a harder time sticking.
                </p>
                <p className="text-sm text-gray-600 font-semibold">People with more OM6 are more resistant to infection.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <OM3VsOM6Diagram />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Glycan Variants Matter</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Your genes determine which uroplakin variant you have on your bladder cells. This single difference can change your UTI risk.
              </p>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex gap-4">
                  <span className="text-orange-600 font-bold flex-shrink-0">→</span>
                  <span>OM3: More mannose = higher infection risk</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                  <span>OM6: Less mannose = lower infection risk</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">How We Know This Matters</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">The evidence from structural studies and why pigs help us understand human infection.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-2xl font-bold mb-3 text-primary-600">Computational Models</h3>
              <p className="text-gray-700">
                We build 3D computer models of human uroplakin based on genetic sequences and experimental data. 
                These models show exactly how FimH approaches the binding site and how glycans interact with the protein.
              </p>
              <p className="text-sm text-gray-600 font-semibold mt-4">
                While we don't have human structures, the models are validated against known behavior.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold mb-3 text-accent-600">Porcine Structures (PDB: 8JJ5)</h3>
              <p className="text-gray-700">
                Pigs have uroplakins very similar to humans. Scientists used cryo-electron microscopy to determine the exact 3D structure 
                of porcine uroplakin at atomic resolution.
              </p>
              <p className="text-sm text-gray-600 font-semibold mt-4">
                We use this to validate our human models and understand the general principles of FimH-uroplakin binding.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">The Glycan Sugar Coat</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">How sugar molecules on your cells determine whether bacteria can stick.</p>
          
          <div className="space-y-8">
            <Card>
              <h3 className="text-2xl font-bold mb-4 text-primary-600">What Are Glycans?</h3>
              <p className="text-lg text-gray-700 mb-4">
                Glycans are sugar molecules that stick out from proteins on your cell surface, like leaves on a tree. 
                Uroplakins are decorated with these glycans—specifically, high-mannose glycans.
              </p>
              <p className="text-lg text-gray-700">
                These aren't random. They have a biological function: they help your cells communicate with each other and with bacteria. 
                But in this case, they're a liability—bacteria learned to exploit them.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold mb-4 text-accent-600">High-Mannose Glycans: The Problem</h3>
              <p className="text-lg text-gray-700 mb-4">
                Mannose is a simple sugar. Uroplakins have lots of mannose residues hanging off them. 
                FimH's binding pocket is specifically shaped to recognize mannose.
              </p>
              <p className="text-lg text-gray-700 font-semibold text-orange-600">
                More mannose = more places for bacteria to grab = higher infection risk.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Why OM3 vs OM6 Matters So Much</h3>
              <p className="text-lg text-gray-700">
                It turns out that not all people have the same glycan patterns on their uroplakins. 
                Some variants (called OM3) have more mannose. Some (OM6) have less.
              </p>
              <p className="text-lg text-gray-700 mt-4">
                This genetic variation explains <strong>why some people are chronically prone to UTIs</strong>. 
                Their uroplakins are literally more attractive to bacteria.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">The Binding Sites</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">Where exactly FimH latches onto uroplakin.</p>
          
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              The key binding sites are two specific asparagine molecules (Asn-169 and Asn-170) on uroplakin. 
              These positions are where glycan sugars are attached. This is where FimH grabs.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Because these binding sites are highly conserved across humans (meaning almost everyone has them), 
              but the <strong>quantity and quality</strong> of glycans attached varies by genetics, 
              this explains why FimH can infect almost anyone—but why some people suffer recurrent infections.
            </p>

            <Card>
              <h3 className="text-2xl font-bold mb-4 text-primary-600">The Asparagine Glycosylation Sites</h3>
              <p className="text-gray-700 mb-4">
                At positions 169 and 170 on uroplakin, asparagine residues are modified with N-glycans—
                the mannose-rich sugars that bacteria recognize.
              </p>
              <p className="text-gray-700 font-semibold">
                This is why mutations in these sites would be lethal: they're too important for normal cell function. 
                But variations in how heavily they're glycosylated explain susceptibility differences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">How We Know This Matters</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">The evidence from structural studies and why pigs help us understand human infection.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-2xl font-bold mb-3 text-primary-600">Computational Models</h3>
              <p className="text-gray-700">
                We build 3D computer models of human uroplakin based on genetic sequences and experimental data. 
                These models show exactly how FimH approaches the binding site and how glycans interact with the protein.
              </p>
              <p className="text-sm text-gray-600 font-semibold mt-4">
                While we don't have human structures, the models are validated against known behavior.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold mb-3 text-accent-600">Porcine Structures (PDB: 8JJ5)</h3>
              <p className="text-gray-700">
                Pigs have uroplakins very similar to humans. Scientists used cryo-electron microscopy to determine the exact 3D structure 
                of porcine uroplakin at atomic resolution.
              </p>
              <p className="text-sm text-gray-600 font-semibold mt-4">
                We use this to validate our human models and understand the general principles of FimH-uroplakin binding.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
