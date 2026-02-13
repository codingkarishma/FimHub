import Card from '../../components/ui/Card';
import { FimHBindingDiagram, ProteinStructureDiagram } from '../../components/Diagrams';

export default function FimH() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">FimH: The Grappling Hook</h1>
          <p className="text-xl text-gray-600">The protein that bacteria use to stick to your cells</p>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">What is FimH?</h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              FimH is a small protein about 279 amino acids long. It sits at the tip of hair-like structures on bacteria called fimbriae. 
              Think of it as a molecular grappling hook.
            </p>

            <div className="bg-blue-50 border-l-4 border-primary-600 p-6 mb-8">
              <p className="text-lg text-gray-800">
                <strong>The job:</strong> Find and grab onto mannose sugar molecules on your bladder cells' surface.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Here's what makes FimH so effective: it doesn't just passively stick. When your bladder tries to wash the bacteria 
              away with urine flow, the physical tension actually makes FimH's grip <strong>stronger</strong>. It's like a knot that tightens when you pull on it.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">How FimH Sticks</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                FimH reaches out from the bacterial surface like a hook, searching for mannose sugar molecules on uroplakins. 
                When it finds one, it locks on with incredible specificity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <FimHBindingDiagram />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-12">Three Parts, One Job</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">FimH is divided into specialized regions, each with a specific role.</p>
          
          <div className="space-y-8">
            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-primary-600 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">The Lectin Domain (Binding Pocket)</h3>
                  <p className="text-gray-700 mb-3">
                    This is the business end—the part that actually grabs sugar. It has a tiny pocket specifically shaped to recognize mannose molecules.
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Two tyrosine molecules (Y48 and Y137) form a gate that filters which sugars can fit in the pocket. Only mannose passes through.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-accent-600 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">The Linker (The Flexibility)</h3>
                  <p className="text-gray-700 mb-3">
                    This flexible connector attaches the binding pocket to the bacterial rod below it.
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Why does this matter? When your urine flow tries to pull the bacteria away, this linker stretches and transitions the binding pocket 
                    into a high-affinity state. The grip gets stronger when stressed—that's the catch-bond mechanism.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-orange-500 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">The Pilin Domain (The Anchor)</h3>
                  <p className="text-gray-700 mb-3">
                    This connects FimH to the bacterial fimbrium—the hair-like structure that extends from the bacteria's surface.
                  </p>
                  <p className="text-gray-700 font-semibold">
                    It's a stable scaffold that holds the binding pocket in position and can transmit mechanical forces from the bacterial body.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">The Catch-Bond Mechanism: Why Pulling Tighter Makes It Stick Harder</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">This is the brilliant (from a bacterial perspective, anyway) part of FimH.</p>
          
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Most molecular bonds work like normal physics: pull harder, the bond breaks faster. FimH is different. It has two different states:
            </p>

            <div className="space-y-6 mb-8">
              <Card>
                <h3 className="text-2xl font-bold mb-3 text-primary-600">Relaxed State (T)</h3>
                <p className="text-lg text-gray-700">
                  When no tension is applied, FimH binds to mannose with moderate strength. The binding pocket is in a relaxed conformation.
                </p>
              </Card>

              <Card>
                <h3 className="text-2xl font-bold mb-3 text-accent-600">Stressed State (R)</h3>
                <p className="text-lg text-gray-700">
                  When your urine flow pulls on the bacteria, the linker stretches. This mechanical tension causes FimH to shift into a 
                  <strong> high-affinity state</strong>. The binding pocket clamps down on the mannose molecule. 
                  The binding becomes about 10 times stronger.
                </p>
              </Card>
            </div>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              This is why using antibiotics to wash out a UTI can fail: the bacteria are literally designed to stick harder when facing 
              physical stress. It's evolution's solution to a hostile environment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12 text-center">How We Can Stop It</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-2xl font-bold mb-3 text-primary-600">Block the Binding Pocket</h3>
              <p className="text-gray-700 mb-4">
                Design small molecule drugs that fit into FimH's mannose-binding pocket and jam it up. 
                If bacteria can't grab on, they can't start an infection.
              </p>
              <p className="text-sm text-gray-600 font-semibold">This is the most promising approach right now.</p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold mb-3 text-accent-600">Train the Immune System</h3>
              <p className="text-gray-700 mb-4">
                Develop a vaccine that teaches your immune system to recognize and attack FimH. 
                Even if bacteria get to your bladder, your antibodies are already waiting.
              </p>
              <p className="text-sm text-gray-600 font-semibold">Long-term prevention strategy.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
