import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileCode2, GitBranch, CheckCircle2, Server } from 'lucide-react';

export const Methodology: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: FileCode2,
      title: t('m1_t'),
      desc: t('m1_d'),
    },
    {
      num: '02',
      icon: GitBranch,
      title: t('m2_t'),
      desc: t('m2_d'),
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: t('m3_t'),
      desc: t('m3_d'),
    },
    {
      num: '04',
      icon: Server,
      title: t('m4_t'),
      desc: t('m4_d'),
    },
  ];

  return (
    <section id="methodology" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/70 text-[#475569] border border-black/8 mb-4">
            {t('method_tag')}
          </div>
          <h2 className="display-title text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('method_title')}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            {t('method_desc')}
          </p>
        </div>

        {/* 4 Fases de Ingeniería */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="apple-card rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#0F172A] px-2.5 py-1 rounded bg-[#E6E9EE]">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/90 border border-black/5 flex items-center justify-center text-[#475569] group-hover:text-[#0F172A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
                  <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider">
                    Fase {step.num}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
