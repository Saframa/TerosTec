import React, { useState, useEffect } from 'react';
import { MessageSquareCode, Workflow, Database, Zap, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WorkflowPipelineWidget: React.FC = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);

  // Ciclo continuo de paquetes de luz cada 3.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(1); // Sale de WhatsApp
      setTimeout(() => {
        setActiveStep(2); // Pasa por n8n
        setTimeout(() => {
          setActiveStep(3); // Llega a PostgreSQL
          setTimeout(() => {
            setActiveStep(0); // Reposo
          }, 800);
        }, 900);
      }, 900);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const triggerManualFlow = () => {
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setActiveStep(0);
        }, 800);
      }, 900);
    }, 900);
  };

  return (
    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/70 border border-black/8 shadow-2xs space-y-4">
      {/* Cabecera del Flujo */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-semibold text-[#0F172A]">
            {language === 'es' ? 'Flujo en Tiempo Real' : 'Real-Time Pipeline'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>24/7 Online (~120ms)</span>
        </div>
      </div>

      {/* Diagrama de Nodos y Cables Luminosos */}
      <div className="relative py-4 flex items-center justify-between gap-2">
        {/* NODO 1: WhatsApp */}
        <div
          className={`flex-1 flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 ${
            activeStep === 1
              ? 'bg-emerald-50 border border-emerald-300 shadow-sm scale-105'
              : 'bg-white border border-black/5'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeStep === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <MessageSquareCode className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#0F172A] mt-1.5">WhatsApp</span>
          <span className="text-[9px] text-[#64748B]">Webhook</span>
        </div>

        {/* Cable Luminoso 1 */}
        <div className="flex-1 relative h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-700 ${
              activeStep === 1
                ? 'left-0 right-0 opacity-100 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                : 'left-full right-0 opacity-0'
            }`}
          />
        </div>

        {/* NODO 2: n8n Workflow */}
        <div
          className={`flex-1 flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 ${
            activeStep === 2
              ? 'bg-amber-50 border border-amber-300 shadow-sm scale-105'
              : 'bg-white border border-black/5'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeStep === 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Workflow className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#0F172A] mt-1.5">n8n Engine</span>
          <span className="text-[9px] text-[#64748B]">Parseo &amp; IA</span>
        </div>

        {/* Cable Luminoso 2 */}
        <div className="flex-1 relative h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 bottom-0 bg-gradient-to-r from-amber-500 to-blue-500 transition-all duration-700 ${
              activeStep === 2
                ? 'left-0 right-0 opacity-100 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                : 'left-full right-0 opacity-0'
            }`}
          />
        </div>

        {/* NODO 3: PostgreSQL */}
        <div
          className={`flex-1 flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 ${
            activeStep === 3
              ? 'bg-blue-50 border border-blue-300 shadow-sm scale-105'
              : 'bg-white border border-black/5'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#0F172A] mt-1.5">PostgreSQL</span>
          <span className="text-[9px] text-[#64748B]">Persistencia</span>
        </div>
      </div>

      {/* Boton para Disparar Paquete Manual */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-[#64748B]">
          {activeStep === 1
            ? (language === 'es' ? 'Recibiendo mensaje en WhatsApp...' : 'Incoming lead on WhatsApp...')
            : activeStep === 2
            ? (language === 'es' ? 'Validando datos con n8n...' : 'Transforming payload via n8n...')
            : activeStep === 3
            ? (language === 'es' ? 'Guardado exitoso en base de datos' : 'Saved to PostgreSQL DB')
            : (language === 'es' ? 'En espera de nuevo evento' : 'Idle / Listening for events')}
        </span>

        <button
          type="button"
          onClick={triggerManualFlow}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-black text-white shadow-2xs transition-all"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{language === 'es' ? 'Probar' : 'Test'}</span>
        </button>
      </div>
    </div>
  );
};
