import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-b-4 border-primary-600 py-16 md:py-24">
        <div className="container-max">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight">
              FimHub
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 font-light mb-8 leading-relaxed">
              Explore how bacteria adhere to you. Understand why UTIs happen. Find targets to stop them.
            </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/science/uti">
              <Button size="lg" className="w-full sm:w-auto">Learn the Science</Button>
            </Link>
            <Link to="/explorer/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Explore Data</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            Over 50 FimH mutations analyzed • Real computational data • Open research
          </p>
        </div>
        </div>
      </section>

      {/* Scientific Context Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why This Matters</h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                You probably know someone with a UTI. Or you've had one yourself. 
                They're the second most common infection worldwide—mostly caused by one sneaky bacterium: <em>E. coli</em>.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Here's the frustrating part: these bacteria don't just pass through. 
                They <strong>stick</strong> to your bladder cells using special protein hooks called <strong>FimH</strong>. 
                Once stuck, they burrow inside and hide in clusters called biofilms. 
                That's why antibiotics often fail and UTIs come back.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                But there's hope. By understanding exactly how FimH sticks—and how tiny changes in that protein affect the sticking—
                we can find new ways to stop infection before it even starts.
              </p>
            </div>
            
            <div className="bg-gray-100 border-l-4 border-primary-600 p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 text-lg font-medium">3D Structure Visualization</p>
                <p className="text-gray-500 text-sm mt-2">Interactive viewer coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Cards */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">Three core research areas to understand and stop infection at its source.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="text-5xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold mb-3">Structural Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                We model FimH proteins at atomic resolution to visualize exactly how the bacteria grab onto your cells.
              </p>
            </Card>

            <Card>
              <div className="text-5xl mb-4">🧬</div>
              <h3 className="text-2xl font-bold mb-3">Mutation Effects</h3>
              <p className="text-gray-700 leading-relaxed">
                Small changes in the FimH protein—just one amino acid different—can dramatically change how well it sticks.
              </p>
            </Card>

            <Card>
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Glycan Binding</h3>
              <p className="text-gray-700 leading-relaxed">
                Different cells have different glycan "targets" on their surface. We analyze which targets each FimH variant prefers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-4">Explore the Data</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">Find what you're looking for—from deep science to interactive analysis.</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/science/uti" className="block group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 group-hover:border-blue-400 transition">
                <h3 className="font-bold text-lg text-blue-900 mb-2">UTI Basics</h3>
                <p className="text-gray-700 text-sm">How infection starts and spreads</p>
              </div>
            </Link>

            <Link to="/science/mechanism" className="block group">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border border-teal-200 group-hover:border-teal-400 transition">
                <h3 className="font-bold text-lg text-teal-900 mb-2">The Mechanism</h3>
                <p className="text-gray-700 text-sm">Step-by-step how FimH works</p>
              </div>
            </Link>

            <Link to="/explorer/dashboard" className="block group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 group-hover:border-orange-400 transition">
                <h3 className="font-bold text-lg text-orange-900 mb-2">Mutation Explorer</h3>
                <p className="text-gray-700 text-sm">See how variants change binding</p>
              </div>
            </Link>

            <Link to="/methods" className="block group">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 group-hover:border-red-400 transition">
                <h3 className="font-bold text-lg text-red-900 mb-2">Methods</h3>
                <p className="text-gray-700 text-sm">How we ran the analysis</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
