import { useState, useCallback, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useInView } from '../lib/useInView';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

type FieldRules = {
  minLen?: number;
  requireSpace?: boolean;
  isEmail?: boolean;
  minNumber?: number;
};

function validate(value: string, rules: FieldRules): string | null {
  const v = value.trim();
  if (rules.minLen && v.length < rules.minLen) return `Min ${rules.minLen} characters`;
  if (rules.requireSpace && !v.includes(' ')) return 'First & last name required';
  if (rules.isEmail && !EMAIL_RE.test(v)) return 'Invalid email address';
  if (rules.minNumber !== undefined && (v === '' || Number(v) <= rules.minNumber)) return 'Required';
  return null;
}

type FormState = 'idle' | 'loading' | 'success';

// ─── Shared input style helpers ───────────────────────────────────────────────

function fieldStyle(error: string | null, touched: boolean): React.CSSProperties {
  const hasError = touched && error !== null;
  return {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '12px',
    padding: '16px 20px',
    color: '#F5F2EC',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
  };
}

// ─── Field wrapper with error label ──────────────────────────────────────────

function ValidatedField({
  label,
  error,
  touched,
  children,
}: {
  label?: string;
  error: string | null;
  touched: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative', marginBottom: '12px' }}>
      {children}
      {touched && error && (
        <p
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(239,68,68,0.8)',
            pointerEvents: 'none',
          }}
        >
          {error}
        </p>
      )}
      {label && <span style={{ display: 'none' }}>{label}</span>}
    </div>
  );
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
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: '#0f172a',
        border: '1px solid rgba(239,68,68,0.4)',
        borderRadius: '10px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        maxWidth: '420px',
        width: 'calc(100vw - 2rem)',
        animation: 'slideInUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, color: '#F5F2EC', flex: 1, lineHeight: 1.5 }}>
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,242,236,0.4)', padding: '2px', flexShrink: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [monthlyEnquiries, setMonthlyEnquiries] = useState('');
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [toast, setToast] = useState<string | null>(null);

  // Track which fields have been touched (blurred at least once)
  const [touched, setTouched] = useState({
    fullName: false,
    clinicName: false,
    monthlyEnquiries: false,
    email: false,
    challenge: false,
  });

  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [formRef, formVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { state: auditState } = useAuditor();

  const touch = (field: keyof typeof touched) => setTouched((p) => ({ ...p, [field]: true }));

  // Per-field errors
  const errors = {
    fullName: validate(fullName, { minLen: 3, requireSpace: true }),
    clinicName: validate(clinicName, { minLen: 3 }),
    monthlyEnquiries: validate(monthlyEnquiries, { minNumber: 0 }),
    email: validate(email, { isEmail: true }),
    challenge: validate(challenge, { minLen: 20 }),
  };

  const isFormValid = Object.values(errors).every((e) => e === null) && consentChecked;

  const dismissToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields to surface any hidden errors
    setTouched({ fullName: true, clinicName: true, monthlyEnquiries: true, email: true, challenge: true });

    if (!isFormValid) {
      setToast('Incomplete Data: Please provide full details for a valid audit.');
      return;
    }

    setFormState('loading');

    const problemStatement = auditState.hasRun
      ? `${challenge.trim()}\n\n[Quick Audit: Monthly enquiries: ${monthlyEnquiries}. Diagnosed annual exposure: ${formatGBP(auditState.monthlyBleed * 12)}. Response time: ${auditState.responseMinutes} min avg.]`
      : `${challenge.trim()}\n\nMonthly high-ticket enquiries: ${monthlyEnquiries}`;

    const payload = {
      full_name: fullName.trim(),
      business_name: clinicName.trim(),
      business_email: email.trim(),
      website: null,
      business_size: monthlyEnquiries.trim(),
      automation_goal: 'AI patient acquisition — Implant and Invisalign lead conversion',
      problem_statement: problemStatement,
      budget_range: null,
      status: 'new',
    };

    try {
      const { error } = await supabase.from('contact_submissions').insert([payload]);
      if (error) throw error;
      setFormState('success');
    } catch {
      const body = encodeURIComponent(
        `Full Name: ${payload.full_name}\nClinic: ${clinicName}\nEnquiries/month: ${monthlyEnquiries}\nEmail: ${email}\nChallenge: ${challenge}${auditState.hasRun ? `\n\nDiagnosed Annual Exposure: ${formatGBP(auditState.monthlyBleed * 12)}` : ''}`
      );
      window.location.href = `mailto:marc@sergiodental.com?subject=Strategic Audit Application - ${clinicName}&body=${body}`;
      setFormState('success');
    }
  };

  // Input style helpers
  const iStyle = (field: keyof typeof errors): React.CSSProperties => ({
    ...fieldStyle(errors[field], touched[field]),
    paddingBottom: touched[field] && errors[field] ? '28px' : '16px',
  });

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = touched[e.currentTarget.name as keyof typeof errors] && errors[e.currentTarget.name as keyof typeof errors]
      ? 'rgba(239,68,68,0.8)'
      : 'rgba(255,255,255,0.25)';
    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.04)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={dismissToast} />}

      <section id="contact" className="dark-mesh-gradient py-32">
        <div className="max-w-6xl mx-auto px-6">

          <div
            ref={headerRef}
            className="text-center max-w-2xl mx-auto mb-16 animate-start"
            style={headerVisible ? {
              opacity: 1, transform: 'translateY(0)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            } : {}}
          >
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', fontWeight: 400,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.35)',
                marginBottom: '1.5rem', paddingLeft: '14px', borderLeft: '2px solid rgba(245,242,236,0.12)',
                display: 'inline-block',
              }}
            >
              Secure Access
            </p>
            <h2
              className="font-serif font-bold text-white"
              style={{ fontSize: 'clamp(3rem, 5vw, 3.5rem)', lineHeight: 1.04, letterSpacing: '-0.04em', display: 'block', marginTop: '1rem' }}
            >
              Secure Your Infrastructure.
            </h2>
            <div style={{ width: '32px', height: '1px', background: 'rgba(245,242,236,0.15)', margin: '1.5rem auto' }} />
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,242,236,0.45)' }}>
              This engagement is not for everyone. We onboard exactly 2 private clinics per month to ensure architectural integrity. Apply below.
            </p>

            {auditState.hasRun && (
              <div
                style={{
                  marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '10px 18px', border: '1px solid rgba(212,168,83,0.18)', background: 'rgba(212,168,83,0.04)',
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'rgba(212,168,83,0.85)' }}>
                  {formatGBP(auditState.monthlyBleed * 12)}
                </span>
                <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(212,168,83,0.5)', lineHeight: 1.5 }}>
                  Your diagnosed<br />annual exposure
                </span>
              </div>
            )}
          </div>

          <div
            ref={formRef}
            className="max-w-lg mx-auto animate-start"
            style={formVisible ? {
              opacity: 1, transform: 'translateY(0)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
            } : {}}
          >
            {formState === 'success' ? (
              <div className="text-center py-16">
                <p className="font-serif font-bold text-white" style={{ fontSize: '1.8rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Application Received.
                </p>
                <div style={{ width: '32px', height: '1px', background: 'rgba(245,242,236,0.15)', margin: '1.5rem auto' }} />
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', fontWeight: 300, color: 'rgba(245,242,236,0.45)', lineHeight: 1.85 }}>
                  Marc will contact you within 24 hours if you qualify.
                </p>
              </div>
            ) : (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  boxShadow: '0 8px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <form onSubmit={handleSubmit} noValidate>

                  <ValidatedField error={errors.fullName} touched={touched.fullName}>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name (First + Last)"
                      value={fullName}
                      autoComplete="name"
                      onChange={(e) => setFullName(e.target.value)}
                      onFocus={onFocus}
                      onBlur={(e) => { touch('fullName'); onBlur(e); }}
                      style={iStyle('fullName')}
                    />
                  </ValidatedField>

                  <ValidatedField error={errors.clinicName} touched={touched.clinicName}>
                    <input
                      type="text"
                      name="clinicName"
                      placeholder="Clinic / Practice Name"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      onFocus={onFocus}
                      onBlur={(e) => { touch('clinicName'); onBlur(e); }}
                      style={iStyle('clinicName')}
                    />
                  </ValidatedField>

                  <ValidatedField error={errors.monthlyEnquiries} touched={touched.monthlyEnquiries}>
                    <input
                      type="number"
                      name="monthlyEnquiries"
                      placeholder="Monthly High-Ticket Enquiries"
                      value={monthlyEnquiries}
                      min="1"
                      onChange={(e) => setMonthlyEnquiries(e.target.value)}
                      onFocus={onFocus}
                      onBlur={(e) => { touch('monthlyEnquiries'); onBlur(e); }}
                      style={iStyle('monthlyEnquiries')}
                    />
                  </ValidatedField>

                  <ValidatedField error={errors.email} touched={touched.email}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Owner / Director Email"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={onFocus}
                      onBlur={(e) => { touch('email'); onBlur(e); }}
                      style={iStyle('email')}
                    />
                  </ValidatedField>

                  <ValidatedField error={errors.challenge} touched={touched.challenge}>
                    <textarea
                      name="challenge"
                      placeholder="Describe your current pipeline challenge (min 20 characters)"
                      value={challenge}
                      rows={4}
                      onChange={(e) => setChallenge(e.target.value)}
                      onFocus={onFocus}
                      onBlur={(e) => { touch('challenge'); onBlur(e); }}
                      style={{
                        ...iStyle('challenge'),
                        resize: 'none',
                        lineHeight: 1.75,
                        paddingBottom: touched.challenge && errors.challenge ? '28px' : '16px',
                      }}
                    />
                  </ValidatedField>

                  {/* GDPR Consent */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      style={{ marginTop: '3px', flexShrink: 0, accentColor: '#F5F2EC', width: '14px', height: '14px', cursor: 'pointer' }}
                    />
                    <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,242,236,0.5)' }}>
                      I agree to the processing of my data in accordance with the{' '}
                      <Link
                        to="/privacy"
                        style={{ color: 'rgba(245,242,236,0.8)', fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: 'rgba(245,242,236,0.3)' }}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={formState === 'loading' || !isFormValid}
                    style={{
                      width: '100%',
                      background: isFormValid ? '#F5F2EC' : 'rgba(245,242,236,0.25)',
                      color: isFormValid ? '#0f172a' : 'rgba(15,23,42,0.45)',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '18px 24px',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: isFormValid && formState !== 'loading' ? 'pointer' : 'not-allowed',
                      marginTop: '8px',
                      transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: isFormValid ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (isFormValid && formState !== 'loading') {
                        (e.currentTarget).style.transform = 'translateY(-2px)';
                        (e.currentTarget).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), 0 0 0 4px rgba(245,242,236,0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget).style.transform = 'translateY(0)';
                      (e.currentTarget).style.boxShadow = isFormValid ? '0 2px 20px rgba(0,0,0,0.3)' : 'none';
                    }}
                  >
                    {formState === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                      'Apply for Strategic Audit'
                    )}
                  </button>

                </form>
              </div>
            )}
          </div>

          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '2rem',
              marginTop: '4rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '1rem',
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.08em', color: 'rgba(245,242,236,0.22)', lineHeight: 1.8 }}>
                &copy; 2026 Processa Advisory Ltd. All rights reserved.<br />
                Registered in accordance with UK Data Protection standards.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link
                  to="/privacy"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(245,242,236,0.3)', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.3)'; }}
                >
                  Privacy Policy
                </Link>
                <span style={{ color: 'rgba(245,242,236,0.12)', fontSize: '10px' }}>&middot;</span>
                <Link
                  to="/terms"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(245,242,236,0.3)', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.3)'; }}
                >
                  Terms of Service
                </Link>
                <span style={{ color: 'rgba(245,242,236,0.12)', fontSize: '10px' }}>&middot;</span>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(245,242,236,0.3)' }}>
                  marc@sergiodental.com
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
