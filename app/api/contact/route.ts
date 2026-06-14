import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, empresa, email, telefono, mensaje, servicio_interes, idioma } = body;

    // Basic validation
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = createServerClient();
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([{
        nombre,
        empresa: empresa || null,
        email,
        telefono: telefono || null,
        mensaje,
        servicio_interes: servicio_interes || null,
        idioma: idioma || 'es',
      }]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: 'Error al guardar el formulario' },
        { status: 500 }
      );
    }

    // Send email notification via Brevo (if configured)
    const brevoApiKey = process.env.BREVO_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (brevoApiKey && notificationEmail) {
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'AJAKA Web', email: 'noreply@construccionesajaka.com' },
            to: [{ email: notificationEmail }],
            subject: `Nuevo contacto desde la web: ${nombre}`,
            htmlContent: `
              <h2 style="color:#F97316;">Nuevo lead desde construccionesajaka.com</h2>
              <table style="border-collapse:collapse;width:100%;">
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${nombre}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Empresa</td><td style="padding:8px;border:1px solid #ddd;">${empresa || 'N/A'}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Teléfono</td><td style="padding:8px;border:1px solid #ddd;">${telefono || 'N/A'}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Servicio</td><td style="padding:8px;border:1px solid #ddd;">${servicio_interes || 'N/A'}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${mensaje}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Idioma</td><td style="padding:8px;border:1px solid #ddd;">${idioma || 'es'}</td></tr>
              </table>
              <p style="color:#666;margin-top:16px;">Este mensaje fue enviado desde el formulario de contacto de construccionesajaka.com</p>
            `,
          }),
        });
      } catch (emailError) {
        // Don't fail the request if email fails - lead is already saved
        console.error('Email notification error:', emailError);
      }
    }

    return NextResponse.json({ success: true, message: 'Formulario enviado correctamente' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
