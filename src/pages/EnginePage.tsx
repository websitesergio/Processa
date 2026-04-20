import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../lib/useInView';

const STEPS = [
  {
    index: '01',
    title: 'Structural Visibility',
    headline: 'You cannot capture patient intent if AI cannot find you.',
    body: 'Most dental websites are architecturally invisible to AI-generated search results and voice search. The failure is not cosmetic — it is a fundamental Market Share Capture deficit. We audit every intent signal your practice fails to surface and rebuild the technical foundation required for authoritative AI search presence.',
    proof: '94% of practice websites fail basic AEO compliance. Source: Processa Internal Audit, 2024.',
  },
  {
    index: '02',
    title: 'Lead Velocity Optimisation',
    headline: 'Intent without infrastructure is pipeline haemorrhage.',
    body: 'Visibility without conversion architecture is wasted Patient Acquisition Cost. We engineer the full patient journey from first discovery to confirmed appointment — tracking micro-intents, qualifying enquiries automatically, and routing every lead to the correct response protocol within 60 seconds to maximise Capital Efficiency.',
    proof: 'A 5-minute response window qualifies at 21× the rate of a 30-minute window.',
  },
  {
    index: '03',
    title: 'Revenue Attribution',
    headline: 'Every pound of PAC must be traceable to treatment revenue.',
    body: 'We close the loop between digital presence and treatment revenue. Custom attribution models tie each high-value case to its originating channel, giving your practice the exact data required to eliminate PAC waste and double investment into the channels with proven Market Share Capture.',
    proof: 'Average: £168,000 annual pipeline recovered. First 12 months. Per practice.',
  },
] as const;

function StepRow({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const [ref, visible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-20 animate-start"
      style={{
        borderTop: '1px solid rgba(15,23,42,0.07)',
        ...(visible ? {
          opacity: 1,
          transform: 'translateY(0)',
          transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
        } : {}),
      }}
    >
      <div className="md:col-span-1">
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '3.5rem',
            fontWeight: 700,
            color: 'rgba(15,23,42,0.08)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {step.index}
        </span>
      </div>

      <div className="md:col-span-4 flex flex-col justify-start pt-1">
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.24em',
            textTransform: 'uppercase' as const,
            color: '#1d4ed8',
            marginBottom: '16px',
          }}
        >
          {step.title}
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#0f172a',
          }}
        >
          {step.headline}
        </h2>
      </div>

      <div className="md:col-span-6 md:col-start-7 flex flex-col justify-start pt-1">
        <p
          style={{
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 300,
            lineHeight: 1.95,
            color: 'rgba(15,23,42,0.55)',
            marginBottom: '20px',
          }}
        >
          {step.body}
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
          {step.proof}
        </p>
      </div>
    </div>
  );
}

export default function EnginePage() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const navigate = useNavigate();

  return (
    <main className="mesh-gradient-light min-h-screen">
      <section className="px-6 md:px-16 py-36 md:py-48">
        <div className="max-w-7xl mx-auto">

          <div
            ref={headerRef}
            className="max-w-2xl mb-28 animate-start"
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
              The Engine
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
              How Patient Intent<br />Becomes Revenue.
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
              Three interlocking systems. Each one is necessary. Together, they produce compounding pipeline recovery that cannot be replicated by a website alone.
            </p>
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <StepRow key={step.index} step={step} index={i} />
            ))}

            <div
              className="py-20"
              style={{ borderTop: '1px solid rgba(15,23,42,0.07)' }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                <button
                  type="button"
                  onClick={() => navigate('/roadmap')}
                  className="btn-premium"
                  style={{ padding: '14px 32px' }}
                >
                  See the 14-Day Roadmap
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/access')}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(15,23,42,0.4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0f172a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(15,23,42,0.4)'; }}
                >
                  Apply for an Audit &nbsp;&rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
