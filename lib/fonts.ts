import { Raleway, Roboto } from 'next/font/google';

// Defined once and shared so the whole site — the MUI homepage AND the
// Tailwind feedback app — uses the exact same typefaces as df-portfolio.
// The `variable` is exposed on <html> (see app/layout.tsx) so the feedback
// app's CSS can pick up Raleway via `var(--font-raleway)`.
//
// df-portfolio loads Raleway at 200/400 only; we add 500/600/700 because the
// feedback app uses medium/semibold weights. This doesn't change anything on
// the homepage (body text is 400, headings use Roboto), it just gives the app
// real font faces instead of synthesised bold.
export const raleway = Raleway({
  weight: ['200', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
