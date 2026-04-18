import { ArrowDown, CheckCircle } from 'lucide-react';

const TRUST_SIGNALS = [
  'Implant & Invisalign Specialists',
  'Average 6-Second Lead Response',
  'No Long-Term Contracts',
];

export default function Hero() {
  return (
    <section className="relative bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium tracking-wide uppercase px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            AI Patient Acquisition Systems
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Stop losing high-ticket dental patients to slow response times.
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            We install the automated patient acquisition systems required for leading Implant &amp; Invisalign practices.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-150 shadow-sm"
            >
              Calculate Revenue Leak
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium border border-slate-200 hover:border-slate-300 px-6 py-3 rounded-lg transition-colors duration-150"
            >
              Request Audit
            </a>
          </div>

          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {TRUST_SIGNALS.map((signal) => (
              <li key={signal} className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
