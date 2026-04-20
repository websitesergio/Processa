export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(250, 250, 249, 0.88)',
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

        <div className="flex items-center gap-6">
          {/* Live Status */}
          <div className="hidden sm:flex items-center gap-2">
            <span
              className="live-pulse-dot"
              style={{
                display: 'block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 0 0 rgba(34,197,94,0.6)',
                animation: 'liveStatusPulse 2s ease-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color: 'rgba(15,23,42,0.38)',
                whiteSpace: 'nowrap',
              }}
            >
              2 Acquisition Slots Remaining
            </span>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block"
            style={{ width: '1px', height: '20px', background: 'rgba(15,23,42,0.1)' }}
          />

          <a href="#contact" className="btn-premium" style={{ padding: '11px 28px' }}>
            Request Audit
          </a>
        </div>
      </nav>
    </header>
  );
}
