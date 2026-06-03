import type { Metadata } from 'next';
import './global.css';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { raleway, roboto } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Infrastruttura Pubblika Miftuħa',
  description:
    'Pjattaforma fejn iċ-ċittadini jaraw il-proġetti ta\' infrastruttura ħdejhom, jagħtu l-fehma tagħhom, u jirrapportaw ir-riskji. Trasparenza mibnija fil-qalba.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mt" className={`${raleway.variable} ${roboto.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
