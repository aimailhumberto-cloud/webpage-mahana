import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, Palmtree, ChevronDown, BedDouble, Sparkles, Crown, Sun, Utensils } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileEstadiasOpen, setMobileEstadiasOpen] = useState(false);
  const [mobilePasadiasOpen, setMobilePasadiasOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-mahana-light/90 backdrop-blur-md border-b border-sand-200 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-xl overflow-hidden p-1 shadow-sm group-hover:shadow-md transition-shadow">
              <img 
                src="/images/logo-casa-mahana.png?v=2" 
                alt="Casa Mahana Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-turquoise-900 block leading-none">
                CASA MAHANA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-mahana-accent block font-extrabold mt-0.5">
                Lodge & Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-7 font-bold text-sm xl:text-base">
            <Link to="/" className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors">
              {language === 'es' ? 'Inicio' : 'Home'}
            </Link>

            {/* Dropdown Estadías */}
            <div className="relative group py-4">
              <button className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors flex items-center space-x-1 focus:outline-none">
                <span>{language === 'es' ? 'Hospedaje' : 'Lodging'}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-60 bg-white border border-sand-200 rounded-2xl shadow-premium p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 space-y-1">
                <Link 
                  to="/estadias" 
                  className="flex items-center space-x-2.5 px-4 py-2 text-sm text-mahana-dark hover:bg-sand-50 hover:text-turquoise-900 rounded-xl transition-colors font-semibold"
                >
                  <BedDouble className="h-4 w-4 text-turquoise-700 shrink-0" />
                  <span>{language === 'es' ? 'Todas las Habitaciones' : 'All Rooms & Capacities'}</span>
                </Link>
                <Link 
                  to="/estadias/mahana-experience" 
                  className="flex items-center space-x-2.5 px-4 py-2 text-sm text-mahana-dark hover:bg-sand-50 hover:text-turquoise-900 rounded-xl transition-colors font-semibold"
                >
                  <Sparkles className="h-4 w-4 text-turquoise-700 shrink-0" />
                  <span>Mahana Experience Standard</span>
                </Link>
                <Link 
                  to="/estadias/todo-incluido" 
                  className="flex items-center space-x-2.5 px-4 py-2 text-sm text-mahana-dark hover:bg-sand-50 hover:text-turquoise-900 rounded-xl transition-colors font-semibold"
                >
                  <Crown className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>{language === 'es' ? 'Todo Incluido' : 'All-Inclusive'}</span>
                </Link>
              </div>
            </div>

            {/* Dropdown Pasadías */}
            <div className="relative group py-4">
              <button className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors flex items-center space-x-1 focus:outline-none">
                <span>{language === 'es' ? 'Pasadías' : 'Day Passes'}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-60 bg-white border border-sand-200 rounded-2xl shadow-premium p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 space-y-1">
                <Link 
                  to="/pasadias" 
                  className="flex items-center space-x-2.5 px-4 py-2 text-sm text-mahana-dark hover:bg-sand-50 hover:text-turquoise-900 rounded-xl transition-colors font-semibold"
                >
                  <Sun className="h-4 w-4 text-cyan-600 shrink-0" />
                  <span>{language === 'es' ? 'Ver Todos los Pasadías' : 'View All Day Passes'}</span>
                </Link>
                <Link 
                  to="/pasadias/todo-incluido" 
                  className="flex items-center space-x-2.5 px-4 py-2 text-sm text-mahana-dark hover:bg-sand-50 hover:text-turquoise-900 rounded-xl transition-colors font-semibold"
                >
                  <Crown className="h-4 w-4 text-orange-600 shrink-0" />
                  <span>{language === 'es' ? 'Pasadía con Todo Incluido' : 'All-Inclusive Day Pass'}</span>
                </Link>
                <Link 
                  to="/pasadias/pool-day" 
                  className="flex items-center space-x-2.5 px-4 py-2 text-sm text-mahana-dark hover:bg-sand-50 hover:text-turquoise-900 rounded-xl transition-colors font-semibold"
                >
                  <Utensils className="h-4 w-4 text-cyan-600 shrink-0" />
                  <span>{language === 'es' ? 'Pool Day' : 'Pool Day (Basic Access)'}</span>
                </Link>
              </div>
            </div>

            <Link to="/restaurante" className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors">
              {language === 'es' ? 'Restaurante' : 'Restaurant'}
            </Link>

            <Link to="/mahana-tours" className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors">
              {language === 'es' ? 'Tours' : 'Tours'}
            </Link>

            <Link to="/surf-shack" className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors">
              Surf Shack
            </Link>

            <Link to="/eventos" className="text-mahana-dark/80 hover:text-turquoise-950 font-bold transition-colors shrink-0">
              {language === 'es' ? 'Eventos' : 'Events'}
            </Link>
          </nav>

          {/* Action buttons & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-sand-300 text-turquoise-900 hover:bg-sand-100 hover:border-sand-500 transition-all font-bold text-sm shadow-sm"
              aria-label="Switch Language"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/reservar')}
              className="px-5 py-2.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl transition-all shadow-md font-bold text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('hero.cta_book')}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden space-x-2 sm:space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-sand-300 text-turquoise-900 font-bold text-xs shadow-xs"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-turquoise-900 hover:bg-sand-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-mahana-light border-b border-sand-200 py-4 px-6 space-y-4 animate-fade-in shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="py-2 text-mahana-dark font-extrabold border-b border-sand-100 text-base"
            >
              {language === 'es' ? 'Inicio' : 'Home'}
            </Link>

            {/* Mobile Accordion Estadías */}
            <div className="border-b border-sand-100 py-2">
              <button 
                onClick={() => setMobileEstadiasOpen(!mobileEstadiasOpen)}
                className="w-full flex justify-between items-center text-mahana-dark font-extrabold text-base focus:outline-none"
              >
                <span>{language === 'es' ? 'Hospedaje' : 'Lodging'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileEstadiasOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileEstadiasOpen && (
                <div className="pl-4 pt-2 pb-1 flex flex-col space-y-2.5 text-sm font-semibold text-mahana-dark/85">
                  <Link to="/estadias" onClick={handleLinkClick} className="flex items-center space-x-2">
                    <BedDouble className="h-4 w-4 text-turquoise-700 shrink-0" />
                    <span>{language === 'es' ? 'Todas las Habitaciones' : 'All Rooms'}</span>
                  </Link>
                  <Link to="/estadias/mahana-experience" onClick={handleLinkClick} className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-turquoise-700 shrink-0" />
                    <span>Mahana Experience</span>
                  </Link>
                  <Link to="/estadias/todo-incluido" onClick={handleLinkClick} className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{language === 'es' ? 'Todo Incluido' : 'All-Inclusive'}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion Pasadías */}
            <div className="border-b border-sand-100 py-2">
              <button 
                onClick={() => setMobilePasadiasOpen(!mobilePasadiasOpen)}
                className="w-full flex justify-between items-center text-mahana-dark font-extrabold text-base focus:outline-none"
              >
                <span>{language === 'es' ? 'Pasadías' : 'Day Passes'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobilePasadiasOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobilePasadiasOpen && (
                <div className="pl-4 pt-2 pb-1 flex flex-col space-y-2.5 text-sm font-semibold text-mahana-dark/85">
                  <Link to="/pasadias" onClick={handleLinkClick} className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-cyan-600 shrink-0" />
                    <span>{language === 'es' ? 'Ver Todos' : 'View All'}</span>
                  </Link>
                  <Link to="/pasadias/todo-incluido" onClick={handleLinkClick} className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-orange-600 shrink-0" />
                    <span>{language === 'es' ? 'Pasadía con Todo Incluido' : 'All-Inclusive Day Pass'}</span>
                  </Link>
                  <Link to="/pasadias/pool-day" onClick={handleLinkClick} className="flex items-center space-x-2">
                    <Utensils className="h-4 w-4 text-cyan-600 shrink-0" />
                    <span>{language === 'es' ? 'Pool Day' : 'Pool Day (Basic Access)'}</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/restaurante"
              onClick={handleLinkClick}
              className="py-2 text-mahana-dark font-extrabold border-b border-sand-100 text-base"
            >
              {language === 'es' ? 'Restaurante' : 'Restaurant'}
            </Link>

            <Link
              to="/mahana-tours"
              onClick={handleLinkClick}
              className="py-2 text-mahana-dark font-extrabold border-b border-sand-100 text-base"
            >
              {language === 'es' ? 'Tours y Aventura' : 'Tours & Adventure'}
            </Link>

            <Link
              to="/surf-shack"
              onClick={handleLinkClick}
              className="py-2 text-mahana-dark font-extrabold border-b border-sand-100 text-base"
            >
              Surf Shack
            </Link>

            <Link
              to="/eventos"
              onClick={handleLinkClick}
              className="py-2 text-mahana-dark font-extrabold border-b border-sand-100 text-base"
            >
              {language === 'es' ? 'Eventos & Bodas' : 'Events & Weddings'}
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/reservar');
              }}
              className="mt-4 w-full py-3.5 bg-turquoise-700 hover:bg-turquoise-900 text-white rounded-xl text-center font-extrabold shadow-md"
            >
              {t('hero.cta_book')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
