/**
 * Tailwind CSS v4 is wired through PostCSS for Next.js (the project previously
 * used @tailwindcss/vite). Tailwind's stylesheet is only imported inside the
 * /app route segment, so its preflight reset stays scoped to the feedback app.
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
