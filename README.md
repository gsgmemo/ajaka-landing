# AJAKA Landing Page 🏗️

Landing page oficial de **CONSTRUCCIONES AJAKA, SUPERVISIÓN Y ACABADOS S.A. DE C.V.**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Internacionalización**: next-intl (ES / EN)
- **Base de datos**: Supabase (leads del formulario de contacto)
- **Email**: Brevo (notificaciones transaccionales)
- **Deploy**: Vercel

## Secciones

1. 🦸 **Hero** — Presentación con contadores animados
2. 🏢 **Quiénes Somos** — Historia, misión y visión
3. 🔧 **Servicios** — 14 servicios con impermeabilización destacada
4. 📁 **Proyectos** — Portafolio filtrable de 12+ proyectos
5. ❤️ **Valores y Equipo** — 11 valores corporativos + organigrama
6. ⭐ **Clientes** — IPN, SAT, INAH, BIOSSMANN y más
7. 📩 **Contacto** — Formulario bilingüe + mapa

## Configuración

```bash
# Instalar dependencias
npm install

# Variables de entorno (copiar y rellenar)
cp .env.local.example .env.local

# Desarrollo local
npm run dev
```

## Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://leebsbacysdyjcnqqtoq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
BREVO_API_KEY=tu_brevo_api_key
NOTIFICATION_EMAIL=tucorreo@godaddy.com
```

## Empresa

- **RFC**: CAS2002131G4
- **Administrador**: Arq. Eri Martínez Padilla
- **Ubicación**: Ixtapaluca, Estado de México
- **Fundada**: 2015
