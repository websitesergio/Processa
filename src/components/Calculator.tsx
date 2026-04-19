import { useState, useMemo, useRef, useEffect } from 'react';
import { useInView } from '../lib/useInView';

const LTV = 3500;

function calcAnnualExposure(enquiries: number, responseHours: number): number {
  const baseConversionRate = 0.22;
  const decayFactor = 1 - Math.min(0.88, responseHours * 0.034 + (responseHours > 4 ? (responseHours - 4) * 0.018 : 0));
  const lostConversionRate = baseConversionRate - baseConversionRate * decayFactor;
  return Math.round(enquiries * lostConversionRate * LTV * 12);
}

function formatGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, displayValue, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-start justify-between mb-5 gap-4">
        <span className="label-tag mt-1">{label}</span>
        <span
          className="display-number text-slate-900 tabular-nums"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', flexShrink: 0 }}
        >
          {displayValue}
        </span>
      </div>
      <div className="relative py-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full outline-none cursor-pointer appearance-none"
          style={{
            background: `linear-gradient(to right, #0f172a ${pct}%, rgba(15,23,42,0.1) ${pct}%)`,
            accentColor: '#0f172a',
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="label-tag">{min}</span>
        <span className="label-tag">{max}</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [enquiries, setEnquiries] = useState(40);
  const [responseHours, setResponseHours] = useState(12);
  const [pulsing, setPulsing] = useState(false);
  const prevValue = useRef<number | null>(null);
  const [sectionRef, sectionVisible] = useInView<HTMLElement>({ threshold: 0.1 });
  const [cardRef, cardVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const annualExposure = useMemo(
    () => calcAnnualExposure(enquiries, responseHours),
    [enquiries, responseHours]
  );

  useEffect(() => {
    if (prevValue.current !== null && prevValue.current !== annualExposure) {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 700);
      return () => clearTimeout(t);
    }
    prevValue.current = annualExposure;
  }, [annualExposure]);

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
          style={sectionVisible ? {
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          } : {}}
        >
          <p className="section-eyebrow mb-6 inline-block">Revenue Diagnostic</p>
          <h2
            className="font-serif font-bold text-slate-900 mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              fontFeatureSettings: "'liga' 1, 'kern' 1",
            }}
          >
            Quantify Your Pipeline Hemorrhage
          </h2>
          <p
            className="text-slate-500 mt-5 leading-relaxed"
            style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.85 }}
          >
            Discover exactly how much revenue is leaking to competitors due to slow lead response.
          </p>
        </div>

        <div
          ref={cardRef}
          className="max-w-4xl mx-auto mt-16 animate-start"
          style={cardVisible ? {
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
          } : {}}
        >
          <div
            className="glass-card rounded-3xl overflow-hidden"
            style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}
          >
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <Slider
                label="Monthly High-Ticket Enquiries"
                value={enquiries}
                min={10}
                max={200}
                step={5}
                displayValue={`${enquiries}`}
                onChange={setEnquiries}
              />
              <Slider
                label="Average Response Time (Hours)"
                value={responseHours}
                min={1}
                max={48}
                step={1}
                displayValue={`${responseHours}h`}
                onChange={setResponseHours}
              />
            </div>

            <div
              className="mt-14 pt-12 text-center"
              style={{ borderTop: '1px solid rgba(15,23,42,0.07)' }}
            >
              <p className="label-tag mb-6 inline-block">Annual Revenue Exposure</p>

              <div
                className={pulsing ? 'pulse-ring-active' : ''}
                style={{
                  display: 'inline-block',
                  borderRadius: '16px',
                  padding: '4px 16px',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <p
                  className="display-number text-slate-900 leading-none"
                  style={{
                    fontSize: 'clamp(4rem, 11vw, 9rem)',
                    transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                    transform: pulsing ? 'scale(1.015)' : 'scale(1)',
                  }}
                >
                  {formatGBP(annualExposure)}
                </p>
              </div>

              <p
                className="text-slate-400 mt-5 max-w-sm mx-auto"
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
