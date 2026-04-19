import { useEffect, useState, useId } from 'react';
import { supabase } from '../lib/supabase';

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

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}

function FormField({ id, label, optional, children }: FieldProps) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="flex items-baseline gap-3 font-sans font-light text-[10px] uppercase tracking-widest text-slate-400 mb-4 transition-colors duration-200 group-focus-within:text-blue-700"
      >
        {label}
        {optional && (
          <span className="normal-case tracking-normal text-slate-300">
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full bg-transparent font-sans font-light text-slate-900 text-base placeholder-slate-300 border-b border-slate-200 py-4 focus:outline-none focus:border-blue-700 transition-colors duration-200';

export default function AccessPage() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>('idle');
  const uid = useId();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function buildMailtoFallback(): string {
    const subject = encodeURIComponent('Strategic Audit Request');
    const body = encodeURIComponent(
      `Name: ${form.full_name}\nPractice: ${form.business_name}\nEmail: ${form.business_email}\nWebsite: ${form.website}\nTreatment Focus: ${form.business_size}\n\nProblem Statement:\n${form.problem_statement}`
    );
    return `mailto:marc@sergiodental.com?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          full_name: form.full_name,
          business_name: form.business_name,
          business_email: form.business_email,
          website: form.website || null,
          business_size: form.business_size,
          problem_statement: form.problem_statement,
          status: 'new',
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setForm(INITIAL);
    } catch {
      window.location.href = buildMailtoFallback();
      setStatus('idle');
    }
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="px-6 md:px-16 py-40 md:py-52">
        <div
          className={[
            'max-w-7xl mx-auto transition-all duration-1000 ease-out',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-8">
                Qualification Portal
              </p>
              <h1 className="font-serif font-semibold text-slate-900 leading-[1.06] tracking-tighter text-[clamp(2.25rem,5vw,4rem)] mb-10">
                This Engagement<br />Is Not for Everyone.
              </h1>

              <div className="flex flex-col gap-8 mb-16">
                <p className="font-sans font-light text-slate-500 text-base leading-[1.9]">
                  We open two new mandates per month. Selection is based on practice profile, treatment mix, and the practice owner's readiness to act on what the diagnostic reveals.
                </p>
                <p className="font-sans font-light text-slate-500 text-base leading-[1.9]">
                  If your application is approved, you will receive the PAC diagnostic brief within 48 hours. No cost, no call, no obligation attached to the audit itself.
                </p>
              </div>

              <div className="flex flex-col gap-5 border-t border-slate-100 pt-10">
                {[
                  'Implant or Invisalign practices only',
                  'Minimum 5 years in operation',
                  'London or South-East catchment',
                  'Practice owner must receive the audit directly',
                ].map((criterion) => (
                  <div key={criterion} className="flex items-start gap-4">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-blue-700 shrink-0 opacity-60" />
                    <p className="font-sans font-light text-slate-500 text-sm leading-relaxed">
                      {criterion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {status === 'success' ? (
                <div className="py-24">
                  <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-8">
                    Application Received
                  </p>
                  <p className="font-serif font-semibold text-slate-900 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tighter mb-8">
                    Your application is under review.
                  </p>
                  <p className="font-sans font-light text-slate-500 text-base leading-[1.9] max-w-[44ch]">
                    If your practice meets our criteria, you will receive the diagnostic brief within 48 hours. No calls. No sales process.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <FormField id={`${uid}-name`} label="Full Name">
                      <input
                        id={`${uid}-name`}
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Dr. Sarah Mitchell"
                        value={form.full_name}
                        onChange={set('full_name')}
                        className={inputClass}
                      />
                    </FormField>
                    <FormField id={`${uid}-practice`} label="Practice Name">
                      <input
                        id={`${uid}-practice`}
                        type="text"
                        required
                        placeholder="Mitchell Dental"
                        value={form.business_name}
                        onChange={set('business_name')}
                        className={inputClass}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <FormField id={`${uid}-email`} label="Practice Email">
                      <input
                        id={`${uid}-email`}
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="dr@mitchelldental.co.uk"
                        value={form.business_email}
                        onChange={set('business_email')}
                        className={inputClass}
                      />
                    </FormField>
                    <FormField id={`${uid}-website`} label="Website" optional>
                      <input
                        id={`${uid}-website`}
                        type="url"
                        placeholder="https://"
                        value={form.website}
                        onChange={set('website')}
                        className={inputClass}
                      />
                    </FormField>
                  </div>

                  <FormField id={`${uid}-size`} label="Monthly Lead Volume">
                    <select
                      id={`${uid}-size`}
                      required
                      value={form.business_size}
                      onChange={set('business_size')}
                      className={[
                        inputClass,
                        'appearance-none cursor-pointer',
                        form.business_size === '' ? 'text-slate-300' : 'text-slate-900',
                      ].join(' ')}
                    >
                      <option value="" disabled>Select monthly lead volume</option>
                      <option value="under_20">Under 20 high-ticket enquiries/month</option>
                      <option value="20_50">20–50 enquiries/month</option>
                      <option value="50_100">50–100 enquiries/month</option>
                      <option value="over_100">100+ enquiries/month</option>
                    </select>
                  </FormField>

                  <FormField id={`${uid}-problem`} label="Describe Your Current Pipeline Problem">
                    <textarea
                      id={`${uid}-problem`}
                      required
                      rows={5}
                      placeholder="We receive enquiries but our Lead Velocity is poor. Our PAC has increased 40% but conversion hasn't moved. We're invisible for implant searches in our catchment..."
                      value={form.problem_statement}
                      onChange={set('problem_statement')}
                      className={[inputClass, 'resize-none leading-[1.9]'].join(' ')}
                    />
                  </FormField>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="font-sans font-light text-[11px] uppercase tracking-widest text-white bg-blue-700 px-10 py-5 transition-all duration-300 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <p className="mt-6 font-sans font-light text-[9px] uppercase tracking-widest text-slate-300">
                      Applications reviewed within 24 hours &nbsp;&middot;&nbsp; No cold outreach
                    </p>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
