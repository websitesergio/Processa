import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type FormState = 'idle' | 'loading' | 'success';

export default function ContactForm() {
  const [clinicName, setClinicName] = useState('');
  const [monthlyEnquiries, setMonthlyEnquiries] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    const payload = {
      business_name: clinicName,
      business_email: email,
      business_size: monthlyEnquiries,
      full_name: clinicName,
      automation_goal: 'Lead acquisition and conversion',
      problem_statement: `Monthly high-ticket enquiries: ${monthlyEnquiries}`,
      status: 'new',
    };

    try {
      const { error } = await supabase.from('contact_submissions').insert([payload]);
      if (error) throw error;
      setFormState('success');
    } catch {
      const body = encodeURIComponent(
        `Clinic Name: ${clinicName}\nMonthly High-Ticket Enquiries: ${monthlyEnquiries}\nEmail: ${email}`
      );
      window.location.href = `mailto:marc@sergiodental.com?subject=Strategic Audit Application - ${clinicName}&body=${body}`;
      setFormState('success');
    }
  };

  return (
    <section id="contact" className="bg-slate-900 py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className="text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Secure Your Infrastructure.
          </h2>
          <p className="text-lg text-slate-400 mt-4 leading-relaxed">
            This engagement is not for everyone. We onboard exactly 2 private clinics per month to ensure architectural integrity. Apply below.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {formState === 'success' ? (
            <div className="text-center py-16">
              <p
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Application Received.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                Marc will contact you within 24 hours if you qualify.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                required
                placeholder="Clinic Name"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 mb-4 w-full focus:outline-none focus:border-slate-500 transition-colors"
              />
              <input
                type="number"
                required
                min="0"
                placeholder="Monthly High-Ticket Enquiries"
                value={monthlyEnquiries}
                onChange={(e) => setMonthlyEnquiries(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 mb-4 w-full focus:outline-none focus:border-slate-500 transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Owner / Director Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 mb-4 w-full focus:outline-none focus:border-slate-500 transition-colors"
              />
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full bg-white text-slate-900 font-bold py-4 mt-4 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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
          )}
        </div>

        <div className="border-t border-slate-800 pt-8 mt-24 pb-8 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-8">
          <p className="text-sm text-slate-500">
            &copy; 2026 Processa. Strategic Dental Infrastructure.
          </p>
          <p className="text-sm text-slate-500 mt-4 md:mt-0">
            marc@sergiodental.com &nbsp;|&nbsp; Directed by Sergio
          </p>
        </div>
      </div>
    </section>
  );
}
