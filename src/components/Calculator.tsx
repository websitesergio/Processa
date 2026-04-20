import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../lib/useInView';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

const LTV = 3500;

const ENQUIRY_OPTIONS = [
  { label: '1–20',   sublabel: 'Early stage',  value: 10,  minutes: 10   },
  { label: '21–50',  sublabel: 'Growing',       value: 35,  minutes: 35   },
  { label: '51–100', sublabel: 'Established',   value: 75,  minutes: 75   },
  { label: '100+',   sublabel: 'High volume',   value: 150, minutes: 150  },
];

const RESPONSE_OPTIONS = [
  { label: '< 5 Min',  sublabel: 'Instant',   hours: 0.1,  minutes: 0.1  },
  { label: '1 Hour',   sublabel: 'Same hour', hours: 1,    minutes: 60   },
  { label: '4 Hours',  sublabel: 'Half day',  hours: 4,    minutes: 240  },
  { label: 'Next Day', sublabel: '24 hours',  hours: 24,   minutes: 1440 },
];

const LOG_MULTIPLIER = 0.235;

function calcAnnualExposure(enquiries: number, responseHours: number): number {
  const responseMinutes = responseHours * 60;
  const decayRate = Math.min(0.88, Math.log10(responseMinutes + 1) * LOG_MULTIPLIER);
  const lostConversionRate = 0.22 * decayRate;
  return Math.round(enquiries * lostConversionRate * LTV * 12);
}

function useCountUp(target: number, duration = 650): number {
  const [displayed, setDisplayed] = useState(target);
  const frameRef = useRef<number | null>(null);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    const from = prevTarget.current;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (target - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      else prevTarget.current = target;
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return displayed;
}

function OptionCard({
  label, sublabel, selected, onClick,
}: {
  label: string; sublabel: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        minHeight: '72px',
        padding: 'clamp(1.25rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem)',
        borderRadius: '16px',
        border: selected ? '2px solid #0f172a' : '2px solid #e2e8f0',
        background: selected ? '#0f172a' : '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
        boxShadow: selected
          ? '0 8px 28px rgba(15,23,42,0.2)'
          : '0 1px 4px rgba(15,23,42,0.05)',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: selected ? '#ffffff' : '#0f172a',
          transition: 'color 0.15s ease',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase' as const,
          color: selected ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.4)',
          transition: 'color 0.15s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {sublabel}
      </span>
    </button>
  );
}

export default function Calculator() {
  const [enquiryIdx, setEnquiryIdx] = useState(1);
  const [responseIdx, setResponseIdx] = useState(2);
  const [sectionRef, sectionVisible] = useInView<HTMLElement>({ threshold: 0.08 });
  const [cardRef, cardVisible] = useInView<HTMLDivElement>({ threshold: 0.06 });
  const { setState } = useAuditor();

  const selectedEnquiry = ENQUIRY_OPTIONS[enquiryIdx];
  const selectedResponse = RESPONSE_OPTIONS[responseIdx];
  const rawExposure = calcAnnualExposure(selectedEnquiry.value, selectedResponse.hours);
  const displayedExposure = useCountUp(rawExposure, 650);
  const monthlyExposure = Math.round(rawExposure / 12);

  useEffect(() => {
    setState({
      monthlyLeads: selectedEnquiry.value,
      caseValue: LTV,
      responseMinutes: selectedResponse.minutes,
      monthlyBleed: monthlyExposure,
      hasRun: true,
      updatedAt: Date.now(),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiryIdx, responseIdx]);

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
      id="calculator"
      ref={sectionRef}
      style={{
        background: '#f8fafc',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        padding: 'clamp(8rem, 12vw, 10rem) 0',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>

        {/* Section header */}
        <div
          className="animate-start"
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 4rem',
            ...enterStyle(sectionVisible),
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
            Quick Audit
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
            What Is Your Pipeline Leaking?
          </h2>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#334155',
            }}
          >
            Two taps. Instant clarity on the revenue your competitors are collecting from you each year.
          </p>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className="animate-start"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            ...enterStyle(cardVisible, 120),
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '3rem',
              padding: 'clamp(2.5rem, 6vw, 5rem)',
              boxShadow: '0 8px 48px rgba(15,23,42,0.09), 0 2px 12px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.05)',
            }}
          >
            {/* Input 1 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(15,23,42,0.45)',
                  marginBottom: '1.25rem',
                }}
              >
                Monthly High-Ticket Enquiries
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {ENQUIRY_OPTIONS.map((opt, i) => (
                  <OptionCard
                    key={opt.label}
                    label={opt.label}
                    sublabel={opt.sublabel}
                    selected={enquiryIdx === i}
                    onClick={() => setEnquiryIdx(i)}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2.5rem' }} />

            {/* Input 2 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(15,23,42,0.45)',
                  marginBottom: '1.25rem',
                }}
              >
                Typical Response Time to New Enquiries
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {RESPONSE_OPTIONS.map((opt, i) => (
                  <OptionCard
                    key={opt.label}
                    label={opt.label}
                    sublabel={opt.sublabel}
                    selected={responseIdx === i}
                    onClick={() => setResponseIdx(i)}
                  />
                ))}
              </div>
            </div>

            {/* Result */}
            <div
              style={{
                textAlign: 'center',
                paddingTop: '2.5rem',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(15,23,42,0.45)',
                  marginBottom: '1rem',
                }}
              >
                Annual Revenue Exposure
              </p>

              <div
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 1rem',
                  borderRadius: '9999px',
                  animation: 'pulseRing 2.4s ease-out infinite',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2.5rem, 10vw, 9rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: '#0f172a',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatGBP(displayedExposure)}
                </p>
              </div>

              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: '#475569',
                  lineHeight: 1.7,
                  maxWidth: '44ch',
                  margin: '1rem auto 2.5rem',
                }}
              >
                In recoverable Implant &amp; Invisalign revenue lost to competitors each year.
              </p>

              <Link
                to="/access"
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
                  padding: '1.125rem 3rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
                  boxShadow: '0 4px 20px rgba(15,23,42,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 36px rgba(15,23,42,0.26)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,23,42,0.2)';
                }}
              >
                Recover This Revenue — Book Your Audit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
