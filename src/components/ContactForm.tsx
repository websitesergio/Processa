import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useInView } from '../lib/useInView';
import { useAuditor, formatGBP } from '../lib/AuditorContext';

type FormState = 'idle' | 'loading' | 'success';

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '16px 20px',
  color: '#F5F2EC',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
  marginBottom: '12px',
};

const inputFocus: React.CSSProperties = {
  borderColor: 'rgba(255,255,255,0.25)',
  background: 'rgba(255,255,255,0.08)',
  boxShadow: '0 0 0 3px rgba(255,255,255,0.04)',
};

function Field({
  type, required, placeholder, value, onChange, min,
}: {
  type: string; required?: boolean; placeholder: string;
  value: string; onChange: (v: string) => void; min?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      min={min}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputBase, ...(focused ? inputFocus : {}) }}
    />
  );
}

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [monthlyEnquiries, setMonthlyEnquiries] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [formRef, formVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { state: auditState } = useAuditor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // Build problem_statement enriched with diagnosed exposure if available
    const problemStatement = auditState.hasRun
      ? `Monthly high-ticket enquiries: ${monthlyEnquiries}. Diagnosed annual revenue exposure: ${formatGBP(auditState.monthlyBleed * 12)}. Response time: ${auditState.responseMinutes} min avg.`
      : `Monthly high-ticket enquiries: ${monthlyEnquiries}`;

    const payload = {
      full_name: fullName.trim() || clinicName.trim(),
      business_name: clinicName.trim(),
      business_email: email.trim(),
      website: null,          // not collected at this stage; schema allows nullable
      business_size: monthlyEnquiries.trim(),
      automation_goal: 'AI patient acquisition — Implant and Invisalign lead conversion',
      problem_statement: problemStatement,
      budget_range: null,     // not collected at this stage
      status: 'new',
    };

    try {
      const { error } = await supabase.from('contact_submissions').insert([payload]);
      if (error) throw error;
      setFormState('success');
    } catch {
      const body = encodeURIComponent(
        `Full Name: ${payload.full_name}\nClinic Name: ${clinicName}\nMonthly High-Ticket Enquiries: ${monthlyEnquiries}\nEmail: ${email}\n\n${auditState.hasRun ? `Diagnosed Annual Exposure: ${formatGBP(auditState.monthlyBleed * 12)}` : ''}`
      );
      window.location.href = `mailto:marc@sergiodental.com?subject=Strategic Audit Application - ${clinicName}&body=${body}`;
      setFormState('success');
    }
  };

  return (
    <section id="contact" className="dark-mesh-gradient py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-16 animate-start"
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
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,236,0.35)',
              marginBottom: '1.5rem',
              paddingLeft: '14px',
              borderLeft: '2px solid rgba(245,242,236,0.12)',
              display: 'inline-block',
            }}
          >
            Secure Access
          </p>
          <h2
            className="font-serif font-bold text-white"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.04em',
              fontFeatureSettings: "'liga' 1, 'kern' 1",
              display: 'block',
              marginTop: '1rem',
            }}
          >
            Secure Your Infrastructure.
          </h2>
          <div style={{ width: '32px', height: '1px', background: 'rgba(245,242,236,0.15)', margin: '1.5rem auto' }} />
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'rgba(245,242,236,0.45)',
            }}
          >
            This engagement is not for everyone. We onboard exactly 2 private clinics per month to ensure architectural integrity. Apply below.
          </p>

          {/* Show diagnosed exposure if context has run */}
          {auditState.hasRun && (
            <div
              style={{
                marginTop: '1.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                border: '1px solid rgba(212,168,83,0.18)',
                background: 'rgba(212,168,83,0.04)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'rgba(212,168,83,0.85)',
                }}
              >
                {formatGBP(auditState.monthlyBleed * 12)}
              </span>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(212,168,83,0.5)',
                  lineHeight: 1.5,
                }}
              >
                Your diagnosed<br />annual exposure
              </span>
            </div>
          )}
        </div>

        <div
          ref={formRef}
          className="max-w-lg mx-auto animate-start"
          style={formVisible ? {
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
          } : {}}
        >
          {formState === 'success' ? (
            <div className="text-center py-16">
              <p
                className="font-serif font-bold text-white"
                style={{ fontSize: '1.8rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}
              >
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
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: 'clamp(2rem, 4vw, 3rem)',
                boxShadow: '0 8px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <form onSubmit={handleSubmit}>
                <Field type="text" required placeholder="Your Full Name" value={fullName} onChange={setFullName} />
                <Field type="text" required placeholder="Clinic / Practice Name" value={clinicName} onChange={setClinicName} />
                <Field type="number" required min="0" placeholder="Monthly High-Ticket Enquiries" value={monthlyEnquiries} onChange={setMonthlyEnquiries} />
                <Field type="email" required placeholder="Owner / Director Email" value={email} onChange={setEmail} />

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  style={{
                    width: '100%',
                    background: formState === 'loading' ? 'rgba(245,242,236,0.7)' : '#F5F2EC',
                    color: '#0f172a',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '18px 24px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== 'loading') {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), 0 0 0 4px rgba(245,242,236,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
                  }}
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Apply for Strategic Audit'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-2 mt-24 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(245,242,236,0.25)' }}>
            &copy; 2026 Processa. Strategic Dental Infrastructure.
          </p>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(245,242,236,0.25)', marginTop: '1rem' }} className="md:mt-0">
            marc@sergiodental.com &nbsp;&middot;&nbsp; Directed by Sergio
          </p>
        </div>
      </div>
    </section>
  );
}
