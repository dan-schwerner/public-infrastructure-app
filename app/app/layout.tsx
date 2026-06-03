import type { Metadata } from 'next';
// Tailwind + the feedback app's theme are imported ONLY here, so the Tailwind
// preflight reset stays scoped to the /app route and never touches the
// MUI-styled homepage.
import '../../src/styles/index.css';

export const metadata: Metadata = {
  title: 'Proġetti ta\' Infrastruttura — App',
  description:
    'Ara l-proġetti ta\' infrastruttura ħdejk, agħti l-feedback tiegħek, u rrapporta r-riskji.',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
