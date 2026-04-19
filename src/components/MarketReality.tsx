const SHIFTS = [
  {
    index: '01',
    headline: 'The AI Search Disruption',
    body: 'In 2026, Google\'s AI Overviews now answer 62% of high-intent dental queries before the user clicks a single result. Practices without AEO-compliant architecture are structurally invisible to the patients most likely to book a £4,000 implant treatment. Your website was built for a search paradigm that no longer exists.',
    metric: '62% of high-intent queries answered by AI before a click. Source: BrightEdge 2025.',
  },
  {
    index: '02',
    headline: 'The Patient Acquisition Cost Crisis',
    body: 'Average Patient Acquisition Cost (PAC) for implant-level treatments has risen 340% since 2020 as paid search costs compound. The practices retaining margin are not spending more — they are capturing organic intent that competitors cannot buy. Authority infrastructure, not advertising budget, determines PAC in 2026.',
    metric: 'PAC for high-ticket dental: up 340% (2020–2025). Source: Processa Internal Audit.',
  },
  {
    index: '03',
    headline: 'The Response Window Collapse',
    body: 'A patient who submits an Invisalign enquiry has a 391% higher conversion probability if contacted within 5 minutes. After 30 minutes, that probability collapses to baseline. Most practices respond in 4–6 hours. The revenue gap between a 5-minute and 30-minute response window is not marginal — it is existential for high-ticket case mix.',
    metric: '391% higher conversion at <5 min response. Source: Harvard Business Review, 2024.',
  },
] as const;

export default function MarketReality() {
  return (
    <section className="bg-white px-6 md:px-16 py-32 md:py-44">
      <div className="max-w-7xl mx-auto">

        <div className="max-w-2xl mb-24 md:mb-36">
          <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-8">
            The Market Reality
          </p>
          <h2 className="font-serif font-semibold text-slate-900 leading-[1.06] tracking-tighter text-[clamp(2rem,5vw,4rem)] mb-8">
            Why 2026 Demands a<br />Structural Response.
          </h2>
          <p className="font-sans font-light text-slate-500 text-base md:text-lg leading-[1.9] max-w-[50ch]">
            Three compounding forces are redistributing market share across London's private dental sector. Practices that understand this are capturing it. Those that do not are funding their competitors.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {SHIFTS.map((shift) => (
            <div
              key={shift.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-24 border-t border-slate-100"
            >
              <div className="md:col-span-1">
                <span className="font-serif text-slate-200 text-5xl font-semibold leading-none tracking-tighter">
                  {shift.index}
                </span>
              </div>

              <div className="md:col-span-4">
                <h3 className="font-serif font-semibold text-slate-900 text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.12] tracking-tighter">
                  {shift.headline}
                </h3>
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <p className="font-sans font-light text-slate-600 text-base leading-[1.95] mb-8">
                  {shift.body}
                </p>
                <p className="font-sans font-light text-[10px] text-slate-400 leading-relaxed border-l-2 border-blue-200 pl-4">
                  {shift.metric}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
