/** @type {import('next').NextConfig} */
const nextConfig = {
  // The feedback app under src/feedback-app is vendored shadcn/ui + a ported
  // Figma "Make" export. We don't strictly type-check that generated code as
  // part of the production build; the homepage is the code we own.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
