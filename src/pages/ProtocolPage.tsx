import { Link } from 'react-router-dom';
import { ArrowRight, GitBranch } from 'lucide-react';
import { PageHeader } from './AuditPage';
import { BinaryForkCTA } from './HomePage';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const PHASES = [
  {
    act: 'Act I',
    dayRange: 'Days 1–3',
    title: 'The Diagnosis',
    owner: 'Overseen by Marc',
    description: 'We map exactly where your clinic fails to appear — and where your competitors are being cited instead. You receive a precise revenue figure before any further commitment is discussed. The diagnostic is free. The findings are definitive.',
    deliverables: [
      'AI citation audit — where your clinic appears across SearchGPT, Perplexity, Gemini, and Google AI Overviews',
      'Competitive citation analysis — which practices are collecting patients you should be receiving',
      'Enquiry response audit — your current response window and the qualification decay it produces',
      'Diagnosed annual revenue exposure — your exact figure, delivered before any engineering work begins',
    ],
    output: 'Revenue Leakage Report',
    outputNote: 'Full diagnostic delivered before any commitment is made.',
  },
  {
    act: 'Act II',
    dayRange: 'Days 4–14',
    title: 'The Installation',
    owner: 'Executed by Sergio\'s team',
    description: 'Your clinic\'s digital infrastructure is rebuilt for the era of AI search. Your practice becomes the cited authority in the answers patients actually read. Every patient enquiry is actioned within 60 seconds. You can trace every booked appointment back to its origin.',
    deliverables: [
      'AI citation architecture installed — your clinic becomes the cited authority in AI-generated patient recommendations',
      'All treatment and pricing pages restructured for AI extraction and semantic retrieval',
      'Patient enquiry routing wired into your existing workflow — three deterministic outcome paths',
      'Full attribution tracking — every patient journey traced from first search to booked appointment',
    ],
    output: 'Infrastructure Active',
    outputNote: 'Fixed scope. No scope creep. No retainer.',
  },
  {
    act: 'Act III',
    dayRange: 'Handover',
    title: 'The Activation',
    owner: 'Overseen by Strategic Director',
    description: 'Your clinic owner receives a structured handover report comparing baseline against post-installation performance. Every system is verified live before sign-off. The engagement closes with confirmed citations and a working attribution loop.',
    deliverables: [
      'Clinical CRM integration confirmed — high-intent enquiries routed with immediate coordinator alert',
      'Live AI citation verified — your clinic confirmed as cited authority across all major answer engines',
      'Attribution loop closed — every enquiry acquisition source confirmed and trackable',
      'Handover report — baseline versus post-installation comparison delivered to practice owner',
    ],
    output: 'Handover Confirmed',
    outputNote: 'System live. Patients being captured.',
  },
];

export default function ProtocolPage() {
  useDocumentMeta({
    title: 'Processa | The Roadmap — Your Practice, Transformed in 14 Days',
    description:
      'The Processa 14-day engagement. Days 1–3: Revenue diagnostic with Marc, delivered before any commitment. Days 4–14: Full infrastructure installation by Sergio\'s team. Fixed scope. No retainers.',
    path: '/roadmap',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Processa 14-Day Engagement',
      url: 'https://sergiogroup.org/roadmap',
      description: 'The Processa three-act engagement that transforms an invisible dental practice into a cited authority that captures and converts high-value patient enquiries.',
      totalTime: 'P14D',
      step: PHASES.map((p, i) => ({
        '@type': 'HowToStep',
        name: p.title,
        text: p.description,
        position: i + 1,
      })),
    },
  });

  return (
    <div>
      <PageHeader
        code="03 / The Roadmap"
        title="Your practice. Transformed. In 14 days."
        body="No retainers. No open-ended engagements. A fixed-scope installation that converts an invisible clinic into a patient revenue engine. The diagnostic is delivered before any work is committed."
        icon={<GitBranch size={16} strokeWidth={1.5} />}
      />

      <section
        style={{ padding: '7rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <ol className="space-y-0">
            {PHASES.map((phase, idx) => (
              <li
                key={phase.act}
                className="relative"
                style={{ borderBottom: idx < PHASES.length - 1 ? '1px solid rgba(255,252,245,0.05)' : 'none' }}
              >
                <div className="py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
                  <div className="flex flex-col gap-2">
                    <div
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '3.5rem',
                        fontWeight: 700,
                        letterSpacing: '-0.04em',
                        color: 'rgba(245,242,236,0.06)',
                        lineHeight: 1,
                      }}
                    >
                      {phase.act}
                    </div>
                    <div
                      style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(245,242,236,0.22)', marginTop: '8px' }}
                    >
                      {phase.dayRange}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(212,168,83,0.5)',
                        border: '1px solid rgba(212,168,83,0.1)',
                        padding: '3px 8px',
                        marginTop: '6px',
                        display: 'inline-block',
                        width: 'fit-content',
                      }}
                    >
                      {phase.owner}
                    </div>
                  </div>

                  <div>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        color: '#F5F2EC',
                        marginBottom: '16px',
                      }}
                    >
                      {phase.title}
                    </h2>
                    <p
                      style={{ fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.42)', lineHeight: '1.9', fontWeight: 300, marginBottom: '28px', maxWidth: '600px' }}
                    >
                      {phase.description}
                    </p>

                    <div
                      className="p-7"
                      style={{ border: '1px solid rgba(255,252,245,0.06)', background: 'rgba(255,252,245,0.008)' }}
                    >
                      <div className="gold-rule-label mb-6">Deliverables</div>
                      <ul className="space-y-4">
                        {phase.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-4">
                            <span style={{ color: 'rgba(212,168,83,0.4)', marginTop: '4px', fontSize: '10px', flexShrink: 0 }}>—</span>
                            <span style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(245,242,236,0.42)', lineHeight: '1.8', fontWeight: 300 }}>
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="mt-5 flex flex-wrap items-center gap-3"
                      style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      <span className="label-tag">Output</span>
                      <span style={{ color: '#F5F2EC', letterSpacing: '0.02em' }}>{phase.output}</span>
                      <span style={{ color: 'rgba(245,242,236,0.2)' }}>— {phase.outputNote}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10"
            style={{ border: '1px solid rgba(212,168,83,0.12)', background: 'rgba(212,168,83,0.015)' }}
          >
            <div>
              <div className="label-tag mb-5">Apply for a Slot</div>
              <div
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: '1.2', color: '#F5F2EC', fontWeight: 700 }}
              >
                A conversation with Marc. If you qualify.
              </div>
              <div
                className="mt-4 max-w-xl"
                style={{ fontSize: '14px', color: 'rgba(245,242,236,0.3)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.85' }}
              >
                Marc evaluates every new client personally. Two deployment slots available per month. If your practice qualifies, Sergio's team installs the full infrastructure within 14 days.
              </div>
            </div>
            <div className="flex flex-col gap-3 self-start md:self-auto">
              <a
                href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
                className="group inline-flex items-center gap-2 px-7 py-4 transition-colors duration-150 whitespace-nowrap"
                style={{ background: '#1D4ED8', color: '#F5F2EC', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
              >
                Begin Qualification
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/access"
                className="inline-flex items-center gap-2 px-7 py-4 transition-colors duration-150 whitespace-nowrap"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', border: '1px solid rgba(255,252,245,0.07)', color: 'rgba(245,242,236,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.35)'; }}
              >
                Application Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BinaryForkCTA />
    </div>
  );
}
