import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import NavbarV2 from './components/layout/NavbarV2';
import FooterV2 from './components/layout/FooterV2';
import HomePageV2 from './pages/HomePageV2';
import PathogenesisPage from './pages/PathogenesisPage';
import PapersPage from './pages/PapersPage';
import TeamPage from './pages/TeamPage';
import GuidePageV2 from './pages/GuidePageV2';
import DataViewerPage from './pages/DataViewerPage';

const ExplorerPage = lazy(() => import('./pages/ExplorerPage'));

function PageFallback() {
  return (
    <div className="container-max py-20">
      <div className="surface-panel px-6 py-10">
        <p className="text-sm text-[color:var(--fh-text-secondary)]">
          Loading page...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="flex flex-col min-h-screen">
        <NavbarV2 />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePageV2 />} />
              <Route path="/pathogenesis" element={<PathogenesisPage />} />
              <Route path="/data" element={<DataViewerPage />} />
              <Route path="/explorer" element={<ExplorerPage />} />
              <Route path="/papers" element={<PapersPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/guide" element={<GuidePageV2 />} />

              <Route
                path="/research"
                element={<Navigate to="/pathogenesis" replace />}
              />
              <Route
                path="/infection-story"
                element={<Navigate to="/pathogenesis#mechanism" replace />}
              />
              <Route
                path="/infection-mechanism"
                element={<Navigate to="/pathogenesis#mechanism" replace />}
              />
              <Route
                path="/why-upec-fimh"
                element={<Navigate to="/pathogenesis#upec" replace />}
              />
              <Route
                path="/upec-fimh"
                element={<Navigate to="/pathogenesis#upec" replace />}
              />
              <Route
                path="/molecular-mechanism"
                element={<Navigate to="/pathogenesis#upec" replace />}
              />
              <Route
                path="/indian-research-context"
                element={<Navigate to="/pathogenesis#india" replace />}
              />
              <Route
                path="/uti-overview"
                element={<Navigate to="/pathogenesis#uti" replace />}
              />
              <Route
                path="/other-causes"
                element={<Navigate to="/pathogenesis#other-causes" replace />}
              />
              <Route
                path="/biofilm-pathogenesis"
                element={<Navigate to="/pathogenesis#biofilm" replace />}
              />
              <Route
                path="/research-significance"
                element={<Navigate to="/guide" replace />}
              />

              <Route
                path="/science/uti"
                element={<Navigate to="/pathogenesis#uti" replace />}
              />
              <Route
                path="/science/mechanism"
                element={<Navigate to="/pathogenesis#mechanism" replace />}
              />
              <Route
                path="/science/fimh"
                element={<Navigate to="/pathogenesis#upec" replace />}
              />
              <Route
                path="/science/uroplakin"
                element={<Navigate to="/pathogenesis#upec" replace />}
              />
              <Route
                path="/mutation-explorer"
                element={<Navigate to="/explorer" replace />}
              />
              <Route
                path="/explorer/dashboard"
                element={<Navigate to="/explorer" replace />}
              />
              <Route
                path="/explorer/structure"
                element={<Navigate to="/explorer" replace />}
              />
              <Route path="/about" element={<Navigate to="/team" replace />} />
              <Route
                path="/methods"
                element={<Navigate to="/guide" replace />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <FooterV2 />
      </div>
    </Router>
  );
}
