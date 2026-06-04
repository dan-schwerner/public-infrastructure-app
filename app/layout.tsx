import type { Metadata } from 'next';
import Script from 'next/script';
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S36LCMS8EN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S36LCMS8EN');
          `}
        </Script>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
