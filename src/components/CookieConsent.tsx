import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'processa_cookie_consent_v1';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Slight delay so the banner doesn't flash instantly on page load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 'env(safe-area-inset-bottom, 24px)',
        left: '16px',
        right: '16px',
        width: 'auto',
        maxWidth: '400px',
        margin: '0 auto',
        boxSizing: 'border-box' as const,
        transform: 'none',
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(15,23,42,0.1)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 8px 48px rgba(15,23,42,0.12), 0 2px 12px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap' as const,
        animation: 'slideInUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <p
        style={{
          flex: '1 1 260px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '12px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: '#334155',
          margin: 0,
        }}
      >
        This site uses cookies to improve your experience and analyse engagement in accordance with our{' '}
        <Link
          to="/privacy"
          style={{ color: '#0f172a', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: 'rgba(15,23,42,0.3)' }}
        >
          Privacy Policy
        </Link>
        . You may decline non-essential cookies at any time.
      </p>

      <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
        <button
          type="button"
          onClick={decline}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '9px 18px',
            borderRadius: '9999px',
            border: '1px solid rgba(15,23,42,0.18)',
            background: 'transparent',
            color: 'rgba(15,23,42,0.55)',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.35)'; e.currentTarget.style.color = '#0f172a'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.18)'; e.currentTarget.style.color = 'rgba(15,23,42,0.55)'; }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '9px 20px',
            borderRadius: '9999px',
            border: '1px solid #0f172a',
            background: '#0f172a',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            boxShadow: '0 2px 8px rgba(15,23,42,0.2)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,23,42,0.28)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,23,42,0.2)'; }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
