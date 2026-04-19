import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 260),
      setTimeout(() => setPhase(3), 440),
      setTimeout(() => setPhase(4), 620),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const visible = (n: number) => ({
    opacity: phase >= n ? 1 : 0,
    transform: phase >= n ? 'translateY(0px)' : 'translateY(24px)',
    transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  return (
    <section
      className="mesh-gradient-light min-h-[90vh] flex items-center"
      style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-36 w-full">
        <div className="flex flex-col items-center text-center relative">

          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(12rem, 30vw, 28rem)',
              fontWeight: 700,
              color: 'rgba(15,23,42,0.018)',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              userSelect: 'none',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            P
          </div>

          <p className="section-eyebrow mb-10" style={visible(1)}>
            AI Patient Acquisition — Implant &amp; Invisalign Practices
          </p>

          <h1
            className="font-serif font-bold text-slate-900 mb-8 max-w-4xl"
            style={{
              ...visible(2),
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              fontFeatureSettings: "'liga' 1, 'kern' 1",
            }}
          >
            Stop losing high-ticket dental patients to slow response times.
          </h1>

          <p
            className="text-slate-500 leading-relaxed max-w-xl mb-14"
            style={{
              ...visible(3),
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              lineHeight: 1.85,
              fontWeight: 300,
            }}
          >
            We install the automated patient acquisition systems required for leading Implant &amp; Invisalign practices.
          </p>

          <div style={visible(4)}>
            <a href="#calculator" className="btn-premium">
              Calculate Revenue Leak
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>

          <div
            style={{
              ...visible(4),
              marginTop: '5rem',
              width: '48px',
              height: '1px',
              background: 'rgba(15,23,42,0.15)',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
