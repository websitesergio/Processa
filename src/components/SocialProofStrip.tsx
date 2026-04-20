import { useInView } from '../lib/useInView';

const STATS = [
  {
    value: '21×',
    label: 'Lead Velocity Multiplier',
    sub: 'Sub-5-min response vs 30-min industry average',
  },
  {
    value: '£168k',
    label: 'Avg. Annual Pipeline Recovered',
    sub: 'Per practice, first 12 months post-deployment',
  },
  {
    value: '<60s',
    label: 'Lead Response SLA',
    sub: 'Every enquiry channel, without exception',
  },
  {
    value: '2',
    label: 'New Mandates Monthly',
    sub: 'By design — capital efficiency over volume',
  },
] as const;

export default function SocialProofStrip() {
  const [ref, visible] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          className="animate-start"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            ...(visible ? {
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            } : {}),
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              style={{
                padding: '3.5rem 2rem',
                borderRight: i % 2 === 0 ? '1px solid rgba(15,23,42,0.08)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(15,23,42,0.08)' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#0f172a',
                  marginBottom: '0.75rem',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: '#0f172a',
                  marginBottom: '0.5rem',
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 400,
                  color: '#475569',
                  lineHeight: 1.6,
                }}
              >
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
