import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter, Montserrat, Bebas_Neue } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CONSTRUCCIONES AJAKA — Supervisión y Acabados S.A. de C.V.',
  description: 'Empresa especializada en impermeabilización, ingeniería, construcción y supervisión de obra. Más de 10 años de experiencia en proyectos institucionales, comerciales y residenciales en toda la República Mexicana.',
  keywords: 'construcción, impermeabilización, supervisión de obra, ingeniería, México, AJAKA, mantenimiento',
  authors: [{ name: 'Arq. Eri Martínez Padilla' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'CONSTRUCCIONES AJAKA',
    title: 'CONSTRUCCIONES AJAKA — Especialistas en Impermeabilización y Construcción',
    description: 'Más de 10 años construyendo confianza. Impermeabilización, ingeniería y supervisión de obra en toda la República Mexicana.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable}`}>
      <body className={`${inter.className} bg-dark text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
