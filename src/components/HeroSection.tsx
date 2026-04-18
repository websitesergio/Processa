import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-white min-h-screen flex flex-col justify-end px-6 md:px-16 pt-40 pb-24 md:pb-36">
      <div
        className={[
          'max-w-7xl mx-auto w-full transition-all duration-1000 ease-out',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ].join(' ')}
      >
        <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-12 md:mb-16">
          London's Patient Acquisition Consultancy
        </p>

        <h1 className="font-serif font-semibold text-slate-900 leading-[1.04] tracking-tighter text-[clamp(2.75rem,7.5vw,7rem)] max-w-[18ch] mb-10 md:mb-14">
          Your Practice Is Haemorrhaging<br />
          High-Ticket Pipeline.
        </h1>

        <p className="font-sans font-light text-slate-600 text-base md:text-lg leading-[1.9] max-w-[52ch] mb-14 md:mb-20">
          Static websites are a liability in the AI search era. Processa builds the patient acquisition infrastructure that eliminates lead attrition and restores capital efficiency for London's leading implant and Invisalign practices.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
          <button
            type="button"
            onClick={() => navigate('/diagnostic')}
            className="font-sans font-light text-[11px] uppercase tracking-widest text-white bg-blue-700 px-8 py-4 transition-all duration-300 hover:bg-blue-800"
          >
            Calculate Your Pipeline Hemorrhage
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

      <div
        className={[
          'absolute bottom-10 right-6 md:right-16 flex items-center gap-4 transition-all duration-1000 delay-500 ease-out',
          visible ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <span className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-300">
          Est. 2023 &nbsp;&middot;&nbsp; London
        </span>
      </div>
    </section>
  );
}
