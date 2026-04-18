export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(250, 250, 249, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: '0 1px 0 rgba(15,23,42,0.04), 0 4px 32px rgba(15,23,42,0.04)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '1.2rem',
            color: '#0f172a',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}
        >
          Processa
        </a>
        <a href="#contact" className="btn-premium" style={{ padding: '11px 28px' }}>
          Request Audit
        </a>
      </nav>
    </header>
  );
}
