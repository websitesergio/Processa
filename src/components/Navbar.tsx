import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
          }}
        >
          Processa
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {onHome && (
            <>
              <Link
                to="/diagnostic"
                style={navLinkStyle}
              >
                Diagnostic
              </Link>
              <Link
                to="/roadmap"
                style={navLinkStyle}
              >
                Roadmap
              </Link>
            </>
          )}
          <Link
            to="/access"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase' as const,
              color: '#0f172a',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(15,23,42,0.25)',
              paddingBottom: '2px',
              transition: 'border-color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0f172a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.25)'; }}
          >
            Apply for Strategy Audit
          </Link>
        </div>
      </nav>
    </header>
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
