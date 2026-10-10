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

  // Distancia de scroll necesaria para completar la animacion diagonal
  const SCROLL_DISTANCE = 340;

  useEffect(() => {
    setMounted(true);

    const updateMeasurements = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const targetEl = document.getElementById('navbar-logo-target');
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        setTargetPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      const p = Math.min(1, Math.max(0, currentScroll / SCROLL_DISTANCE));
      if (onProgressChange) {
        onProgressChange(p);
      }
    };

    updateMeasurements();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMeasurements);

    // Reintentar medir cuando los elementos terminen de renderizarse
    const timer = setTimeout(updateMeasurements, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMeasurements);
      clearTimeout(timer);
    };
  }, [onProgressChange]);

  if (!mounted) return null;

  // Calculo de progreso normalizado [0 a 1]
  const progress = Math.min(1, Math.max(0, scrollY / SCROLL_DISTANCE));
  
  // Curva de desaceleracion suave estilo Apple (Cubic ease-out)
  const easedP = 1 - Math.pow(1 - progress, 2.4);

  // Posicion inicial: centro exacto del viewport
  const startX = windowSize.width / 2;
  const startY = windowSize.height / 2;

  // Posicion final: ancla exacta del monograma en el header
  const endX = targetPos.x > 0 ? targetPos.x : 48;
  const endY = targetPos.y > 0 ? targetPos.y : 36;

  // Coordenadas actuales en la trayectoria diagonal
  const currentX = startX + (endX - startX) * easedP;
  const currentY = startY + (endY - startY) * easedP;

  // Escala: de 1.0 (130px) a 0.28 (~36px para encajar en el header)
  const currentScale = 1 - (1 - 36 / 130) * easedP;

  // Opacidad del logo flotante: visible durante el viaje, se oculta cuando ya atraco en el header
  const isDocked = progress >= 0.98;

  return (
    <>
      {/* Spacer inicial que permite el recorrido de scroll fluido */}
      <div className="h-[25vh] sm:h-[30vh] pointer-events-none" aria-hidden="true" />

      {/* Logo flotante animado en diagonal */}
      {!isDocked && (
        <div
          className="fixed z-50 pointer-events-none select-none transition-none"
          style={{
            left: `${currentX}px`,
            top: `${currentY}px`,
            transform: `translate(-50%, -50%) scale(${currentScale})`,
            willChange: 'transform, left, top',
          }}
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Imagen PNG de alta resolucion con fondo transparente */}
            <img
              src="/logo-transparent.png"
              alt="TerosTec Logo"
              width={130}
              height={130}
              className="w-32 h-32 object-contain drop-shadow-md"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Indicador de ayuda al inicio ("Desliza para explorar") */}
      {progress < 0.15 && (
        <div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-opacity duration-300 flex flex-col items-center gap-1.5"
          style={{ opacity: 1 - progress / 0.15 }}
          aria-hidden="true"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#64748B] font-semibold">
            {language === 'es' ? 'Desliza para explorar' : 'Scroll to explore'}
          </span>
          <ChevronDown className="w-4 h-4 text-[#64748B] animate-bounce" />
        </div>
      )}
    </>
  );
};
