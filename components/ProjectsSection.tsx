'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Layers, MapPin, Calendar } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'IPN — Azoteas Escuelas Superiores',
    category: 'impermeabilizacion',
    year: '2022–2024',
    detail: '16,000 m² impermeabilizados',
    location: 'Ciudad de México',
    emoji: '🏛️',
    color: 'from-orange-600/40 to-orange-900/20',
  },
  {
    id: 2,
    title: 'Zona Arqueológica de Palenque',
    category: 'impermeabilizacion',
    year: '2023',
    detail: '3,200 m² · Museo INAH',
    location: 'Palenque, Chiapas',
    emoji: '🏺',
    color: 'from-amber-600/40 to-amber-900/20',
  },
  {
    id: 3,
    title: 'CIBA — Centro de Investigación en Biotecnología',
    category: 'construccion',
    year: '2022',
    detail: 'Ampliación y remodelación de laboratorios',
    location: 'Estado de México',
    emoji: '🔬',
    color: 'from-blue-600/30 to-blue-900/20',
  },
  {
    id: 4,
    title: 'Conjunto Hidalgo — SAT',
    category: 'mantenimiento',
    year: '2023',
    detail: 'Mantenimiento integral de instalaciones',
    location: 'Ciudad de México',
    emoji: '🏢',
    color: 'from-slate-600/30 to-slate-900/20',
  },
  {
    id: 5,
    title: 'UTC Aragón — Nuevo Plantel',
    category: 'mantenimiento',
    year: '2023',
    detail: 'Trabajos de mantenimiento general',
    location: 'Ciudad de México',
    emoji: '🎓',
    color: 'from-green-600/30 to-green-900/20',
  },
  {
    id: 6,
    title: 'Sala Regional Guadalajara',
    category: 'construccion',
    year: '2022',
    detail: 'Trabajos de inmueble institucional',
    location: 'Guadalajara, Jalisco',
    emoji: '🏛️',
    color: 'from-purple-600/30 to-purple-900/20',
  },
  {
    id: 7,
    title: 'Almacenes Cereales BIOSSMANN',
    category: 'construccion',
    year: '2021',
    detail: 'Construcción e impermeabilización',
    location: 'Estado de México',
    emoji: '🏭',
    color: 'from-yellow-600/30 to-yellow-900/20',
  },
  {
    id: 8,
    title: 'IPN — Instalaciones Generales',
    category: 'supervision',
    year: '2020–2023',
    detail: 'Supervisión de múltiples proyectos',
    location: 'Ciudad de México',
    emoji: '📋',
    color: 'from-red-600/30 to-red-900/20',
  },
  {
    id: 9,
    title: 'Lienzo Charro Ecatepec',
    category: 'construccion',
    year: '2021',
    detail: 'Trazo, nivelación y cimentación',
    location: 'Ecatepec, Edo. Méx.',
    emoji: '🤠',
    color: 'from-orange-600/30 to-orange-900/20',
  },
  {
    id: 10,
    title: 'Escuelas — Alcaldía Miguel Hidalgo',
    category: 'mantenimiento',
    year: '2022',
    detail: 'Mantenimiento de planteles educativos',
    location: 'Ciudad de México',
    emoji: '🏫',
    color: 'from-teal-600/30 to-teal-900/20',
  },
  {
    id: 11,
    title: 'Sala Regional Monterrey',
    category: 'construccion',
    year: '2023',
    detail: 'Obras de inmueble institucional',
    location: 'Monterrey, N.L.',
    emoji: '🏗️',
    color: 'from-cyan-600/30 to-cyan-900/20',
  },
  {
    id: 12,
    title: 'Escuelas Zatepec — Morelos',
    category: 'construccion',
    year: '2021',
    detail: 'Construcción de salones educativos',
    location: 'Morelos',
    emoji: '🏗️',
    color: 'from-lime-600/30 to-lime-900/20',
  },
];

const filterKeys = ['all', 'impermeabilizacion', 'construccion', 'supervision', 'mantenimiento'];

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const filterLabel = (key: string) => {
    const map: Record<string, string> = {
      all: t('filter_all'),
      impermeabilizacion: t('filter_impermeabilizacion'),
      construccion: t('filter_construccion'),
      supervision: t('filter_supervision'),
      mantenimiento: t('filter_mantenimiento'),
    };
    return map[key] || key;
  };

  return (
    <section id="proyectos" className="section-dark-2 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-orange-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center"
          >
            <div className="section-badge">
              <Layers className="w-3.5 h-3.5" />
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === key
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filterLabel(key)}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="project-card group"
            >
              {/* Image area */}
              <div className={`h-44 bg-gradient-to-br ${project.color} flex items-center justify-center border-b border-white/5 relative overflow-hidden`}>
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                  {project.emoji}
                </span>

                {/* Category tag */}
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-white capitalize border border-white/10">
                  {filterLabel(project.category)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-white text-sm leading-snug mb-3 group-hover:text-orange-100 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                  {project.detail}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <MapPin className="w-3 h-3 text-orange-400/60" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Calendar className="w-3 h-3 text-orange-400/60" />
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
