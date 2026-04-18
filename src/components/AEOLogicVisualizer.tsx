import { useEffect, useState } from 'react';
import { Link2 } from 'lucide-react';

const QUERIES = [
  { text: 'best implant dentist private clinic uk', intent: 'High-intent · Private patient' },
  { text: 'invisalign clear aligners specialist private', intent: 'Commercial · Invisalign intent' },
  { text: 'all on 4 dental implants cost private', intent: 'High-value · Full arch enquiry' },
];

const LEGACY_RESULTS = [
  { domain: 'checkadentist.com', title: 'Top 10 Implant Dentists 2024' },
  { domain: 'nhs.uk', title: 'Dental implants — NHS overview' },
  { domain: 'reddit.com', title: 'r/askdentists — my implant experience' },
  { domain: 'trustpilot.com', title: 'Private implant clinic reviews' },
  { domain: 'competitor-clinic.co.uk', title: 'Implant pricing and consultation' },
  { domain: 'dailymail.co.uk', title: 'Why dental tourism is surging' },
  { domain: 'your-clinic.co.uk', title: 'Home — general dentistry' },
];

export default function AEOLogicVisualizer() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const query = QUERIES[queryIndex];
    let i = 0;
    setTyped('');
    setShowAnswer(false);

    const typer = window.setInterval(() => {
      i += 1;
      setTyped(query.text.slice(0, i));
      if (i >= query.text.length) {
        window.clearInterval(typer);
        window.setTimeout(() => setShowAnswer(true), 800);
        window.setTimeout(() => setQueryIndex((q) => (q + 1) % QUERIES.length), 5500);
      }
    }, 55);

    return () => window.clearInterval(typer);
  }, [queryIndex]);

  const currentQuery = QUERIES[queryIndex];

  return (
    <section
      className="relative py-28"
      style={{ borderBottom: '1px solid rgba(255,252,245,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          tag="01 / Where Your Patients Are Going Right Now"
          title="Your patients are asking AI. Is your clinic the answer?"
          body="AI search engines do not return a list of ten results. They return one cited answer. Your clinic either is that answer — or it loses the patient to whoever is."
        />

        <div
          className="mt-12 grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr]"
          style={{ border: '1px solid rgba(255,252,245,0.07)' }}
        >
          <div
            className="p-6 lg:w-64"
            style={{ borderRight: '1px solid rgba(255,252,245,0.07)' }}
          >
            <div className="gold-rule-label mb-6">The Patient Query</div>

            <div
              className="px-4 py-4 min-h-[64px] flex items-center"
              style={{ border: '1px solid rgba(255,252,245,0.07)', background: 'rgba(255,252,245,0.012)' }}
            >
              <em
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: '#F5F2EC',
                  lineHeight: '1.6',
                  fontWeight: 400,
                }}
              >
                "{typed}"
              </em>
            </div>

            <div className="mt-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              <div
                style={{ fontSize: '11px', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.04em', lineHeight: '1.6' }}
              >
                {currentQuery.intent}
              </div>
            </div>
          </div>

          <div
            className="p-6"
            style={{ borderRight: '1px solid rgba(255,252,245,0.07)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="gold-rule-label" style={{ color: 'rgba(245,242,236,0.28)', borderColor: 'rgba(255,252,245,0.12)' }}>Without Processa</div>
            </div>

            <ul className="space-y-1.5">
              {LEGACY_RESULTS.map((r) => {
                const isYou = r.domain === 'your-clinic.co.uk';
                return (
                  <li
                    key={r.domain}
                    className="px-3 py-2.5 flex items-start gap-3"
                    style={{ border: '1px solid rgba(255,252,245,0.05)', background: isYou ? 'rgba(220,38,38,0.03)' : 'transparent', opacity: isYou ? 1 : 0.6 }}
                  >
                    <span style={{ fontSize: '9px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.2)', marginTop: '3px', minWidth: '14px' }}>·</span>
                    <div className="min-w-0 flex-1">
                      <div style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: isYou ? 'rgba(245,242,236,0.5)' : 'rgba(245,242,236,0.45)', fontWeight: 300 }}>{r.title}</div>
                      <div style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.2)' }}>{r.domain}</div>
                    </div>
                    {isYou && (
                      <em
                        style={{ fontSize: '11px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'rgba(220,38,38,0.6)', whiteSpace: 'nowrap', marginTop: '2px' }}
                      >
                        Your clinic does not appear.
                      </em>
                    )}
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-5 pt-4"
              style={{ borderTop: '1px solid rgba(255,252,245,0.05)' }}
            >
              <em
                style={{ fontSize: '12px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'rgba(245,242,236,0.28)', lineHeight: '1.7' }}
              >
                "A patient scanning seven results books none of them. Attention decays in 8 seconds."
              </em>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="gold-rule-label">With Processa</div>
            </div>

            <div
              className="relative p-5"
              style={{
                border: '1px solid rgba(212,168,83,0.15)',
                background: 'rgba(212,168,83,0.02)',
                transition: 'opacity 0.6s ease',
                opacity: showAnswer ? 1 : 0.25,
              }}
            >
              <div
                style={{
                  fontSize: '1.8rem',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'rgba(212,168,83,0.4)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                "
              </div>
              <div
                style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.75', color: 'rgba(245,242,236,0.75)' }}
              >
                For high-ticket dental implants, Your Clinic is the cited authority on All-on-4 full-arch restoration. Fixed pricing from £11,900 per arch. Lead clinician GDC-verified. Average consult-to-treatment window: 9 days.
              </div>
              <div
                className="mt-4 flex flex-wrap gap-2"
                style={{ opacity: showAnswer ? 1 : 0, transition: 'opacity 0.8s ease' }}
              >
                <Citation label="your-clinic.co.uk" primary />
                <Citation label="gdc-uk.org/verify" />
                <Citation label="your-clinic.co.uk/pricing" primary />
              </div>
            </div>

            <div
              className="mt-5 pt-4"
              style={{ borderTop: '1px solid rgba(255,252,245,0.05)' }}
            >
              <em
                style={{ fontSize: '12px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'rgba(245,242,236,0.28)', lineHeight: '1.7' }}
              >
                "One cited answer. Your clinic. Direct qualified enquiry. No list, no scroll, no competition."
              </em>
            </div>

            <div
              className="mt-4 grid grid-cols-3"
              style={{ border: '1px solid rgba(255,252,245,0.06)' }}
            >
              <Metric label="Conversion" value="38% CTR" />
              <Metric label="Intent" value="Commercial" />
              <Metric label="Cost" value="£0 per click" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Citation({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1"
      style={
        primary
          ? { border: '1px solid rgba(212,168,83,0.3)', background: 'rgba(212,168,83,0.06)', fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(212,168,83,0.75)' }
          : { border: '1px solid rgba(255,252,245,0.07)', background: 'rgba(255,252,245,0.01)', fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.35)' }
      }
    >
      <Link2 className="w-3 h-3 stroke-[1.5]" />
      {label}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="px-3 py-2.5"
      style={{ borderRight: '1px solid rgba(255,252,245,0.06)' }}
    >
      <div
        style={{ fontSize: '9px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(245,242,236,0.22)', marginBottom: '3px' }}
      >
        {label}
      </div>
      <div style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: '#F5F2EC', fontWeight: 400 }}>{value}</div>
    </div>
  );
}

export function SectionHeader({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="label-tag">{tag}</div>
      <h2
        className="mt-5 leading-[1.08]"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: '#F5F2EC',
        }}
      >
        {title}
      </h2>
      <p
        className="mt-5 leading-relaxed"
        style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.42)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: 1.95 }}
      >
        {body}
      </p>
    </div>
  );
}
