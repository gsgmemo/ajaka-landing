'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown, HardHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { key: 'inicio', href: '#inicio' },
  { key: 'nosotros', href: '#nosotros' },
  { key: 'servicios', href: '#servicios' },
  { key: 'proyectos', href: '#proyectos' },
  { key: 'valores', href: '#valores' },
  { key: 'contacto', href: '#contacto' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname;
    const segments = currentPath.split('/');
    if (segments[1] === 'en' || segments[1] === 'es') {
      segments[1] = newLocale;
    } else {
      if (newLocale !== 'es') segments.unshift('', newLocale);
    }
    router.push(segments.join('/') || '/');
    setLangMenuOpen(false);
  };

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-dark shadow-lg border-b border-orange-500/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); scrollTo('#inicio'); }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-900 text-xl text-white tracking-wide leading-none block">
                  AJAKA
                </span>
                <span className="text-xs text-orange-400/80 tracking-widest font-semibold">
                  CONSTRUCCIONES
                </span>
              </div>
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(link.key as any)}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 glass-dark rounded-xl overflow-hidden shadow-xl border border-white/10 min-w-[140px]"
                    >
                      <button
                        onClick={() => switchLocale('es')}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${locale === 'es' ? 'text-orange-400 font-semibold' : 'text-slate-300'}`}
                      >
                        🇲🇽 <span>Español</span>
                        {locale === 'es' && <span className="ml-auto text-orange-400">✓</span>}
                      </button>
                      <button
                        onClick={() => switchLocale('en')}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors border-t border-white/5 ${locale === 'en' ? 'text-orange-400 font-semibold' : 'text-slate-300'}`}
                      >
                        🇺🇸 <span>English</span>
                        {locale === 'en' && <span className="ml-auto text-orange-400">✓</span>}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); scrollTo('#contacto'); }}
                className="btn-primary text-sm py-2.5 px-5"
              >
                {t('cotizar')}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 glass-dark border-l border-white/10 flex flex-col p-6 pt-24"
            >
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-orange-400 bg-orange-500/10 border border-orange-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t(link.key as any)}
                  </motion.a>
                ))}
              </nav>

              {/* Language switcher mobile */}
              <div className="border-t border-white/10 pt-4 mt-4 flex gap-3">
                <button
                  onClick={() => { switchLocale('es'); setIsMenuOpen(false); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${locale === 'es' ? 'bg-orange-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  🇲🇽 Español
                </button>
                <button
                  onClick={() => { switchLocale('en'); setIsMenuOpen(false); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${locale === 'en' ? 'bg-orange-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  🇺🇸 English
                </button>
              </div>

              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); scrollTo('#contacto'); setIsMenuOpen(false); }}
                className="btn-primary text-center mt-3 justify-center"
              >
                {t('cotizar')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
