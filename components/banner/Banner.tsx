import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { SITE } from '@/lib/site';

// Typography values mirror the df-portfolio Banner exactly: eyebrow + subtitle
// at 1.6rem, the headline as h1 at 6rem, and an outlined "secondary" (white)
// button at 210px / 4rem. The headline scales down on xs so the long Maltese
// wording doesn't overflow a phone screen (df's short name didn't need this).
const Banner = () => {
  return (
    <Box
      id="il-bidu"
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        paddingTop: '8rem',
        paddingBottom: { xs: '4rem', md: '6rem' },
        paddingRight: '1rem',
        paddingLeft: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: '1.6rem', color: 'white' }}>
          Pjattaforma għaċ-Ċittadini
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2.8rem', md: '6rem' }, color: 'white', lineHeight: 1.05, m: 0 }}
        >
          Naraw x&apos;qed jinbena.
        </Typography>
        <Typography sx={{ fontSize: '1.6rem', color: 'white', marginTop: '1rem', maxWidth: '40ch' }}>
          Iċ-ċittadini jaraw il-proġetti ta&apos; infrastruttura ħdejhom, jagħtu l-fehma tagħhom, u
          jirrapportaw ir-riskji. Trasparenza mibnija fil-qalba — mhux miżjuda fl-aħħar.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ marginTop: '2rem' }}
        >
          <Button
            variant="outlined"
            color="secondary"
            href={SITE.appPath}
            size="large"
            sx={{ width: { xs: '100%', md: '210px' }, height: '4rem' }}
          >
            Iftaħ l-Applikazzjoni
          </Button>
          <Button
            variant="text"
            color="secondary"
            href="#ghaliex"
            size="large"
            sx={{ width: { xs: '100%', md: 'auto' }, height: '4rem' }}
          >
            Għaliex għandna bżonnha?
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Banner;
