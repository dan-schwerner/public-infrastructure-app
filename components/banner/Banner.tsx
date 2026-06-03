import { Box, Button, Container, Typography } from '@mui/material';
import { SITE } from '@/lib/site';

// Three-tier hierarchy on the blue hero: a small uppercase eyebrow, the large
// headline, then a medium supporting line — plus a single white CTA.
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
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.85)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontSize: '0.95rem',
            mb: 2,
          }}
        >
          Proġetti Qribek
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2.8rem', md: '6rem' }, color: 'white', lineHeight: 1.05, m: 0 }}
        >
          Ara x&apos;qed Jinbena
        </Typography>
        <Typography sx={{ fontSize: '1.6rem', color: 'white', marginTop: '1rem', mb: 0 }}>
          Nibdew naċċertaw it-trasparenza
        </Typography>
        <Button
          variant="contained"
          color="accent"
          href={SITE.appPath}
          size="large"
          sx={{
            marginTop: '2rem',
            width: { xs: '100%', md: '210px' },
            height: '4rem',
            fontWeight: 600,
          }}
        >
          Iftaħ l-App
        </Button>
      </Container>
    </Box>
  );
};

export default Banner;
