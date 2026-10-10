import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/site';
import { ArrowUpRight, Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenPortfolio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortfolio }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    // Secret trigger para abrir el portafolio si se hace clic 5 veces seguidas
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5 && onOpenPortfolio) {
      e.preventDefault();
      onOpenPortfolio();
      setLogoClicks(0);
    }
  };

  const navLinks = [
    { href: '#services', label: t('nav_services') },
    { href: '#methodology', label: t('nav_methodology') },
    { href: '#team', label: t('nav_team') },
    ...(siteConfig.showPortfolio
      ? [{ href: '#portfolio', label: t('nav_portfolio'), isPortfolio: true }]
      : []),
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Monograma y Logotipo */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-3.5 group select-none"
          title="TerosTec"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm transition-transform group-hover:scale-105">
            TT
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg tracking-tight text-[#0F172A] group-hover:text-black transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#64748B] font-medium -mt-1 hidden sm:block">
              Software Boutique
            </span>
          </div>
        </a>

        {/* Enlaces de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.isPortfolio && onOpenPortfolio) {
                  e.preventDefault();
                  onOpenPortfolio();
                }
              }}
              className="hover:text-[#0F172A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#0F172A] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones: Selector de Idioma y Boton CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Selector Bilingüe ES / EN */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 border border-black/10 hover:border-black/25 text-[#334155] hover:text-[#0F172A] transition-all shadow-2xs"
            aria-label="Toggle language"
            title="Cambiar idioma / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-[#64748B]" />
            <span className={language === 'es' ? 'text-[#0F172A] font-bold' : 'text-[#94A3B8]'}>
              ES
            </span>
            <span className="text-[#CBD5E1]">/</span>
            <span className={language === 'en' ? 'text-[#0F172A] font-bold' : 'text-[#94A3B8]'}>
              EN
            </span>
          </button>

          {/* CTA Iniciar Proyecto */}
          <a
            href="#contact"
            className="apple-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#0F172A] text-white hover:bg-black shadow-sm"
          >
            <span>{t('nav_cta')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Boton Hamburguesa Movil */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/80 border border-black/10 text-[#334155]"
            aria-label="Toggle language"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/80 border border-black/10 text-[#0F172A]"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu desplegable para dispositivos moviles */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#E6E9EE]/98 border-b border-black/10 shadow-lg">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.isPortfolio && onOpenPortfolio) {
                    e.preventDefault();
                    onOpenPortfolio();
                  }
                }}
                className="px-3 py-2 text-base font-medium text-[#334155] hover:text-[#0F172A] rounded-lg hover:bg-black/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-[#0F172A] text-white"
              >
                <span>{t('nav_cta')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
