'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Award, MapPin } from 'lucide-react';

const stats = [
  { value: 10, suffix: '+', key: 'stat1_label' },
  { value: 50, suffix: '+', key: 'stat2_label' },
  { value: 20000, suffix: '+', key: 'stat3_label', format: (n: number) => n >= 1000 ? `${(n/1000).toFixed(0)}K` : n.toString() },
  { value: 100, suffix: '+', key: 'stat4_label' },
];

function useCountUp(target: number, duration: number = 2000, started: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatCard({ stat, t, started }: { stat: typeof stats[0]; t: any; started: boolean }) {
  const count = useCountUp(stat.value, 2000, started);
  const display = stat.format ? stat.format(count) : count.toString();

  return (
    <div className="counter-card">
      <div className="font-display text-4xl md:text-5xl text-orange-400 leading-none mb-2">
        {display}{stat.suffix}
      </div>
      <div className="text-slate-400 text-sm font-medium leading-snug">
        {t(stat.key as any)}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center hero-bg grid-pattern overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orange glow top-left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        {/* Orange glow bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl" />
        {/* Floating accent elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-10 lg:right-20 w-20 h-20 border border-orange-500/20 rounded-2xl backdrop-blur-sm hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-12 h-12 border border-orange-400/15 rounded-xl hidden lg:block"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-badge mb-6"
            >
              <Shield className="w-3.5 h-3.5" />
              {t('badge')}
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              <span className="text-white block">{t('title1')}</span>
              <span className="gradient-text block">{t('title2')}</span>
              <span className="text-white block">{t('title3')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-base group"
              >
                {t('cta_primary')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary text-base group"
              >
                <Play className="w-4 h-4 fill-orange-400 text-orange-400" />
                {t('cta_secondary')}
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>RFC: CAS2002131G4</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400/70" />
                <span>Ixtapaluca, Edo. Méx.</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-orange-400/70" />
                <span>Cédula 14201461</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Visual card stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative z-10 glass rounded-2xl p-8 border border-orange-500/20 shadow-2xl">
              {/* Decorative building icon */}
              <div className="w-full h-64 bg-gradient-to-br from-dark-2 to-surface rounded-xl mb-6 flex items-center justify-center border border-white/5">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏗️</div>
                  <div className="text-orange-400 font-semibold text-sm tracking-wide">CONSTRUCCIONES AJAKA</div>
                  <div className="text-slate-500 text-xs mt-1">Supervisión y Acabados S.A. de C.V.</div>
                </div>
              </div>

              {/* Mini stats inside card */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <div className="font-display text-2xl text-orange-400">10+</div>
                  <div className="text-slate-400 text-xs mt-1">Años</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-display text-2xl text-white">50+</div>
                  <div className="text-slate-400 text-xs mt-1">Proyectos</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-display text-2xl text-yellow-400">16K</div>
                  <div className="text-slate-400 text-xs mt-1">m² imp.</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-dark rounded-xl px-4 py-3 border border-orange-500/30 shadow-xl z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">Proyecto activo</span>
              </div>
            </motion.div>

            {/* Floating card bottom */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 glass-dark rounded-xl px-4 py-3 border border-white/10 shadow-xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <span className="text-base">🏛️</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">IPN · INAH · SAT</div>
                  <div className="text-xs text-slate-400">Clientes institucionales</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 border-t border-white/5 pt-12"
        >
          {stats.map((stat) => (
            <StatCard key={stat.key} stat={stat} t={t} started={statsStarted} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-orange-500/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-orange-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
