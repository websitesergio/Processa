import { ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import AEOLogicVisualizer from '../components/AEOLogicVisualizer';
import RoutingOutcome from '../components/TerminalTriage';
import SemanticFAQ from '../components/SemanticFAQ';
import { PageHeader } from './AuditPage';
import { BinaryForkCTA } from './HomePage';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const CONTRAST_PAIRS = [
  {
    without: 'Your clinic website does not appear in SearchGPT, Perplexity, or Google AI Overviews. A competitor is cited instead.',
    with: 'Your clinic is the single cited answer for high-intent patient searches across all major AI engines.',
  },
  {
    without: 'Patient enquiries sit in a shared inbox. A high-value appointment decays after 30 minutes without a response.',
    with: 'Every patient enquiry is classified and routed within 60 seconds. No appointment is lost to inattention.',
  },
  {
    without: 'You cannot trace which patients came from which source. Revenue is unattributed.',
    with: 'Every booked appointment is traced back to its first AI search. Complete acquisition attribution.',
  },
];

export default function SystemsPage() {
  useDocumentMeta({
    title: 'Processa | The Engine — How Patient Intent Becomes Clinic Revenue',
    description:
      'How Processa makes your clinic the cited authority in AI search and ensures every patient enquiry is actioned within 60 seconds. The result is measurable revenue recovery.',
    path: '/engine',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Processa — The Engine',
      url: 'https://sergiogroup.org/engine',
      isPartOf: { '@id': 'https://sergiogroup.org/#website' },
    },
  });

  return (
    <div>
      <PageHeader
        code="02 / The Engine"
        title="How patient intent becomes clinic revenue."
        body="Two structural installations. AI Citation Architecture makes your clinic the recommended answer in AI search. Patient Enquiry Routing ensures every person who contacts you is actioned within 60 seconds. Together, they recover revenue that your current infrastructure is losing."
        icon={<Layers size={15} strokeWidth={1.5} />}
      />

      <section
        className="relative"
        style={{ padding: '7rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="label-tag mb-10">Without Processa · With Processa</div>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ border: '1px solid rgba(255,252,245,0.07)' }}
          >
            <div style={{ borderRight: '1px solid rgba(255,252,245,0.07)' }}>
              {CONTRAST_PAIRS.map((pair, i) => (
                <div
                  key={i}
                  className="p-7"
                  style={{ borderBottom: i < CONTRAST_PAIRS.length - 1 ? '1px solid rgba(255,252,245,0.06)' : 'none' }}
                >
                  <p style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.35)', lineHeight: '1.85', fontWeight: 300 }}>
                    {pair.without}
                  </p>
                </div>
              ))}
              <div
                className="p-5"
                style={{ borderTop: '1px solid rgba(255,252,245,0.06)', background: 'rgba(220,38,38,0.015)' }}
              >
                <span
                  style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(220,38,38,0.45)' }}
                >
                  Current State
                </span>
              </div>
            </div>

            <div>
              {CONTRAST_PAIRS.map((pair, i) => (
                <div
                  key={i}
                  className="p-7"
                  style={{ borderBottom: i < CONTRAST_PAIRS.length - 1 ? '1px solid rgba(255,252,245,0.06)' : 'none' }}
                >
                  <p style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.65)', lineHeight: '1.85', fontWeight: 300 }}>
                    {pair.with}
                  </p>
                </div>
              ))}
              <div
                className="p-5"
                style={{ borderTop: '1px solid rgba(255,252,245,0.06)', background: 'rgba(212,168,83,0.02)' }}
              >
                <span
                  style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(212,168,83,0.55)' }}
                >
                  After Processa
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AEOLogicVisualizer />

      <RoutingOutcome />

      <SemanticFAQ />

      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10"
            style={{ border: '1px solid rgba(212,168,83,0.12)', background: 'rgba(212,168,83,0.015)' }}
          >
            <div>
              <div className="label-tag mb-5">The Next Step</div>
              <div
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: '1.2', color: '#F5F2EC', fontWeight: 700 }}
              >
                See the 14-day sequence that installs this for your practice.
              </div>
              <div
                className="mt-4 max-w-xl"
                style={{ fontSize: '14px', color: 'rgba(245,242,236,0.3)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.85' }}
              >
                Fixed scope. No retainer. A diagnostic delivered before any commitment is made.
              </div>
            </div>
            <div className="flex flex-col gap-3 self-start md:self-auto">
              <Link
                to="/roadmap"
                className="group inline-flex items-center gap-2 px-7 py-4 transition-colors duration-150 whitespace-nowrap"
                style={{ background: '#1D4ED8', color: '#F5F2EC', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
              >
                View the Roadmap
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
                className="inline-flex items-center gap-2 px-7 py-4 transition-colors duration-150 whitespace-nowrap"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', border: '1px solid rgba(255,252,245,0.07)', color: 'rgba(245,242,236,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.35)'; }}
              >
                Begin Qualification
              </a>
            </div>
          </div>
        </div>
      </section>

      <BinaryForkCTA />
    </div>
  );
}
