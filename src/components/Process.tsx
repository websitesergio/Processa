const PHASES = [
  {
    phase: 'Phase I',
    title: 'The Strategic Audit',
    subtitle: 'Led by Marc',
    body: 'We quantify your exact pipeline hemorrhage and map exactly where competitors are stealing your high-ticket leads.',
  },
  {
    phase: 'Phase II',
    title: 'The Infrastructure Build',
    subtitle: 'Engineered by the Systems Team',
    body: 'We construct the bespoke patient acquisition engine tailored specifically for your Implant and Invisalign services.',
  },
  {
    phase: 'Phase III',
    title: 'The 60-Second Routing',
    subtitle: 'Directed by Sergio',
    body: 'Every new patient inquiry is automatically qualified and routed to your front desk in under 60 seconds. Guaranteed.',
  },
];

export default function Process() {
  return (
    <section className="bg-white py-32 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold font-serif text-slate-900 tracking-tight">
            The 14-Day Revenue Recovery Protocol
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            We do not sell software. We install high-converting infrastructure. Here is exactly how we deploy it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PHASES.map(({ phase, title, subtitle, body }) => (
            <div key={phase} className="bg-slate-50 rounded-2xl p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                {phase}
              </p>
              <h3 className="text-2xl font-bold font-serif text-slate-900 tracking-tight mb-3">
                {title}
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                {subtitle}
              </p>
              <div className="w-8 h-px bg-slate-300 mb-6" />
              <p className="text-slate-600 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
