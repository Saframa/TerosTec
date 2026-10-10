import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ScrollIntroLogoProps {
  onProgressChange?: (progress: number) => void;
}

export const ScrollIntroLogo: React.FC<ScrollIntroLogoProps> = ({ onProgressChange }) => {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [targetPos, setTargetPos] = useState({ x: 42, y: 36 });
  const [mounted, setMounted] = useState(false);

  // Distancia total de scroll necesaria para completar la trayectoria diagonal (rápida y directa)
  const SCROLL_DISTANCE = 220;

  // Calculo preciso de las coordenadas del blanco en el header fijo
  const computeTarget = () => {
    if (typeof window === 'undefined') return { x: 42, y: 28 };

    const el = document.getElementById('navbar-logo-target');
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    }

    // Calculo de contingencia para el navbar fijo (altura ~54px, centrado y=27)
    const isMobile = window.innerWidth < 640;
    const paddingX = isMobile ? 16 : window.innerWidth < 1024 ? 24 : 32;
    const containerLeft = Math.max(0, (window.innerWidth - 1280) / 2);
    return {
      x: containerLeft + paddingX + 18,
      y: isMobile ? 26 : 28,
    };
  };

  useEffect(() => {
    setMounted(true);

    const updateMeasurements = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setTargetPos(computeTarget());
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setScrollY(currentScroll);
          const p = Math.min(1, Math.max(0, currentScroll / SCROLL_DISTANCE));
          if (onProgressChange) {
            onProgressChange(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    updateMeasurements();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMeasurements);

    const timer1 = setTimeout(updateMeasurements, 80);
    const timer2 = setTimeout(updateMeasurements, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMeasurements);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onProgressChange]);

  if (!mounted) return null;

  // Progreso normalizado de 0 a 1
  const progress = Math.min(1, Math.max(0, scrollY / SCROLL_DISTANCE));

  // Curva de aceleración ágil y desaceleración fluida estilo Apple (Cubic ease-out)
  const easedP = 1 - Math.pow(1 - progress, 2.6);

  // Origen: centro exacto del viewport
  const startX = windowSize.width / 2;
  const startY = windowSize.height / 2;

  // Destino: icono del logo en el navbar fijo
  const endX = targetPos.x > 0 ? targetPos.x : 48;
  const endY = targetPos.y > 0 ? targetPos.y : 28;

  // Coordenadas actuales en la trayectoria diagonal
  const currentX = startX + (endX - startX) * easedP;
  const currentY = startY + (endY - startY) * easedP;

  // Tamaño del emblema: inicial en el centro -> destino en el navbar (24px)
  const startEmblemSize = Math.min(136, Math.max(86, windowSize.width * 0.24));
  const targetEmblemSize = 24;
  const currentEmblemSize = startEmblemSize + (targetEmblemSize - startEmblemSize) * easedP;

  // Transición de badge oscuro y color blanco al aproximarse al header (progreso 0.60 a 0.95)
  const badgeOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.35));
  const whiteOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.35));

  // El logo flotante se acopla con agilidad al aproximarse a destino
  const isDocked = progress >= 0.95;

  const handleExploreClick = () => {
    window.scrollTo({ top: SCROLL_DISTANCE, behavior: 'smooth' });
  };

  return (
    <>
      {/* Pista de scroll que proporciona la distancia física para la animación diagonal */}
      <div className="h-[220px] pointer-events-none" aria-hidden="true" />

      {/* Logo flotante animado en diagonal */}
      {!isDocked && (
        <div
          className="fixed z-50 pointer-events-none select-none transition-none"
          style={{
            left: `${currentX}px`,
            top: `${currentY}px`,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
          }}
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center">
            {/* Contenedor oscuro redondeado que se materializa al aproximarse al navbar */}
            <div
              className="absolute rounded-xl bg-[#0F172A] shadow-sm transition-opacity"
              style={{
                opacity: badgeOpacity,
                width: `${Math.max(36, currentEmblemSize + 12)}px`,
                height: `${Math.max(36, currentEmblemSize + 12)}px`,
              }}
            />

            {/* Emblema oscuro original */}
            <img
              src="/logo-icon.png"
              alt="TerosTec"
              width={startEmblemSize}
              height={startEmblemSize}
              style={{
                width: `${currentEmblemSize}px`,
                height: `${currentEmblemSize}px`,
                opacity: 1 - whiteOpacity,
              }}
              className="relative object-contain transition-none"
              decoding="async"
            />

            {/* Emblema blanco invertido para acoplar con el navbar */}
            <img
              src="/logo-icon-white.png"
              alt="TerosTec"
              width={startEmblemSize}
              height={startEmblemSize}
              style={{
                width: `${currentEmblemSize}px`,
                height: `${currentEmblemSize}px`,
                opacity: whiteOpacity,
              }}
              className="absolute object-contain transition-none"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Indicador interactivo al inicio ("Desliza para explorar") */}
      {progress < 0.15 && (
        <button
          onClick={handleExploreClick}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-opacity duration-300 flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
          style={{ opacity: 1 - progress / 0.15 }}
          aria-label={language === 'es' ? 'Deslizar para explorar' : 'Scroll to explore'}
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#64748B] font-semibold group-hover:text-[#0F172A] transition-colors">
            {language === 'es' ? 'Desliza para explorar' : 'Scroll to explore'}
          </span>
          <ChevronDown className="w-4 h-4 text-[#64748B] group-hover:text-[#0F172A] animate-bounce transition-colors" />
        </button>
      )}
    </>
  );
};
