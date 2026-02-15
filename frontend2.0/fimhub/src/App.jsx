import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import UTI from './pages/Science/UTI';
import Mechanism from './pages/Science/Mechanism';
import FimH from './pages/Science/FimH';
import Uroplakin from './pages/Science/Uroplakin';
import Dashboard from './pages/Explorer/Dashboard';
import StructurePage from './pages/Explorer/StructurePage';
import Data from './pages/Data';
import Methods from './pages/Methods';
import Guide from './pages/Guide';
import Team from './pages/Team';

export default function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Science Routes */}
            <Route path="/science/uti" element={<UTI />} />
            <Route path="/science/mechanism" element={<Mechanism />} />
            <Route path="/science/fimh" element={<FimH />} />
            <Route path="/science/uroplakin" element={<Uroplakin />} />
            
            {/* Explorer Routes */}
            <Route path="/explorer/dashboard" element={<Dashboard />} />
            <Route path="/explorer/structure" element={<StructurePage />} />
            
            {/* Data, Methods, Guide, Team Routes */}
            <Route path="/data" element={<Data />} />
            <Route path="/methods" element={<Methods />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
