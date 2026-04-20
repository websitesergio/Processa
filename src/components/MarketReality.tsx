import { useEffect, useState } from 'react';
import { Link2 } from 'lucide-react';
import { useInView } from '../lib/useInView';

const QUERIES = [
  {
    text: 'Find the top-rated implant clinic in London with immediate availability.',
    intent: 'High-intent · Private implant patient',
  },
  {
    text: 'Best Invisalign specialist near me accepting new patients 2026.',
    intent: 'Commercial · Invisalign intent',
  },
  {
    text: 'All-on-4 dental implants full arch same day London cost.',
    intent: 'High-value · Full arch treatment',
  },
];

function AEOVisualizer() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [thinking, setThinking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const query = QUERIES[queryIndex];
    let i = 0;
    setTyped('');
    setThinking(false);
    setShowAnswer(false);

    const typer = window.setInterval(() => {
      i += 1;
      setTyped(query.text.slice(0, i));
      if (i >= query.text.length) {
        window.clearInterval(typer);
        window.setTimeout(() => setThinking(true), 300);
        window.setTimeout(() => { setThinking(false); setShowAnswer(true); }, 1400);
        window.setTimeout(
          () => setQueryIndex((q) => (q + 1) % QUERIES.length),
          6000
        );
      }
    }, 48);

    return () => window.clearInterval(typer);
  }, [queryIndex]);

  const query = QUERIES[queryIndex];

  return (
    <div
      style={{
        background: '#0b1120',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      {/* Terminal chrome */}
      <div
        style={{
          background: '#0f172a',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'block' }} />
        <span
          style={{
            marginLeft: '10px',
            fontSize: '10px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.1em',
          }}
        >
          AI Search Engine — 2026
        </span>
      </div>

      {/* Query input */}
      <div style={{ padding: '20px 20px 0' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '14px 16px',
            minHeight: '56px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
            <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
            <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            {typed}
            <span
              style={{
                display: 'inline-block',
                width: '1.5px',
                height: '13px',
                background: 'rgba(255,255,255,0.5)',
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'caretBlink 1s step-end infinite',
              }}
            />
          </span>
        </div>

        <div
          style={{
            marginTop: '8px',
            fontSize: '9px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
          }}
        >
          {query.intent}
        </div>
      </div>

      {/* AI Answer panel */}
      <div style={{ padding: '16px 20px 20px' }}>
        {thinking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 0' }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'rgba(212,168,83,0.5)',
                  display: 'block',
                  animation: `thinkingDot 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.1em',
                marginLeft: '4px',
              }}
            >
              Searching authoritative sources…
            </span>
          </div>
        )}

        <div
          style={{
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            opacity: showAnswer ? 1 : 0,
            transform: showAnswer ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <div
            style={{
              background: 'rgba(212,168,83,0.05)',
              border: '1px solid rgba(212,168,83,0.18)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(212,168,83,0.6)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                marginBottom: '8px',
              }}
            >
              AI Answer — Cited Authority
            </div>
            <p
              style={{
                fontSize: '13px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.75,
              }}
            >
              <strong style={{ fontWeight: 500, color: '#fff' }}>Analysis complete.</strong> Clinic identified as top-tier authority in Central London implant provision. Currently losing an estimated <strong style={{ fontWeight: 500, color: 'rgba(212,168,83,0.9)' }}>64% of high-ticket conversion</strong> due to infrastructure latency and AI citation gap. <strong style={{ fontWeight: 500, color: '#fff' }}>Recommendation: Deploy Processa Protocol immediately.</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {['your-clinic.co.uk', 'gdc-uk.org', 'your-clinic.co.uk/pricing'].map((cite, i) => (
                <span
                  key={cite}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    fontSize: '10px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    border: i === 0 ? '1px solid rgba(212,168,83,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    background: i === 0 ? 'rgba(212,168,83,0.08)' : 'rgba(255,255,255,0.02)',
                    color: i === 0 ? 'rgba(212,168,83,0.8)' : 'rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                  }}
                >
                  <Link2 size={9} strokeWidth={1.5} />
                  {cite}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {[
              { label: 'CTR', value: '38%' },
              { label: 'Intent', value: 'Commercial' },
              { label: 'Cost / Lead', value: '£0' },
            ].map((m) => (
              <div
                key={m.label}
                style={{ background: '#0b1120', padding: '10px 12px' }}
              >
                <div
                  style={{
                    fontSize: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.18)',
                    marginBottom: '4px',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    color: '#F5F2EC',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketReality() {
  const [sectionRef, sectionVisible] = useInView<HTMLElement>({ threshold: 0.08 });
  const [leftRef, leftVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [rightRef, rightVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{
        borderBottom: '1px solid rgba(15,23,42,0.06)',
        padding: '7rem 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <div
          className="max-w-2xl mb-20 animate-start"
          style={
            sectionVisible
              ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                }
              : {}
          }
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
            The 2026 Patient Acquisition Shift
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.06,
              color: '#0f172a',
            }}
          >
            Your patients are asking AI. Is your clinic the answer?
          </h2>
          <p
            style={{
              marginTop: '1.25rem',
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(15,23,42,0.5)',
              maxWidth: '52ch',
            }}
          >
            In 2026, AI search engines return a single cited answer — not ten links. Your clinic is either that answer or it loses the patient to whoever is.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — AEO Visualizer */}
          <div
            ref={leftRef}
            className="animate-start"
            style={
              leftVisible
                ? {
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
                  }
                : {}
            }
          >
            <AEOVisualizer />
          </div>

          {/* Right — Executive copy */}
          <div
            ref={rightRef}
            className="animate-start"
            style={
              rightVisible
                ? {
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s',
                  }
                : {}
            }
          >
            <div className="flex flex-col gap-10 pt-2">

              {/* Stat pull */}
              <div
                style={{
                  borderLeft: '3px solid #1d4ed8',
                  paddingLeft: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: '#0f172a',
                    marginBottom: '8px',
                  }}
                >
                  62%
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(15,23,42,0.38)',
                    lineHeight: 1.6,
                  }}
                >
                  of high-intent dental queries answered by AI before a single click — BrightEdge 2025
                </p>
              </div>

              {/* Body copy */}
              {[
                {
                  title: 'The shift has already happened.',
                  body: 'When a high-value patient searches for an implant clinic, they are not presented with ten options. An AI engine cites one authority and that is who gets the enquiry. Your clinic is either structurally positioned for that citation — or it is absent from the conversation entirely.',
                },
                {
                  title: 'AEO is not a marketing tactic. It is infrastructure.',
                  body: 'Answer Engine Optimisation means engineering your practice\'s digital presence so that AI search systems retrieve and cite your clinic by name. This is a technical architecture problem — not an advertising budget problem. The practices winning in 2026 are those who treated it as such six months ago.',
                },
                {
                  title: 'The window is narrow.',
                  body: 'As AI citation patterns stabilise around a smaller pool of trusted sources, the cost of establishing authority rises exponentially. Practices that act now lock competitors out structurally. Practices that wait will pay to acquire what they could have earned.',
                },
              ].map((item) => (
                <div key={item.title}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: '#0f172a',
                      marginBottom: '10px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: 'rgba(15,23,42,0.55)',
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}

              <div>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    color: '#1d4ed8',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#1e40af'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
                >
                  Audit My Clinic's AEO Position
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Market reality data strips */}
        <div
          className="mt-20"
          style={{ borderTop: '1px solid rgba(15,23,42,0.07)' }}
        >
          {[
            {
              index: '01',
              headline: 'Patient Acquisition Cost Crisis',
              body: 'Average PAC for implant-level treatments is up 340% since 2020. The practices retaining margin are capturing organic AI intent — not spending more on paid search.',
              metric: 'PAC for high-ticket dental: +340% (2020–2025) · Processa Internal Audit',
            },
            {
              index: '02',
              headline: 'The Response Window Collapse',
              body: 'A patient who enquires about Invisalign has a 391% higher conversion probability if contacted within 5 minutes. Most practices respond in 4–6 hours. That gap is where revenue disappears.',
              metric: '391% higher conversion at <5 min response · Harvard Business Review, 2024',
            },
          ].map((shift) => (
            <div
              key={shift.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-14"
              style={{ borderBottom: '1px solid rgba(15,23,42,0.07)' }}
            >
              <div className="md:col-span-1">
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '3rem',
                    fontWeight: 600,
                    color: 'rgba(15,23,42,0.08)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {shift.index}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.15rem, 2vw, 1.6rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    color: '#0f172a',
                  }}
                >
                  {shift.headline}
                </h3>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.95,
                    color: 'rgba(15,23,42,0.55)',
                    marginBottom: '16px',
                  }}
                >
                  {shift.body}
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    color: 'rgba(15,23,42,0.35)',
                    borderLeft: '2px solid rgba(29,78,216,0.3)',
                    paddingLeft: '12px',
                    lineHeight: 1.7,
                  }}
                >
                  {shift.metric}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
