import { useEffect, useState } from 'react';

export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const enter = (n: number, delay = 0): React.CSSProperties => ({
    opacity: phase >= n ? 1 : 0,
    transform: phase >= n ? 'translate3d(0,0,0)' : 'translate3d(0,16px,0)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: phase < 4 ? 'opacity, transform' : 'auto',
  });

  return (
    <section
      id="hero"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        minHeight: '92svh',
        display: 'flex',
        alignItems: 'center',
        contain: 'layout style',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(4rem,12vw,9rem) clamp(1rem, 5vw, 2rem)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            ...enter(1),
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.26em',
            textTransform: 'uppercase' as const,
            color: 'rgba(15,23,42,0.45)',
            marginBottom: '2.5rem',
          }}
        >
          AI Patient Acquisition — Implant &amp; Invisalign Practices
        </p>

        {/* Headline */}
        <h1
          style={{
            ...enter(2),
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 7vw, 6.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#0f172a',
            maxWidth: '16ch',
            marginBottom: '2rem',
            fontFeatureSettings: "'liga' 1, 'kern' 1",
            wordBreak: 'break-word' as const,
            overflowWrap: 'break-word' as const,
            hyphens: 'auto' as const,
          }}
        >
          AI-Powered Patient Acquisition for European Dental Excellence.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            ...enter(3),
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            fontWeight: 400,
            lineHeight: 1.7,
            color: '#334155',
            maxWidth: '52ch',
            marginBottom: '3.5rem',
          }}
        >
          A 60-second diagnostic for premier Invisalign &amp; Implant clinics. Calculate the exact revenue your slow response time costs you every year.
        </p>

        {/* CTA */}
        <div style={enter(4)}>
          <a
            href="#calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0f172a',
              color: '#ffffff',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '1.25rem 3.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
              boxShadow: '0 4px 20px rgba(15,23,42,0.22), 0 1px 4px rgba(15,23,42,0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,23,42,0.28), 0 4px 12px rgba(15,23,42,0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,23,42,0.22), 0 1px 4px rgba(15,23,42,0.12)';
            }}
          >
            Start Audit
          </a>
        </div>

        {/* Divider rule */}
        <div
          style={{
            ...enter(4),
            marginTop: '6rem',
            width: '1px',
            height: '64px',
            background: 'linear-gradient(to bottom, rgba(15,23,42,0.18), transparent)',
          }}
        />
      </div>
    </section>
  );
}
