import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// Tailwind + the feedback app's theme are imported ONLY here, so the Tailwind
// preflight reset stays scoped to the /app route and never touches the
// MUI-styled homepage.
import '../../src/styles/index.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('appMetadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
