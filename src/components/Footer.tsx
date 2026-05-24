import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Instagram, Facebook, Palmtree } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-mahana-dark text-sand-100/90 pt-16 pb-8 border-t border-turquoise-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 bg-white rounded-lg overflow-hidden p-1 shadow-sm">
                <img 
                  src="/images/logo-casa-mahana.png?v=2" 
                  alt="Casa Mahana Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CASA MAHANA
              </span>
            </div>
            <p className="text-sm text-sand-200/70 max-w-sm">
              {language === 'es'
                ? 'Un rincón paradisíaco en Chame, Panamá, donde el confort del hospedaje costero se encuentra con una gastronomía artesanal excepcional y un descanso inigualable.'
                : 'A paradise corner in Chame, Panama, where the comfort of coastal lodging meets exceptional artisanal gastronomy and absolute relaxation.'}
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-turquoise-900/50 hover:bg-turquoise-900 hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-turquoise-900/50 hover:bg-turquoise-900 hover:text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">
              {language === 'es' ? 'Sitemap / Páginas' : 'Sitemap / Pages'}
            </h3>
            <ul className="space-y-2 text-sm text-sand-200/80 font-medium">
              <li>
                <Link to="/" className="hover:text-turquoise-400 transition-colors">
                  {language === 'es' ? 'Inicio' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/estadias" className="hover:text-turquoise-400 transition-colors">
                  {language === 'es' ? 'Hospedaje & Habitaciones' : 'Lodging & Rooms'}
                </Link>
              </li>
              <li>
                <Link to="/pasadias" className="hover:text-turquoise-400 transition-colors">
                  {language === 'es' ? 'Pasadías / Pool Day' : 'Day Passes / Pool Day'}
                </Link>
              </li>
              <li>
                <Link to="/restaurante" className="hover:text-turquoise-400 transition-colors">
                  {language === 'es' ? 'Restaurante Abierto al Público' : 'Public Restaurant'}
                </Link>
              </li>
              <li>
                <Link to="/mahana-tours" className="hover:text-turquoise-400 transition-colors">
                  {language === 'es' ? 'Mahana Tours & Aventura' : 'Mahana Tours & Adventure'}
                </Link>
              </li>
              <li>
                <Link to="/surf-shack" className="hover:text-turquoise-400 transition-colors">
                  Surf Shack & Academia
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-turquoise-400 transition-colors">
                  {language === 'es' ? 'Bodas & Eventos' : 'Weddings & Events'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">
              {language === 'es' ? 'Contacto' : 'Contact'}
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-turquoise-400 shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=Chame,+Panama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-turquoise-400 transition-colors"
                >
                  Vía Punta Chame, El Mangote,<br />
                  Chame, Panamá Oeste
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-5 w-5 text-turquoise-400 shrink-0" />
                <a href="tel:+5073453222" className="hover:text-turquoise-400 transition-colors">
                  +507 345-3222
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-5 w-5 text-turquoise-400 shrink-0" />
                <a href="https://wa.me/50762906800" className="hover:text-turquoise-400 transition-colors">
                  +507 6290-6800 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-5 w-5 text-turquoise-400 shrink-0" />
                <a href="mailto:recepcion@casamahana.com" className="hover:text-turquoise-400 transition-colors">
                  recepcion@casamahana.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-turquoise-900/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-sand-200/50">
          <p>&copy; {new Date().getFullYear()} Casa Mahana Lodge & Restaurante. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            {language === 'es'
              ? 'Desarrollado con ❤️ en Chame, Panamá'
              : 'Developed with ❤️ in Chame, Panama'}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
