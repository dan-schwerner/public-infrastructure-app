import { Box, Button, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import HeaderMenu from '@/components/header-menu/HeaderMenu';
import Footer from '@/components/footer/Footer';
import Section from '@/components/section/Section';
import Banner from '@/components/banner/Banner';
import Principles from '@/components/principles/Principles';
import Contact from '@/components/contact/Contact';
import { MenuItem } from '@/types/Types';
import { SITE } from '@/lib/site';

const menuItems: MenuItem[] = [
  { name: 'Għaliex', link: '#ghaliex' },
  { name: 'Prinċipji', link: '#principji' },
  { name: 'Ikkuntattjani', link: '#contact' },
];

export default function Home() {
  return (
    <>
      <HeaderMenu menuItems={menuItems} />
      <main>
        <Banner />

        {/* Why we need this — the practitioner's argument */}
        <Section id="ghaliex">
          <Typography variant="h2" component="h2">
            Għaliex għandna bżonn dan
          </Typography>
          <Box sx={{ maxWidth: '70ch' }}>
            <Typography variant="body1">
              Malta kibret malajr għal għaxar snin sħaħ, u issa d-diskussjoni qed timmatura: mhux
              jekk nikbrux, imma kif nikbru tajjeb. Hemm frażi li qed tieħu l-art għal dan —
              l-ekonomija tal-innovazzjoni — u fl-aħjar tagħha tfisser ħaġa sempliċi: ekonomija li
              taħdem aħjar, mhux biss aktar.
            </Typography>
            <Typography variant="body1">
              Ekonomija tal-innovazzjoni hija ekonomija tas-sistemi. Sistema tajba tkejjel
              ir-riżultati tagħha, tippubblikahom, u titgħallem minnhom. Jekk irridu li s-settur
              privat jaħdem fuq dawn il-prinċipji, l-ewwel post fejn nuruhom huwa kif taħdem
              il-gvern innifsu.
            </Typography>
            <Typography variant="body1">
              Fl-inġinerija tas-software, ma tibdiex tibni qabel ma tiddefinixxi l-problema. Imma
              l-proġetti pubbliċi rari jibdew hekk: l-għan rari jiġi ppubblikat, u meta x-xogħol
              jitlesta m&apos;hemmx parametru komuni li bih il-pubbliku jista&apos; jiġġudika jekk
              irnexxiex. Dik hija &laquo;open loop&raquo; — mingħajr għan definit u mod kif
              tiċċekkjah, sistema ma tistax titgħallem, u tirrepeti l-istess żbalji, perfettament
              legalment.
            </Typography>
            <Typography variant="body1">
              Din il-pjattaforma tagħlaq dak iċ-ċirku. Tagħmel viżibbli x&apos;qed jinbena,
              tippermetti liċ-ċittadini jgħidu tagħhom waqt li għadu jiswa, u tiġbor ir-riskji u
              l-feedback f&apos;post wieħed — minflok formola tal-FOI, stennija, u tama.
            </Typography>
          </Box>
        </Section>

        {/* The four principles */}
        <Section variant="muted">
          <Principles />
        </Section>

        {/* Call to action into the app */}
        <Section>
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
              size="large"
              href={SITE.appPath}
              sx={{ mt: 2, px: 4, py: 1.25 }}
            >
              Iftaħ l-Applikazzjoni
            </Button>
          </Box>
        </Section>

        {/* About the author + link to main profile */}
        <Section variant="muted">
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
        <Section>
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  );
}
