import { useId, useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useInView } from '../lib/useInView';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

type ValidationResult = string | null;

function validateFullName(v: string): ValidationResult {
  const s = v.trim();
  if (s.length < 3) return 'Min 3 characters';
  if (!s.includes(' ')) return 'First & last name required';
  return null;
}

function validateMinLen(min: number) {
  return (v: string): ValidationResult => v.trim().length < min ? `Min ${min} characters` : null;
}

function validateEmail(v: string): ValidationResult {
  return EMAIL_RE.test(v.trim()) ? null : 'Invalid email address';
}

function validateSelect(v: string): ValidationResult {
  return v ? null : 'Selection required';
}

// ─── Lead-volume mapping from AuditorContext ──────────────────────────────────

function leadsToSelectValue(monthlyLeads: number): string {
  if (monthlyLeads <= 20) return 'under_20';
  if (monthlyLeads <= 50) return '20_50';
  if (monthlyLeads <= 100) return '50_100';
  return 'over_100';
}

// ─── Inline Toast ─────────────────────────────────────────────────────────────

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, background: '#0f172a', border: '1px solid rgba(239,68,68,0.45)',
        borderRadius: '10px', padding: '14px 20px', display: 'flex', alignItems: 'center',
        gap: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', maxWidth: '460px',
        width: 'calc(100vw - 2rem)', animation: 'slideInUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, color: '#F5F2EC', flex: 1, lineHeight: 1.5 }}>
        {message}
      </p>
      <button type="button" onClick={onClose}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,242,236,0.4)', padding: '2px', flexShrink: 0 }}>
        <X size={14} />
      </button>
    </div>
  );
}

// ─── FieldGroup ───────────────────────────────────────────────────────────────

function FieldGroup({
  id, label, optional, error, touched, children,
}: {
  id: string; label: string; optional?: boolean;
  error: ValidationResult; touched: boolean;
  children: React.ReactNode;
}) {
  const hasError = touched && error !== null;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '10px' }}>
        <label htmlFor={id} style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          {label}
          {optional && <span style={{ textTransform: 'none', letterSpacing: '0.04em', fontSize: '9px', color: 'rgba(15,23,42,0.25)' }}>optional</span>}
        </label>
        {hasError && (
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(239,68,68,0.85)', textTransform: 'uppercase' as const }}>
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────

function iStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.6)' : 'rgba(15,23,42,0.12)'}`,
    borderRadius: '10px', padding: '14px 18px', fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '16px', fontWeight: 300, color: '#0f172a', outline: 'none',
    transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
  };
}

function onFocusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.07)';
}
function onBlurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.boxShadow = 'none';
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormFields {
  full_name: string;
  business_name: string;
  business_email: string;
  website: string;
  business_size: string;
  problem_statement: string;
}

const INITIAL: FormFields = {
  full_name: '', business_name: '', business_email: '',
  website: '', business_size: '', problem_statement: '',
};

type TouchedFields = Record<'full_name' | 'business_name' | 'business_email' | 'business_size' | 'problem_statement', boolean>;

const INITIAL_TOUCHED: TouchedFields = {
  full_name: false, business_name: false, business_email: false,
  business_size: false, problem_statement: false,
};

type Status = 'idle' | 'submitting' | 'success';

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AccessPage() {
  const [form, setForm] = useState<FormFields>(INITIAL);
  const [status, setStatus] = useState<Status>('idle');
  const [touched, setTouched] = useState<TouchedFields>(INITIAL_TOUCHED);
  const [consentChecked, setConsentChecked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const uid = useId();
  const { state: auditState } = useAuditor();
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formRef, formVisible] = useInView<HTMLDivElement>({ threshold: 0.05 });

  // Pre-fill lead volume from AuditorContext
  useEffect(() => {
    if (auditState.hasRun && auditState.monthlyLeads > 0) {
      setForm((prev) => ({
        ...prev,
        business_size: prev.business_size || leadsToSelectValue(auditState.monthlyLeads),
      }));
    }
  }, [auditState.hasRun, auditState.monthlyLeads]);

  const set = (field: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const touch = (field: keyof TouchedFields) =>
    setTouched((p) => ({ ...p, [field]: true }));

  const errors = {
    full_name: validateFullName(form.full_name),
    business_name: validateMinLen(3)(form.business_name),
    business_email: validateEmail(form.business_email),
    business_size: validateSelect(form.business_size),
    problem_statement: validateMinLen(20)(form.problem_statement),
  };

  const isFormValid = Object.values(errors).every((e) => e === null) && consentChecked;

  const dismissToast = useCallback(() => setToast(null), []);

  function buildMailtoFallback() {
    const subject = encodeURIComponent('Strategic Audit Request');
    const body = encodeURIComponent(
      `Name: ${form.full_name}\nPractice: ${form.business_name}\nEmail: ${form.business_email}\nWebsite: ${form.website}\nLead Volume: ${form.business_size}\n\nProblem Statement:\n${form.problem_statement}${auditState.hasRun ? `\n\nDiagnosed annual exposure: ${formatGBP(auditState.monthlyBleed * 12)}` : ''}`
    );
    return `mailto:marc@sergiodental.com?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ full_name: true, business_name: true, business_email: true, business_size: true, problem_statement: true });

    if (!isFormValid) {
      setToast('Incomplete Data: Please provide full details for a valid audit.');
      return;
    }

    if (status === 'submitting') return;
    setStatus('submitting');

    const enrichedProblem = auditState.hasRun
      ? `${form.problem_statement}\n\n[Quick Audit Result: Annual exposure = ${formatGBP(auditState.monthlyBleed * 12)}, response time = ${auditState.responseMinutes} min avg]`
      : form.problem_statement;

    const payload = {
      full_name: form.full_name.trim(),
      business_name: form.business_name.trim(),
      business_email: form.business_email.trim(),
      website: form.website.trim() || null,
      business_size: form.business_size,
      automation_goal: 'AI patient acquisition — Implant and Invisalign lead conversion',
      problem_statement: enrichedProblem.trim(),
      budget_range: null,
      status: 'new',
    };

    try {
      const { error } = await supabase.from('contact_submissions').insert([payload]);
      if (error) throw error;
      console.log('LEAD_READY_FOR_WEBHOOK', payload);
      setStatus('success');
      setForm(INITIAL);
    } catch {
      window.location.href = buildMailtoFallback();
      setStatus('idle');
    }
  }

  const fieldStyle = (field: keyof typeof errors) => iStyle(touched[field] && errors[field] !== null);
  const handleBlur = (field: keyof TouchedFields) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      touch(field);
      e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)';
      onBlurInput(e);
    };

  return (
    <>
      {toast && <Toast message={toast} onClose={dismissToast} />}

      <main className="mesh-gradient-light min-h-screen">
        <section className="px-6 md:px-12 py-36 md:py-48">
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

              {/* Left col */}
              <div
                ref={headerRef}
                className="lg:col-span-5 lg:sticky lg:top-28 animate-start"
                style={headerVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' } : {}}
              >
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: '#1d4ed8', marginBottom: '20px' }}>
                  Qualification Portal
                </p>
                <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#0f172a', marginBottom: '24px' }}>
                  This Engagement<br />Is Not for Everyone.
                </h1>

                <div className="flex flex-col gap-6 mb-12">
                  <p style={{ fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: 1.9, color: '#475569' }}>
                    We open two new mandates per month. Selection is based on practice profile, treatment mix, and the practice owner's readiness to act on what the diagnostic reveals.
                  </p>
                  <p style={{ fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: 1.9, color: '#475569' }}>
                    If your application is approved, you will receive the PAC diagnostic brief within 48 hours. No cost, no call, no obligation attached to the audit itself.
                  </p>
                </div>

                {auditState.hasRun && (
                  <div className="glass-card rounded-2xl mb-10" style={{ padding: '20px 24px' }}>
                    <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(15,23,42,0.38)', marginBottom: '10px' }}>
                      Your Quick Audit Result
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0f172a', lineHeight: 1, marginBottom: '6px' }}>
                      {formatGBP(auditState.monthlyBleed * 12)}
                    </p>
                    <p style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, color: 'rgba(15,23,42,0.45)' }}>
                      Estimated annual revenue exposure — pre-filled below
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-4" style={{ paddingTop: '24px', borderTop: '1px solid rgba(15,23,42,0.08)' }}>
                  {CRITERIA.map((criterion) => (
                    <div key={criterion} className="flex items-start gap-3">
                      <span style={{ marginTop: '5px', width: '5px', height: '5px', borderRadius: '50%', background: '#1d4ed8', flexShrink: 0, opacity: 0.6, display: 'block' }} />
                      <p style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: 1.7, color: '#475569' }}>
                        {criterion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div
                ref={formRef}
                className="lg:col-span-6 lg:col-start-7 animate-start"
                style={formVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s' } : {}}
              >
                {status === 'success' ? (
                  <div
                    className="glass-card rounded-3xl"
                    style={{
                      padding: 'clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 4rem)',
                      textAlign: 'center',
                      animation: 'fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
                    }}
                  >
                    {/* Monogram */}
                    <div style={{ marginBottom: '2rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          border: '1px solid rgba(15,23,42,0.1)',
                          lineHeight: '56px',
                          textAlign: 'center',
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: 'italic',
                          fontSize: '1.5rem',
                          color: 'rgba(15,23,42,0.25)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        P
                      </span>
                    </div>

                    <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(15,23,42,0.35)', marginBottom: '1.5rem' }}>
                      Application Received
                    </p>

                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        lineHeight: 1.04,
                        letterSpacing: '-0.04em',
                        color: '#0f172a',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Application
                    </h2>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        lineHeight: 1.04,
                        letterSpacing: '-0.03em',
                        color: 'rgba(15,23,42,0.35)',
                        marginBottom: '2rem',
                      }}
                    >
                      Received.
                    </h2>

                    <div style={{ width: '32px', height: '1px', background: 'rgba(15,23,42,0.1)', margin: '0 auto 2rem' }} />

                    <p
                      style={{
                        fontSize: '15px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: '#475569',
                        maxWidth: '34ch',
                        margin: '0 auto',
                      }}
                    >
                      Marc or Sergio will contact you within 60 minutes for your strategic brief.
                    </p>
                  </div>
                ) : (
                  <div className="glass-card rounded-3xl" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(15,23,42,0.38)', marginBottom: '24px', paddingLeft: '14px', borderLeft: '2px solid rgba(15,23,42,0.12)' }}>
                      Qualification Application
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FieldGroup id={`${uid}-name`} label="Full Name" error={errors.full_name} touched={touched.full_name}>
                          <input id={`${uid}-name`} type="text" autoComplete="name" placeholder="Dr. Sarah Mitchell"
                            value={form.full_name} onChange={set('full_name')}
                            onFocus={onFocusInput} onBlur={handleBlur('full_name')}
                            style={fieldStyle('full_name')} />
                        </FieldGroup>

                        <FieldGroup id={`${uid}-practice`} label="Practice Name" error={errors.business_name} touched={touched.business_name}>
                          <input id={`${uid}-practice`} type="text" placeholder="Mitchell Dental"
                            value={form.business_name} onChange={set('business_name')}
                            onFocus={onFocusInput} onBlur={handleBlur('business_name')}
                            style={fieldStyle('business_name')} />
                        </FieldGroup>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FieldGroup id={`${uid}-email`} label="Practice Email" error={errors.business_email} touched={touched.business_email}>
                          <input id={`${uid}-email`} type="email" autoComplete="email" placeholder="dr@mitchelldental.co.uk"
                            value={form.business_email} onChange={set('business_email')}
                            onFocus={onFocusInput} onBlur={handleBlur('business_email')}
                            style={fieldStyle('business_email')} />
                        </FieldGroup>

                        <FieldGroup id={`${uid}-website`} label="Website" optional error={null} touched={false}>
                          <input id={`${uid}-website`} type="url" placeholder="https://"
                            value={form.website} onChange={set('website')}
                            onFocus={onFocusInput} onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; onBlurInput(e); }}
                            style={iStyle(false)} />
                        </FieldGroup>
                      </div>

                      <FieldGroup id={`${uid}-size`} label="Monthly Lead Volume" error={errors.business_size} touched={touched.business_size}>
                        <select id={`${uid}-size`} value={form.business_size} onChange={set('business_size')}
                          onFocus={onFocusInput} onBlur={handleBlur('business_size')}
                          style={{ ...fieldStyle('business_size'), appearance: 'none', cursor: 'pointer', color: form.business_size === '' ? 'rgba(15,23,42,0.35)' : '#0f172a' }}>
                          <option value="" disabled>Select monthly lead volume</option>
                          {VOLUME_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </FieldGroup>

                      <FieldGroup id={`${uid}-problem`} label="Describe Your Current Pipeline Problem" error={errors.problem_statement} touched={touched.problem_statement}>
                        <textarea id={`${uid}-problem`} rows={5}
                          placeholder={
                            auditState.hasRun
                              ? `Our diagnosed annual exposure is ${formatGBP(auditState.monthlyBleed * 12)}. We receive enquiries but Lead Velocity is poor...`
                              : 'We receive enquiries but our Lead Velocity is poor. Our PAC has increased 40% but conversion has not moved... (min 20 characters)'
                          }
                          value={form.problem_statement} onChange={set('problem_statement')}
                          onFocus={onFocusInput} onBlur={handleBlur('problem_statement')}
                          style={{ ...fieldStyle('problem_statement'), resize: 'none', lineHeight: 1.9 }} />
                      </FieldGroup>

                      <div>
                        {/* GDPR Consent */}
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            marginBottom: '18px',
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={consentChecked}
                            onChange={(e) => setConsentChecked(e.target.checked)}
                            style={{ marginTop: '3px', flexShrink: 0, accentColor: '#0f172a', width: '14px', height: '14px', cursor: 'pointer' }}
                          />
                          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(15,23,42,0.5)' }}>
                            I agree to the processing of my data in accordance with the{' '}
                            <Link
                              to="/privacy"
                              style={{ color: '#0f172a', fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: 'rgba(15,23,42,0.3)' }}
                            >
                              Privacy Policy
                            </Link>
                            .
                          </span>
                        </label>

                        <button
                          type="submit"
                          disabled={status === 'submitting' || !isFormValid}
                          className="btn-premium w-full"
                          style={{ padding: '16px 32px', opacity: isFormValid ? 1 : 0.45, cursor: isFormValid && status !== 'submitting' ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s ease' }}
                        >
                          {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                        </button>
                        <p style={{ marginTop: '14px', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(15,23,42,0.3)' }}>
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
    </>
  );
}
