import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    index: '01',
    title: 'Structural Visibility',
    headline: 'You cannot capture patient intent if AI cannot find you.',
    body: 'Most dental websites are architecturally invisible to AI-generated search results and voice search. The failure is not cosmetic — it is a fundamental Market Share Capture deficit. We audit every intent signal your practice fails to surface and rebuild the technical foundation required for authoritative AI search presence.',
    proof: '94% of practice websites fail basic AEO compliance. Source: Processa Internal Audit, 2024.',
  },
  {
    index: '02',
    title: 'Lead Velocity Optimisation',
    headline: 'Intent without infrastructure is pipeline hemorrhage.',
    body: 'Visibility without conversion architecture is wasted Patient Acquisition Cost. We engineer the full patient journey from first discovery to confirmed appointment — tracking micro-intents, qualifying enquiries automatically, and routing every lead to the correct response protocol within 60 seconds to maximise Capital Efficiency.',
    proof: 'A 5-minute response window qualifies at 21× the rate of a 30-minute window.',
  },
  {
    index: '03',
    title: 'Revenue Attribution',
    headline: 'Every pound of PAC must be traceable to treatment revenue.',
    body: 'We close the loop between digital presence and treatment revenue. Custom attribution models tie each high-value case to its originating channel, giving your practice the exact data required to eliminate PAC waste and double investment into the channels with proven Market Share Capture.',
    proof: 'Average: £168,000 annual pipeline recovered. First 12 months. Per practice.',
  },
] as const;

export default function EnginePage() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <section className="px-6 md:px-16 py-40 md:py-52">
        <div
          className={[
            'max-w-7xl mx-auto transition-all duration-1000 ease-out',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
        >
          <div className="max-w-2xl mb-32 md:mb-44">
            <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-8">
              The Engine
            </p>
            <h1 className="font-serif font-semibold text-slate-900 leading-[1.06] tracking-tighter text-[clamp(2.5rem,6vw,5rem)] mb-8">
              How Patient Intent<br />Becomes Revenue.
            </h1>
            <p className="font-sans font-light text-slate-500 text-base md:text-lg leading-[1.9] max-w-[50ch]">
              Three interlocking systems. Each one is necessary. Together, they produce compounding pipeline recovery that cannot be replicated by a website alone.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {STEPS.map((step) => (
              <div
                key={step.index}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-20 md:py-28 border-t border-slate-100"
              >
                <div className="md:col-span-1">
                  <span className="font-serif text-slate-200 text-5xl md:text-6xl font-semibold leading-none tracking-tighter">
                    {step.index}
                  </span>
                </div>

                <div className="md:col-span-4 flex flex-col justify-start pt-1">
                  <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-5">
                    {step.title}
                  </p>
                  <h2 className="font-serif font-semibold text-slate-900 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.12] tracking-tighter">
                    {step.headline}
                  </h2>
                </div>

                <div className="md:col-span-6 md:col-start-7 flex flex-col justify-start pt-1">
                  <p className="font-sans font-light text-slate-600 text-base leading-[1.95] mb-10">
                    {step.body}
                  </p>
                  <p className="font-sans font-light text-[10px] text-slate-400 leading-relaxed border-l-2 border-blue-200 pl-4">
                    {step.proof}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-slate-100 pt-20 md:pt-28">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                <button
                  type="button"
                  onClick={() => navigate('/roadmap')}
                  className="font-sans font-light text-[11px] uppercase tracking-widest text-white bg-blue-700 px-8 py-4 transition-all duration-300 hover:bg-blue-800"
                >
                  See the 14-Day Roadmap
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/access')}
                  className="font-sans font-light text-[11px] uppercase tracking-widest text-slate-400 transition-colors duration-200 hover:text-slate-700"
                >
                  Apply for an Audit &nbsp;&rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
