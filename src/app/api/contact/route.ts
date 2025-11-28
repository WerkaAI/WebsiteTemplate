import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ZodError } from 'zod';
import { createContactSchema } from '@/lib/validation/contact';

export const runtime = 'nodejs';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

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
  } as const;

  try {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return NextResponse.json(
        { error: 'Dane są za duże' },
        { status: 400, headers }
      );
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Za dużo zgłoszeń. Spróbuj ponownie za 5 minut.' },
        { status: 429, headers }
      );
    }

    const body = await request.json();

    if (body.company && typeof body.company === 'string' && body.company.trim() !== '') {
      return NextResponse.json(
        { message: 'Wiadomość została wysłana' },
        { status: 200, headers }
      );
    }

    const bypassTurnstile = process.env.NODE_ENV !== 'production' && process.env.TURNSTILE_BYPASS === 'true';
    const hasTurnstileSecret = Boolean(process.env.TURNSTILE_SECRET_KEY);
    const requiresTurnstile = hasTurnstileSecret && !bypassTurnstile;

    const contactSchema = createContactSchema({ requireToken: requiresTurnstile });
    const validatedData = contactSchema.parse(body);

    if (requiresTurnstile) {
      const token = validatedData.token;
      const isValidToken = token ? await verifyTurnstile(token, ip) : false;
      if (!isValidToken) {
        return NextResponse.json(
          { error: 'Weryfikacja CAPTCHA nie powiodła się' },
          { status: 403, headers }
        );
      }
    }

    const { token: _token, company: _company, ...payload } = validatedData;

    if (!process.env.RESEND_API_KEY) {
      console.log('DRY RUN: Contact form submission:', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        shops: payload.shops,
        message: payload.message.substring(0, 100) + '...',
      });

      return NextResponse.json(
        { message: 'Wiadomość została wysłana (tryb testowy)' },
        { status: 200, headers }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const phoneHtml = payload.phone ? `<p><strong>Telefon:</strong> ${payload.phone}</p>` : '';
    const shopsHtml = payload.shops ? `<p><strong>Liczba sklepów:</strong> ${payload.shops}</p>` : '';
    const phoneText = payload.phone ? `Telefon: ${payload.phone}\n` : '';
    const shopsText = payload.shops ? `Liczba sklepów: ${payload.shops}\n` : '';
    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const formattedMessage = escapeHtml(payload.message).replace(/\n/g, '<br>');

    const emailData = {
      from: process.env.CONTACT_FROM_EMAIL || 'Formularz <no-reply@autozaba.pl>',
      to: process.env.CONTACT_TO_EMAIL || 'kontakt@autozaba.pl',
      reply_to: payload.email,
      subject: `Nowe zgłoszenie z formularza: ${payload.name}`,
      html: `
        <h2>Nowe zgłoszenie z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        ${phoneHtml}
        ${shopsHtml}
        <p><strong>Wiadomość:</strong></p>
        <p style="padding: 10px; background: #f5f5f5; border-left: 4px solid #006625;">
          ${formattedMessage}
        </p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Wysłano: ${new Date().toLocaleString('pl-PL')}<br>
          IP: ${ip}
        </p>
      `,
      text: `
Nowe zgłoszenie z formularza kontaktowego

Imię i nazwisko: ${payload.name}
Email: ${payload.email}
${phoneText}${shopsText}Wiadomość:
${payload.message}

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
  } catch (error: unknown) {
    console.error('Contact form error:', error);

    if (error instanceof ZodError) {
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
