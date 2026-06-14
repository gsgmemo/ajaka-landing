import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CONSTRUCCIONES AJAKA — Supervisión y Acabados S.A. de C.V.',
  description: 'Empresa especializada en impermeabilización, ingeniería, construcción y supervisión de obra.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
