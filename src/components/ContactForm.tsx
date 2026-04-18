import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const LEAD_VOLUME_OPTIONS = [
  'Under 20 inquiries/month',
  '20–50 inquiries/month',
  '50–100 inquiries/month',
  '100+ inquiries/month',
];

export default function ContactForm() {
  const [clinicName, setClinicName] = useState('');
  const [leadVolume, setLeadVolume] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const payload = {
      business_name: clinicName,
      business_email: email,
      business_size: leadVolume,
      full_name: clinicName,
      automation_goal: 'Lead acquisition and conversion',
      problem_statement: `Monthly lead volume: ${leadVolume}`,
      status: 'new',
    };

    const { error } = await supabase.from('contact_submissions').insert([payload]);

    if (!error) {
      setFormState('success');
      return;
    }

    const mailtoUrl = `mailto:marc@sergiodental.com?subject=Audit Request — ${encodeURIComponent(clinicName)}&body=${encodeURIComponent(
      `Clinic: ${clinicName}\nMonthly Lead Volume: ${leadVolume}\nEmail: ${email}`
    )}`;
    window.location.href = mailtoUrl;
    setFormState('success');
  };

  return (
    <section id="contact" className="bg-slate-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4">
              Secure Access
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
              Request your free Strategic Audit
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Marc personally reviews every application. We only work with a limited number of practices each quarter to ensure exceptional results.
            </p>

            <ul className="space-y-4">
              {[
                'Full analysis of your lead response infrastructure',
                'Estimated revenue recovery within 30 days',
                'Custom system installation roadmap',
                'No cost. No commitment.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-3 text-slate-500 text-xs">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              Your information is never shared. HIPAA-conscious practices only.
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl">
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                  Marc will personally review your practice and reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="clinicName"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Clinic Name
                  </label>
                  <input
                    id="clinicName"
                    type="text"
                    required
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="e.g. Bright Smile Dental"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="leadVolume"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Monthly Lead Volume
                  </label>
                  <select
                    id="leadVolume"
                    required
                    value={leadVolume}
                    onChange={(e) => setLeadVolume(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white appearance-none"
                  >
                    <option value="" disabled>
                      Select your inquiry volume
                    </option>
                    {LEAD_VOLUME_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    Business Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourclinic.com"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {formState === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-150"
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Free Audit
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Free. No obligation. Limited spots available each month.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
