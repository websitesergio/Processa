import { useState, useEffect, useRef } from 'react';
import { useInView } from '../lib/useInView';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

const LTV = 3500;

const ENQUIRY_OPTIONS = [
  { label: '1–20',  sublabel: 'Early stage',  value: 10,  responseMinuteMedian: 10  },
  { label: '21–50', sublabel: 'Growing',       value: 35,  responseMinuteMedian: 35  },
  { label: '51–100',sublabel: 'Established',   value: 75,  responseMinuteMedian: 75  },
  { label: '100+',  sublabel: 'High volume',   value: 150, responseMinuteMedian: 150 },
];

const RESPONSE_OPTIONS = [
  { label: '< 5 Min', sublabel: 'Instant',   hours: 0.1,  minutes: 0.1  },
  { label: '1 Hour',  sublabel: 'Same hour', hours: 1,    minutes: 60   },
  { label: '4 Hours', sublabel: 'Half day',  hours: 4,    minutes: 240  },
  { label: 'Next Day',sublabel: '24 hours',  hours: 24,   minutes: 1440 },
];

// Logarithmic decay for first 60 minutes, capped at 88% maximum total loss.
// Loss rate = log10(minutes + 1) * MULTIPLIER where MULTIPLIER is calibrated
// so that 60-minute response yields ~55% conversion loss and 1440min ~88%.
const LOG_MULTIPLIER = 0.235; // calibrated: log10(1441) * 0.235 ≈ 0.81 → capped at 0.88

function calcAnnualExposure(enquiries: number, responseHours: number): number {
  const responseMinutes = responseHours * 60;
  const decayRate = Math.min(0.88, Math.log10(responseMinutes + 1) * LOG_MULTIPLIER);
  const baseConversionRate = 0.22;
  const lostConversionRate = baseConversionRate * decayRate;
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

interface OptionCardProps {
  label: string;
  sublabel: string;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({ label, sublabel, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        padding: '18px 12px',
        borderRadius: '14px',
        border: selected ? '1.5px solid #0f172a' : '1.5px solid #e2e8f0',
        background: selected ? '#0f172a' : 'rgba(255,255,255,0.6)',
        cursor: 'pointer',
        transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        transform: selected ? 'scale(1.03)' : 'scale(1)',
        boxShadow: selected
          ? '0 4px 20px rgba(15,23,42,0.18), 0 1px 4px rgba(15,23,42,0.10)'
          : '0 1px 4px rgba(15,23,42,0.04)',
        textAlign: 'center',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: selected ? '#ffffff' : '#0f172a',
          transition: 'color 0.18s ease',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '9px',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: selected ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.38)',
          transition: 'color 0.18s ease',
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
  const [sectionRef, sectionVisible] = useInView<HTMLElement>({ threshold: 0.1 });
  const [cardRef, cardVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { setState } = useAuditor();

  const selectedEnquiry = ENQUIRY_OPTIONS[enquiryIdx];
  const selectedResponse = RESPONSE_OPTIONS[responseIdx];
  const rawExposure = calcAnnualExposure(selectedEnquiry.value, selectedResponse.hours);
  const displayedExposure = useCountUp(rawExposure, 650);
  const monthlyExposure = Math.round(rawExposure / 12);

  // Sync to global context on every selection change
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

  return (
    <section
      id="calculator"
      ref={sectionRef}
      className="grid-texture py-32"
      style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="text-center max-w-2xl mx-auto animate-start"
          style={
            sectionVisible
              ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition:
                    'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                }
              : {}
          }
        >
          <p className="section-eyebrow mb-6 inline-block">Quick Audit</p>
          <h2
            className="font-serif font-bold text-slate-900 mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              fontFeatureSettings: "'liga' 1, 'kern' 1",
            }}
          >
            What Is Your Pipeline Leaking?
          </h2>
          <p
            className="text-slate-500 mt-5 leading-relaxed"
            style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.85 }}
          >
            Two taps. Instant clarity on the revenue your competitors are collecting from you.
          </p>
        </div>

        <div
          ref={cardRef}
          className="max-w-3xl mx-auto mt-16 animate-start"
          style={
            cardVisible
              ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition:
                    'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
                }
              : {}
          }
        >
          <div
            className="glass-card rounded-3xl"
            style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {/* Input 1 */}
            <div className="mb-10">
              <p className="label-tag mb-5">Monthly High-Ticket Enquiries</p>
              <div style={{ display: 'flex', gap: '8px' }}>
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
            <div
              style={{
                height: '1px',
                background: 'rgba(15,23,42,0.07)',
                marginBottom: '2rem',
              }}
            />

            {/* Input 2 */}
            <div className="mb-10">
              <p className="label-tag mb-5">Typical Response Time to New Enquiries</p>
              <div style={{ display: 'flex', gap: '8px' }}>
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
              className="text-center pt-10"
              style={{ borderTop: '1px solid rgba(15,23,42,0.07)' }}
            >
              <p className="label-tag mb-4 inline-block">Annual Revenue Exposure</p>

              <p
                className="display-number text-slate-900 leading-none"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
              >
                {formatGBP(displayedExposure)}
              </p>

              <p
                className="text-slate-400 mt-4 max-w-sm mx-auto"
                style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.85 }}
              >
                In recoverable Implant &amp; Invisalign revenue lost to competitors each year.
              </p>

              <div className="mt-10">
                <a href="#contact" className="btn-premium">
                  Recover This Revenue — Book Your Audit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
