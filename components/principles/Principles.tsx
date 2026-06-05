'use client';

import { useState } from 'react';
import { Box, Card, CardActionArea, Collapse, Stack, Typography } from '@mui/material';
import {
  ExpandMore,
  GroupsOutlined,
  VisibilityOutlined,
  VerifiedOutlined,
  RocketLaunchOutlined,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

type Principle = {
  /** Translation key prefix; titles/bodies live under principles.<key>Title / <key>Body. */
  key: string;
  Icon: SvgIconComponent;
};

// A distinct accent colour per card, cycled by position — the same palette as
// the df-portfolio value cards.
const VALUE_COLORS = ['#4961b0', '#2a9d8f', '#e9a23b', '#d1495b'];

const principles: Principle[] = [
  { key: 'userFirst', Icon: GroupsOutlined },
  { key: 'transparency', Icon: VisibilityOutlined },
  { key: 'bestPeople', Icon: VerifiedOutlined },
  { key: 'growTalent', Icon: RocketLaunchOutlined },
];

// The four principles as compact, click-to-expand cards — same pattern as the
// df-portfolio About "values" column. Each card shows only its icon + title;
// clicking reveals the description. Accordion-style: opening one closes the others.
const Principles = () => {
  const t = useTranslations('principles');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box>
      <Typography
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'text.secondary',
          mb: 2,
        }}
      >
        {t('label')}
      </Typography>
      <Stack spacing={1.5}>
        {principles.map((p, index) => {
          const { Icon } = p;
          const open = openIndex === index;
          return (
            <Card key={p.key} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardActionArea
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    px: { xs: 2, md: 2.5 },
                    py: 1.75,
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: '1.5rem',
                      color: VALUE_COLORS[index % VALUE_COLORS.length],
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    component="h3"
                    sx={{ fontSize: '1.05rem', fontWeight: 700, flex: 1, mb: 0 }}
                  >
                    {t(`${p.key}Title`)}
                  </Typography>
                  <ExpandMore
                    sx={{
                      color: 'text.secondary',
                      flexShrink: 0,
                      transform: open ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </Box>
                <Collapse in={open} unmountOnExit>
                  <Box sx={{ px: { xs: 2, md: 2.5 }, pb: 2, pt: 0 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                      {t(`${p.key}Body`)}
                    </Typography>
                  </Box>
                </Collapse>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Principles;
