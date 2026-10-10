import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/site';
import { Linkedin, GraduationCap } from 'lucide-react';

export const Team: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="team" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/70 text-[#475569] border border-black/8 mb-4">
            {t('team_tag')}
          </div>
          <h2 className="display-title text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('team_title')}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            {t('team_desc')}
          </p>
        </div>

        {/* Grilla de los 4 Co-Fundadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.team.map((member) => (
            <div
              key={member.id}
              className="apple-card rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Avatar Iniciales */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg tracking-tight shadow-sm">
                    {member.avatarInitials}
                  </div>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/80 hover:bg-[#0A66C2] hover:text-white text-[#475569] border border-black/5 flex items-center justify-center transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                      title={`Ver perfil de LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Nombre y Cargo */}
                <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
                  {member.name}
                </h3>
                <p className="text-xs text-[#64748B] font-medium mt-0.5">
                  {t('role_cofounder')}
                </p>
              </div>

              {/* Insignia Academica UdelaR / UTEC */}
              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E6E9EE] text-[#334155] text-[11px] font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#475569]" />
                  <span>{t(member.academicKey)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
