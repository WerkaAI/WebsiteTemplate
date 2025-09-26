import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Contact form schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Imię musi mieć co najmniej 2 znaki').max(50, 'Imię jest za długie'),
  email: z.string().trim().email('Nieprawidłowy adres email').max(100, 'Email jest za długi'),
  phone: z.string().trim().max(20, 'Numer telefonu jest za długi').optional(),
  message: z.string().trim().min(10, 'Wiadomość musi mieć co najmniej 10 znaków').max(2000, 'Wiadomość jest za długa'),
  consent: z.boolean().refine(val => val === true, 'Musisz wyrazić zgodę na przetwarzanie danych'),
  token: z.string().min(1, 'Błąd weryfikacji CAPTCHA'),
  company: z.string().optional(), // Honeypot field
});

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  // Bypass in development mode
  if (process.env.NODE_ENV !== 'production' && process.env.TURNSTILE_BYPASS === 'true') {
    return true;
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    throw new Error('TURNSTILE_SECRET_KEY not configured');
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 3;

  const record = rateLimit.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const headers = {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
  };

  try {
    // Check content length (max ~10KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return NextResponse.json(
        { error: 'Dane są za duże' },
        { status: 400, headers }
      );
    }

    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Za dużo zgłoszeń. Spróbuj ponownie za 5 minut.' },
        { status: 429, headers }
      );
    }

    // Parse JSON body
    const body = await request.json();

    // Spam protection - honeypot check
    if (body.company && body.company.trim() !== '') {
      // Pretend success to fool bots
      return NextResponse.json(
        { message: 'Wiadomość została wysłana' },
        { status: 200, headers }
      );
    }

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Verify Turnstile token
    const isValidToken = await verifyTurnstile(validatedData.token, ip);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Weryfikacja CAPTCHA nie powiodła się' },
        { status: 403, headers }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      // DRY RUN mode - log but don't send
      console.log('DRY RUN: Contact form submission:', {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message.substring(0, 100) + '...',
      });
      
      return NextResponse.json(
        { message: 'Wiadomość została wysłana (tryb testowy)' },
        { status: 200, headers }
      );
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailData = {
      from: process.env.CONTACT_FROM_EMAIL || 'Formularz <no-reply@autozaba.pl>',
      to: process.env.CONTACT_TO_EMAIL || 'kontakt@autozaba.pl',
      reply_to: validatedData.email,
      subject: `Nowe zgłoszenie z formularza: ${validatedData.name}`,
      html: `
        <h2>Nowe zgłoszenie z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Telefon:</strong> ${validatedData.phone}</p>` : ''}
        <p><strong>Wiadomość:</strong></p>
        <p style="padding: 10px; background: #f5f5f5; border-left: 4px solid #006625;">
          ${validatedData.message.replace(/\n/g, '<br>')}
        </p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Wysłano: ${new Date().toLocaleString('pl-PL')}<br>
          IP: ${ip}
        </p>
      `,
      text: `
Nowe zgłoszenie z formularza kontaktowego

Imię i nazwisko: ${validatedData.name}
Email: ${validatedData.email}
${validatedData.phone ? `Telefon: ${validatedData.phone}\n` : ''}
Wiadomość:
${validatedData.message}

---
Wysłano: ${new Date().toLocaleString('pl-PL')}
IP: ${ip}
      `,
    };

    await resend.emails.send(emailData);

    return NextResponse.json(
      { message: 'Wiadomość została wysłana' },
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane', details: error.errors },
        { status: 400, headers }
      );
    }

    if (error instanceof Error && error.message.includes('TURNSTILE_SECRET_KEY')) {
      return NextResponse.json(
        { error: 'Serwis tymczasowo niedostępny' },
        { status: 503, headers }
      );
    }

    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania wiadomości' },
      { status: 500, headers }
    );
  }
}