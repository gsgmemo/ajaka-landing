'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const clients = [
  { name: 'Instituto Politécnico Nacional', abbr: 'IPN', emoji: '🏛️', color: 'from-red-500/20 to-red-900/10', border: 'border-red-500/20' },
  { name: 'Servicio de Administración Tributaria', abbr: 'SAT', emoji: '🏢', color: 'from-blue-500/20 to-blue-900/10', border: 'border-blue-500/20' },
  { name: 'Instituto Nacional de Antropología e Historia', abbr: 'INAH', emoji: '🏺', color: 'from-amber-500/20 to-amber-900/10', border: 'border-amber-500/20' },
  { name: 'BIOSSMANN Cereales', abbr: 'BIOSSMANN', emoji: '🌾', color: 'from-green-500/20 to-green-900/10', border: 'border-green-500/20' },
  { name: 'UTC Aragón', abbr: 'UTC', emoji: '🎓', color: 'from-purple-500/20 to-purple-900/10', border: 'border-purple-500/20' },
  { name: 'Universidad de las Américas', abbr: 'UDLA', emoji: '🎓', color: 'from-cyan-500/20 to-cyan-900/10', border: 'border-cyan-500/20' },
  { name: 'Centro de Investigación en Biotecnología Aplicada', abbr: 'CIBA', emoji: '🔬', color: 'from-teal-500/20 to-teal-900/10', border: 'border-teal-500/20' },
  { name: 'Alcaldía Miguel Hidalgo', abbr: 'CDMx', emoji: '🏙️', color: 'from-orange-500/20 to-orange-900/10', border: 'border-orange-500/20' },
];

export default function ClientsSection() {
  const t = useTranslations('clients');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-dark-2 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center"
          >
            <div className="section-badge">
              <Star className="w-3.5 h-3.5" />
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

        {/* Clients grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={client.abbr}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className={`glass rounded-2xl p-6 text-center border ${client.border} bg-gradient-to-br ${client.color} transition-all hover:-translate-y-2 hover:shadow-xl group`}
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {client.emoji}
              </div>
              <div className="font-heading font-black text-2xl text-white mb-1 group-hover:text-orange-100 transition-colors">
                {client.abbr}
              </div>
              <div className="text-slate-500 text-xs leading-snug group-hover:text-slate-400 transition-colors">
                {client.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-14 glass rounded-2xl p-8 border border-orange-500/15 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="font-semibold text-white">Empresa legalmente constituida</span>
            </div>
            <div className="w-px h-6 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <span>RFC: CAS2002131G4</span>
            </div>
            <div className="w-px h-6 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗂️</span>
              <span>Folio Mercantil: N-2020011622</span>
            </div>
            <div className="w-px h-6 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇲🇽</span>
              <span>Toda la República Mexicana</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
