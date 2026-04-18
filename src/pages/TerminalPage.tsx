import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useAuditor, formatGBP } from '../lib/AuditorContext';
import { supabase } from '../lib/supabase';

const PRIMARY_CONTACT = 'marc@sergiodental.com';
const STRATEGY_CONTACT = 'sergio@sergiodental.com';

const QUALIFYING_CRITERIA = [
  'Your practice earns primarily from implant and Invisalign cases.',
  'You are receiving at least 20 patient enquiries per month.',
  'You are prepared to act on Marc\'s findings within 30 days.',
];

export default function TerminalPage() {
  useDocumentMeta({
    title: 'Processa | Secure Access — A Conversation with Marc, If You Qualify',
    description:
      'Apply for a Strategic Revenue Audit with Marc. Marc evaluates your clinic\'s fit and revenue exposure personally. Two deployment slots available per month.',
    path: '/access',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Processa — Secure Access',
      url: 'https://sergiogroup.org/access',
      isPartOf: { '@id': 'https://sergiogroup.org/#website' },
      about: { '@id': 'https://sergiogroup.org/#organization' },
    },
  });

  const { state } = useAuditor();

  return (
    <div className="min-h-screen">
      <section
        className="relative"
        style={{
          paddingTop: '8rem',
          paddingBottom: '8rem',
          borderBottom: '1px solid rgba(255,252,245,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="label-tag mb-8">04 / Secure Access</div>
          <h1
            className="max-w-2xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              color: '#F5F2EC',
            }}
          >
            A conversation with Marc. If you qualify.
          </h1>
          <p
            className="mt-7 max-w-xl"
            style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.38)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.95', letterSpacing: '0.01em' }}
          >
            Marc evaluates every new client personally. He assesses your clinic's business fit and revenue exposure before any deployment commitment is made. If your practice qualifies, Sergio's team installs the full infrastructure within 14 days.
          </p>

          <div
            className="mt-10 p-7 max-w-xl"
            style={{ border: '1px solid rgba(255,252,245,0.06)', background: 'rgba(255,252,245,0.008)' }}
          >
            <div className="label-tag mb-6">This engagement is not for everyone.</div>
            <ul className="space-y-4">
              {QUALIFYING_CRITERIA.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span style={{ color: 'rgba(212,168,83,0.5)', marginTop: '3px', fontSize: '10px', flexShrink: 0 }}>—</span>
                  <em
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '14px', color: 'rgba(245,242,236,0.5)', lineHeight: '1.7' }}
                  >
                    {c}
                  </em>
                </li>
              ))}
            </ul>
            <p
              className="mt-6"
              style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.3)', fontWeight: 300, lineHeight: '1.8' }}
            >
              If these describe your practice, the conversation with Marc begins here.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_360px]"
            style={{ border: '1px solid rgba(255,252,245,0.06)' }}
          >
            <div
              className="p-10 md:p-14"
              style={{ background: 'rgba(255,252,245,0.012)', borderRight: '1px solid rgba(255,252,245,0.06)' }}
            >
              <AccessForm primaryContact={PRIMARY_CONTACT} auditState={state} />
            </div>
            <div
              className="p-8 md:p-10 flex flex-col gap-10"
              style={{ background: 'rgba(255,252,245,0.005)' }}
            >
              <SidePanel primaryContact={PRIMARY_CONTACT} strategyContact={STRATEGY_CONTACT} auditState={state} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function AccessForm({
  primaryContact,
  auditState,
}: {
  primaryContact: string;
  auditState: { monthlyLeads: number; caseValue: number; responseMinutes: number; monthlyBleed: number; hasRun: boolean };
}) {
  const [clinicName, setClinicName] = useState('');
  const [email, setEmail] = useState('');
  const [leadVolume, setLeadVolume] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicName.trim() || !email.trim() || !leadVolume.trim()) return;
    setStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        full_name: email.split('@')[0],
        business_name: clinicName.trim(),
        business_email: email.trim(),
        automation_goal: `Monthly lead volume: ${leadVolume.trim()}`,
        problem_statement: auditState.hasRun
          ? `Strategic audit request.\n\nDiagnosed monthly revenue loss: ${formatGBP(auditState.monthlyBleed)}. Leads: ${auditState.monthlyLeads}. LTV: ${formatGBP(auditState.caseValue)}. Response: ${auditState.responseMinutes} min.`
          : 'Requesting a strategic revenue audit for my dental practice.',
        business_size: '1-5',
        status: 'new',
      });
      if (error) throw error;
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-6">
        <div
          className="p-8"
          style={{ border: '1px solid rgba(212,168,83,0.2)', background: 'rgba(212,168,83,0.02)' }}
        >
          <div className="flex items-start gap-4">
            <CheckCircle size={18} strokeWidth={1.5} style={{ color: 'rgba(212,168,83,0.7)' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <div
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, color: '#F5F2EC', letterSpacing: '-0.01em' }}
              >
                Application received.
              </div>
              <div
                className="mt-3"
                style={{ fontSize: '14px', color: 'rgba(245,242,236,0.42)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.8' }}
              >
                Marc will review your application and respond within one business hour during trading hours. He evaluates every new client personally. If your practice qualifies, Sergio's team manages the installation.
              </div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.25)' }}>
          You may also reach Marc directly at{' '}
          <a
            href={`mailto:${primaryContact}`}
            style={{ color: 'rgba(245,242,236,0.42)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.7)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.42)'; }}
          >
            {primaryContact}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-12">
        <div className="label-tag mb-5">Qualification Request</div>
        <div
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: '1.1', color: '#F5F2EC', fontWeight: 700 }}
        >
          Apply for a Strategic Audit with Marc.
        </div>
        <p
          className="mt-4"
          style={{ fontSize: '14px', color: 'rgba(245,242,236,0.38)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.85' }}
        >
          Three fields. Marc reviews personally and confirms eligibility within one business hour.
        </p>
      </div>

      {auditState.hasRun && (
        <div
          className="mb-9 p-6"
          style={{ border: '1px solid rgba(212,168,83,0.12)', background: 'rgba(212,168,83,0.015)' }}
        >
          <div className="gold-rule-label mb-5">Diagnostic Detected</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="data-field mb-2">Diagnosed Annual Exposure</div>
              <div className="serif-number" style={{ fontSize: '1.4rem' }}>
                {formatGBP(auditState.monthlyBleed * 12)}
              </div>
            </div>
            <div>
              <div className="data-field mb-2">Response Window</div>
              <div className="serif-number" style={{ fontSize: '1.4rem' }}>
                {auditState.responseMinutes}<span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', fontWeight: 300, color: 'rgba(245,242,236,0.3)' }}> min avg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-7">
        <FormField label="Practice Name" id="clinicName" type="text" value={clinicName} onChange={setClinicName} placeholder="Marylebone Implant Centre" required />
        <FormField label="Owner / Practice Manager Email" id="email" type="email" value={email} onChange={setEmail} placeholder="owner@yourpractice.co.uk" required />
        <FormField label="Estimated Monthly Enquiry Volume" id="leadVolume" type="text" value={leadVolume} onChange={setLeadVolume} placeholder="e.g. 30–60 enquiries per month" required />
      </div>

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-2" style={{ fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(220,38,38,0.7)' }}>
          <AlertCircle size={15} strokeWidth={1.5} />
          Submission failed. Email{' '}
          <a href={`mailto:${primaryContact}`} style={{ textDecoration: 'underline' }}>
            {primaryContact}
          </a>{' '}
          directly.
        </div>
      )}

      <div className="mt-9">
        <button
          type="submit"
          disabled={status === 'submitting' || !clinicName || !email || !leadVolume}
          className="w-full px-5 py-4 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: '#1D4ED8', color: '#F5F2EC', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#2563EB'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
        >
          {status === 'submitting' ? 'Submitting...' : 'Apply for a Strategic Audit with Marc'}
        </button>
      </div>

      <div
        className="mt-7 pt-6"
        style={{ borderTop: '1px solid rgba(255,252,245,0.05)', fontSize: '12px', color: 'rgba(245,242,236,0.2)', fontFamily: 'Inter, system-ui, sans-serif', lineHeight: '1.8', fontWeight: 300 }}
      >
        Processa does not accept briefs from general practices, NHS mixed clinics, or marketing-only scopes. Eligibility confirmed by Marc personally, prior to any engineering commitment.
      </div>
    </form>
  );
}

function SidePanel({
  primaryContact,
  strategyContact,
  auditState,
}: {
  primaryContact: string;
  strategyContact: string;
  auditState: { hasRun: boolean; monthlyBleed: number };
}) {
  const terms = [
    { label: 'Practice Type', value: 'Private — Implant / Invisalign / Full Arch' },
    { label: 'Minimum Case Value', value: '£3,500 per treatment' },
    { label: 'Scope', value: 'Fixed — 14-day deployment' },
    { label: 'Capacity', value: '2 practices per month' },
    { label: 'Response SLA', value: '1 business hour' },
    { label: 'Client Success', value: 'Marc — Senior Strategic Partner' },
    { label: 'Systems Engineering', value: 'Sergio — Lead Engineer' },
  ];

  return (
    <>
      <div>
        <div className="gold-rule-label mb-6">Engagement Terms</div>
        <div className="space-y-0">
          {terms.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 py-4"
              style={{ borderBottom: '1px solid rgba(255,252,245,0.05)' }}
            >
              <span style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, color: 'rgba(245,242,236,0.28)' }}>
                {label}
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.6)', textAlign: 'right' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="gold-rule-label mb-6">Direct Contact</div>
        <div className="space-y-2">
          <a
            href={`mailto:${primaryContact}?subject=${encodeURIComponent('Strategic Revenue Audit Request')}`}
            className="flex items-center justify-between gap-3 p-4 transition-colors duration-150"
            style={{ border: '1px solid rgba(255,252,245,0.06)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,252,245,0.015)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <div>
              <div style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.65)' }}>
                {primaryContact}
              </div>
              <div style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.22)', marginTop: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                Marc — Senior Strategic Partner
              </div>
            </div>
            <ArrowRight size={13} strokeWidth={1.5} style={{ color: 'rgba(245,242,236,0.2)', flexShrink: 0 }} />
          </a>
          <a
            href={`mailto:${strategyContact}`}
            className="flex items-center justify-between gap-3 p-4 transition-colors duration-150"
            style={{ border: '1px solid rgba(255,252,245,0.06)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,252,245,0.015)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <div>
              <div style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.65)' }}>
                {strategyContact}
              </div>
              <div style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.22)', marginTop: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                Sergio — Founder & Lead Systems Engineer
              </div>
            </div>
            <ArrowRight size={13} strokeWidth={1.5} style={{ color: 'rgba(245,242,236,0.2)', flexShrink: 0 }} />
          </a>
        </div>
      </div>

      <div
        className="pt-6 mt-auto"
        style={{ borderTop: '1px solid rgba(255,252,245,0.05)' }}
      >
        <div className="flex items-center justify-between" style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <span style={{ color: 'rgba(245,242,236,0.22)' }}>Diagnostic Status</span>
          <span style={{ color: auditState.hasRun ? 'rgba(212,168,83,0.6)' : 'rgba(245,242,236,0.2)' }}>
            {auditState.hasRun ? 'Diagnostic Complete' : 'No Diagnostic Run'}
          </span>
        </div>
        {auditState.hasRun && (
          <div className="flex items-center justify-between mt-2" style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <span style={{ color: 'rgba(245,242,236,0.22)' }}>Annual Exposure</span>
            <span style={{ color: 'rgba(245,242,236,0.55)' }}>{formatGBP(auditState.monthlyBleed * 12)}</span>
          </div>
        )}
      </div>
    </>
  );
}

function FormField({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 uppercase"
        style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.16em', fontWeight: 500, color: 'rgba(245,242,236,0.28)' }}
      >
        {label} {required && <span style={{ color: 'rgba(212,168,83,0.6)' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full focus:outline-none px-5 py-4 text-sm"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          background: 'rgba(255,252,245,0.02)',
          border: '1px solid rgba(255,252,245,0.07)',
          color: '#F5F2EC',
          transition: 'border-color 0.15s ease',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,252,245,0.07)'; }}
      />
    </div>
  );
}
