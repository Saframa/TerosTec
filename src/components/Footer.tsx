import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/site';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-black/8 bg-white/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo y Descripción */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center p-1.5 shadow-xs">
              <img
                src="/logo-icon-white.png"
                alt="TerosTec"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                decoding="async"
              />
            </div>
            <div>
              <span className="font-semibold text-base tracking-tight text-[#0F172A]">
                {siteConfig.name}
              </span>
              <p className="text-xs text-[#64748B]">
                {t('footer_location')}
              </p>
            </div>
          </div>

          {/* Enlaces de Navegación Rápida */}
          <div className="flex items-center gap-6 text-xs font-medium text-[#475569]">
            <a href="#services" className="hover:text-[#0F172A] transition-colors">
              {t('nav_services')}
            </a>
            <a href="#methodology" className="hover:text-[#0F172A] transition-colors">
              {t('nav_methodology')}
            </a>
            <a href="#team" className="hover:text-[#0F172A] transition-colors">
              {t('nav_team')}
            </a>
            <a href="#contact" className="hover:text-[#0F172A] transition-colors">
              {t('nav_contact')}
            </a>
          </div>

          {/* Botón Volver Arriba */}
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-black/10 flex items-center justify-center text-[#475569] hover:text-[#0F172A] transition-colors"
            aria-label="Volver arriba"
            title="Volver al inicio"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8]">
          {/* El año se calcula al compilar; si el cliente ya está en el año siguiente, no es un error */}
          <p suppressHydrationWarning>
            (c) {currentYear} {siteConfig.name}. {t('footer_rights')}
          </p>
          <p>
            Ingeniería de Software, Rendimiento & Diseño Boutique.
          </p>
        </div>
      </div>
    </footer>
  );
};
