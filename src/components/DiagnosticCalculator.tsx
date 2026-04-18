import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';

const RESPONSE_LABELS: Record<number, string> = {
  0: '< 5 minutes',
  1: '5–30 minutes',
  2: '30–60 minutes',
  3: '1–4 hours',
  4: '4–8 hours',
  5: '8–24 hours',
};

const RESPONSE_MULTIPLIERS: Record<number, number> = {
  0: 0.08,
  1: 0.20,
  2: 0.40,
  3: 0.55,
  4: 0.67,
  5: 0.78,
};

function formatGBP(n: number): string {
  if (n >= 1_000_000) {
    return '£' + (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  }
  return '£' + Math.round(n).toLocaleString('en-GB');
}

interface SliderFieldProps {
  id: string;
  label: string;
  sublabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  displayValue: string;
  onChange: (v: number) => void;
}

function SliderField({ id, label, sublabel, min, max, step, value, displayValue, onChange }: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-5">
        <label htmlFor={id} className="font-sans font-light text-[10px] uppercase tracking-widest text-slate-400">
          {label}
        </label>
        <span className="font-serif font-semibold text-slate-900 text-2xl tracking-tight">
          {displayValue}
        </span>
      </div>
      <p className="font-sans font-light text-[11px] text-slate-400 mb-5 leading-relaxed">{sublabel}</p>
      <div className="relative">
        <div
          className="absolute top-0 left-0 h-[2px] bg-blue-700 rounded-l-sm pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-between mt-3">
        <span className="font-sans font-light text-[9px] text-slate-300 uppercase tracking-widest">
          {min === 10 ? '10 leads' : '< 5 min'}
        </span>
        <span className="font-sans font-light text-[9px] text-slate-300 uppercase tracking-widest">
          {min === 10 ? '100 leads' : '24 hrs'}
        </span>
      </div>
    </div>
  );
}

export default function DiagnosticCalculator() {
  const [leads, setLeads] = useState(40);
  const [responseStep, setResponseStep] = useState(3);
  const navigate = useNavigate();
  const uid = useId();

  const attritionRate = RESPONSE_MULTIPLIERS[responseStep];
  const avgTreatmentValue = 3800;
  const annualLeak = leads * attritionRate * avgTreatmentValue * 12;
  const monthlyMissed = Math.round(leads * attritionRate);

  return (
    <section className="bg-white px-6 md:px-16 py-32 md:py-44">
      <div className="max-w-7xl mx-auto">

        <div className="max-w-xl mb-20 md:mb-28">
          <p className="font-sans font-light text-[10px] uppercase tracking-widest text-blue-700 mb-8">
            Revenue Diagnostic
          </p>
          <h2 className="font-serif font-semibold text-slate-900 leading-[1.07] tracking-tighter text-[clamp(2rem,5vw,3.75rem)] mb-7">
            Quantify Your Annual<br />Pipeline Hemorrhage.
          </h2>
          <p className="font-sans font-light text-slate-500 text-base leading-[1.9] max-w-[48ch]">
            Drag the sliders. The figure updates in real time based on your Lead Velocity and current Patient Acquisition Cost (PAC) exposure. The average practice we audit has lost £168,000 in recoverable pipeline in the past 12 months.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start">

          <div className="flex flex-col gap-16">
            <SliderField
              id={`${uid}-leads`}
              label="Monthly High-Ticket Leads"
              sublabel="Implant and Invisalign enquiries received per month across all channels."
              min={10}
              max={100}
              step={5}
              value={leads}
              displayValue={`${leads} leads/mo`}
              onChange={setLeads}
            />
            <SliderField
              id={`${uid}-response`}
              label="Current Lead Response Time"
              sublabel="How quickly does your team contact a new enquiry after it arrives?"
              min={0}
              max={5}
              step={1}
              value={responseStep}
              displayValue={RESPONSE_LABELS[responseStep]}
              onChange={setResponseStep}
            />

            <div className="pt-4 border-t border-slate-100">
              <p className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-300 mb-3">
                Calculation basis
              </p>
              <p className="font-sans font-light text-[11px] text-slate-400 leading-[1.85]">
                Average treatment value: £3,800 (implant/Invisalign blend). Lead attrition rate derived from MIT Sloan / HBR Lead Response Study (2024). Monthly leads × attrition coefficient × ATV × 12.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <p className="font-sans font-light text-[10px] uppercase tracking-widest text-slate-400 mb-6">
              Annual Pipeline Hemorrhage
            </p>

            <p
              className="font-serif font-semibold text-blue-700 leading-none tracking-[-0.04em] text-[clamp(3.5rem,10vw,8rem)] transition-all duration-500 mb-4"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {formatGBP(annualLeak)}
            </p>

            <p className="font-sans font-light text-[11px] text-slate-400 mb-10 leading-relaxed">
              Recoverable at optimal Lead Velocity
            </p>

            <div className="border-t border-slate-100 pt-8 mb-12">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-400 mb-2">
                    Monthly Lost
                  </p>
                  <p className="font-serif text-slate-900 text-xl tracking-tight">
                    {monthlyMissed} leads
                  </p>
                </div>
                <div>
                  <p className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-400 mb-2">
                    Monthly Revenue Cost
                  </p>
                  <p className="font-serif text-slate-900 text-xl tracking-tight">
                    {formatGBP(annualLeak / 12)}
                  </p>
                </div>
                <div>
                  <p className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-400 mb-2">
                    Current Attrition Rate
                  </p>
                  <p className="font-serif text-slate-900 text-xl tracking-tight">
                    {Math.round(attritionRate * 100)}%
                  </p>
                </div>
                <div>
                  <p className="font-sans font-light text-[9px] uppercase tracking-widest text-slate-400 mb-2">
                    Response Window
                  </p>
                  <p className="font-serif text-slate-900 text-xl tracking-tight">
                    {RESPONSE_LABELS[responseStep]}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/access')}
              className="font-sans font-light text-[11px] uppercase tracking-widest text-white bg-blue-700 px-8 py-4 transition-all duration-300 hover:bg-blue-800"
            >
              Recover This Pipeline &nbsp;&rarr;
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
