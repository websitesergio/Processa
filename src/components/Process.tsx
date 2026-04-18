import { Search, Zap, Clock } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Strategic Audit',
    subtitle: 'Managed by Marc',
    description:
      'A hands-on deep-dive into your current lead flow, response gaps, and conversion bottlenecks. We map exactly where high-value patients are being lost.',
    detail: 'Delivered in 48 hours',
  },
  {
    number: '02',
    icon: Zap,
    title: 'System Installation',
    subtitle: 'Custom-built for your practice',
    description:
      'We deploy your AI patient acquisition stack — fully integrated with your existing software. No disruption to your team. No long training sessions.',
    detail: 'Live within 7 days',
  },
  {
    number: '03',
    icon: Clock,
    title: '60-Second Lead Routing',
    subtitle: 'Always-on, never a missed inquiry',
    description:
      'Every Implant and Invisalign inquiry is triaged, qualified, and routed to the right person within 60 seconds — day or night, weekends included.',
    detail: 'Active from day one',
  },
];

export default function Process() {
  return (
    <section className="bg-white border-b border-slate-100 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-3">
            The Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            From audit to active in under 7 days
          </h2>
          <p className="text-slate-500 text-lg">
            Three focused steps. No fluff. No 90-day onboarding. Your system is live before your next billing cycle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-5xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-200 leading-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm font-medium text-blue-600 mb-4">{step.subtitle}</p>
                <p className="text-slate-500 leading-relaxed text-sm mb-6">{step.description}</p>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  <span className="w-4 h-px bg-slate-300" />
                  {step.detail}
                </div>

                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-slate-200 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
