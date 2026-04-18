import { useState, useMemo } from 'react';

const LTV = 3500;

function calcAnnualExposure(enquiries: number, responseHours: number): number {
  const baseConversionRate = 0.22;
  const decayFactor = 1 - Math.min(0.88, responseHours * 0.034 + (responseHours > 4 ? (responseHours - 4) * 0.018 : 0));
  const lostConversionRate = baseConversionRate - baseConversionRate * decayFactor;
  return Math.round(enquiries * lostConversionRate * LTV * 12);
}

function formatGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, displayValue, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="text-2xl font-bold text-slate-900 font-serif tabular-nums">{displayValue}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 rounded-full outline-none cursor-pointer appearance-none"
          style={{
            background: `linear-gradient(to right, #0f172a ${pct}%, #e2e8f0 ${pct}%)`,
            accentColor: '#0f172a',
          }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-slate-400">{min}</span>
        <span className="text-xs text-slate-400">{max}</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [enquiries, setEnquiries] = useState(40);
  const [responseHours, setResponseHours] = useState(12);

  const annualExposure = useMemo(
    () => calcAnnualExposure(enquiries, responseHours),
    [enquiries, responseHours]
  );

  return (
    <section id="calculator" className="bg-slate-50 py-32 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold font-serif text-slate-900 tracking-tight">
            Quantify Your Pipeline Hemorrhage
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed">
            Discover exactly how much revenue is leaking to competitors due to slow lead response.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-200 p-12 mt-16">
          <div className="grid md:grid-cols-2 gap-12">
            <Slider
              label="Monthly High-Ticket Enquiries"
              value={enquiries}
              min={10}
              max={200}
              step={5}
              displayValue={`${enquiries} Enquiries`}
              onChange={setEnquiries}
            />
            <Slider
              label="Average Response Time"
              value={responseHours}
              min={1}
              max={48}
              step={1}
              displayValue={`${responseHours} ${responseHours === 1 ? 'Hour' : 'Hours'}`}
              onChange={setResponseHours}
            />
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Annual Revenue Exposure
            </p>
            <p className="text-8xl font-bold font-serif text-slate-900 mt-4 leading-none tabular-nums">
              {formatGBP(annualExposure)}
            </p>
            <p className="text-slate-400 text-base mt-5 max-w-sm mx-auto leading-relaxed">
              In recoverable Implant &amp; Invisalign revenue lost to competitors each year.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150"
            >
              Recover This Revenue — Book Your Audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
