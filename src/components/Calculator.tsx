import { useState, useEffect, useRef } from 'react';
import { useInView } from '../lib/useInView';

const LTV = 3500;

const ENQUIRY_OPTIONS = [
  { label: '1–20', sublabel: 'Early stage', value: 10 },
  { label: '21–50', sublabel: 'Growing', value: 35 },
  { label: '51–100', sublabel: 'Established', value: 75 },
  { label: '100+', sublabel: 'High volume', value: 150 },
];

const RESPONSE_OPTIONS = [
  { label: '< 5 Min', sublabel: 'Instant', value: 0.1 },
  { label: '1 Hour', sublabel: 'Same hour', value: 1 },
  { label: '4 Hours', sublabel: 'Half day', value: 4 },
  { label: 'Next Day', sublabel: '24 hours', value: 24 },
];

function calcAnnualExposure(enquiries: number, responseHours: number): number {
  const baseConversionRate = 0.22;
  const decayFactor =
    1 -
    Math.min(
      0.88,
      responseHours * 0.034 +
        (responseHours > 4 ? (responseHours - 4) * 0.018 : 0)
    );
  const lostConversionRate = baseConversionRate - baseConversionRate * decayFactor;
  return Math.round(enquiries * lostConversionRate * LTV * 12);
}

function useCountUp(target: number, duration = 600): number {
  const [displayed, setDisplayed] = useState(target);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<{ from: number; startTime: number } | null>(null);

  useEffect(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    startRef.current = { from: displayed, startTime: performance.now() };
    const from = displayed;

    const tick = (now: number) => {
      const elapsed = now - startRef.current!.startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (target - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return displayed;
}

function formatGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
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
          textTransform: 'uppercase',
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

  const rawExposure = calcAnnualExposure(
    ENQUIRY_OPTIONS[enquiryIdx].value,
    RESPONSE_OPTIONS[responseIdx].value
  );
  const displayedExposure = useCountUp(rawExposure, 650);

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
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  transition: 'opacity 0.15s ease',
                }}
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
