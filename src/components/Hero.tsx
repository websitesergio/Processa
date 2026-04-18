import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white min-h-[80vh] flex items-center border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-8">
            AI Patient Acquisition — Implant &amp; Invisalign Practices
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08] max-w-4xl mb-8">
            Stop losing high-ticket dental patients to slow response times.
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mb-12">
            We install the automated patient acquisition systems required for leading Implant &amp; Invisalign practices.
          </p>

          <a
            href="#calculator"
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors duration-150"
          >
            Calculate Revenue Leak
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
