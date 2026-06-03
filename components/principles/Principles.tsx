import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  GroupsOutlined,
  VisibilityOutlined,
  VerifiedOutlined,
  RocketLaunchOutlined,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

type Principle = {
  title: string;
  body: string;
  Icon: SvgIconComponent;
};

// A distinct accent colour per card, cycled by position — the same palette and
// layout as the df-portfolio "Values" section.
const VALUE_COLORS = ['#4961b0', '#2a9d8f', '#e9a23b', '#d1495b'];

const principles: Principle[] = [
  {
    title: 'L-utent fl-ewwel post',
    Icon: GroupsOutlined,
    body: 'Kull sistema teżisti għan-nies li jużawha. Servizz tajjeb jibda min-nies u jaħdem lura — mhux mil-loġika interna tad-dipartiment.',
  },
  {
    title: 'Trasparenza fil-qalba',
    Icon: VisibilityOutlined,
    body: "Sistema li ma tistax tara fiha hija sistema li ma tistax tafda. Meta kif ittieħdet deċiżjoni jkun viżibbli b'mod awtomatiku, kulħadd jista' jiċċekkjah — u dak iżommha onesta.",
  },
  {
    title: 'Mibnija min-nies l-aħjar',
    Icon: VerifiedOutlined,
    body: "Il-kompetenza mhix lussu fix-xogħlijiet pubbliċi; hija d-differenza bejn xi ħaġa li sservi għal ġenerazzjoni u oħra li terġa' tinqala' fi ftit snin. Magħżula għal dak li jafu jagħmlu, mhux għal min jafu.",
  },
  {
    title: 'Tkabbar it-talent Malti',
    Icon: RocketLaunchOutlined,
    body: "Meta s-settur pubbliku jinvesti fil-kapaċità, jista' jsaħħaħ il-kumpaniji, l-inġiniera u l-ħiliet li għandna d-dar. Pajjiż żgħir jissaħħaħ billi jibni l-kompetenza tiegħu, mhux billi jimpurtaha għal dejjem.",
  },
];

const Principles = () => (
  <Box component="section">
    <Typography variant="h2" component="h2" id="principji">
      Erba&apos; prinċipji għal sistemi mibnija sew
    </Typography>
    <Typography variant="body1" color="text.primary" sx={{ maxWidth: '70ch' }}>
      Dawn mhumiex prinċipji tekniċi. Huma dwar serjetà — u japplikaw għal servizz pubbliku daqs kemm
      japplikaw għal biċċa software.
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3,
        mt: 2,
      }}
    >
      {principles.map((p, index) => {
        const { Icon } = p;
        return (
          <Card key={p.title} sx={{ height: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                p: { xs: 3, md: 4 },
              }}
            >
              <Icon
                sx={{ fontSize: '1.8rem', color: VALUE_COLORS[index % VALUE_COLORS.length], mb: 2 }}
              />
              <Typography component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, mb: '0.6rem' }}>
                {p.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                {p.body}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  </Box>
);

export default Principles;
