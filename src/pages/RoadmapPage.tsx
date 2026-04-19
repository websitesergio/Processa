import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PHASES = [
  {
    col: 'Days 1–5',
    label: 'Diagnosis',
    headline: 'Establish the full PAC baseline before a single change is made.',
    items: [
      { day: 'Day 1', action: 'Full technical AEO audit. Every page crawled for AI-visibility and Market Share Capture failure.' },
      { day: 'Day 2', action: 'Competitor intent map. Identify which high-intent queries your rivals own that you should.' },
      { day: 'Day 3', action: 'Pipeline hemorrhage reconstruction. Trace exactly where Lead Velocity collapses.' },
      { day: 'Day 4', action: 'PAC attribution baseline. Current case mix, source performance, conversion by channel.' },
      { day: 'Day 5', action: 'Diagnostic brief delivered. Single document. No jargon. Exact cost of inaction in recoverable pipeline.' },
    ],
  },
  {
    col: 'Days 6–10',
    label: 'Architecture',
    headline: 'Infrastructure that captures intent before a competitor can.',
    items: [
      { day: 'Day 6', action: 'Schema deployment. FAQ, service, review, and local business structured data installed for AI citation.' },
      { day: 'Day 7', action: 'AEO content architecture. Authoritative answer pages engineered for every target query.' },
      { day: 'Day 8', action: 'Lead Velocity infrastructure live. Sub-60-second lead routing active across all channels.' },
      { day: 'Day 9', action: 'Qualification layer deployed. Automated pre-screening installed for Invisalign and implant enquiries.' },
      { day: 'Day 10', action: 'Attribution layer complete. Call, form, chat, and booking events flowing into unified PAC dashboard.' },
    ],
  },
  {
    col: 'Days 11–14',
    label: 'Activation',
    headline: 'Go live. Measure Capital Efficiency from hour one.',
    items: [
      { day: 'Day 11', action: 'First AI-citation confirmed in Google AI Overview for at least one target query.' },
      { day: 'Day 12', action: 'Live PAC dashboard handover. Practice owner sees exactly which patients are converting and why.' },
      { day: 'Day 13', action: 'Lead Velocity SLA audit. Every enquiry channel actioned within 60 seconds. Verified.' },
      { day: 'Day 14', action: 'Pipeline baseline confirmed. Month-one projection versus prior three-month PAC average. Signed off.' },
    ],
  },
] as const;

export default function RoadmapPage() {
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
              The Roadmap
            </p>
            <h1 className="font-serif font-semibold text-slate-900 leading-[1.06] tracking-tighter text-[clamp(2.5rem,6vw,5rem)] mb-8">
              14 Days to a Practice<br />That Cannot Be Ignored.
            </h1>
            <p className="font-sans font-light text-slate-500 text-base md:text-lg leading-[1.9] max-w-[50ch]">
              No discovery calls that go nowhere. No proposal decks. A fixed 14-day engagement with a confirmed deliverable on every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {PHASES.map((phase, pi) => (
              <div
                key={phase.col}
                className={[
                  'py-16 pr-0 md:pr-16',
                  pi > 0 ? 'md:pl-16 border-t md:border-t-0 md:border-l border-slate-100' : '',
                  pi === 0 ? 'border-t border-slate-100 md:border-t-0' : '',
                ].join(' ')}
              >
                <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-3">
                  {phase.col}
                </p>
                <h2 className="font-serif font-semibold text-slate-900 text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.12] tracking-tighter mb-5">
                  {phase.label}
                </h2>
                <p className="font-sans font-light text-slate-400 text-sm leading-[1.85] mb-12">
                  {phase.headline}
                </p>

                <div className="flex flex-col gap-0">
                  {phase.items.map((item) => (
                    <div
                      key={item.day}
                      className="flex gap-6 py-6 border-t border-slate-100"
                    >
                      <span className="font-sans font-light text-[9px] uppercase tracking-widest text-blue-400 shrink-0 pt-0.5 w-10">
                        {item.day.replace('Day ', 'D')}
                      </span>
                      <p className="font-sans font-light text-slate-500 text-sm leading-[1.8]">
                        {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 mt-0 pt-20 md:pt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="font-serif font-semibold text-slate-900 text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.15] tracking-tighter mb-5">
                  The engagement ends. The pipeline does not.
                </p>
                <p className="font-sans font-light text-slate-500 text-sm leading-[1.9]">
                  Everything we build belongs to your practice. No lock-in, no monthly retainer dependency. We build the Capital Efficiency machine and hand you the keys on Day 14.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/access')}
                  className="font-sans font-light text-[11px] uppercase tracking-widest text-white bg-blue-700 px-8 py-4 transition-all duration-300 hover:bg-blue-800"
                >
                  Apply for This Engagement
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
