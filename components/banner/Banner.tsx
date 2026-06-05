import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import bannerBg from '@/lib/AAA_ApplicationBackground.png';

// Three-tier hierarchy over a full-bleed background photo: a small uppercase
// eyebrow, the large headline, then a medium supporting line — plus the coral
// CTA. A black gradient (darker on the left) keeps the white copy legible,
// mirroring the df-portfolio banner treatment.
const Banner = () => {
  const t = useTranslations('banner');
  const tn = useTranslations('nav');
  return (
    <Box
      id="il-bidu"
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        bgcolor: '#1a1a1a', // fallback behind the image
        paddingTop: { xs: '6rem', md: '8rem' },
        paddingBottom: { xs: '4rem', md: '6rem' },
        paddingRight: '1rem',
        paddingLeft: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Background photo — `cover` fits it neatly whatever the banner size.
          next/image serves it optimised (AVIF/WebP, responsive). */}
      <Image
        src={bannerBg}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      />
      {/* Black gradient overlay, darker on the left so the white copy stays legible. */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.85)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontSize: '0.95rem',
            mb: 2,
          }}
        >
          {t('eyebrow')}
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2.8rem', md: '6rem' }, color: 'white', lineHeight: 1.05, m: 0 }}
        >
          {t('headline')}
        </Typography>
        <Typography sx={{ fontSize: '1.6rem', color: 'white', marginTop: '1rem', mb: 0 }}>
          {t('subhead')}
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
          {tn('openApp')}
        </Button>
      </Container>
    </Box>
  );
};

export default Banner;
