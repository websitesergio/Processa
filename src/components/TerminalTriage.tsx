import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/session';
import { SectionHeader } from './AEOLogicVisualizer';

const SAMPLE_ENQUIRIES = [
  { name: 'Oliver H.', source: 'SearchGPT citation', label: 'All-on-4 full arch', value: 11900, intent: 'high' as const },
  { name: 'Sofia K.', source: 'Perplexity answer', label: 'Invisalign Comprehensive', value: 5200, intent: 'high' as const },
  { name: 'Anonymous', source: 'Form submission', label: 'Spam signature detected', value: 0, intent: 'disqualified' as const },
  { name: 'Amelia R.', source: 'AI Overview', label: 'Single implant + crown', value: 8400, intent: 'high' as const },
];

const OUTCOMES = [
  {
    id: 'A',
    title: 'Appointment Booked',
    description: 'Qualified implant or Invisalign enquiry. Treatment coordinator notified within 60 seconds. Patient case file opened. Calendar hold confirmed.',
    applies: 'high' as const,
    goldBorder: true,
  },
  {
    id: 'B',
    title: 'Enquiry Nurtured',
    description: 'Long-term enquiry enters a structured education sequence. Attribution tracked. Re-qualification triggered at 14 days.',
    applies: 'nurture' as const,
    goldBorder: false,
  },
  {
    id: 'C',
    title: 'Filtered Out',
    description: 'Bot, spam, or non-target treatment enquiry. Auto-archived with classification note. Zero clinical time wasted.',
    applies: 'disqualified' as const,
    goldBorder: false,
  },
];

export default function RoutingOutcome() {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (hasLogged.current) return;
    hasLogged.current = true;
    const logSample = async () => {
      try {
        await supabase.from('triage_events').insert({
          session_id: getSessionId(),
          enquiry_channel: 'SearchGPT citation',
          intent_detected: 'high',
          terminal_node: 'A',
          time_to_terminal_seconds: 48,
          case_value_estimate: 11900,
        });
      } catch {
        // silent
      }
    };
    const t = window.setTimeout(logSample, 3000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="routing-outcome"
      className="relative py-28"
      style={{ borderBottom: '1px solid rgba(255,252,245,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          tag="03 / Patient Enquiry Routing"
          title="Every patient who enquires is contacted within 60 seconds."
          body="When a patient submits an enquiry, it is immediately classified and routed to the correct outcome — before your receptionist has finished their previous call. No patient sits in an inbox. No high-value appointment is lost to inattention."
        />

        <div
          className="mt-12"
          style={{ border: '1px solid rgba(255,252,245,0.07)' }}
        >
          <div
            className="grid grid-cols-3"
            style={{ borderBottom: '1px solid rgba(255,252,245,0.07)' }}
          >
            {['Enquiry Arrives', 'Classified in under 5s', 'Routed to Outcome'].map((label, i) => (
              <div
                key={label}
                className="px-6 py-4 flex items-center gap-3"
                style={{ borderRight: i < 2 ? '1px solid rgba(255,252,245,0.07)' : 'none' }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: i === 2 ? 'rgba(212,168,83,0.6)' : 'rgba(245,242,236,0.25)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {label}
                </span>
                {i < 2 && (
                  <span style={{ marginLeft: 'auto', color: 'rgba(255,252,245,0.12)', fontSize: '14px' }}>→</span>
                )}
              </div>
            ))}
          </div>

          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {SAMPLE_ENQUIRIES.slice(0, 2).map((enquiry) => (
                <EnquiryCard key={enquiry.name} enquiry={enquiry} />
              ))}
            </div>

            <div
              className="pt-8 mb-10"
              style={{ borderTop: '1px solid rgba(255,252,245,0.05)' }}
            >
              <div className="gold-rule-label mb-6">Routing Outcomes</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {OUTCOMES.map((outcome) => (
                  <OutcomeCard key={outcome.id} outcome={outcome} />
                ))}
              </div>
            </div>

            <div
              className="pt-8"
              style={{ borderTop: '1px solid rgba(255,252,245,0.05)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Principle
                  label="Response SLA"
                  value="Under 60 seconds"
                  note="From enquiry receipt to routed outcome. No exceptions."
                />
                <Principle
                  label="Attribution"
                  value="Complete"
                  note="Every patient tracked from first AI search to booked appointment."
                />
                <Principle
                  label="Clinical time wasted"
                  value="Zero"
                  note="Disqualified enquiries never reach your treatment coordinators."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnquiryCard({ enquiry }: { enquiry: typeof SAMPLE_ENQUIRIES[0] }) {
  const intentColor =
    enquiry.intent === 'high' ? 'rgba(212,168,83,0.75)' :
    enquiry.intent === 'disqualified' ? 'rgba(220,38,38,0.55)' :
    'rgba(245,242,236,0.3)';

  const intentLabel =
    enquiry.intent === 'high' ? 'High-value patient' :
    enquiry.intent === 'disqualified' ? 'Disqualified' :
    'Nurture sequence';

  return (
    <div
      className="p-5"
      style={{ border: '1px solid rgba(255,252,245,0.07)', background: 'rgba(255,252,245,0.012)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div
            style={{ fontSize: '13px', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, color: '#F5F2EC', letterSpacing: '-0.01em' }}
          >
            {enquiry.name}
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.35)', fontWeight: 300, marginTop: '2px' }}>{enquiry.label}</div>
        </div>
        {enquiry.value > 0 && (
          <div
            className="serif-number"
            style={{ fontSize: '1rem' }}
          >
            £{enquiry.value.toLocaleString('en-GB')}
          </div>
        )}
      </div>
      <div
        className="pt-3 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,252,245,0.06)' }}
      >
        <span style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.25)', fontWeight: 300 }}>
          Via {enquiry.source}
        </span>
        <span style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', color: intentColor, letterSpacing: '0.08em' }}>
          {intentLabel}
        </span>
      </div>
    </div>
  );
}

function OutcomeCard({ outcome }: { outcome: typeof OUTCOMES[0] }) {
  return (
    <div
      className="p-5"
      style={{
        border: outcome.goldBorder ? '1px solid rgba(212,168,83,0.2)' : '1px solid rgba(255,252,245,0.06)',
        background: outcome.goldBorder ? 'rgba(212,168,83,0.025)' : 'transparent',
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: outcome.goldBorder ? 'rgba(212,168,83,0.85)' : '#F5F2EC',
          letterSpacing: '-0.01em',
          marginBottom: '10px',
        }}
      >
        {outcome.title}
      </div>
      <p
        style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.38)', lineHeight: '1.8', fontWeight: 300 }}
      >
        {outcome.description}
      </p>
    </div>
  );
}

function Principle({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div>
      <div className="data-field mb-2">{label}</div>
      <div
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: '#F5F2EC', letterSpacing: '-0.02em', marginBottom: '6px' }}
      >
        {value}
      </div>
      <p style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.28)', fontWeight: 300, lineHeight: '1.7' }}>{note}</p>
    </div>
  );
}
