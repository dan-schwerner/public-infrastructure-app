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

- `email` — the contact email shown on the homepage (currently `danfalzon26@gmail.com`).
- `profileUrl` — where "Żur il-profil prinċipali tiegħi" points. **TODO:** update this to
  your deployed df-portfolio URL (currently a placeholder, `https://danfalzon.com`).
- `appPath` — the route the "open the app" CTAs link to (`/app`).

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
