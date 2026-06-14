'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Heart, Users } from 'lucide-react';

const valueEmojis: Record<string, string> = {
  cooperacion: '🤝',
  innovacion: '💡',
  seguridad: '🛡️',
  amabilidad: '😊',
  confianza: '⭐',
  atencion: '👁️',
  motivacion: '🚀',
  compromiso: '🎯',
  competitividad: '🏆',
  etica: '⚖️',
  apertura: '🔓',
};

const teamMembers = [
  { name: 'Arq. Eri Martínez Padilla', role: 'Administrador Único', emoji: '👷', highlight: true },
  { name: 'Tec. José Luis Morales Torres', role: 'Dirección General', emoji: '📋' },
  { name: 'Tec. Neri Martínez Padilla', role: 'Proyectos', emoji: '📐' },
  { name: 'Fernando Flores Rodríguez', role: 'Supervisión y Residencia de Obra', emoji: '🏗️' },
  { name: 'Tec. Heriberto Macías Martínez', role: 'Superintendencia', emoji: '🔧' },
];

export default function ValuesSection() {
  const t = useTranslations('values');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const valueKeys = Object.keys(valueEmojis);

  return (
    <section id="valores" className="section-dark py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Values section */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center"
          >
            <div className="section-badge">
              <Heart className="w-3.5 h-3.5" />
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

        {/* Values grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-24">
          {valueKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="value-card group"
            >
              <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {valueEmojis[key]}
              </div>
              <div className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors leading-snug">
                {t(`values_list.${key}` as any)}
              </div>
            </motion.div>
          ))}
          {/* Extra card — lema */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="value-card group col-span-2 sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-orange-500/15 to-surface/50 border-orange-500/30"
          >
            <div className="text-3xl mb-3">✨</div>
            <div className="gradient-text font-heading font-bold text-base leading-snug">
              "Todos somos uno"
            </div>
          </motion.div>
        </div>

        {/* Team section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-orange-400" />
            <h3 className="font-heading font-bold text-2xl text-white">{t('team_title')}</h3>
          </div>
          <p className="text-slate-400 mb-10 max-w-2xl">{t('team_subtitle')}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className={`glass rounded-2xl p-6 text-center border transition-all hover:-translate-y-1 ${
                  member.highlight
                    ? 'border-orange-500/40 bg-orange-500/5'
                    : 'border-white/8 hover:border-orange-500/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl ${
                  member.highlight
                    ? 'bg-orange-500/20 border border-orange-500/40'
                    : 'bg-white/5 border border-white/10'
                }`}>
                  {member.emoji}
                </div>
                <div className={`font-heading font-bold text-sm leading-snug mb-1.5 ${member.highlight ? 'text-orange-100' : 'text-white'}`}>
                  {member.name}
                </div>
                <div className={`text-xs leading-snug ${member.highlight ? 'text-orange-400/80' : 'text-slate-500'}`}>
                  {member.role}
                </div>
                {member.highlight && (
                  <div className="mt-2 inline-block bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full border border-orange-500/30 font-semibold">
                    Dirección
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
