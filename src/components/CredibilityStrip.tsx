import { useEffect, useRef, useState } from 'react';
import { useInView } from '../lib/useInView';

type Stat = {
  /** numeric target the counter animates toward */
  target: number;
  /** optional prefix (e.g. "£") */
  prefix?: string;
  /** optional suffix (e.g. "M", "k", "sec", "%") */
  suffix?: string;
  /** format target as fixed-decimal (e.g. 1 → 1.2 for £1.2M) */
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  { target: 1.2,  prefix: '£',  suffix: 'M',   decimals: 1, label: 'Leaked Annual Revenue' },
  { target: 47,                  suffix: 'k',                label: 'Enquiries Managed Monthly' },
  { target: 60,                  suffix: 'sec',              label: 'Response Guarantee' },
  { target: 92,                  suffix: '%',                label: 'Conversion Optimisation Gain' },
];

function useCountUp(target: number, start: boolean, duration = 1400, decimals = 0): string {
  const [val, setVal] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => { if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, [target, start, duration]);

  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
}

function StatCell({ stat, visible, delay }: { stat: Stat; visible: boolean; delay: number }) {
  const display = useCountUp(stat.target, visible, 1400, stat.decimals ?? 0);
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '1rem 0.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#0f172a',
          marginBottom: '1rem',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {stat.prefix ?? ''}{display}{stat.suffix ?? ''}
      </p>
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(15,23,42,0.55)',
          lineHeight: 1.5,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function CredibilityStrip() {
  const [ref, visible] = useInView<HTMLElement>({ threshold: 0.25 });

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(15,23,42,0.08)',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        padding: 'clamp(3.5rem, 7vw, 5.5rem) 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(15,23,42,0.08)' }}
            >
              <StatCell stat={s} visible={visible} delay={i * 140} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
