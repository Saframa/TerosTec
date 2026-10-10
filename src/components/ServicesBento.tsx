import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Globe,
  Calculator,
  CalendarCheck2,
  ShoppingBag,
  Store,
  ShieldCheck,
  MessageSquareCode,
  Workflow,
  BarChart3,
  Boxes,
  Smartphone,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ServicesBento: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'pilar-1',
      badge: t('pilar_1_badge'),
      title: t('pilar_1_title'),
      desc: t('pilar_1_desc'),
      items: [
        {
          icon: Globe,
          title: t('p1_item1_t'),
          desc: t('p1_item1_d'),
        },
        {
          icon: Calculator,
          title: t('p1_item2_t'),
          desc: t('p1_item2_d'),
        },
        {
          icon: CalendarCheck2,
          title: t('p1_item3_t'),
          desc: t('p1_item3_d'),
        },
      ],
    },
    {
      id: 'pilar-2',
      badge: t('pilar_2_badge'),
      title: t('pilar_2_title'),
      desc: t('pilar_2_desc'),
      items: [
        {
          icon: ShoppingBag,
          title: t('p2_item1_t'),
          desc: t('p2_item1_d'),
        },
        {
          icon: Store,
          title: t('p2_item2_t'),
          desc: t('p2_item2_d'),
        },
        {
          icon: ShieldCheck,
          title: t('p2_item3_t'),
          desc: t('p2_item3_d'),
        },
      ],
    },
    {
      id: 'pilar-3',
      badge: t('pilar_3_badge'),
      title: t('pilar_3_title'),
      desc: t('pilar_3_desc'),
      items: [
        {
          icon: MessageSquareCode,
          title: t('p3_item1_t'),
          desc: t('p3_item1_d'),
        },
        {
          icon: Workflow,
          title: t('p3_item2_t'),
          desc: t('p3_item2_d'),
        },
      ],
    },
    {
      id: 'pilar-4',
      badge: t('pilar_4_badge'),
      title: t('pilar_4_title'),
      desc: t('pilar_4_desc'),
      items: [
        {
          icon: BarChart3,
          title: t('p4_item1_t'),
          desc: t('p4_item1_d'),
        },
        {
          icon: Boxes,
          title: t('p4_item2_t'),
          desc: t('p4_item2_d'),
        },
        {
          icon: Smartphone,
          title: t('p4_item3_t'),
          desc: t('p4_item3_d'),
        },
        {
          icon: Layers,
          title: t('p4_item4_t'),
          desc: t('p4_item4_d'),
        },
      ],
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/70 text-[#475569] border border-black/8 mb-4">
            {t('services_section_tag')}
          </div>
          <h2 className="display-title text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('services_section_title')}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            {t('services_section_subtitle')}
          </p>
        </div>

        {/* Bento Grid de Pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="apple-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Encabezado del Pilar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#64748B] px-2.5 py-1 rounded-md bg-[#E6E9EE]/80">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  {pillar.desc}
                </p>

                {/* Lista de Soluciones dentro del Pilar */}
                <div className="space-y-3.5 mb-8">
                  {pillar.items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/60 hover:bg-white border border-black/5 hover:border-black/10 transition-colors flex items-start gap-3.5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E6E9EE] flex items-center justify-center text-[#334155] shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#0F172A]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botón de Consulta */}
              <div className="pt-2 border-t border-black/5">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F172A] hover:text-black group transition-colors"
                >
                  <span>{t('btn_consult')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
