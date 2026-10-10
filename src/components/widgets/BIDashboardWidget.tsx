import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BIDashboardWidget: React.FC = () => {
  const { language } = useLanguage();
  const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('7D');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Datos para cada periodo
  const dataMap = {
    '7D': [
      { day: 'Lun', val: 45, metric: '$3,200', change: '+14%' },
      { day: 'Mar', val: 70, metric: '$5,100', change: '+22%' },
      { day: 'Mie', val: 55, metric: '$4,200', change: '+18%' },
      { day: 'Jue', val: 85, metric: '$6,800', change: '+35%' },
      { day: 'Vie', val: 95, metric: '$8,200', change: '+42%' },
      { day: 'Sab', val: 65, metric: '$4,900', change: '+20%' },
      { day: 'Dom', val: 40, metric: '$2,800', change: '+10%' },
    ],
    '30D': [
      { day: 'S1', val: 50, metric: '$21,400', change: '+16%' },
      { day: 'S2', val: 65, metric: '$28,100', change: '+24%' },
      { day: 'S3', val: 80, metric: '$34,900', change: '+31%' },
      { day: 'S4', val: 92, metric: '$41,200', change: '+38%' },
      { day: 'S5', val: 78, metric: '$33,800', change: '+29%' },
      { day: 'S6', val: 88, metric: '$39,000', change: '+36%' },
      { day: 'S7', val: 96, metric: '$44,500', change: '+44%' },
    ],
    '90D': [
      { day: 'M1', val: 60, metric: '$84,000', change: '+25%' },
      { day: 'M2', val: 75, metric: '$105,000', change: '+32%' },
      { day: 'M3', val: 90, metric: '$126,000', change: '+41%' },
      { day: 'M4', val: 82, metric: '$114,000', change: '+36%' },
      { day: 'M5', val: 94, metric: '$138,000', change: '+45%' },
      { day: 'M6', val: 88, metric: '$124,000', change: '+39%' },
      { day: 'M7', val: 98, metric: '$145,000', change: '+49%' },
    ],
  };

  const currentDataset = dataMap[period];
  const activeItem = hoveredIdx !== null ? currentDataset[hoveredIdx] : null;

  return (
    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/70 border border-black/8 shadow-2xs space-y-4">
      {/* Cabecera del Dashboard y Selector de Periodos */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-[#0F172A]" />
          <span className="text-xs font-semibold text-[#0F172A]">
            {language === 'es' ? 'Metricas en Tiempo Real' : 'Real-Time BI Dashboard'}
          </span>
        </div>

        {/* Selector de Rango */}
        <div className="inline-flex p-0.5 rounded-lg bg-[#E6E9EE]/80 border border-black/5 text-[10px] font-mono">
          {(['7D', '30D', '90D'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPeriod(p);
                setHoveredIdx(null);
              }}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                period === p
                  ? 'bg-white text-[#0F172A] shadow-2xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Dinamico Reactivo al Hover */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-medium text-[#64748B] uppercase tracking-wider block">
            {activeItem
              ? `${language === 'es' ? 'Seleccionado: ' : 'Selected: '} ${activeItem.day}`
              : (language === 'es' ? 'Rendimiento Promedio' : 'Average Performance')}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold font-mono text-[#0F172A]">
              {activeItem ? activeItem.metric : (period === '7D' ? '$5,240 USD' : period === '30D' ? '$34,700 USD' : '$119,500 USD')}
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              {activeItem ? activeItem.change : '+28.4%'}
            </span>
          </div>
        </div>

        <span className="text-[10px] text-[#94A3B8] font-mono">
          {language === 'es' ? 'Pasa el cursor por las barras' : 'Hover over bars'}
        </span>
      </div>

      {/* Grafico de Barras Interactivo */}
      <div className="h-28 flex items-end justify-between gap-1.5 pt-4 pb-1 border-b border-black/5">
        {currentDataset.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Barra */}
              <div className="w-full relative flex items-end justify-center">
                {/* Tooltip flotante al hacer hover */}
                {isHovered && (
                  <div className="absolute -top-7 z-10 px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono text-[9px] shadow-sm whitespace-nowrap">
                    {item.metric}
                  </div>
                )}
                <div
                  className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                    isHovered
                      ? 'bg-[#0F172A] shadow-xs scale-y-105'
                      : hoveredIdx !== null
                      ? 'bg-slate-300 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-900'
                  }`}
                  style={{ height: `${item.val}%` }}
                />
              </div>

              {/* Etiqueta del Eje X */}
              <span
                className={`text-[9px] font-mono transition-colors ${
                  isHovered ? 'font-bold text-[#0F172A]' : 'text-[#64748B]'
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pie con indicador de salud del sistema */}
      <div className="flex items-center justify-between text-[11px] text-[#64748B]">
        <span>{language === 'es' ? 'Disponibilidad / Uptime' : 'System Availability / Uptime'}</span>
        <span className="font-mono font-bold text-emerald-700">99.98% SLA</span>
      </div>
    </div>
  );
};
