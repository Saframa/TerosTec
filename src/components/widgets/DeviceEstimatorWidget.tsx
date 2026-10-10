import React, { useState } from 'react';
import { Monitor, Smartphone, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DeviceEstimatorWidget: React.FC = () => {
  const { language } = useLanguage();
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [pages, setPages] = useState<number>(3);

  // Estimaciones dinamicas segun alcance
  const getTimeline = (p: number) => {
    if (p <= 2) return language === 'es' ? '3 a 5 dias habiles' : '3 to 5 business days';
    if (p <= 5) return language === 'es' ? '7 a 10 dias habiles' : '7 to 10 business days';
    return language === 'es' ? '12 a 16 dias habiles' : '12 to 16 business days';
  };

  const getArchitecture = (p: number) => {
    if (p <= 2) return language === 'es' ? 'Landing Page de Alta Conversion' : 'High-Converting Landing Page';
    if (p <= 5) return language === 'es' ? 'Sitio Institucional + Modulos' : 'Corporate Site + Custom Modules';
    return language === 'es' ? 'Plataforma Web Integral + Cotizador' : 'Full Web Platform + Estimator';
  };

  return (
    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/70 border border-black/8 shadow-2xs space-y-4">
      {/* Selector de Dispositivo Desktop / Mobile */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#0F172A]" />
          <span>{language === 'es' ? 'Simulador de Presencia' : 'Presence Simulator'}</span>
        </span>

        <div className="inline-flex p-1 rounded-xl bg-[#E6E9EE]/80 border border-black/5">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              device === 'desktop'
                ? 'bg-white text-[#0F172A] shadow-2xs font-semibold'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              device === 'mobile'
                ? 'bg-white text-[#0F172A] shadow-2xs font-semibold'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Frame de Simulacion Reactivo */}
      <div className="bg-[#E6E9EE]/50 rounded-xl p-3 flex justify-center items-center min-h-[140px] overflow-hidden">
        {device === 'desktop' ? (
          <div className="w-full max-w-sm rounded-lg bg-white border border-black/10 shadow-xs p-2.5 transition-all">
            {/* Barra superior de navegador */}
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-black/5">
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <div className="flex-1 text-center font-mono text-[9px] text-slate-400 bg-slate-50 py-0.5 rounded">
                terostec.com/preview
              </div>
            </div>
            {/* Contenido mini */}
            <div className="space-y-1.5">
              <div className="h-2.5 bg-slate-800 rounded w-3/4" />
              <div className="h-1.5 bg-slate-200 rounded w-1/2" />
              <div className="grid grid-cols-3 gap-1 pt-1">
                <div className="h-7 bg-slate-100 rounded border border-slate-200/50" />
                <div className="h-7 bg-slate-100 rounded border border-slate-200/50" />
                <div className="h-7 bg-slate-100 rounded border border-slate-200/50" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-28 rounded-2xl bg-white border-2 border-slate-700 shadow-sm p-2 transition-all">
            {/* Notch */}
            <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto mb-2" />
            <div className="space-y-1.5">
              <div className="h-2 bg-slate-800 rounded w-4/5 mx-auto" />
              <div className="h-1 bg-slate-200 rounded w-3/5 mx-auto" />
              <div className="h-5 bg-slate-100 rounded border border-slate-200/50" />
              <div className="h-5 bg-slate-100 rounded border border-slate-200/50" />
            </div>
          </div>
        )}
      </div>

      {/* Slider Interactivo de Alcance */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-[#475569]">
            {language === 'es' ? 'Alcance estimado:' : 'Scope scale:'}
          </span>
          <span className="font-mono font-bold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-black/10">
            {pages} {pages === 1 ? (language === 'es' ? 'pantalla' : 'page') : (language === 'es' ? 'pantallas' : 'pages')}
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="8"
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F172A]"
        />

        {/* Resumen calculado en tiempo real */}
        <div className="pt-2 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]">
          <div>
            <span className="text-[#64748B]">{language === 'es' ? 'Tipo: ' : 'Type: '}</span>
            <span className="font-semibold text-[#0F172A]">{getArchitecture(pages)}</span>
          </div>
          <div>
            <span className="text-[#64748B]">{language === 'es' ? 'Plazo: ' : 'Time: '}</span>
            <span className="font-semibold text-emerald-700">{getTimeline(pages)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
