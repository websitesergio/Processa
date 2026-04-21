const TIERS = [
  {
    time: '< 5 min',
    multiplier: '3.91×',
    label: 'Conversion Rate',
    note: 'Baseline conversion indexed at 1.0×',
    highlight: true,
  },
  {
    time: '5–30 min',
    multiplier: '1.7×',
    label: 'Conversion Rate',
    note: '56% decay from peak performance',
    highlight: false,
  },
  {
    time: '30–60 min',
    multiplier: '1.0×',
    label: 'Conversion Rate',
    note: 'Industry average. The standard you are being measured against.',
    highlight: false,
  },
  {
    time: '> 60 min',
    multiplier: '0.4×',
    label: 'Conversion Rate',
    note: 'Below baseline. The majority of practices operate here.',
    highlight: false,
  },
] as const;

const BREAKDOWN = [
  {
    label: 'Patient Acquisition Cost (PAC)',
    dark: 'At <5 min response',
    light: '€320 per new patient',
  },
  {
    label: 'PAC at >60 min response',
    dark: 'Effective cost',
    light: '€1,290 per new patient',
  },
  {
    label: 'Capital Efficiency Delta',
    dark: 'Annual impact',
    light: '€97,000 per 100 monthly leads',
  },
] as const;

export default function MathematicsOfSpeed() {
  return (
    <section id="speed" className="bg-slate-50 px-6 md:px-16 py-32 md:py-44">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          <div className="lg:col-span-5">
            <p className="font-sans font-light text-[10px] uppercase tracking-widest text-slate-700 mb-8">
              The Mathematics of Speed
            </p>
            <h2 className="font-serif font-semibold text-slate-900 leading-[1.06] tracking-tighter text-[clamp(2rem,4vw,3.5rem)] mb-8">
              Why Responding in 60 Seconds Increases Conversion by 391%.
            </h2>
            <p className="font-sans font-light text-slate-500 text-base leading-[1.9] mb-12">
              This is not a marginal optimisation. It is the single highest-leverage variable in your patient acquisition pipeline. The data is unambiguous: Lead Velocity is the dominant driver of Capital Efficiency in private dental.
            </p>

            <div className="flex flex-col gap-0 border-t border-slate-200">
              {BREAKDOWN.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 py-6 border-b border-slate-200"
                >
                  <p className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-400 mb-1">
                    {row.label}
                  </p>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-sans font-light text-slate-500 text-sm">{row.dark}</p>
                    <p className="font-serif font-semibold text-slate-900 text-lg tracking-tight">{row.light}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 font-sans font-light text-[9px] uppercase tracking-widest text-slate-400 leading-relaxed">
              Source: Harvard Business Review / MIT Sloan Lead Response Study, 2024.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col gap-4">
              {TIERS.map((tier) => (
                <div
                  key={tier.time}
                  className={[
                    'p-8 border',
                    tier.highlight
                      ? 'bg-slate-900 border-slate-900'
                      : 'bg-white border-slate-200',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between gap-6 mb-3">
                    <div>
                      <p
                        className={[
                          'font-sans font-light text-[9px] uppercase tracking-widest mb-1',
                          tier.highlight ? 'text-slate-300' : 'text-slate-400',
                        ].join(' ')}
                      >
                        Response Window
                      </p>
                      <p
                        className={[
                          'font-serif font-semibold text-2xl tracking-tight',
                          tier.highlight ? 'text-white' : 'text-slate-900',
                        ].join(' ')}
                      >
                        {tier.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={[
                          'font-sans font-light text-[9px] uppercase tracking-widest mb-1',
                          tier.highlight ? 'text-slate-300' : 'text-slate-400',
                        ].join(' ')}
                      >
                        {tier.label}
                      </p>
                      <p
                        className={[
                          'font-serif font-semibold text-3xl tracking-tighter',
                          tier.highlight ? 'text-white' : 'text-slate-900',
                        ].join(' ')}
                      >
                        {tier.multiplier}
                      </p>
                    </div>
                  </div>
                  <p
                    className={[
                      'font-sans font-light text-[11px] leading-relaxed',
                      tier.highlight ? 'text-slate-300' : 'text-slate-400',
                    ].join(' ')}
                  >
                    {tier.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
