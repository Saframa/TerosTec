import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { Methodology } from './components/Methodology';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PortfolioModal } from './components/PortfolioModal';

export const AppContent: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-slate-300 selection:text-slate-900">
      {/* Barra de progreso de scroll superior ultra delgada */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0F172A] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Efectos de fondo reactivos y textura */}
      <BackgroundEffect />

      {/* Barra de Navegacion */}
      <Navbar onOpenPortfolio={() => setIsPortfolioOpen(true)} />

      {/* Contenido Principal */}
      <main className="flex-1">
        <Hero />
        <ServicesBento />
        <Methodology />
        <Team />
        <Contact />
      </main>

      {/* Pie de Pagina */}
      <Footer />

      {/* Modal de Portafolio Oculto / Preview */}
      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
