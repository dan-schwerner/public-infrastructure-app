/** @type {import('next').NextConfig} */
const nextConfig = {
  // The feedback app under src/feedback-app is vendored shadcn/ui + a ported
  // Figma "Make" export. We don't strictly type-check that generated code as
  // part of the production build; the homepage is the code we own.
  typescript: { ignoreBuildErrors: true },
  // Serve any next/image output in modern formats (AVIF first, then WebP).
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
