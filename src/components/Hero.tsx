import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, ChevronDown, Layers, Target, Cpu, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const valueProps = [
    {
      num: '01',
      icon: Layers,
      label: t('val_1_label'),
      desc: t('val_1_desc'),
    },
    {
      num: '02',
      icon: Target,
      label: t('val_2_label'),
      desc: t('val_2_desc'),
    },
    {
      num: '03',
      icon: Cpu,
      label: t('val_3_label'),
      desc: t('val_3_desc'),
    },
    {
      num: '04',
      icon: MapPin,
      label: t('val_4_label'),
      desc: t('val_4_desc'),
    },
  ];

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titular Principal y Propuesta de Valor */}
        <div className="max-w-4xl mx-auto text-center space-y-7">
          <h1 className="display-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
            <span className="block text-[#1E293B]">{t('hero_title_1')}</span>
            <span className="block mt-2 bg-gradient-to-r from-[#0F172A] via-[#334155] to-[#1E293B] bg-clip-text text-transparent">
              {t('hero_title_2')}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#475569] font-normal leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Botones de Acción Directa */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="apple-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-[#0F172A] text-white hover:bg-black shadow-md hover:shadow-lg transition-all"
            >
              <span>{t('hero_cta_primary')}</span>
              <ArrowUpRight className="w-4 h-4 opacity-90" />
            </a>

            <a
              href="#services"
              className="apple-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-white/80 hover:bg-white text-[#334155] hover:text-[#0F172A] border border-black/10 hover:border-black/20 shadow-xs transition-all"
            >
              <span>{t('hero_cta_secondary')}</span>
              <ChevronDown className="w-4 h-4 text-[#64748B]" />
            </a>
          </div>
        </div>

        {/* 4 Métricas / Fundamentos en Color Perla */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {valueProps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="apple-card rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E6E9EE] flex items-center justify-center text-[#334155] group-hover:bg-[#0F172A] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#94A3B8]">
                    {item.num}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A] tracking-tight mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
