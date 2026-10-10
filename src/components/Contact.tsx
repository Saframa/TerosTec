import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/site';
import { Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Presencia Web / Landing Page',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Intentamos envio a traves de Formspree con fallback a apertura directa de cliente de correo
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `Nuevo Proyecto TerosTec: ${formData.name} (${formData.service})`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Presencia Web / Landing Page',
          message: '',
        });
      } else {
        // En caso de que el endpoint no este configurado aun, preparamos mailto directo
        const subject = encodeURIComponent(`Nuevo Proyecto TerosTec - ${formData.service}`);
        const body = encodeURIComponent(
          `Nombre: ${formData.name}\nEmail: ${formData.email}\nTelefono: ${formData.phone}\nSolucion: ${formData.service}\n\nDetalles:\n${formData.message}`
        );
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
        setStatus('success');
      }
    } catch {
      // Fallback a mailto client si hay error de red
      const subject = encodeURIComponent(`Nuevo Proyecto TerosTec - ${formData.service}`);
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\nTelefono: ${formData.phone}\nSolucion: ${formData.service}\n\nDetalles:\n${formData.message}`
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  const serviceOptions =
    language === 'es'
      ? [
          'Presencia Web & Landing Pages',
          'Cotizadores & Calculadores Web',
          'Sistemas de Reservas y Turnos',
          'E-Commerce & Pagos Integrados',
          'Catalogos B2B y Portales',
          'Bots de WhatsApp Automatizados',
          'Integracion de APIs (n8n / Make)',
          'Dashboards BI & Metricas',
          'Control de Stock e Inventario',
          'Software a Medida / App PWA / MVP',
          'Otro Requerimiento',
        ]
      : [
          'Web Presence & Landing Pages',
          'Web Estimators & Calculators',
          'Booking & Appointment Systems',
          'E-Commerce & Integrated Payments',
          'B2B Wholesale Portals',
          'Automated WhatsApp Bots',
          'API Integrations (n8n / Make)',
          'BI Dashboards & Metrics',
          'Stock & Inventory Control',
          'Custom Software / PWA / MVP',
          'Other Requirement',
        ];

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Informacion Institucional */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/70 text-[#475569] border border-black/8 mb-4">
                {t('contact_tag')}
              </div>
              <h2 className="display-title text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
                {t('contact_title')}
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                {t('contact_desc')}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="apple-card rounded-2xl p-5 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#94A3B8]">
                    Email Oficial
                  </span>
                  <p className="text-sm font-semibold text-[#0F172A] group-hover:underline">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <div className="apple-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6E9EE] text-[#0F172A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#94A3B8]">
                    Ubicacion & Cobertura
                  </span>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {siteConfig.location} ({siteConfig.reach})
                  </p>
                </div>
              </div>

              <div className="apple-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6E9EE] text-[#0F172A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#94A3B8]">
                    Respuesta Tecnica
                  </span>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {language === 'es'
                      ? 'Atencion en menos de 24 horas habiles'
                      : 'Response within 24 business hours'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo */}
          <div className="lg:col-span-7">
            <div className="apple-card rounded-3xl p-6 sm:p-10 shadow-lg border border-black/8">
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    {language === 'es' ? 'Mensaje Enviado' : 'Message Sent'}
                  </h3>
                  <p className="text-sm text-[#64748B] max-w-md mx-auto">
                    {t('form_success')}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="apple-button mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0F172A] text-white"
                  >
                    {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                        {t('form_name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={language === 'es' ? 'Tu nombre o empresa' : 'Your name or company'}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black/30 focus:outline-hidden text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                        {t('form_email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black/30 focus:outline-hidden text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                        {t('form_phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+598 99 000 000"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black/30 focus:outline-hidden text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                        {t('form_service')}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black/30 focus:outline-hidden text-sm text-[#0F172A] transition-all"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      {t('form_msg')} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        language === 'es'
                          ? 'Describe el objetivo del proyecto, funcionalidades esperadas o tiempos aproximados...'
                          : 'Describe project goals, desired features, or timeline...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black/30 focus:outline-hidden text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="apple-button w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-[#0F172A] text-white hover:bg-black disabled:opacity-60 transition-all shadow-md"
                  >
                    <span>
                      {status === 'sending' ? t('form_sending') : t('form_submit')}
                    </span>
                    <Send className="w-4 h-4 opacity-90" />
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-[#94A3B8]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {language === 'es'
                        ? 'Tus datos son tratados bajo estricta confidencialidad profesional'
                        : 'Your data is handled under strict professional confidentiality'}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
