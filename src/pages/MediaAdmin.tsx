import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia, AVAILABLE_IMAGES, MediaRegistry } from '../context/MediaContext';
import { Camera, RotateCcw, Image as ImageIcon, Check, Copy, ExternalLink, HelpCircle, Upload, AlertCircle } from 'lucide-react';

export const MediaAdmin: React.FC = () => {
  const { media, updateSlot, resetAll } = useMedia();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hero' | 'experiences' | 'facilities' | 'restaurant' | 'gallery'>('hero');
  const [selectedSlot, setSelectedSlot] = useState<keyof MediaRegistry | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string' && selectedSlot) {
        updateSlot(selectedSlot, result);
        setSelectedSlot(null);
      }
    };
    reader.onerror = () => {
      setUploadError('Ocurrió un error al procesar el archivo.');
    };
    reader.readAsDataURL(file);
  };

  // Group slots by tab
  const tabs = [
    { id: 'hero', name: 'Hero Slider' },
    { id: 'experiences', name: 'Experiencias' },
    { id: 'facilities', name: 'Instalaciones' },
    { id: 'restaurant', name: 'Restaurante' },
    { id: 'gallery', name: 'Galería' }
  ] as const;

  const slotsMap: Record<typeof activeTab, { key: keyof MediaRegistry; label: string; desc: string }[]> = {
    hero: [
      { key: 'hero_1', label: 'Slide 1 (Principal)', desc: 'La primera imagen de fondo que ve el huésped al entrar al sitio.' },
      { key: 'hero_2', label: 'Slide 2 (Oasis)', desc: 'La segunda imagen en la rotación del encabezado.' },
      { key: 'hero_3', label: 'Slide 3 (Jardines)', desc: 'La tercera imagen que evoca naturaleza tropical.' }
    ],
    experiences: [
      { key: 'exp_stays', label: 'Tarjeta de Estadías (Hospedaje)', desc: 'Muestra el confort de las habitaciones en la sección de planes.' },
      { key: 'exp_daypass', label: 'Tarjeta de Pasadías (Día de Sol)', desc: 'Imagen superior para invitar al pasadía con cócteles y piscina.' },
      { key: 'exp_restaurant', label: 'Tarjeta del Restaurante', desc: 'Evoca la gastronomía de horno de leña de Casa Mahana.' },
      { key: 'exp_surf', label: 'Tarjeta del Surf Shack', desc: 'Invita a las actividades de surf y playa en Playa Caracol.' }
    ],
    facilities: [
      { key: 'fac_pool', label: 'Piscina Tropical', desc: 'Fondo inmersivo para la tarjeta de piscina en instalaciones.' },
      { key: 'fac_beach', label: 'Club de Playa', desc: 'Fondo inmersivo para la sección de club de playa Surf Shack.' },
      { key: 'fac_relax', label: 'Áreas de Descanso', desc: 'Fondo inmersivo para la tarjeta de bohíos y hamacas de relajación.' }
    ],
    restaurant: [
      { key: 'rest_pizza', label: 'Especialidad: Pizzas', desc: 'Fotografía en el menú de la pizza artesanal a la leña.' },
      { key: 'rest_seafood', label: 'Especialidad: Mariscos', desc: 'Fotografía para los pescados, mariscos y picadas locales.' },
      { key: 'rest_burger', label: 'Especialidad: Hamburguesas / Tragos', desc: 'Fotografía de hamburguesa premium o coctelería para el menú.' }
    ],
    gallery: [
      { key: 'gal_1', label: 'Imagen de Galería 1', desc: 'Primera foto de la cuadrícula de Lodge Life.' },
      { key: 'gal_2', label: 'Imagen de Galería 2', desc: 'Segunda foto de la cuadrícula de Lodge Life.' },
      { key: 'gal_3', label: 'Imagen de Galería 3', desc: 'Tercera foto de la cuadrícula de Lodge Life.' },
      { key: 'gal_4', label: 'Imagen de Galería 4', desc: 'Cuarta foto de la cuadrícula de Lodge Life.' },
      { key: 'gal_5', label: 'Imagen de Galería 5', desc: 'Quinta foto de la cuadrícula de Lodge Life.' },
      { key: 'gal_6', label: 'Imagen de Galería 6', desc: 'Sexta foto de la cuadrícula de Lodge Life.' }
    ]
  };

  const currentSlots = slotsMap[activeTab];

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(media, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-sand-50 py-32 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Dashboard Header Banner */}
        <div className="relative bg-gradient-to-r from-turquoise-900 to-turquoise-950 rounded-[40px] p-8 md:p-12 shadow-premium overflow-hidden text-white border border-turquoise-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-mahana-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-turquoise-300 text-xs uppercase tracking-widest font-semibold">
                <Camera className="h-3.5 w-3.5" />
                <span>Panel de Administración</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Gestor de Fotos del Sitio Web</h1>
              <p className="text-turquoise-100/80 text-sm max-w-xl leading-relaxed">
                Cambia las fotos de cualquier sección de Casa Mahana al instante. Selecciona entre las 20 mejores tomas de la sesión de fotos profesional. Los cambios se guardan localmente en tiempo real.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-5 py-3 bg-white text-turquoise-950 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <span>Ver Sitio Web</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              
              <button
                onClick={resetAll}
                className="flex items-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Restaurar Predeterminados</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Workspace (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custom Tabs */}
            <div className="flex space-x-1.5 p-1 bg-sand-200/50 backdrop-blur-md rounded-2xl border border-sand-200">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-turquoise-950 shadow-sm'
                      : 'text-turquoise-950/60 hover:text-turquoise-950 hover:bg-white/40'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* List of active slots under the tab */}
            <div className="space-y-4">
              {currentSlots.map(slot => {
                const currentImg = media[slot.key];
                return (
                  <div
                    key={slot.key}
                    className="group bg-white rounded-3xl p-6 border border-sand-200 shadow-glass flex flex-col sm:flex-row gap-6 items-center justify-between hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Visual Preview */}
                    <div className="relative w-full sm:w-40 h-28 rounded-2xl overflow-hidden border border-sand-100 shadow-sm flex-shrink-0">
                      <img
                        src={currentImg}
                        alt={slot.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Slot Info */}
                    <div className="flex-grow space-y-1 text-center sm:text-left">
                      <span className="text-[10px] text-turquoise-700 font-extrabold uppercase tracking-widest bg-turquoise-50 border border-turquoise-100 rounded-md px-2 py-0.5 inline-block mb-1">
                        Slot: {slot.key}
                      </span>
                      <h3 className="text-lg font-bold text-turquoise-950">{slot.label}</h3>
                      <p className="text-xs text-turquoise-900/60 leading-relaxed max-w-md">{slot.desc}</p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedSlot(slot.key)}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 hover:text-turquoise-900 border border-turquoise-200 rounded-xl font-bold text-sm transition-all active:scale-95"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>Cambiar Foto</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Area (Developer Info & Copy Paste Persistence) */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 border border-sand-200 shadow-glass space-y-5">
              <div className="flex items-center space-x-3 text-turquoise-950">
                <div className="p-2 bg-turquoise-50 rounded-xl">
                  <HelpCircle className="h-5 w-5 text-turquoise-700" />
                </div>
                <h3 className="text-lg font-bold">¿Cómo funciona?</h3>
              </div>
              <p className="text-xs text-turquoise-900/70 leading-relaxed">
                Esta interfaz interactiva lee las fotos de un <strong>Media Registry</strong> centralizado. Puedes cambiar las imágenes en tiempo real haciendo clic en "Cambiar Foto". Las modificaciones se mantendrán aunque recargues la página.
              </p>
              
              <hr className="border-sand-200" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs uppercase tracking-widest text-turquoise-700 font-extrabold">Configuración JSON</h4>
                  <button
                    onClick={handleCopyConfig}
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 rounded-lg text-xs font-bold transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copiar Config</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-turquoise-900/60 leading-normal">
                  Puedes copiar este bloque JSON y reemplazar el objeto <code>DEFAULT_MEDIA</code> en <code>MediaContext.tsx</code> para hacer tus cambios permanentes en el código fuente.
                </p>
                <div className="bg-sand-50 rounded-2xl p-4 border border-sand-200 overflow-x-auto max-h-[220px] scrollbar-thin">
                  <pre className="text-[10px] text-mahana-dark font-mono leading-relaxed">
                    {JSON.stringify(media, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Immersive Photo Selection Catalog Drawer Modal */}
        {selectedSlot && (
          <div
            className="fixed inset-0 z-50 bg-mahana-dark/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => {
              setSelectedSlot(null);
              setUploadError(null);
            }}
          >
            <div
              className="bg-white rounded-[40px] w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-sand-200 shadow-premium p-1 animate-fade-in-up"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-sand-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-sand-50/50">
                <div>
                  <h3 className="text-xl font-bold text-turquoise-950">Biblioteca de Fotos y Carga Directa</h3>
                  <p className="text-xs text-turquoise-900/60 mt-0.5">
                    Sube tu propia foto o elige una de la sesión profesional para el slot: <strong className="text-turquoise-800">{selectedSlot}</strong>
                  </p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* File Upload Button */}
                  <label className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 bg-turquoise-700 hover:bg-turquoise-800 text-white rounded-2xl font-bold text-xs shadow-sm cursor-pointer transition-all active:scale-[0.98]">
                    <Upload className="h-4 w-4" />
                    <span>Subir de mi Equipo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLocalFileUpload}
                    />
                  </label>

                  <button
                    onClick={() => {
                      setSelectedSlot(null);
                      setUploadError(null);
                    }}
                    className="bg-sand-200 hover:bg-sand-300 text-turquoise-950 p-3 rounded-2xl transition-all text-xs font-bold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>

              {/* Photos List (Categorized Scroll Area) */}
              <div className="flex-grow p-6 overflow-y-auto scrollbar-thin space-y-6">
                
                {/* Upload Error Alert */}
                {uploadError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl flex items-center space-x-2.5 text-xs animate-fade-in">
                    <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Show custom uploaded image first if active */}
                  {media[selectedSlot].startsWith('data:image/') && (
                    <div className="group relative rounded-2xl overflow-hidden border-2 border-turquoise-700 shadow-md ring-2 ring-turquoise-700/20">
                      <div className="h-32 w-full overflow-hidden relative">
                        <img
                          src={media[selectedSlot]}
                          alt="Foto Personalizada"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-turquoise-900/60 backdrop-blur-xs flex items-center justify-center">
                          <div className="p-2 bg-white rounded-full text-turquoise-700 shadow-md">
                            <Check className="h-5 w-5 stroke-[3]" />
                          </div>
                        </div>
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-turquoise-950 text-white text-[8px] font-bold uppercase tracking-wider rounded-md">
                          Personalizada
                        </span>
                      </div>
                      <div className="p-3 bg-white text-center">
                        <p className="text-[11px] font-bold text-turquoise-950 leading-tight truncate">
                          Tu Foto Cargada
                        </p>
                      </div>
                    </div>
                  )}

                  {AVAILABLE_IMAGES.map((img, idx) => {
                    const isActive = media[selectedSlot] === img.src;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          updateSlot(selectedSlot, img.src);
                          setSelectedSlot(null);
                        }}
                        className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                          isActive
                            ? 'border-turquoise-700 shadow-md ring-2 ring-turquoise-700/20'
                            : 'border-sand-100 hover:border-turquoise-500 hover:shadow-md'
                        }`}
                      >
                        {/* Photo Thumbnail */}
                        <div className="h-32 w-full overflow-hidden relative">
                          <img
                            src={img.src}
                            alt={img.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Overlay with check if active */}
                          {isActive && (
                            <div className="absolute inset-0 bg-turquoise-900/60 backdrop-blur-xs flex items-center justify-center">
                              <div className="p-2 bg-white rounded-full text-turquoise-700 shadow-md">
                                <Check className="h-5 w-5 stroke-[3]" />
                              </div>
                            </div>
                          )}
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-white text-[8px] font-bold uppercase tracking-wider rounded-md">
                            {img.category}
                          </span>
                        </div>

                        {/* Name Label */}
                        <div className="p-3 bg-white text-center">
                          <p className="text-[11px] font-bold text-turquoise-950 leading-tight truncate group-hover:text-turquoise-700 transition-colors">
                            {img.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaAdmin;
