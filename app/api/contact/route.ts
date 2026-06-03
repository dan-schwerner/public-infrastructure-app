import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE } from '@/lib/site';

/**
 * Contact endpoint shared by the bottom contact form and the chat-bubble form.
 * Sends a transactional email via Resend with the visitor's address as Reply-To,
 * so replies go straight back to them.
 *
 * Required env vars (set in `.env.local` for dev, and in Vercel for prod):
 *   RESEND_API_KEY      Your Resend API key. (required)
 *   CONTACT_TO_EMAIL    Where messages are delivered. Defaults to SITE.email.
 *   CONTACT_FROM_EMAIL  A verified Resend sender, e.g.
 *                       "Daniel Falzon <hello@danielfalzon.mt>".
 *                       Falls back to Resend's sandbox sender for local testing
 *                       (the sandbox can only deliver to your own Resend account
 *                       email until you verify a domain).
 */

const FROM = process.env.CONTACT_FROM_EMAIL || 'Infrastruttura Pubblika <onboarding@resend.dev>';
const TO = process.env.CONTACT_TO_EMAIL || SITE.email;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Talba invalida.' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success, send nothing.
  if (clean(body.company, 1)) {
    return NextResponse.json({ ok: true });
  }

  const email = clean(body.email, 200);
  const name = clean(body.name, 120);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 5000);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Daħħal email valida.' }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ ok: false, error: 'Ikteb messaġġ.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] Missing RESEND_API_KEY env var.');
    return NextResponse.json(
      { ok: false, error: 'Is-servizz tal-email għadu mhux ikkonfigurat.' },
      { status: 500 },
    );
  }

  const subjectLine = `Messaġġ ġdid${name ? ` mingħand ${name}` : ''}${subject ? ` — ${subject}` : ''}`;
  const rows: [string, string][] = [
    ['Isem', name || '—'],
    ['Email', email],
    ['Suġġett', subject || '—'],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', message].join('\n');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="color:#4961b0;margin:0 0 16px">Messaġġ ġdid mill-website</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 0;font-weight:bold;width:120px;vertical-align:top">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="white-space:pre-line;margin-top:16px;padding-top:16px;border-top:1px solid #eee">${escapeHtml(message)}</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: subjectLine,
      text,
      html,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { ok: false, error: "Ma rnexxilniex nibagħtu l-messaġġ. Erġa' pprova." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] send failed:', e);
    return NextResponse.json(
      { ok: false, error: "Ma rnexxilniex nibagħtu l-messaġġ. Erġa' pprova." },
      { status: 502 },
    );
  }
}
