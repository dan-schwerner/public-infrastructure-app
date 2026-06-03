# Infrastruttura Pubblika Miftuħa

A Next.js (App Router) site with two parts:

- **`/`** — a Maltese landing page that makes the case for an open public-infrastructure
  platform. Styled with Material-UI to match the [df-portfolio](../df-portfolio) site
  (`#4961b0`, Raleway + Roboto): banner → CTA → "why we need this" → four principles →
  author/profile link → contact form.
- **`/app`** — the citizen feedback app itself (view active/completed projects, leave
  feedback, report risks, rate completed work). This is the original Vite + React +
  Tailwind/shadcn build, mounted client-side at this route.

## Architecture notes

- **Two styling systems, cleanly separated.** The homepage uses MUI + Emotion. The
  feedback app keeps its Tailwind v4 + shadcn/ui styling. Tailwind's CSS (including its
  preflight reset) is imported **only** in `app/app/layout.tsx`, so it stays scoped to the
  `/app` route and never touches the MUI homepage.
- The feedback app lives in `src/feedback-app/` and is loaded with `next/dynamic`
  (`ssr: false`) from `app/app/page.tsx`, since it's a self-contained client SPA.
- Tailwind v4 runs through PostCSS (`postcss.config.mjs`) instead of the old
  `@tailwindcss/vite` plugin.

## Configuration

The values you're most likely to change live in **`lib/site.ts`**:

- `email` — the contact email shown on the homepage (`contact@danielfalzon.mt`).
- `profileUrl` — where "Żur il-profil prinċipali tiegħi" points (`https://danielfalzon.mt`, opens in a new tab).
- `appPath` — the route the "open the app" CTAs link to (`/app`).

## Contact form email (Resend)

The bottom contact form and the chat-bubble both POST to `app/api/contact/route.ts`, which
sends the message via [Resend](https://resend.com) with `Reply-To` set to the visitor (so
replies go straight back to them). It includes a hidden honeypot field for basic spam defence.
Configure it with env vars — see `.env.example`:

- `RESEND_API_KEY` *(required)* — your Resend API key.
- `CONTACT_TO_EMAIL` — delivery inbox (defaults to `SITE.email`).
- `CONTACT_FROM_EMAIL` — a verified Resend sender; until a domain is verified in Resend, leave
  it unset to use the sandbox sender (which only delivers to your own Resend account email).

Copy `.env.example` to `.env.local` for development, and set the same vars in Vercel for
production. Without `RESEND_API_KEY` the endpoint returns a friendly "not configured" error.

## Running the code

```bash
pnpm install
pnpm dev      # development server (http://localhost:3000)
pnpm build    # production build
pnpm start    # serve the production build
```

## Deploying to Vercel

Push the repo and import it in Vercel. It auto-detects Next.js — no extra config needed.
Build command `next build`, output handled automatically.
