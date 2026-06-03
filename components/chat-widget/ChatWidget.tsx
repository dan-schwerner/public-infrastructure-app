'use client';

import { useState } from 'react';
import { Box, Fab, Paper, Typography, IconButton } from '@mui/material';
import { ChatOutlined, Close } from '@mui/icons-material';
import ContactForm from '@/components/contact/ContactForm';

// Floating chat-bubble contact form. The bubble sits bottom-right; clicking it
// opens a compact panel with the shared ContactForm (sends via /api/contact).
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 2,
      }}
    >
      {open && (
        <Paper
          elevation={8}
          sx={{ width: { xs: 'calc(100vw - 48px)', sm: 360 }, borderRadius: 3, overflow: 'hidden' }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              px: 3,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, mb: 0 }}>Ikkuntattjani</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mb: 0 }}>
                Ibgħatli messaġġ malajr
              </Typography>
            </Box>
            <IconButton
              size="small"
              aria-label="agħlaq"
              onClick={() => setOpen(false)}
              sx={{ color: '#fff' }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, maxHeight: '70vh', overflowY: 'auto' }}>
            <ContactForm bare />
          </Box>
        </Paper>
      )}

      <Fab color="primary" aria-label="ikkuntattjani" onClick={() => setOpen((o) => !o)}>
        {open ? <Close /> : <ChatOutlined />}
      </Fab>
    </Box>
  );
}
