'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  Droplets, Building2, Hammer, ClipboardList, Gauge, Zap,
  Wifi, Wind, TreePine, Layers, PaintBucket, Filter,
  MapPin, FileText, Star
} from 'lucide-react';

const serviceIcons: Record<string, any> = {
  impermeabilizacion: Droplets,
  construccion: Building2,
  albanileria: Hammer,
  supervision: ClipboardList,
  instalaciones_hidraulicas: Filter,
  instalaciones_electricas: Zap,
  instalaciones_especiales: Wifi,
  aire_acondicionado: Wind,
  carpinteria: TreePine,
  aluminio_herreria: Layers,
  acabados: PaintBucket,
  desazolve: Filter,
  urbanizacion: MapPin,
  generadores: FileText,
};

const serviceKeys = Object.keys(serviceIcons);

export default function ServicesSection() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="servicios" className="section-dark py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="section-badge">
              <Hammer className="w-3.5 h-3.5" />
              {t('badge')}
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            const isSpecialty = key === 'impermeabilizacion';

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className={`service-card group relative ${isSpecialty ? 'border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-surface/80' : ''}`}
              >
                {/* Specialty badge */}
                {isSpecialty && (
                  <div className="absolute -top-3 left-4 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    {t('featured')}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  isSpecialty
                    ? 'bg-orange-500/20 border border-orange-500/40'
                    : 'bg-white/5 border border-white/10 group-hover:bg-orange-500/15 group-hover:border-orange-500/30'
                }`}>
                  <Icon className={`w-5 h-5 ${isSpecialty ? 'text-orange-400' : 'text-slate-400 group-hover:text-orange-400'} transition-colors`} />
                </div>

                {/* Content */}
                <h3 className={`font-heading font-bold text-base mb-2 transition-colors ${
                  isSpecialty ? 'text-orange-100' : 'text-white group-hover:text-orange-100'
                }`}>
                  {t(`items.${key}.name` as any)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                  {t(`items.${key}.desc` as any)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 mb-5">¿Necesitas un servicio personalizado?</p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex"
          >
            Solicitar Cotización Gratuita
          </a>
        </motion.div>
      </div>
    </section>
  );
}
