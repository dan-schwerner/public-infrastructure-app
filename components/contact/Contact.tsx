import { Button, Grid, Stack, Typography } from '@mui/material';
import { LinkedIn, EmailOutlined } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import { SITE } from '@/lib/site';

const Contact = () => {
  const t = useTranslations('contact');
  return (
    <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'flex-start' }}>
      {/* Left: heading, intro, contact links */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="h2" component="h2" id="contact">
          {t('heading')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {t('intro')}
        </Typography>
        <Stack spacing={2} sx={{ maxWidth: 360 }}>
          <Button
            variant="outlined"
            startIcon={<EmailOutlined />}
            href={`mailto:${SITE.email}`}
            sx={{
              justifyContent: 'flex-start',
              py: 1.25,
              color: 'text.primary',
              borderColor: 'divider',
              textTransform: 'none',
            }}
          >
            {SITE.email}
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            href="https://www.linkedin.com/in/dan-falzon26/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ justifyContent: 'flex-start', py: 1.25, color: 'text.primary', borderColor: 'divider' }}
          >
            LinkedIn
          </Button>
        </Stack>
      </Grid>

      {/* Right: contact form (sends via /api/contact → Resend) */}
      <Grid size={{ xs: 12, md: 7 }}>
        <ContactForm />
      </Grid>
    </Grid>
  );
};

export default Contact;
