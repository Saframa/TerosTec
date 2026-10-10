import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Sparkles } from 'lucide-react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projects = [
    {
      id: 1,
      tag: t('portfolio_p1_tag'),
      title: t('portfolio_p1_t'),
      desc: t('portfolio_p1_d'),
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 2,
      tag: t('portfolio_p2_tag'),
      title: t('portfolio_p2_t'),
      desc: t('portfolio_p2_d'),
      stack: ['WhatsApp Cloud API', 'n8n', 'Python', 'Webhooks'],
    },
    {
      id: 3,
      tag: t('portfolio_p3_tag'),
      title: t('portfolio_p3_t'),
      desc: t('portfolio_p3_d'),
      stack: ['PWA', 'Tailwind CSS', 'IndexedDB', 'FastAPI'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Fondo oscuro traslucido */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-3xl apple-card rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-black/10 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0F172A]" />
            <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">
              {t('portfolio_title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#0F172A] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#64748B] mt-2 mb-6">
          {t('portfolio_subtitle')}
        </p>

        <div className="space-y-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-black/5 hover:border-black/15 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                  {proj.tag}
                </span>
                <span className="text-xs text-[#94A3B8]">0{proj.id}</span>
              </div>
              <h4 className="text-base font-bold text-[#0F172A] mb-1">
                {proj.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#E6E9EE] text-[#334155]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-black/10 flex justify-end">
          <button
            onClick={onClose}
            className="apple-button px-5 py-2 rounded-full text-xs font-semibold bg-[#0F172A] text-white hover:bg-black"
          >
            {t('portfolio_close')}
          </button>
        </div>
      </div>
    </div>
  );
};
