import { useInView } from '../lib/useInView';

const PHASES = [
  {
    phase: 'I',
    label: 'Phase I',
    title: 'The Strategic Audit',
    subtitle: 'Led by Marc',
    body: 'We quantify your exact pipeline hemorrhage and map exactly where competitors are stealing your high-ticket leads.',
    large: true,
    accent: true,
  },
  {
    phase: 'II',
    label: 'Phase II',
    title: 'The Infrastructure Build',
    subtitle: 'Engineered by the Systems Team',
    body: 'We construct the bespoke patient acquisition engine tailored specifically for your Implant and Invisalign services.',
    large: false,
    accent: false,
  },
  {
    phase: 'III',
    label: 'Phase III',
    title: 'The 60-Second Routing',
    subtitle: 'Directed by Sergio',
    body: 'Every new patient inquiry is automatically qualified and routed to your front desk in under 60 seconds. Guaranteed.',
    large: false,
    accent: false,
  },
];

export default function Process() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [card0Ref, card0Visible] = useInView<HTMLDivElement>({ threshold: 0.12 });
  const [card1Ref, card1Visible] = useInView<HTMLDivElement>({ threshold: 0.12 });
  const [card2Ref, card2Visible] = useInView<HTMLDivElement>({ threshold: 0.12 });

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const cardVisibilities = [card0Visible, card1Visible, card2Visible];

  return (
    <section
      className="mesh-gradient-light py-32"
      style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={headerRef}
          className="max-w-2xl mb-16 animate-start"
          style={headerVisible ? {
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          } : {}}
        >
          <p className="section-eyebrow mb-6">The Protocol</p>
          <h2
            className="font-serif font-bold text-slate-900 mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              fontFeatureSettings: "'liga' 1, 'kern' 1",
            }}
          >
            The 14-Day Revenue Recovery Protocol
          </h2>
          <p
            className="text-slate-500 mt-5"
            style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.85, maxWidth: '52ch' }}
          >
            We do not sell software. We install high-converting infrastructure. Here is exactly how we deploy it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-5" style={{ minHeight: '540px' }}>
          {PHASES.map(({ phase, label, title, subtitle, body, large, accent }, i) => (
            <div
              key={label}
              ref={cardRefs[i]}
              className={[
                'glass-card glass-card-hover rounded-3xl relative overflow-hidden animate-start',
                large ? 'lg:row-span-2 lg:col-span-1' : '',
              ].join(' ')}
              style={{
                ...(cardVisibilities[i] ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
                } : {}),
                padding: large ? 'clamp(2rem, 4vw, 3rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-0.5rem',
                  right: '-0.5rem',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: large ? '10rem' : '7rem',
                  fontWeight: 700,
                  color: 'rgba(15,23,42,0.032)',
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {phase}
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <p className="label-tag">{label}</p>
                  {accent && (
                    <div style={{ width: '24px', height: '2px', background: '#D4A853', borderRadius: '1px' }} />
                  )}
                </div>

                <h3
                  className="font-serif font-bold text-slate-900 mb-3"
                  style={{
                    fontSize: large ? 'clamp(1.6rem, 2.5vw, 2.2rem)' : 'clamp(1.3rem, 2vw, 1.6rem)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.03em',
                    fontFeatureSettings: "'liga' 1, 'kern' 1",
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '9px',
                    fontWeight: 400,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(15,23,42,0.38)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {subtitle}
                </p>

                <div style={{ width: '32px', height: '1px', background: 'rgba(15,23,42,0.15)', marginBottom: '1.5rem' }} />

                <p
                  className="text-slate-500 mt-auto"
                  style={{
                    fontSize: large ? '1rem' : '0.9rem',
                    fontWeight: 300,
                    lineHeight: 1.85,
                  }}
                >
                  {body}
                </p>

                {large && (
                  <div className="mt-10">
                    <a href="#contact" className="btn-premium" style={{ padding: '13px 28px', fontSize: '10px' }}>
                      Begin Qualification
                    </a>
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
