'use client';
import { Box, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        backgroundColor: primaryColor,
        marginTop: '3rem',
      }}
    />
  );
};

export default Footer;
