'use client';

import { useTranslations } from 'next-intl';
import { HardHat, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  { key: 'inicio', href: '#inicio' },
  { key: 'nosotros', href: '#nosotros' },
  { key: 'servicios', href: '#servicios' },
  { key: 'proyectos', href: '#proyectos' },
  { key: 'valores', href: '#valores' },
  { key: 'contacto', href: '#contacto' },
];

const topServices = [
  'Impermeabilización',
  'Construcción en General',
  'Supervisión de Obra',
  'Instalaciones Hidráulicas',
  'Instalaciones Eléctricas',
  'Aire Acondicionado',
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-dark border-t border-white/8 relative">
      {/* Top orange line */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-black text-2xl text-white tracking-wide block leading-none">AJAKA</span>
                <span className="text-xs text-orange-400/70 tracking-widest font-semibold">CONSTRUCCIONES</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              {t('description')}
            </p>

            {/* Contact quick info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <MapPin className="w-3.5 h-3.5 text-orange-400/60 flex-shrink-0" />
                <span>Ixtapaluca, Estado de México</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <Mail className="w-3.5 h-3.5 text-orange-400/60 flex-shrink-0" />
                <span>contacto@construccionesajaka.com</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5 uppercase tracking-wider">
              {t('links_title')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-slate-500 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors" />
                    {tNav(link.key as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5 uppercase tracking-wider">
              {t('services_title')}
            </h4>
            <ul className="space-y-3">
              {topServices.map(service => (
                <li key={service}>
                  <a
                    href="#servicios"
                    onClick={(e) => { e.preventDefault(); scrollTo('#servicios'); }}
                    className="text-slate-500 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal info */}
        <div className="border-t border-white/6 pt-8 mb-6">
          <div className="glass rounded-xl p-5 border border-orange-500/10">
            <h4 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-wider">
              {t('legal_title')}
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Razón Social', value: 'CONSTRUCCIONES AJAKA, SUPERVISIÓN Y ACABADOS S.A. DE C.V.' },
                { label: t('rfc').split(':')[0], value: 'CAS2002131G4' },
                { label: 'Acta Constitutiva', value: 'No. 200,525' },
                { label: 'Folio Mercantil', value: 'N-2020011622' },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-orange-400/70 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-slate-400 text-xs">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} CONSTRUCCIONES AJAKA. {t('rights')} {t('made')}
          </p>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400 hover:bg-orange-500/25 transition-all hover:-translate-y-1"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
