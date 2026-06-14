'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Send, CheckCircle, AlertCircle, MapPin, FileText, Globe } from 'lucide-react';

const serviceOptions = {
  es: [
    'Impermeabilización',
    'Construcción en general',
    'Albañilería',
    'Supervisión de obra',
    'Instalaciones hidráulicas/sanitarias',
    'Instalaciones eléctricas',
    'Instalaciones especiales',
    'Aire acondicionado',
    'Carpintería',
    'Aluminio y herrería',
    'Acabados',
    'Desazolve de drenajes',
    'Urbanización',
    'Otro servicio',
  ],
  en: [
    'Waterproofing',
    'General construction',
    'Masonry',
    'Project supervision',
    'Hydraulic/sanitary systems',
    'Electrical installations',
    'Special installations',
    'Air conditioning',
    'Carpentry',
    'Aluminum & ironwork',
    'Finishes',
    'Drain cleaning',
    'Urbanization',
    'Other service',
  ],
};

type FormData = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio_interes: string;
  mensaje: string;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio_interes: '',
    mensaje: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, idioma: locale }),
      });

      if (!res.ok) throw new Error('Error en el servidor');

      setStatus('success');
      setFormData({ nombre: '', empresa: '', email: '', telefono: '', servicio_interes: '', mensaje: '' });
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const services = locale === 'en' ? serviceOptions.en : serviceOptions.es;

  return (
    <section id="contacto" className="section-dark py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-orange-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-600/4 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center"
          >
            <div className="section-badge">
              <MessageSquare className="w-3.5 h-3.5" />
              {t('badge')}
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="font-heading font-bold text-xl text-white mb-6">{t('info_title')}</h3>

            <div className="glass rounded-xl p-5 border border-white/8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0 border border-orange-500/25">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Dirección</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{t('info_address')}</div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0 border border-orange-500/25">
                  <FileText className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Datos Fiscales</div>
                  <div className="text-slate-400 text-sm">{t('info_rfc')}</div>
                  <div className="text-slate-400 text-sm">Folio: N-2020011622</div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0 border border-orange-500/25">
                  <Globe className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Cobertura</div>
                  <div className="text-slate-400 text-sm">{t('info_coverage')}</div>
                  <div className="text-slate-400 text-sm">Escuelas · Almacenes · Edificios · Casas</div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.4!2d-98.88!3d19.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE4JzM2LjAiTiA5OMKwNTInNDguMCJX!5e0!3m2!1ses!2smx!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación AJAKA - Ixtapaluca, Estado de México"
              />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label" htmlFor="nombre">{t('form_name')}</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder={t('placeholder_name')}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="empresa">{t('form_company')}</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder={t('placeholder_company')}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label" htmlFor="email">{t('form_email')}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('placeholder_email')}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="telefono">{t('form_phone')}</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder={t('placeholder_phone')}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="servicio_interes">{t('form_service')}</label>
                <select
                  id="servicio_interes"
                  name="servicio_interes"
                  value={formData.servicio_interes}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="" style={{ background: '#1A1D27' }}>— Selecciona un servicio —</option>
                  {services.map(s => (
                    <option key={s} value={s} style={{ background: '#1A1D27' }}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="mensaje">{t('form_message')}</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder={t('placeholder_message')}
                  className="form-input resize-none"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-green-500/15 border border-green-500/30 rounded-xl text-green-400"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{t('form_success')}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-red-500/15 border border-red-500/30 rounded-xl text-red-400"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{t('form_error')}</span>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'sending' ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    {t('form_sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('form_submit')}
                  </>
                )}
              </button>

              <p className="text-slate-600 text-xs text-center">
                Al enviar, aceptas que guardemos tu información para contactarte sobre tu solicitud.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
