export default function Navbar() {
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
        <a
          href="#"
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
        </a>

        <a
          href="#contact"
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
            transition: 'border-color 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0f172a';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(15,23,42,0.25)';
          }}
        >
          Apply for Strategy Audit
        </a>
      </nav>
    </header>
  );
}
