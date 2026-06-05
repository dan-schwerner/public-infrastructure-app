'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import ChatWidget from '@/components/chat-widget/ChatWidget';
import LocaleSwitcher from '@/components/locale-switcher/LocaleSwitcher';

// The feedback app is a self-contained client-side SPA (state-based navigation,
// Leaflet map, no SSR needs). Load it client-only to avoid server-rendering
// browser-specific code.
const FeedbackApp = dynamic(() => import('../../src/feedback-app/App'), { ssr: false });

export default function FeedbackAppPage() {
  const t = useTranslations('appShell');
  return (
    // Outer: full-viewport neutral backdrop. Inner: a centred, max-width frame so
    // the mobile-first feedback app doesn't stretch across the whole screen.
    <div
      style={{
        minHeight: '100dvh',
        background: '#e9ebef',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          height: '100dvh',
          background: '#ffffff',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Mock-data notice — kept above the app area so it stays visible even
            when a full-screen detail view is open. */}
        <div
          style={{
            background: '#d4183d',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 13,
            lineHeight: 1.3,
            padding: '7px 12px',
            flexShrink: 0,
          }}
        >
          {t('mockNotice')}
        </div>

        {/* App area: the containing block for the feedback app's `fixed inset-0`
            detail overlays (via the transform), so they stay inside this area
            and never cover the notice above. */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            overflow: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          {/* Top-right cluster: language toggle + back link, over the framed app. */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                padding: '5px 7px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocaleSwitcher ringColor="rgba(0, 0, 0, 0.55)" />
            </div>
            <a
              href="/"
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 14,
                color: '#030213',
                textDecoration: 'none',
              }}
            >
              {t('back')}
            </a>
          </div>
          <FeedbackApp />
        </div>
      </div>
      {/* Rendered outside the framed app (no transformed ancestor) so it stays
          fixed to the viewport corner, just like on the home page. */}
      <ChatWidget />
    </div>
  );
}
