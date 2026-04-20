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
  const footerCols = [
    {
      heading: 'Solutions',
      links: [
        { label: 'Revenue Diagnostic', to: '/diagnostic' },
        { label: 'AI Citation Architecture', to: '/engine' },
        { label: 'AEO Infrastructure', to: '/engine' },
        { label: 'Lead Routing System', to: '/roadmap' },
        { label: 'Patient Enquiry SLA', to: '/roadmap' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'Methodology', to: '/roadmap' },
        { label: 'Partner Program', to: '/access' },
        { label: 'About the Firm', to: '/' },
        { label: 'Apply for Access', to: '/access' },
      ],
    },
    {
      heading: 'Compliance',
      links: [
        { label: 'Privacy Policy', to: '/' },
        { label: 'Terms of Service', to: '/' },
        { label: 'GDPR Statement', to: '/' },
        { label: 'Cookie Policy', to: '/' },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: '#0b1120',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Main grid */}
        <div
          className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Col 1 — Brand */}
          <div className="md:col-span-4 flex flex-col gap-7">
            <div>
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '1.4rem',
                  color: '#F5F2EC',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Processa
              </span>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(245,242,236,0.3)',
                }}
              >
                Strategic Dental Infrastructure
              </span>
            </div>

            <p
              style={{
                fontSize: '13px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 2.0,
                color: 'rgba(245,242,236,0.38)',
                maxWidth: '36ch',
              }}
            >
              We install the systems that make elite private dental practices the cited authority in AI search — and ensure every high-value patient enquiry is actioned in under 60 seconds.
            </p>

            <div
              style={{
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'rgba(245,242,236,0.35)',
                  lineHeight: 1.85,
                }}
              >
                "Capital Efficiency in dental is a structural problem — not a marketing one."
              </p>
              <p
                style={{
                  fontSize: '9px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.16em',
                  color: 'rgba(245,242,236,0.2)',
                  marginTop: '10px',
                  textTransform: 'uppercase' as const,
                }}
              >
                Sergio · Founder
              </p>
            </div>

            <a
              href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'rgba(245,242,236,0.5)',
                transition: 'color 0.15s ease',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F2EC'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.5)'; }}
            >
              marc@sergiodental.com
            </a>
          </div>

          {/* Cols 2–4 */}
          {footerCols.map((col) => (
            <div key={col.heading} className="md:col-span-2 md:col-start-auto flex flex-col gap-5">
              <p
                style={{
                  fontSize: '9px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(245,242,236,0.25)',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '4px',
                }}
              >
                {col.heading}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  style={{
                    fontSize: '12px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '0.04em',
                    color: 'rgba(245,242,236,0.38)',
                    transition: 'color 0.15s ease',
                    lineHeight: 1.6,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F2EC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.38)'; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            style={{
              fontSize: '10px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(245,242,236,0.2)',
            }}
          >
            &copy; 2026 Processa Ltd. &nbsp;&middot;&nbsp; All rights reserved. &nbsp;&middot;&nbsp; London, United Kingdom
          </p>

          <div className="flex items-center gap-3">
            <span
              style={{
                display: 'block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'liveStatusPulse 2.4s ease-out infinite',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '9px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: 'rgba(245,242,236,0.22)',
                whiteSpace: 'nowrap',
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
