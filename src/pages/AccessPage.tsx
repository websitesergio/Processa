import { useId, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useInView } from '../lib/useInView';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

interface FormState {
  full_name: string;
  business_name: string;
  business_email: string;
  website: string;
  business_size: string;
  problem_statement: string;
}

const INITIAL: FormState = {
  full_name: '',
  business_name: '',
  business_email: '',
  website: '',
  business_size: '',
  problem_statement: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const CRITERIA = [
  'Implant or Invisalign practices only',
  'Minimum 5 years in operation',
  'London or South-East catchment',
  'Practice owner must receive the audit directly',
];

const VOLUME_OPTIONS = [
  { value: 'under_20', label: 'Under 20 high-ticket enquiries / month' },
  { value: '20_50',    label: '20–50 enquiries / month' },
  { value: '50_100',   label: '50–100 enquiries / month' },
  { value: 'over_100', label: '100+ enquiries / month' },
];

export default function AccessPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>('idle');
  const uid = useId();
  const { state: auditState } = useAuditor();
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formRef, formVisible] = useInView<HTMLDivElement>({ threshold: 0.05 });

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function buildMailtoFallback(): string {
    const subject = encodeURIComponent('Strategic Audit Request');
    const body = encodeURIComponent(
      `Name: ${form.full_name}\nPractice: ${form.business_name}\nEmail: ${form.business_email}\nWebsite: ${form.website}\nTreatment Focus: ${form.business_size}\n\nProblem Statement:\n${form.problem_statement}${auditState.hasRun ? `\n\nDiagnosed annual exposure: ${formatGBP(auditState.monthlyBleed * 12)}` : ''}`
    );
    return `mailto:marc@sergiodental.com?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const enrichedProblem = auditState.hasRun
      ? `${form.problem_statement}\n\n[Quick Audit Result: Annual exposure = ${formatGBP(auditState.monthlyBleed * 12)}, response time = ${auditState.responseMinutes} min avg]`
      : form.problem_statement;

    try {
      const { error } = await supabase.from('contact_submissions').insert([{
        full_name: form.full_name.trim(),
        business_name: form.business_name.trim(),
        business_email: form.business_email.trim(),
        website: form.website.trim() || null,
        business_size: form.business_size,
        automation_goal: 'AI patient acquisition — Implant and Invisalign lead conversion',
        problem_statement: enrichedProblem.trim(),
        budget_range: null,
        status: 'new',
      }]);
      if (error) throw error;
      setStatus('success');
      setForm(INITIAL);
    } catch {
      window.location.href = buildMailtoFallback();
      setStatus('idle');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(15,23,42,0.12)',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: 300,
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
  };

  return (
    <main className="mesh-gradient-light min-h-screen">
      <section className="px-6 md:px-12 py-36 md:py-48">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

            {/* Left col — qualifying info */}
            <div
              ref={headerRef}
              className="lg:col-span-5 lg:sticky lg:top-28 animate-start"
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
                Qualification Portal
              </p>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.04,
                  color: '#0f172a',
                  marginBottom: '24px',
                }}
              >
                This Engagement<br />Is Not for Everyone.
              </h1>

              <div className="flex flex-col gap-6 mb-12">
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: 'rgba(15,23,42,0.5)',
                  }}
                >
                  We open two new mandates per month. Selection is based on practice profile, treatment mix, and the practice owner's readiness to act on what the diagnostic reveals.
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: 'rgba(15,23,42,0.5)',
                  }}
                >
                  If your application is approved, you will receive the PAC diagnostic brief within 48 hours. No cost, no call, no obligation attached to the audit itself.
                </p>
              </div>

              {/* Diagnosed exposure from context */}
              {auditState.hasRun && (
                <div
                  className="glass-card rounded-2xl mb-10"
                  style={{ padding: '20px 24px' }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '9px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(15,23,42,0.38)',
                      marginBottom: '10px',
                    }}
                  >
                    Your Quick Audit Result
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      color: '#0f172a',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {formatGBP(auditState.monthlyBleed * 12)}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 300,
                      color: 'rgba(15,23,42,0.45)',
                    }}
                  >
                    Estimated annual revenue exposure — pre-filled below
                  </p>
                </div>
              )}

              <div
                className="flex flex-col gap-4"
                style={{
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(15,23,42,0.08)',
                }}
              >
                {CRITERIA.map((criterion) => (
                  <div key={criterion} className="flex items-start gap-3">
                    <span
                      style={{
                        marginTop: '5px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#1d4ed8',
                        flexShrink: 0,
                        opacity: 0.6,
                        display: 'block',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: 'rgba(15,23,42,0.5)',
                      }}
                    >
                      {criterion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col — form */}
            <div
              ref={formRef}
              className="lg:col-span-6 lg:col-start-7 animate-start"
              style={formVisible ? {
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
              } : {}}
            >
              {status === 'success' ? (
                <div className="glass-card rounded-3xl" style={{ padding: '3rem' }}>
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
                    Application Received
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      color: '#0f172a',
                      marginBottom: '16px',
                    }}
                  >
                    Your application is under review.
                  </h2>
                  <p
                    style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.9,
                      color: 'rgba(15,23,42,0.5)',
                      maxWidth: '44ch',
                    }}
                  >
                    If your practice meets our criteria, you will receive the diagnostic brief within 48 hours. No calls. No sales process.
                  </p>
                </div>
              ) : (
                <div className="glass-card rounded-3xl" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '9px',
                      fontWeight: 400,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(15,23,42,0.38)',
                      marginBottom: '24px',
                      paddingLeft: '14px',
                      borderLeft: '2px solid rgba(15,23,42,0.12)',
                    }}
                  >
                    Qualification Application
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FieldGroup id={`${uid}-name`} label="Full Name">
                        <input id={`${uid}-name`} type="text" required autoComplete="name"
                          placeholder="Dr. Sarah Mitchell" value={form.full_name} onChange={set('full_name')}
                          style={inputStyle}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                      </FieldGroup>
                      <FieldGroup id={`${uid}-practice`} label="Practice Name">
                        <input id={`${uid}-practice`} type="text" required
                          placeholder="Mitchell Dental" value={form.business_name} onChange={set('business_name')}
                          style={inputStyle}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                      </FieldGroup>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FieldGroup id={`${uid}-email`} label="Practice Email">
                        <input id={`${uid}-email`} type="email" required autoComplete="email"
                          placeholder="dr@mitchelldental.co.uk" value={form.business_email} onChange={set('business_email')}
                          style={inputStyle}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                      </FieldGroup>
                      <FieldGroup id={`${uid}-website`} label="Website" optional>
                        <input id={`${uid}-website`} type="url"
                          placeholder="https://" value={form.website} onChange={set('website')}
                          style={inputStyle}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                      </FieldGroup>
                    </div>

                    <FieldGroup id={`${uid}-size`} label="Monthly Lead Volume">
                      <select
                        id={`${uid}-size`} required value={form.business_size} onChange={set('business_size')}
                        style={{
                          ...inputStyle,
                          appearance: 'none',
                          cursor: 'pointer',
                          color: form.business_size === '' ? 'rgba(15,23,42,0.35)' : '#0f172a',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <option value="" disabled>Select monthly lead volume</option>
                        {VOLUME_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </FieldGroup>

                    <FieldGroup id={`${uid}-problem`} label="Describe Your Current Pipeline Problem">
                      <textarea
                        id={`${uid}-problem`} required rows={5}
                        placeholder={auditState.hasRun
                          ? `Our diagnosed annual exposure is ${formatGBP(auditState.monthlyBleed * 12)}. We receive enquiries but Lead Velocity is poor...`
                          : 'We receive enquiries but our Lead Velocity is poor. Our PAC has increased 40% but conversion has not moved...'}
                        value={form.problem_statement}
                        onChange={set('problem_statement')}
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.9 }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </FieldGroup>

                    <div>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-premium w-full"
                        style={{ padding: '16px 32px' }}
                      >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                      </button>
                      <p
                        style={{
                          marginTop: '14px',
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '9px',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase' as const,
                          color: 'rgba(15,23,42,0.3)',
                        }}
                      >
                        Applications reviewed within 24 hours &nbsp;&middot;&nbsp; No cold outreach
                      </p>
                    </div>

                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

function FieldGroup({ id, label, optional, children }: { id: string; label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '9px',
          fontWeight: 400,
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
          color: 'rgba(15,23,42,0.4)',
          marginBottom: '10px',
        }}
      >
        {label}
        {optional && (
          <span style={{ textTransform: 'none', letterSpacing: '0.04em', fontSize: '9px', color: 'rgba(15,23,42,0.25)' }}>
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
