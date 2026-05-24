import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { MediaProvider } from './context/MediaContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Existing Pages
import { LandingPage } from './pages/LandingPage';
import { ProductShowcase } from './pages/ProductShowcase';
import { BookingWizard } from './components/BookingWizard';

// New Multi-Page Extensions
import { EstadiasHub } from './pages/EstadiasHub';
import { MahanaExperienceLanding } from './pages/MahanaExperienceLanding';
import { EstadiaAllInclusiveLanding } from './pages/EstadiaAllInclusiveLanding';

import { PasadiasHub } from './pages/PasadiasHub';
import { PoolDayLanding } from './pages/PoolDayLanding';
import { PasadyaAllInclusiveLanding } from './pages/PasadyaAllInclusiveLanding';

import { RestaurantePublico } from './pages/RestaurantePublico';
import { SurfShackAcademy } from './pages/SurfShackAcademy';
import { EventosBodas } from './pages/EventosBodas';
import { MediaAdmin } from './pages/MediaAdmin';
import { MahanaTours } from './pages/MahanaTours';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MediaProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-mahana-light text-mahana-dark selection:bg-turquoise-100 selection:text-turquoise-900">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Home & Core */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/experiencias" element={<ProductShowcase />} />
                <Route path="/reservar" element={<BookingWizard />} />

                {/* Lodging & Stays Hub */}
                <Route path="/estadias" element={<EstadiasHub />} />
                <Route path="/estadias/mahana-experience" element={<MahanaExperienceLanding />} />
                <Route path="/estadias/todo-incluido" element={<EstadiaAllInclusiveLanding />} />

                {/* Day Passes Hub */}
                <Route path="/pasadias" element={<PasadiasHub />} />
                <Route path="/pasadias/pool-day" element={<PoolDayLanding />} />
                <Route path="/pasadias/todo-incluido" element={<PasadyaAllInclusiveLanding />} />

                {/* Public Restaurant, Surf Shack & Events */}
                <Route path="/restaurante" element={<RestaurantePublico />} />
                <Route path="/surf-shack" element={<SurfShackAcademy />} />
                <Route path="/eventos" element={<EventosBodas />} />
                <Route path="/mahana-tours" element={<MahanaTours />} />

                {/* Photo & Media Administration Portal */}
                <Route path="/admin/medios" element={<MediaAdmin />} />
                <Route path="/gestor-fotos" element={<MediaAdmin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MediaProvider>
    </LanguageProvider>
  );
};

export default App;
