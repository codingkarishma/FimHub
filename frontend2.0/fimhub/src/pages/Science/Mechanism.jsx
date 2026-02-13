import Card from '../../components/ui/Card';
import { InfectionCycleDiagram } from '../../components/Diagrams';

export default function Mechanism() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">How The Infection Works</h1>
          <p className="text-xl text-gray-600">The step-by-step process of bacterial infection, broken down</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">The Infection Cycle</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bacterial infection follows the same pattern every time. Understanding each step is key to stopping it.
              </p>
            </div>
            <div>
              <InfectionCycleDiagram />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12">The Four-Step Attack</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-8 items-start">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 font-bold text-2xl">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">The Invasion</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Bacteria climb up your urethra, heading toward your bladder. They're looking for the lining cells—a sticky surface to grab onto.
                </p>
              </div>
            </div>            {/* Step 2 */}
            <div className="flex gap-8 items-start">
              <div className="bg-accent-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 font-bold text-2xl">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">The Hook</h3>
                <p className="text-lg text-gray-700 mb-4">
                  FimH acts like a molecular grappling hook. It grabs onto specific sugar molecules (mannose) on your bladder cells. 
                  The stronger the FimH, the tighter it sticks. And here's the trick: when your cells try to wash the bacteria away 
                  with urine flow, the grip actually gets <strong>stronger</strong>—a phenomenon called catch-bond mechanics.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 items-start">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 font-bold text-2xl">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">The Invasion (For Real)</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Once stuck tight, the bacteria signals your cell to engulf it. Your immune system thinks it's doing the right thing, 
                  but it's actually inviting the enemy inside. The bacteria travels into a protected bubble inside the cell.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-8 items-start">
              <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 font-bold text-2xl">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">The Fortress</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Inside, bacteria clone themselves thousands of times, creating a biofilm—a fortress-like structure. 
                  This is why antibiotics fail: they can't penetrate the biofilm. Even worse, some bacteria go to sleep (dormancy), 
                  becoming nearly invisible to drugs. When antibiotics are gone, they wake up and the infection returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">Why This Matters for Treatment</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">Understanding each step reveals where we can interrupt the infection before it takes hold.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-3 text-primary-600">Strong Sticking = Bad</h3>
              <p className="text-gray-700">
                The stronger FimH binds to mannose, the more efficient the infection starts. If we can block this binding, 
                bacteria can't grab on in the first place.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-accent-600">Early Prevention Wins</h3>
              <p className="text-gray-700">
                Stop bacteria before they stick, before they invade, before they hide in biofilms. 
                Once they're inside, antibiotics struggle.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3 text-orange-500">Glycan Variants Matter</h3>
              <p className="text-gray-700">
                Different people have different glycan patterns on their cells. Some patterns attract bacteria more than others. 
                Understanding this helps explain why some people get UTIs repeatedly.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
