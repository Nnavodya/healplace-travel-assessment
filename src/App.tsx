import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/destination/:id" element={<DestinationDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
