import { Link } from 'react-router-dom';
import { useInView } from '../lib/useInView';
import { useWindowWidth } from '../lib/useWindowWidth';

const PHASES = [
  {
    phase: 'I',
    label: 'Phase I',
    title: 'The Strategic Audit',
    subtitle: 'Led by Marc',
    body: 'We quantify your exact pipeline haemorrhage and map precisely where competitors are capturing your high-ticket leads before you can respond.',
    large: true,
    accent: true,
  },
  {
    phase: 'II',
    label: 'Phase II',
    title: 'The Infrastructure Build',
    subtitle: 'Engineered by the Systems Team',
    body: 'We construct a bespoke patient acquisition engine tailored specifically for your Implant and Invisalign services.',
    large: false,
    accent: false,
  },
  {
    phase: 'III',
    label: 'Phase III',
    title: 'The 60-Second Routing',
    subtitle: 'Directed by Sergio',
    body: 'Every new patient enquiry is automatically qualified and routed to your front desk in under 60 seconds. Guaranteed.',
    large: false,
    accent: false,
  },
];

export default function Process() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [card0Ref, card0Visible] = useInView<HTMLDivElement>({ threshold: 0.08 });
  const [card1Ref, card1Visible] = useInView<HTMLDivElement>({ threshold: 0.08 });
  const [card2Ref, card2Visible] = useInView<HTMLDivElement>({ threshold: 0.08 });

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const cardVisible = [card0Visible, card1Visible, card2Visible];

  const enterStyle = (visible: boolean, delay = 0): React.CSSProperties =>
    visible
      ? {
          opacity: 1,
          transform: 'translateY(0)',
          transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }
      : {};

  return (
    <section
      style={{
        background: '#ffffff',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        padding: 'clamp(8rem, 12vw, 10rem) 0',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>

        {/* Header */}
        <div
          ref={headerRef}
          className="animate-start"
          style={{
            maxWidth: '640px',
            marginBottom: '4rem',
            ...enterStyle(headerVisible),
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.26em',
              textTransform: 'uppercase' as const,
              color: 'rgba(15,23,42,0.45)',
              marginBottom: '1.25rem',
            }}
          >
            The Protocol
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 5vw, 3.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#0f172a',
              marginBottom: '1.25rem',
            }}
          >
            The 14-Day Revenue Recovery Protocol
          </h2>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.75,
              color: '#334155',
              maxWidth: '52ch',
            }}
          >
            We do not sell software. We install high-converting infrastructure. Here is exactly how we deploy it.
          </p>
        </div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gridTemplateRows: isMobile ? 'auto' : 'auto auto',
            gap: isMobile ? '1.5rem' : '1.25rem',
          }}
        >
          {PHASES.map(({ phase, label, title, subtitle, body, large, accent }, i) => (
            <div
              key={label}
              ref={cardRefs[i]}
              className="animate-start"
              style={{
                gridRow: !isMobile && large ? 'span 2' : 'auto',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '2rem',
                padding: isMobile ? '1.75rem' : large ? 'clamp(2.5rem,5vw,3.5rem)' : 'clamp(2rem,4vw,2.75rem)',
                boxShadow: '0 4px 24px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                position: 'relative' as const,
                overflow: 'hidden' as const,
                display: 'flex',
                flexDirection: 'column' as const,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                ...enterStyle(cardVisible[i], i * 100),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.07)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 20px rgba(15,23,42,0.06), 0 1px 4px rgba(15,23,42,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Ghost numeral */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '-0.5rem',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: large ? '16rem' : '11rem',
                  fontWeight: 700,
                  color: 'rgba(15,23,42,0.06)',
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {phase}
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(15,23,42,0.4)',
                    }}
                  >
                    {label}
                  </span>
                  {accent && (
                    <div style={{ width: '40px', height: '3px', background: '#D4A853', borderRadius: '2px' }} />
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: large ? 'clamp(1.75rem, 3vw, 2.5rem)' : 'clamp(1.4rem, 2.5vw, 1.875rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#0f172a',
                    marginBottom: '0.75rem',
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(15,23,42,0.4)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {subtitle}
                </p>

                <div style={{ width: '36px', height: '1px', background: 'rgba(15,23,42,0.15)', marginBottom: '1.75rem' }} />

                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: large ? '1.125rem' : '1rem',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: '#475569',
                    flex: 1,
                  }}
                >
                  {body}
                </p>

                {large && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <Link
                      to="/access"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0f172a',
                        color: '#ffffff',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        padding: '14px 28px',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: '0 2px 12px rgba(15,23,42,0.18)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.24)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(15,23,42,0.18)';
                      }}
                    >
                      Begin Qualification
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
