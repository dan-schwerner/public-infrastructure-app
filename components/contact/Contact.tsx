import { Button, Grid, Stack, Typography } from '@mui/material';
import { LinkedIn, GitHub, EmailOutlined } from '@mui/icons-material';
import ContactForm from './ContactForm';
import { SITE } from '@/lib/site';

const Contact = () => {
  return (
    <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'flex-start' }}>
      {/* Left: heading, intro, contact links */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="h2" component="h2" id="contact">
          Ikkuntattjani
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Tixtieq titkellem dwar dan il-proġett, tikkollabora, jew tikkummenta fuq xi blog post
          tiegħi? Tiddejjaqx tikkuntattjani!
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
            sx={{ justifyContent: 'flex-start', py: 1.25, color: 'text.primary', borderColor: 'divider' }}
          >
            LinkedIn
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            sx={{ justifyContent: 'flex-start', py: 1.25, color: 'text.primary', borderColor: 'divider' }}
          >
            GitHub
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
