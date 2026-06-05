import { Box, Button, Grid, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import HeaderMenu from '@/components/header-menu/HeaderMenu';
import Footer from '@/components/footer/Footer';
import Section from '@/components/section/Section';
import Banner from '@/components/banner/Banner';
import Principles from '@/components/principles/Principles';
import Contact from '@/components/contact/Contact';
import ChatWidget from '@/components/chat-widget/ChatWidget';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';

export default function Home() {
  const t = useTranslations('home');
  const tn = useTranslations('nav');
  return (
    <>
      <HeaderMenu />
      <main>
        <Banner />

        {/* Why we need this — About-style header + prose on the left, principle cards on the right */}
        <Section id="ghaliex">
          <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" component="h2">
                {t('purposeHeading')}
              </Typography>
              <Box sx={{ maxWidth: '60ch' }}>
                <Typography variant="body1" color="text.primary">
                  {t('purposeBody1')}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 0 }}>
                  {t('purposeBody2')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} id="principji">
              <Principles />
            </Grid>
          </Grid>
        </Section>

        {/* Call to action into the app */}
        <Section variant="muted">
          <Box sx={{ textAlign: 'center', maxWidth: '60ch', mx: 'auto' }}>
            <Typography variant="h2" component="h2" sx={{ textAlign: 'center' }}>
              {t('tryHeading')}
            </Typography>
            <Typography variant="body1">
              {t('tryBody')}
            </Typography>
            <Button
              variant="contained"
              color="accent"
              size="large"
              href={SITE.appPath}
              sx={{ mt: 2, px: 4, py: 1.25 }}
            >
              {tn('openApp')}
            </Button>
          </Box>
        </Section>

        {/* About the author + link to main profile */}
        <Section>
          <Box sx={{ maxWidth: '70ch' }}>
            <Typography variant="h2" component="h2">
              {t('aboutHeading')}
            </Typography>
            <Typography variant="body1">
              {t('aboutBody')}
            </Typography>
            <Button
              variant="outlined"
              endIcon={<OpenInNew />}
              href={SITE.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1 }}
            >
              {t('visitProfile')}
            </Button>
          </Box>
        </Section>

        {/* Contact */}
        <Section variant="muted">
          <Contact />
        </Section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
