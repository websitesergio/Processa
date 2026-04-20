import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          .nav-desktop-links { display: flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 639px) {
          .nav-desktop-links { display: none !important; }
        }
      `}</style>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(15,23,42,0.07)',
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.25rem',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.35rem',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              flexShrink: 0,
            flex: '0 0 auto',
            }}
          >
            Processa
          </Link>

          {/* Desktop nav links */}
          <div
            className="nav-desktop-links"
            style={{ alignItems: 'center', gap: '2rem', display: 'none' }}
          >
            {onHome && (
              <>
                <Link to="/diagnostic" style={navLinkStyle}>Diagnostic</Link>
                <Link to="/roadmap" style={navLinkStyle}>Roadmap</Link>
              </>
            )}
            <Link
              to="/access"
              style={ctaStyle}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.25)'; }}
            >
              Apply for Strategy Audit
            </Link>
          </div>

          {/* Mobile: CTA pill + hamburger */}
          <div
            className="nav-hamburger"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '0 0 auto' }}
          >
            <Link
              to="/access"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: '#ffffff',
                textDecoration: 'none',
                background: '#0f172a',
                padding: '8px 14px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap' as const,
                flexShrink: 0,
              }}
            >
              Apply
            </Link>

            {onHome && (
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  flexShrink: 0,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#0f172a', borderRadius: '2px', transition: 'transform 0.2s ease, opacity 0.2s ease', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
                <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#0f172a', borderRadius: '2px', transition: 'opacity 0.2s ease', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#0f172a', borderRadius: '2px', transition: 'transform 0.2s ease, opacity 0.2s ease', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
              </button>
            )}
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && onHome && (
          <div
            className="nav-mobile-menu"
            style={{
              borderTop: '1px solid rgba(15,23,42,0.06)',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '1rem 1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {[
              { to: '/diagnostic', label: 'Diagnostic' },
              { to: '/roadmap', label: 'Roadmap' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(15,23,42,0.65)',
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(15,23,42,0.05)',
                  display: 'block',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(15,23,42,0.65)',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
};

const ctaStyle: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#0f172a',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(15,23,42,0.25)',
  paddingBottom: '2px',
  transition: 'border-color 0.15s ease',
};
