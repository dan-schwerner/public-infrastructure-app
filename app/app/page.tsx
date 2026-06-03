'use client';

import dynamic from 'next/dynamic';
import ChatWidget from '@/components/chat-widget/ChatWidget';

// The feedback app is a self-contained client-side SPA (state-based navigation,
// canvas map, no SSR needs). Load it client-only to avoid server-rendering
// browser-specific code.
const FeedbackApp = dynamic(() => import('../../src/feedback-app/App'), { ssr: false });

export default function FeedbackAppPage() {
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
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          height: '100dvh',
          background: '#ffffff',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          // A non-`none` transform makes this frame the containing block for
          // `position: fixed` descendants. The feedback app's detail screens
          // (and any dialog/sheet) use `fixed inset-0`, so without this they'd
          // escape to the full viewport; this keeps every screen inside the frame.
          transform: 'translateZ(0)',
        }}
      >
        <a
          href="/"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 50,
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 14,
            color: '#030213',
            textDecoration: 'none',
          }}
        >
          ← Lura
        </a>
        <FeedbackApp />
      </div>
      {/* Rendered outside the framed app (no transformed ancestor) so it stays
          fixed to the viewport corner, just like on the home page. */}
      <ChatWidget />
    </div>
  );
}
