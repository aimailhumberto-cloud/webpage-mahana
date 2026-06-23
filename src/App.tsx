import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { MediaProvider } from './context/MediaContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Existing Pages
import { LandingPage } from './pages/LandingPage';
import { ProductShowcase } from './pages/ProductShowcase';

// New Multi-Page Extensions
import { EstadiasHub } from './pages/EstadiasHub';
import { MahanaExperienceLanding } from './pages/MahanaExperienceLanding';
import { EstadiaAllInclusiveLanding } from './pages/EstadiaAllInclusiveLanding';
import { EscapeMahanaLanding } from './pages/EscapeMahanaLanding';

import { PasadiasHub } from './pages/PasadiasHub';
import { PoolDayLanding } from './pages/PoolDayLanding';
import { PasadyaAllInclusiveLanding } from './pages/PasadyaAllInclusiveLanding';

import { RestaurantePublico } from './pages/RestaurantePublico';
import { SurfShackAcademy } from './pages/SurfShackAcademy';
import { EventosBodas } from './pages/EventosBodas';
import { MediaAdmin } from './pages/MediaAdmin';
import { MahanaTours } from './pages/MahanaTours';
import { PromoHabitacionGratis } from './pages/PromoHabitacionGratis';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const RedirectToPMS: React.FC = () => {
  const location = useLocation();
  React.useEffect(() => {
    const search = location.search || '';
    window.location.replace(`https://casa-mahana-pms.onrender.com/reservar${search}`);
  }, [location]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-mahana-light">
      <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl max-w-md mx-auto border border-turquoise-100/50 animate-pulse">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-turquoise-500 mx-auto mb-4"></div>
        <p className="font-semibold text-lg text-mahana-dark">Redireccionando al sistema de reservas...</p>
        <p className="text-sm text-gray-500 mt-2">Por favor, espera un momento mientras te conectamos de forma segura.</p>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isPromoPage = location.pathname === '/promo-habitacion-gratis';

  return (
    <div className="flex flex-col min-h-screen bg-mahana-light text-mahana-dark selection:bg-turquoise-100 selection:text-turquoise-900">
      {!isPromoPage && <Header />}
      {isPromoPage && (
        <header className="absolute top-0 left-0 right-0 z-50 py-8 px-8 md:px-16 flex justify-start items-center pointer-events-none">
          <img 
            src="/images/logo-casa-mahana.png" 
            alt="Casa Mahana Logo" 
            className="h-20 md:h-24 w-auto object-contain pointer-events-auto filter drop-shadow-lg opacity-100 transition-transform duration-300 hover:scale-105"
          />
        </header>
      )}
      <main className="flex-grow">
        <Routes>
          {/* Home & Core */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/experiencias" element={<ProductShowcase />} />
          <Route path="/reservar" element={<RedirectToPMS />} />

          {/* Lodging & Stays Hub */}
          <Route path="/estadias" element={<EstadiasHub />} />
          <Route path="/estadias/mahana-experience" element={<MahanaExperienceLanding />} />
          <Route path="/estadias/todo-incluido" element={<EstadiaAllInclusiveLanding />} />
          <Route path="/estadias/escape-mahana" element={<EscapeMahanaLanding />} />

          {/* Day Passes Hub */}
          <Route path="/pasadias" element={<PasadiasHub />} />
          <Route path="/pasadias/pool-day" element={<PoolDayLanding />} />
          <Route path="/pasadias/todo-incluido" element={<PasadyaAllInclusiveLanding />} />

          {/* Public Restaurant, Surf Shack & Events */}
          <Route path="/restaurante" element={<RestaurantePublico />} />
          <Route path="/surf-shack" element={<SurfShackAcademy />} />
          <Route path="/eventos" element={<EventosBodas />} />
          <Route path="/mahana-tours" element={<MahanaTours />} />

          {/* Hidden Promo Landing Page */}
          <Route path="/promo-habitacion-gratis" element={<PromoHabitacionGratis />} />

          {/* Photo & Media Administration Portal */}
          <Route path="/admin/medios" element={<MediaAdmin />} />
          <Route path="/gestor-fotos" element={<MediaAdmin />} />
        </Routes>
      </main>
      {!isPromoPage && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MediaProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </MediaProvider>
    </LanguageProvider>
  );
};

export default App;
