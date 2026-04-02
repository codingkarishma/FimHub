import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FimHPortal from './pages/Explorer/FimHPortal';
import HomePage from './pages/HomePage';
import IndianResearchContextPage from './pages/IndianResearchContextPage';
import InfectionStoryPage from './pages/InfectionStoryPage';
import MolecularMechanismPage from './pages/MolecularMechanismPage';
import ResearchSignificancePage from './pages/ResearchSignificancePage';
import WhyUpecFimHPage from './pages/WhyUpecFimHPage';

export default function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/infection-story" element={<InfectionStoryPage />} />
            <Route path="/why-upec-fimh" element={<WhyUpecFimHPage />} />
            <Route path="/molecular-mechanism" element={<MolecularMechanismPage />} />
            <Route path="/mutation-explorer" element={<FimHPortal />} />
            <Route path="/indian-research-context" element={<IndianResearchContextPage />} />
            <Route path="/research-significance" element={<ResearchSignificancePage />} />

            <Route path="/science/uti" element={<Navigate to="/infection-story" replace />} />
            <Route path="/science/mechanism" element={<Navigate to="/molecular-mechanism" replace />} />
            <Route path="/science/fimh" element={<Navigate to="/why-upec-fimh" replace />} />
            <Route path="/science/uroplakin" element={<Navigate to="/molecular-mechanism" replace />} />
            <Route path="/explorer/dashboard" element={<Navigate to="/mutation-explorer" replace />} />
            <Route path="/explorer/structure" element={<Navigate to="/mutation-explorer#structure-lab" replace />} />
            <Route path="/data" element={<Navigate to="/mutation-explorer" replace />} />
            <Route path="/methods" element={<Navigate to="/research-significance" replace />} />
            <Route path="/guide" element={<Navigate to="/infection-story" replace />} />
            <Route path="/team" element={<Navigate to="/research-significance" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
