import { useState, useMemo } from 'react';
import { TrendingDown, DollarSign } from 'lucide-react';

const AVERAGE_CASE_VALUE = 4500;

function getConversionRate(responseMinutes: number): number {
  if (responseMinutes <= 1) return 0.55;
  if (responseMinutes <= 5) return 0.42;
  if (responseMinutes <= 30) return 0.28;
  if (responseMinutes <= 60) return 0.18;
  if (responseMinutes <= 240) return 0.10;
  return 0.05;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Calculator() {
  const [monthlyInquiries, setMonthlyInquiries] = useState(40);
  const [responseTime, setResponseTime] = useState(60);

  const { annualRevenueLost, currentConversions, optimalConversions } = useMemo(() => {
    const currentRate = getConversionRate(responseTime);
    const optimalRate = getConversionRate(1);
    const currentConversions = Math.round(monthlyInquiries * currentRate);
    const optimalConversions = Math.round(monthlyInquiries * optimalRate);
    const monthlyLost = (optimalConversions - currentConversions) * AVERAGE_CASE_VALUE;
    return {
      annualRevenueLost: monthlyLost * 12,
      currentConversions,
      optimalConversions,
    };
  }, [monthlyInquiries, responseTime]);

  return (
    <section id="calculator" className="bg-slate-50 border-b border-slate-100 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-3">
            Revenue Diagnostic
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            How much is slow response costing you?
          </h2>
          <p className="text-slate-500 text-lg">
            Adjust the sliders to see your estimated annual revenue loss based on current response time benchmarks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Monthly High-Ticket Inquiries
                  </label>
                  <span className="text-2xl font-bold text-slate-900">{monthlyInquiries}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={monthlyInquiries}
                  onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                  className="slider-track w-full"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${((monthlyInquiries - 5) / 195) * 100}%, #e2e8f0 ${((monthlyInquiries - 5) / 195) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                  <span>5</span>
                  <span>200</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Average Response Time
                  </label>
                  <span className="text-2xl font-bold text-slate-900">
                    {responseTime < 60 ? `${responseTime}m` : `${Math.round(responseTime / 60)}h`}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={480}
                  step={1}
                  value={responseTime}
                  onChange={(e) => setResponseTime(Number(e.target.value))}
                  className="slider-track w-full"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${((responseTime - 1) / 479) * 100}%, #e2e8f0 ${((responseTime - 1) / 479) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                  <span>1 min</span>
                  <span>8 hrs</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Current Monthly Closes</p>
                <p className="text-2xl font-bold text-slate-700">{currentConversions}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-blue-600 mb-1">Optimal Monthly Closes</p>
                <p className="text-2xl font-bold text-blue-700">{optimalConversions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Estimated Annual Revenue Lost</p>
                <p className="text-xs text-slate-400">Based on $4,500 avg case value</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div
                className={`text-5xl md:text-6xl font-bold tracking-tight mb-2 transition-colors duration-300 ${
                  annualRevenueLost > 100000
                    ? 'text-red-600'
                    : annualRevenueLost > 50000
                    ? 'text-orange-500'
                    : 'text-slate-700'
                }`}
              >
                {formatCurrency(annualRevenueLost)}
              </div>
              <p className="text-slate-400 text-sm text-center">
                in missed Implant &amp; Invisalign revenue per year
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                <DollarSign className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed">
                  Our system routes leads in under 60 seconds — recovering most of this gap within 30 days.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-4 w-full inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-150"
              >
                Fix This — Request a Free Audit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
