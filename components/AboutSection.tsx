'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Eye, Building2, MapPin, Users } from 'lucide-react';

const features = [
  { key: 'feature1', icon: '🎓' },
  { key: 'feature2', icon: '🗺️' },
  { key: 'feature3', icon: '⭐' },
  { key: 'feature4', icon: '✅' },
];

export default function AboutSection() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nosotros" className="section-dark-2 py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main visual card */}
            <div className="relative">
              <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl">
                {/* Company badge */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-lg leading-tight">
                      CONSTRUCCIONES AJAKA
                    </div>
                    <div className="text-slate-400 text-sm">Supervisión y Acabados S.A. de C.V.</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-5">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-xl flex-shrink-0">📋</span>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">Razón Social</div>
                      <div className="text-slate-400 text-sm">CONSTRUCCIONES AJAKA, SUPERVISIÓN Y ACABADOS S.A. DE C.V.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-xl flex-shrink-0">📍</span>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">Domicilio Fiscal</div>
                      <div className="text-slate-400 text-sm">Miguel Hidalgo Mz. 27 Lt 4, Col. Alfredo del Mazo CP. 56577, Ixtapaluca, Edo. Méx.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <span className="text-xl flex-shrink-0">👷</span>
                    <div>
                      <div className="text-orange-400 font-semibold text-sm mb-1">Administrador Único</div>
                      <div className="text-white font-medium text-sm">Arq. Eri Martínez Padilla</div>
                      <div className="text-slate-400 text-xs mt-0.5">Cédula Profesional: 14201461</div>
                    </div>
                  </div>
                </div>

                {/* Lema */}
                <div className="mt-6 text-center py-4 border-t border-white/10">
                  <p className="gradient-text font-heading font-bold text-xl">
                    {t('lema')}
                  </p>
                </div>
              </div>

              {/* Floating tags */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -top-5 -right-5 glass-dark rounded-xl px-4 py-2.5 border border-orange-500/25 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span>🏆</span>
                  <span className="text-sm font-semibold text-white">+10 años de confianza</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-5 -left-5 glass-dark rounded-xl px-4 py-2.5 border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span>🇲🇽</span>
                  <span className="text-sm font-semibold text-white">República Mexicana</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div ref={ref} className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="section-badge">
                <Building2 className="w-3.5 h-3.5" />
                {t('badge')}
              </div>

              <h2 className="section-title">
                {t('title')}
              </h2>

              <div className="orange-line" />

              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {t('description')}
              </p>

              {/* Vision card */}
              <div className="glass rounded-xl p-6 border border-orange-500/20 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-orange-400" />
                  </div>
                  <h3 className="font-heading font-bold text-white">{t('vision_title')}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t('vision_text')}
                </p>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/3 rounded-lg border border-white/5"
                  >
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-slate-300 text-sm font-medium">
                      {t(feature.key as any)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
