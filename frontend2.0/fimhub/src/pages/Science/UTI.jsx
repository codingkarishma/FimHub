import Card from '../../components/ui/Card';

export default function UTI() {
  return (
    <div>
      <section className="bg-white border-b-4 border-primary-600 py-12">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Urinary Tract Infections</h1>
          <p className="text-xl text-gray-600">The biology behind a common problem and why bacteria are so good at it</p>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-max">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">Why UTIs Happen</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-primary-600 pl-6">
                <h3 className="text-2xl font-bold mb-3">The Scale of the Problem</h3>
                <p className="text-lg text-gray-700 mb-4">
                  About 150 million UTIs occur every year around the world. Half of all women will have at least one in their lifetime. 
                  It's one of the most common reasons people take antibiotics.
                </p>
                <p className="text-lg text-gray-700">
                  The cost? Billions. In the US alone, UTIs cost the healthcare system over $6 billion annually. 
                  That's money spent on doctor visits, tests, antibiotics, and dealing with complications.
                </p>
              </div>

              <div className="border-l-4 border-accent-600 pl-6">
                <h3 className="text-2xl font-bold mb-3">The Rising Resistance Problem</h3>
                <p className="text-lg text-gray-700">
                  Here's where it gets serious: bacteria are becoming resistant to our antibiotics. 
                  The same bacteria that cause UTIs are getting harder to kill. 
                  Taking antibiotics over and over trains bacteria to survive them—it's evolution in action, happening in real time.
                </p>
                <p className="text-lg text-gray-700 mt-4">
                  That's why we need new approaches. Instead of fighting bacteria that are already inside, 
                  we need to stop them from sticking in the first place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">How E. coli Causes UTIs</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">The bacteria has a blueprint for infecting your urinary tract. It follows the same steps, every time.</p>
          
          <div className="space-y-8">
            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-primary-600 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">It Sticks</h3>
                  <p className="text-lg text-gray-700">
                    The bacteria uses special hair-like structures called fimbriae to grab onto proteins on your bladder cells. 
                    It's like a grappling hook made of protein. The most important hook is <strong>FimH</strong>.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-accent-600 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">It Gets Inside</h3>
                  <p className="text-lg text-gray-700">
                    Once stuck, the bacteria tricks your cell into swallowing it whole. Your cell thinks it's doing immune defense, 
                    but really it's just inviting the enemy in.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-orange-500 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">It Multiplies</h3>
                  <p className="text-lg text-gray-700">
                    Inside your cell, bacteria copy themselves rapidly, creating organized communities. 
                    These biofilm-like clusters protect them and make them harder to kill.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-red-500 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">It Hides</h3>
                  <p className="text-lg text-gray-700">
                    Some bacteria go dormant inside your bladder cells, essentially hibernating. This is why antibiotics don't always work—
                    they're hiding where the drugs can't reach them. When the antibiotic is gone, they wake up. That's why UTIs recur.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
