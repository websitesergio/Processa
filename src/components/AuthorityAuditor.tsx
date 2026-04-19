import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/session';
import { SectionHeader } from './AEOLogicVisualizer';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

function computeLeakPct(responseMinutes: number) {
  if (responseMinutes <= 5) return 0.08;
  const capped = Math.min(responseMinutes, 240);
  return Math.min(0.86, 0.08 + (capped - 5) * 0.0042);
}

function verdict(bleed: number) {
  if (bleed < 10000) return {
    label: 'Contained',
    tone: 'rgba(245,242,236,0.35)',
    copy: 'Revenue surface intact. Your practice responds within an acceptable window.',
    critical: false,
  };
  if (bleed < 50000) return {
    label: 'Revenue Exposure Identified',
    tone: 'rgba(212,168,83,0.85)',
    copy: 'Material revenue is leaving your practice unrecovered. A diagnostic conversation with Marc is warranted.',
    critical: false,
  };
  return {
    label: 'Significant Loss Confirmed',
    tone: '#F5F2EC',
    copy: 'Substantial recoverable revenue is being lost each quarter. Every week of inaction compounds this figure.',
    critical: true,
  };
}

const CONTEXT_STATEMENTS = [
  {
    quote: 'The 5-minute response window produces a 21× higher qualification rate than 30 minutes.',
    attribution: 'Lead Response Management Research · Harvard Business Review',
  },
  {
    quote: 'AI search engines surface one cited clinic. The other £168,000 per year is lost before a patient ever finds your website.',
    attribution: 'Processa Revenue Diagnostic · Average across 14 practice engagements',
  },
  {
    quote: 'Every minute your clinic does not appear in SearchGPT is a minute your competitors collect the patient you were owed.',
    attribution: 'Processa Intent Capture Analysis · 2026',
  },
];

export default function AuthorityAuditor() {
  const { state, setState } = useAuditor();
  const [monthlyLeads, setMonthlyLeads] = useState(state.monthlyLeads);
  const [caseValue, setCaseValue] = useState(state.caseValue);
  const [responseMinutes, setResponseMinutes] = useState(state.responseMinutes);
  const timer = useRef<number | null>(null);

  const { leakPct, monthlyBleed, annualBleed, threeYearBleed } = useMemo(() => {
    const pct = computeLeakPct(responseMinutes);
    const monthly = Math.round(monthlyLeads * pct * caseValue);
    return {
      leakPct: pct,
      monthlyBleed: monthly,
      annualBleed: monthly * 12,
      threeYearBleed: monthly * 36,
    };
  }, [monthlyLeads, caseValue, responseMinutes]);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      setState({
        monthlyLeads,
        caseValue,
        responseMinutes,
        monthlyBleed,
        hasRun: true,
        updatedAt: Date.now(),
      });
      try {
        await supabase.from('calculator_interactions').insert({
          session_id: getSessionId(),
          monthly_leads: monthlyLeads,
          case_value: caseValue,
          response_time_minutes: responseMinutes,
          computed_monthly_bleed: monthlyBleed,
        });
      } catch {
        // silent
      }
    }, 900);
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [monthlyLeads, caseValue, responseMinutes, monthlyBleed]);

  const v = verdict(monthlyBleed);

  return (
    <section
      id="authority-auditor"
      className="relative py-28"
      style={{ borderBottom: '1px solid rgba(255,252,245,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          tag="02 / Revenue Leakage Diagnostic"
          title="The cost of your current inaction, precisely calculated."
          body="Set your practice parameters. The figure on the right is your diagnosed annual revenue exposure — calculated against Lead Response Management research. It is not indicative. It is the number."
        />

        <div
          className="mt-12 grid grid-cols-1 lg:grid-cols-5"
          style={{ border: '1px solid rgba(255,252,245,0.07)' }}
        >
          <div
            className="lg:col-span-3 p-10"
            style={{ borderRight: '1px solid rgba(255,252,245,0.07)' }}
          >
            <div
              className="gold-rule-label mb-10"
            >
              Your Practice Parameters
            </div>

            <Slider
              label="Monthly patient enquiries"
              value={monthlyLeads}
              min={5}
              max={200}
              step={1}
              onChange={setMonthlyLeads}
              display={`${monthlyLeads} enquiries`}
            />
            <Slider
              label="Patient case value — implants default £5,000"
              value={caseValue}
              min={1500}
              max={25000}
              step={100}
              onChange={setCaseValue}
              display={`${formatGBP(caseValue)} per case`}
            />
            <Slider
              label="Average response time"
              value={responseMinutes}
              min={1}
              max={240}
              step={1}
              onChange={setResponseMinutes}
              display={`${responseMinutes} minutes`}
            />

            <div
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,252,245,0.06)' }}
            >
              <div className="flex gap-6 mb-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div>
                  <div className="data-field mb-1">Qualification Decay</div>
                  <div style={{ fontSize: '13px', color: '#F5F2EC', letterSpacing: '-0.01em' }}>{(leakPct * 100).toFixed(1)}% of enquiries lost</div>
                </div>
                <div>
                  <div className="data-field mb-1">Research Basis</div>
                  <div style={{ fontSize: '13px', color: 'rgba(245,242,236,0.45)', letterSpacing: '-0.01em' }}>HBR / Lead Response Management 2007</div>
                </div>
              </div>

              <ContextPanel />
            </div>
          </div>

          <div className="lg:col-span-2 p-10 flex flex-col">
            <div className="gold-rule-label mb-10">Annual Revenue Exposure</div>

            <div
              className="p-7 flex flex-col"
              style={{ border: '1px solid rgba(255,252,245,0.07)', background: 'rgba(255,252,245,0.012)', flex: 1 }}
            >
              <div>
                <div
                  className="serif-number leading-none"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)' }}
                >
                  {formatGBP(annualBleed)}
                </div>
                <div
                  className="mt-3"
                  style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.3)', fontWeight: 300 }}
                >
                  {formatGBP(monthlyBleed)} per month · {formatGBP(threeYearBleed)} over 36 months
                </div>
              </div>

              <div
                className="mt-7 pt-6"
                style={{ borderTop: '1px solid rgba(255,252,245,0.06)' }}
              >
                <div
                  style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: v.tone, fontWeight: 500, marginBottom: '8px' }}
                >
                  {v.label}
                </div>
                <p
                  style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.45)', lineHeight: '1.8', fontWeight: 300 }}
                >
                  {v.copy}
                </p>
              </div>

              <div
                className="mt-7 pt-6"
                style={{ borderTop: '1px solid rgba(255,252,245,0.06)' }}
              >
                <div className="flex gap-8">
                  <div>
                    <div className="data-field mb-2">36-Month Exposure</div>
                    <div
                      className="serif-number"
                      style={{ fontSize: '1.4rem' }}
                    >
                      {formatGBP(threeYearBleed)}
                    </div>
                  </div>
                  <div>
                    <div className="data-field mb-2">Monthly Loss</div>
                    <div
                      className="serif-number"
                      style={{ fontSize: '1.4rem' }}
                    >
                      {formatGBP(monthlyBleed)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <a
                href={`mailto:marc@sergiodental.com?subject=${encodeURIComponent('Strategic Revenue Audit Request')}&body=${encodeURIComponent(`Revenue Audit Request.\n\nDiagnostic results:\nMonthly patient enquiries: ${monthlyLeads}\nPatient case value: ${formatGBP(caseValue)}\nResponse time: ${responseMinutes} min\nDiagnosed annual revenue exposure: ${formatGBP(annualBleed)}\n\nPlease confirm availability.`)}`}
                className="w-full block transition-colors duration-150"
                style={{ background: '#1D4ED8' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
              >
                <span
                  className="block w-full text-center px-5 py-4"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#F5F2EC' }}
                >
                  Resolve This with Marc
                </span>
              </a>
              <p
                className="mt-3 text-center"
                style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.2)', lineHeight: '1.7', fontWeight: 300 }}
              >
                Marc responds within one business hour. No automated sequences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContextPanel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % CONTEXT_STATEMENTS.length);
        setVisible(true);
      }, 600);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const item = CONTEXT_STATEMENTS[index];

  return (
    <div
      className="p-6"
      style={{ border: '1px solid rgba(212,168,83,0.1)', background: 'rgba(212,168,83,0.02)' }}
    >
      <div
        style={{
          transition: 'opacity 0.5s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            color: 'rgba(212,168,83,0.5)',
            marginBottom: '10px',
            letterSpacing: '0',
          }}
        >
          "
        </div>
        <p
          className="context-quote"
          style={{ fontSize: '13px', marginBottom: '12px' }}
        >
          {item.quote}
        </p>
        <p
          style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.2)', letterSpacing: '0.08em', fontWeight: 300 }}
        >
          {item.attribution}
        </p>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <label
          style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, color: 'rgba(245,242,236,0.4)' }}
        >
          {label}
        </label>
        <span
          className="serif-number"
          style={{ fontSize: '1.1rem' }}
        >
          {display}
        </span>
      </div>
      <div className="relative h-px" style={{ background: 'rgba(255,252,245,0.08)' }}>
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${pct}%`, height: '1px', background: 'rgba(212,168,83,0.5)' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full cursor-pointer"
          style={{ top: '-10px', height: '21px', opacity: 0 }}
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `calc(${pct}% - 5px)`,
            width: '10px',
            height: '10px',
            background: '#F5F2EC',
            border: '1px solid rgba(212,168,83,0.6)',
          }}
        />
      </div>
      <div
        className="mt-2 flex justify-between uppercase tracking-wider"
        style={{ fontSize: '9px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.18)' }}
      >
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
