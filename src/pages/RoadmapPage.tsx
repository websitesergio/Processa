import { useNavigate } from 'react-router-dom';
import { useInView } from '../lib/useInView';

const PHASES = [
  {
    col: 'Days 1–5',
    label: 'Diagnosis',
    headline: 'Establish the full PAC baseline before a single change is made.',
    items: [
      { day: 'D1', action: 'Full technical AEO audit. Every page crawled for AI-visibility and Market Share Capture failure.' },
      { day: 'D2', action: 'Competitor intent map. Identify which high-intent queries your rivals own that you should.' },
      { day: 'D3', action: 'Pipeline haemorrhage reconstruction. Trace exactly where Lead Velocity collapses.' },
      { day: 'D4', action: 'PAC attribution baseline. Current case mix, source performance, conversion by channel.' },
      { day: 'D5', action: 'Diagnostic brief delivered. Single document. No jargon. Exact cost of inaction in recoverable pipeline.' },
    ],
  },
  {
    col: 'Days 6–10',
    label: 'Architecture',
    headline: 'Infrastructure that captures intent before a competitor can.',
    items: [
      { day: 'D6', action: 'Schema deployment. FAQ, service, review, and local business structured data installed for AI citation.' },
      { day: 'D7', action: 'AEO content architecture. Authoritative answer pages engineered for every target query.' },
      { day: 'D8', action: 'Lead Velocity infrastructure live. Sub-60-second lead routing active across all channels.' },
      { day: 'D9', action: 'Qualification layer deployed. Automated pre-screening installed for Invisalign and implant enquiries.' },
      { day: 'D10', action: 'Attribution layer complete. Call, form, chat, and booking events flowing into unified PAC dashboard.' },
    ],
  },
  {
    col: 'Days 11–14',
    label: 'Activation',
    headline: 'Go live. Measure Capital Efficiency from hour one.',
    items: [
      { day: 'D11', action: 'First AI-citation confirmed in Google AI Overview for at least one target query.' },
      { day: 'D12', action: 'Live PAC dashboard handover. Practice owner sees exactly which patients are converting and why.' },
      { day: 'D13', action: 'Lead Velocity SLA audit. Every enquiry channel actioned within 60 seconds. Verified.' },
      { day: 'D14', action: 'Pipeline baseline confirmed. Month-one projection versus prior three-month PAC average. Signed off.' },
    ],
  },
] as const;

function PhaseColumn({ phase, index }: { phase: typeof PHASES[number]; index: number }) {
  const [ref, visible] = useInView<HTMLDivElement>({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      className={[
        'animate-start',
        index > 0 ? 'md:pl-12 border-t md:border-t-0 md:border-l border-slate-100' : 'border-t border-slate-100 md:border-t-0',
      ].join(' ')}
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        ...(visible ? {
          opacity: 1,
          transform: 'translateY(0)',
          transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
        } : {}),
      }}
    >
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '9px',
          fontWeight: 400,
          letterSpacing: '0.24em',
          textTransform: 'uppercase' as const,
          color: '#1d4ed8',
          marginBottom: '10px',
        }}
      >
        {phase.col}
      </p>
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#0f172a',
          marginBottom: '12px',
        }}
      >
        {phase.label}
      </h2>
      <p
        style={{
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 300,
          color: 'rgba(15,23,42,0.4)',
          lineHeight: 1.85,
          marginBottom: '2rem',
        }}
      >
        {phase.headline}
      </p>

      <div className="flex flex-col">
        {phase.items.map((item) => (
          <div
            key={item.day}
            className="flex gap-5 py-5"
            style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color: 'rgba(29,78,216,0.5)',
                flexShrink: 0,
                paddingTop: '2px',
                width: '22px',
              }}
            >
              {item.day}
            </span>
            <p
              style={{
                fontSize: '13px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'rgba(15,23,42,0.55)',
              }}
            >
              {item.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const navigate = useNavigate();

  return (
    <main className="mesh-gradient-light min-h-screen">
      <section className="px-6 md:px-12 py-36 md:py-48">
        <div className="max-w-7xl mx-auto">

          <div
            ref={headerRef}
            className="max-w-2xl mb-24 animate-start"
            style={headerVisible ? {
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            } : {}}
          >
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.24em',
                textTransform: 'uppercase' as const,
                color: '#1d4ed8',
                marginBottom: '20px',
              }}
            >
              The Roadmap
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                color: '#0f172a',
                marginBottom: '20px',
              }}
            >
              14 Days to a Practice<br />That Cannot Be Ignored.
            </h1>
            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.9,
                color: 'rgba(15,23,42,0.5)',
                maxWidth: '50ch',
              }}
            >
              No discovery calls that go nowhere. No proposal decks. A fixed 14-day engagement with a confirmed deliverable on every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
            {PHASES.map((phase, i) => (
              <PhaseColumn key={phase.col} phase={phase} index={i} />
            ))}
          </div>

          <div
            ref={ctaRef}
            className="mt-0 pt-20 animate-start"
            style={{
              borderTop: '1px solid rgba(15,23,42,0.07)',
              ...(ctaVisible ? {
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
              } : {}),
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    color: '#0f172a',
                    marginBottom: '16px',
                  }}
                >
                  The engagement ends. The pipeline does not.
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: 'rgba(15,23,42,0.5)',
                  }}
                >
                  Everything we build belongs to your practice. No lock-in, no monthly retainer dependency. We build the Capital Efficiency machine and hand you the keys on Day 14.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/access')}
                  className="btn-premium"
                  style={{ padding: '14px 32px' }}
                >
                  Apply for This Engagement
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
