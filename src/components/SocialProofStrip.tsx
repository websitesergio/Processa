const STATS = [
  {
    value: '21×',
    label: 'Lead Velocity Multiplier',
    sub: 'Sub-5-min response vs 30-min industry average',
  },
  {
    value: '£168k',
    label: 'Avg. Annual Pipeline Recovered',
    sub: 'Per practice, first 12 months post-deployment',
  },
  {
    value: '<60s',
    label: 'Lead Response SLA',
    sub: 'Every enquiry channel, without exception',
  },
  {
    value: '2',
    label: 'New Mandates Monthly',
    sub: 'By design — capital efficiency over volume',
  },
] as const;

export default function SocialProofStrip() {
  return (
    <section className="bg-slate-50 px-6 md:px-16 py-0">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-slate-200" />

        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={[
                'py-14 pr-8',
                i > 0 ? 'pl-8 border-l border-slate-200' : '',
              ].join(' ')}
            >
              <p className="font-serif font-semibold text-slate-900 text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tighter mb-4">
                {stat.value}
              </p>
              <p className="font-sans font-light text-[11px] uppercase tracking-widest text-slate-500 mb-1.5 leading-relaxed">
                {stat.label}
              </p>
              <p className="font-sans font-light text-[10px] text-slate-400 leading-relaxed">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-slate-200" />
      </div>
    </section>
  );
}
