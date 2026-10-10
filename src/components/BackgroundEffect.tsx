import React, { useEffect, useState } from 'react';

export const BackgroundEffect: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Capa de grano de textura satinada fina */}
      <div className="grain-texture-overlay" aria-hidden="true" />

      {/* Gradientes ambientales suaves fijos en el fondo */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[25%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[140px] opacity-40 mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, rgba(215, 222, 232, 0.9) 0%, rgba(230, 233, 238, 0) 70%)',
          }}
        />
        <div
          className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-35 mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, rgba(205, 214, 226, 0.85) 0%, rgba(230, 233, 238, 0) 70%)',
          }}
        />
        <div
          className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-30 mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, rgba(218, 225, 235, 0.8) 0%, rgba(230, 233, 238, 0) 70%)',
          }}
        />
      </div>

      {/* Spotlight interactivo sutil que sigue el cursor del mouse */}
      {isClient && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.45), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};
