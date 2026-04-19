import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import AuthorityAuditor from '../components/AuthorityAuditor';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useAuditor, formatGBP } from '../lib/AuditorContext';
import { BinaryForkCTA } from './HomePage';

export default function AuditPage() {
  useDocumentMeta({
    title: 'Processa | Revenue Diagnostic — The Cost of Your Current Inaction',
    description:
      'Quantify your clinic\'s annual patient revenue exposure. Every figure in this diagnostic is calculated against Lead Response Management research and your real practice economics.',
    path: '/audit',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Processa — Revenue Diagnostic',
      url: 'https://sergiogroup.org/audit',
      isPartOf: { '@id': 'https://sergiogroup.org/#website' },
    },
  });

  const { state } = useAuditor();

  return (
    <div>
      <PageHeader
        code="01 / Revenue Diagnostic"
        title="The cost of your current inaction, precisely calculated."
        body="Marc evaluates your clinic's economics against real case data. Every figure in this diagnostic is calculated against Lead Response Management research — not estimated. Set your practice parameters and receive your exact revenue exposure."
        icon={<TrendingUp className="w-4 h-4" strokeWidth={1.5} />}
      />

      <AuthorityAuditor />

      <section
        style={{ padding: '7rem 0', borderTop: '1px solid rgba(255,252,245,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10"
            style={{ border: '1px solid rgba(212,168,83,0.12)', background: 'rgba(212,168,83,0.015)' }}
          >
            <div>
              <div className="label-tag mb-5">Next Step</div>
              <div
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: '1.2', color: '#F5F2EC', fontWeight: 700 }}
              >
                {state.hasRun
                  ? `${formatGBP(state.monthlyBleed * 12)} confirmed exposure. Resolve this with Marc.`
                  : 'Run the diagnostic above, then speak with Marc.'}
              </div>
              <div
                className="mt-4"
                style={{ fontSize: '14px', color: 'rgba(245,242,236,0.28)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300 }}
              >
                Marc responds to qualified practice requests within one business hour. No automated sequences.
              </div>
            </div>
            <div className="flex flex-col gap-3 self-start md:self-auto">
              <a
                href={`mailto:marc@sergiodental.com?subject=${encodeURIComponent('Strategic Revenue Audit Request')}&body=${encodeURIComponent(state.hasRun ? `Revenue Audit Request.\n\nDiagnostic results:\nMonthly enquiries: ${state.monthlyLeads}\nCase value: ${formatGBP(state.caseValue)}\nResponse time: ${state.responseMinutes} min\nDiagnosed annual exposure: ${formatGBP(state.monthlyBleed * 12)}\n\nPlease confirm availability.` : 'I would like to request a Strategic Revenue Audit for my dental practice.')}`}
                className="group inline-flex items-center gap-2 px-7 py-4 transition-colors duration-150 whitespace-nowrap"
                style={{ background: '#1D4ED8', color: '#F5F2EC', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
              >
                Resolve This with Marc
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/engine"
                className="inline-flex items-center gap-2 px-7 py-4 transition-colors duration-150 whitespace-nowrap"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', border: '1px solid rgba(255,252,245,0.07)', color: 'rgba(245,242,236,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.35)'; }}
              >
                How patient intent becomes revenue
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BinaryForkCTA />
    </div>
  );
}

export function PageHeader({
  code,
  title,
  body,
  icon,
}: {
  code: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <section
      className="relative"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        borderBottom: '1px solid rgba(255,252,245,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-8" style={{ color: 'rgba(245,242,236,0.2)' }}>
          {icon}
          <span className="label-tag">{code}</span>
        </div>
        <h1
          className="max-w-3xl"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            color: '#F5F2EC',
          }}
        >
          {title}
        </h1>
        <p
          className="mt-7 max-w-2xl"
          style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.38)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.95', letterSpacing: '0.01em' }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}
