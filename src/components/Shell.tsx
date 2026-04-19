import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'The Objective', exact: true },
  { to: '/diagnostic', label: 'Revenue Diagnostic' },
  { to: '/engine', label: 'The Engine' },
  { to: '/roadmap', label: 'The Roadmap' },
  { to: '/access', label: 'Apply' },
];

export default function Shell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNav />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(15,23,42,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.125rem',
              color: '#0f172a',
              letterSpacing: '-0.01em',
            }}
          >
            Processa
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((item, i) => (
            <span key={item.to} className="flex items-center">
              {i > 0 && (
                <span style={{ color: 'rgba(15,23,42,0.15)', fontSize: '10px', padding: '0 2px' }}>·</span>
              )}
              <NavLink
                to={item.to}
                end={item.exact}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: isActive ? '#0f172a' : 'rgba(15,23,42,0.42)',
                  padding: '8px 16px',
                  transition: 'color 0.15s ease',
                })}
                onMouseEnter={(e) => { if (!(e.currentTarget as HTMLElement).getAttribute('aria-current')) e.currentTarget.style.color = '#0f172a'; }}
                onMouseLeave={(e) => {
                  const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                  e.currentTarget.style.color = isActive ? '#0f172a' : 'rgba(15,23,42,0.42)';
                }}
              >
                {item.label}
              </NavLink>
            </span>
          ))}
          <NavLink
            to="/access"
            className="ml-5 px-5 py-2 transition-all duration-200"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              background: '#1d4ed8',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1e40af'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1d4ed8'; }}
          >
            Begin Qualification
          </NavLink>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px"
            style={{
              background: 'rgba(15,23,42,0.5)',
              transform: mobileOpen ? 'translateY(5px) rotate(45deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
          <span
            className="block w-5 h-px"
            style={{
              background: 'rgba(15,23,42,0.5)',
              opacity: mobileOpen ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />
          <span
            className="block w-5 h-px"
            style={{
              background: 'rgba(15,23,42,0.5)',
              transform: mobileOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ borderTop: '1px solid rgba(15,23,42,0.06)', background: 'rgba(255,255,255,0.98)' }}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col gap-0.5">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: isActive ? '#0f172a' : 'rgba(15,23,42,0.42)',
                  borderBottom: '1px solid rgba(15,23,42,0.05)',
                  padding: '14px 12px',
                })}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/access"
              className="mt-4 px-3 py-4 text-center"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                background: '#1d4ed8',
                color: '#ffffff',
              }}
            >
              Begin Qualification
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(15,23,42,0.08)', background: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        <div
          className="py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24"
          style={{ borderBottom: '1px solid rgba(15,23,42,0.07)' }}
        >
          <div className="md:col-span-4 flex flex-col gap-8">
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '1.25rem',
                color: '#0f172a',
                letterSpacing: '-0.01em',
              }}
            >
              Processa
            </span>
            <p
              style={{
                fontSize: '13px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: '2.0',
                color: 'rgba(15,23,42,0.5)',
                maxWidth: '36ch',
              }}
            >
              A strategic advisory firm serving elite private dental practices in London and the South-East. Founded on the principle that Capital Efficiency is a structural problem, not a marketing one.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-6 flex flex-col gap-5">
            <p
              style={{
                fontSize: '9px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.22em',
                textTransform: 'uppercase' as const,
                color: '#1d4ed8',
                marginBottom: '8px',
              }}
            >
              Navigation
            </p>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontSize: '11px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(15,23,42,0.42)',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0f172a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(15,23,42,0.42)'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="md:col-span-3 md:col-start-10 flex flex-col gap-5">
            <p
              style={{
                fontSize: '9px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.22em',
                textTransform: 'uppercase' as const,
                color: '#1d4ed8',
                marginBottom: '8px',
              }}
            >
              Contact
            </p>
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                color: 'rgba(15,23,42,0.5)',
                lineHeight: '1.8',
              }}
            >
              <p style={{ marginBottom: '2px' }}>Marc</p>
              <p style={{ marginBottom: '14px', color: 'rgba(15,23,42,0.32)' }}>Senior Strategic Partner</p>
              <a
                href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
                style={{
                  display: 'block',
                  color: '#1d4ed8',
                  transition: 'color 0.15s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1e40af'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
              >
                marc@sergiodental.com
              </a>
            </div>
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                color: 'rgba(15,23,42,0.5)',
                lineHeight: '1.8',
                paddingTop: '8px',
              }}
            >
              <p style={{ marginBottom: '2px' }}>Sergio</p>
              <p style={{ color: 'rgba(15,23,42,0.32)' }}>Lead Systems Engineering & Founder</p>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            style={{
              fontSize: '10px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(15,23,42,0.28)',
            }}
          >
            &copy; 2026 Processa Ltd. &nbsp;&middot;&nbsp; All rights reserved. &nbsp;&middot;&nbsp; London, United Kingdom
          </p>
          <div className="flex items-center gap-3">
            <span
              className="pulse-quiet"
              style={{
                display: 'block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#1d4ed8',
              }}
            />
            <span
              style={{
                fontSize: '9px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: 'rgba(15,23,42,0.3)',
              }}
            >
              Advisory Active &nbsp;&middot;&nbsp; 2 Mandates Remaining
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
