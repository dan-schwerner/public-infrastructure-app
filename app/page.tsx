import { Box, Button, Grid, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import HeaderMenu from '@/components/header-menu/HeaderMenu';
import Footer from '@/components/footer/Footer';
import Section from '@/components/section/Section';
import Banner from '@/components/banner/Banner';
import Principles from '@/components/principles/Principles';
import Contact from '@/components/contact/Contact';
import ChatWidget from '@/components/chat-widget/ChatWidget';
import { MenuItem } from '@/types/Types';
import { SITE } from '@/lib/site';

const menuItems: MenuItem[] = [
  { name: 'L-Iskop', link: '#ghaliex' },
  { name: 'Prinċipji', link: '#principji' },
  { name: 'Ikkuntattjani', link: '#contact' },
];

export default function Home() {
  return (
    <>
      <HeaderMenu menuItems={menuItems} />
      <main>
        <Banner />

        {/* Why we need this — About-style header + prose on the left, principle cards on the right */}
        <Section id="ghaliex">
          <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" component="h2">
                L-Iskop
              </Typography>
              <Box sx={{ maxWidth: '60ch' }}>
                <Typography variant="body1" color="text.primary">
                  L-ekonomija tal-innovazzjoni hija ekonomija tas-sistemi: sistema tajba tkejjel
                  ir-riżultati tagħha, tippubblikahom, u titgħallem minnhom. Imma l-proġetti pubbliċi
                  rari jibdew billi jiddefinixxu l-problema jew jippubblikaw l-għan tagħhom — u
                  mingħajr parametru li bih wieħed jiġġudikahom, isiru &laquo;open loop&raquo; li
                  jirrepeti l-istess żbalji, perfettament legalment.
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 0 }}>
                  Din il-pjattaforma tagħlaq dak iċ-ċirku: tagħmel viżibbli x&apos;qed jinbena,
                  tippermetti liċ-ċittadini jgħidu tagħhom waqt li għadu jiswa, u tiġbor ir-riskji u
                  l-feedback f&apos;post wieħed — minflok formola tal-FOI, stennija, u tama.
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
              Ipprova l-pjattaforma
            </Typography>
            <Typography variant="body1">
              Ara kif tista&apos; tidher l-infrastruttura pubblika meta tkun miftuħa b&apos;mod
              awtomatiku: proġetti attivi u lesti, feedback miċ-ċittadini, u rapporti tar-riskji —
              kollox f&apos;post wieħed.
            </Typography>
            <Button
              variant="contained"
              color="accent"
              size="large"
              href={SITE.appPath}
              sx={{ mt: 2, px: 4, py: 1.25 }}
            >
              Iftaħ l-App
            </Button>
          </Box>
        </Section>

        {/* About the author + link to main profile */}
        <Section>
          <Box sx={{ maxWidth: '70ch' }}>
            <Typography variant="h2" component="h2">
              Min jien
            </Typography>
            <Typography variant="body1">
              Jien Daniel Falzon, software engineer b&apos;għaxar snin esperjenza nibni sistemi. Din
              il-pjattaforma hija parti minn sensiela ta&apos; kitbiet dwar kif Malta — żgħira
              biżżejjed biex titmexxa tajjeb — tista&apos; tibni l-affarijiet tagħha
              b&apos;dixxiplina, trasparenza u attenzjoni.
            </Typography>
            <Button
              variant="outlined"
              endIcon={<OpenInNew />}
              href={SITE.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1 }}
            >
              Żur il-profil prinċipali tiegħi
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
