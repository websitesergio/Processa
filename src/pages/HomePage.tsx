import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Layers, Users } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function HomePage() {
  useDocumentMeta({
    title: 'Processa | Strategic Advisory for Elite Dental Practices',
    description:
      'Processa makes elite dental clinics the cited authority in AI search results and ensures every patient enquiry is actioned within 60 seconds. The result is diagnosed, measurable revenue recovery.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Processa — Strategic Advisory',
      url: 'https://sergiogroup.org/',
      isPartOf: { '@id': 'https://sergiogroup.org/#website' },
      about: { '@id': 'https://sergiogroup.org/#organization' },
    },
  });

  return (
    <div>
      <HeroSection />
      <ProofStrip />
      <FirmStatement />
      <ServiceGrid />
      <SprintRoadmap />
      <FirmCredentials />
      <BinaryForkCTA />
    </div>
  );
}

function ProofStrip() {
  const stats = [
    { value: '14', label: 'Private practices engaged' },
    { value: '£168,400', label: 'Average annual revenue recovered' },
    { value: '100%', label: 'Deployment success rate' },
    { value: '18mo', label: 'Months in operation' },
  ];

  return (
    <section
      style={{ borderBottom: '1px solid rgba(255,252,245,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="py-10 px-6"
              style={{
                borderRight: i < 3 ? '1px solid rgba(255,252,245,0.05)' : 'none',
              }}
            >
              <div
                className="serif-number"
                style={{ fontSize: '1.75rem', marginBottom: '6px' }}
              >
                {s.value}
              </div>
              <div
                style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.6', color: 'rgba(245,242,236,0.25)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FirmStatement() {
  return (
    <section
      className="relative"
      style={{ padding: '9rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="label-tag mb-8">The Problem</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                color: '#F5F2EC',
              }}
            >
              Your clinic is invisible at the exact moment a patient decides where to book.
            </h2>
          </div>
          <div className="flex flex-col gap-7 pt-1">
            <p
              style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.45)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.95', letterSpacing: '0.01em' }}
            >
              When a high-value patient asks an AI search engine for a recommendation, your clinic is absent. A competitor collects that patient — not because their dentistry is better, but because their digital infrastructure is built for retrieval. Yours is not.
            </p>
            <p
              style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.45)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.95', letterSpacing: '0.01em' }}
            >
              Processa corrects this. Your clinic becomes the cited answer in AI search. Every patient who enquires is contacted within 60 seconds. The result is diagnosed, measurable revenue — not a traffic report.
            </p>
            <div className="mt-2">
              <a
                href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
                className="inline-flex items-center gap-2 transition-colors duration-150"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em', color: 'rgba(212,168,83,0.65)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(212,168,83,0.95)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(212,168,83,0.65)'; }}
              >
                Begin a conversation with Marc
                <ArrowRight size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceGrid() {
  const services = [
    {
      icon: <TrendingUp size={15} strokeWidth={1.5} />,
      code: '01',
      title: 'Revenue Diagnostic',
      body: 'Marc conducts a structured analysis of your practice\'s current revenue exposure — quantified against your real case economics. Every figure is diagnosed, not indicative. The findings are delivered before any commitment is made.',
      cta: { label: 'Run the Diagnostic', to: '/audit' },
    },
    {
      icon: <Layers size={15} strokeWidth={1.5} />,
      code: '02',
      title: 'AI Citation Architecture',
      body: 'Your clinic becomes the cited authority in SearchGPT, Perplexity, Gemini, and Google AI Overviews. When a high-intent patient searches for an implant clinic, your practice is the single recommended answer. Engineered by Sergio.',
      cta: { label: 'How it works', to: '/engine' },
    },
    {
      icon: <Shield size={15} strokeWidth={1.5} />,
      code: '03',
      title: 'Patient Enquiry Routing',
      body: 'Every inbound patient enquiry is classified and routed to its correct outcome within 60 seconds. No appointment lost to a shared inbox. No high-value patient decays in a missed-call spreadsheet. Full attribution on every lead.',
      cta: { label: 'View the Roadmap', to: '/roadmap' },
    },
    {
      icon: <Users size={15} strokeWidth={1.5} />,
      code: '04',
      title: 'Strategic Consultation',
      body: 'Marc evaluates your practice personally. If your clinic qualifies, our systems team installs the full infrastructure within 14 days. Two practice slots are available per month. Access is by application only.',
      cta: { label: 'Apply for Access', to: '/access' },
    },
  ];

  return (
    <section className="relative" style={{ padding: '9rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="label-tag mb-16">What We Install</div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ border: '1px solid rgba(255,252,245,0.06)' }}
        >
          {services.map((s, i) => (
            <div
              key={s.code}
              className="p-9 flex flex-col glass-card-hover"
              style={{ borderRight: i < 3 ? '1px solid rgba(255,252,245,0.06)' : 'none' }}
            >
              <div className="flex items-center justify-between mb-9">
                <div style={{ color: 'rgba(245,242,236,0.2)' }}>{s.icon}</div>
                <span style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.16em', color: 'rgba(255,252,245,0.1)' }}>{s.code}</span>
              </div>
              <div
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', letterSpacing: '-0.01em', lineHeight: '1.35', fontWeight: 600, color: '#F5F2EC', marginBottom: '16px' }}
              >
                {s.title}
              </div>
              <p
                style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.85, fontWeight: 300, color: 'rgba(245,242,236,0.35)', flex: 1, marginBottom: '28px' }}
              >
                {s.body}
              </p>
              <Link
                to={s.cta.to}
                className="group inline-flex items-center gap-1.5 transition-colors duration-150"
                style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.04em', color: 'rgba(245,242,236,0.28)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.65)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,242,236,0.28)'; }}
              >
                {s.cta.label}
                <ArrowRight size={11} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SprintRoadmap() {
  const phases = [
    {
      days: 'Days 1–3',
      title: 'The Diagnosis',
      description: 'Marc evaluates your clinic\'s revenue exposure personally. Your diagnosed leakage figure is calculated against your real case economics and delivered to you before any engineering commitment is made. The audit is free. The findings are definitive.',
      owner: 'Overseen by Marc',
    },
    {
      days: 'Days 4–14',
      title: 'The Installation',
      description: 'Sergio\'s systems team installs the full infrastructure. Your clinic becomes the cited authority in AI search results. Every patient enquiry is routed within 60 seconds. Attribution is tracked from first search to booked appointment.',
      owner: 'Executed by Sergio\'s team',
    },
  ];

  return (
    <section
      className="relative"
      style={{ padding: '9rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
          <div>
            <div className="label-tag mb-8">The 14-Day Engagement</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                color: '#F5F2EC',
              }}
            >
              Your practice. Transformed. In 14 days.
            </h2>
            <p
              className="mt-7"
              style={{ fontSize: '14px', color: 'rgba(245,242,236,0.35)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.9' }}
            >
              Fixed scope. No retainers. No open-ended engagements. A precise installation that converts an invisible practice into one that patients find, trust, and book from.
            </p>
            <div
              className="mt-9 p-5"
              style={{ border: '1px solid rgba(255,252,245,0.05)', background: 'rgba(255,252,245,0.008)' }}
            >
              <p
                style={{ fontSize: '12px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'rgba(245,242,236,0.35)', lineHeight: 1.9 }}
              >
                "Every deployment is personally overseen by our Strategic Director. We do not sign off until the revenue performance is confirmed."
              </p>
            </div>
          </div>
          <div style={{ border: '1px solid rgba(255,252,245,0.06)' }}>
            {phases.map((p, i) => (
              <div
                key={p.days}
                className="p-9"
                style={{ borderBottom: i < phases.length - 1 ? '1px solid rgba(255,252,245,0.06)' : 'none' }}
              >
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span
                    style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(245,242,236,0.22)' }}
                  >
                    {p.days}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(212,168,83,0.5)',
                      border: '1px solid rgba(212,168,83,0.12)',
                      padding: '2px 8px',
                    }}
                  >
                    {p.owner}
                  </span>
                </div>
                <div
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', letterSpacing: '-0.02em', fontWeight: 600, color: '#F5F2EC', marginBottom: '16px' }}
                >
                  {p.title}
                </div>
                <p
                  style={{ fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: 1.9, color: 'rgba(245,242,236,0.38)' }}
                >
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FirmCredentials() {
  return (
    <section className="relative" style={{ padding: '9rem 0', borderBottom: '1px solid rgba(255,252,245,0.05)' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="label-tag mb-16">About the Firm</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 items-start mb-20">
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                color: '#F5F2EC',
              }}
            >
              We do not take on every client. We take on the right ones.
            </h2>
          </div>
          <div>
            <p
              style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.45)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.95', letterSpacing: '0.01em' }}
            >
              Processa was founded on a single observation: elite dental practices are losing measurable revenue to two structural problems — invisible in AI search, and too slow to respond when patients do enquire. Every system we install is a direct correction of one or both of those problems.
            </p>
            <p
              className="mt-6"
              style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.45)', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.95', letterSpacing: '0.01em' }}
            >
              We operate with three senior partners. Sergio directs all technical deployments. Marc leads client qualification and account oversight. Sergiu architects the systems that make your practice the cited authority in AI search.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: '1px solid rgba(255,252,245,0.06)' }}
        >
          <PartnerCard
            role="Founder · Strategic Director"
            name="Sergio"
            description="The firm was founded on a single thesis: elite dental practices are losing measurable revenue to structural invisibility. Every system Processa installs is a direct correction of that gap. Every deployment is personally signed off."
            detail="Lead Systems Engineering"
          />
          <PartnerCard
            role="Senior Strategic Partner · Client Success"
            name="Marc"
            description="Marc is the sole point of contact for all new client engagements. He evaluates your clinic's revenue exposure personally, determines eligibility for the 14-day deployment, and aligns the installation scope to your practice's economics — before any commitment is made."
            detail="marc@sergiodental.com"
            cta
          />
          <PartnerCard
            role="Systems Engineering"
            name="Sergiu"
            description="Sergiu architects the infrastructure that makes your clinic the cited authority across SearchGPT, Perplexity, Gemini, and Google AI Overviews. Every installation is built to exact specification and verified against live citation before handover."
            detail="Infrastructure Architecture"
          />
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  role,
  name,
  description,
  detail,
  cta,
}: {
  role: string;
  name: string;
  description: string;
  detail: string;
  cta?: boolean;
}) {
  return (
    <div
      className="p-9 flex flex-col glass-card-hover"
      style={{ borderRight: '1px solid rgba(255,252,245,0.06)' }}
    >
      <div
        style={{ fontSize: '10px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(245,242,236,0.22)', marginBottom: '10px' }}
      >
        {role}
      </div>
      <div
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', letterSpacing: '-0.02em', fontWeight: 600, color: '#F5F2EC', marginBottom: '18px' }}
      >
        {name}
      </div>
      <p
        style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.9, fontWeight: 300, color: 'rgba(245,242,236,0.32)', flex: 1, marginBottom: '28px' }}
      >
        {description}
      </p>
      {cta ? (
        <a
          href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
          className="inline-flex items-center gap-2 px-5 py-2.5 self-start transition-colors duration-150"
          style={{ background: '#1D4ED8', color: '#F5F2EC', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
        >
          Begin Qualification
          <ArrowRight size={12} strokeWidth={1.5} />
        </a>
      ) : (
        <div
          style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.04em', color: 'rgba(245,242,236,0.2)' }}
        >
          {detail}
        </div>
      )}
    </div>
  );
}

export function BinaryForkCTA() {
  return (
    <section
      className="relative"
      style={{ padding: '9rem 0', background: 'rgba(5,4,3,0.5)' }}
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        <div className="label-tag mb-8 flex justify-center">The Decision</div>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: '1.08',
            maxWidth: '740px',
            margin: '0 auto',
            color: '#F5F2EC',
          }}
        >
          Identify your revenue loss — or continue operating without knowing it.
        </h2>
        <p
          className="mt-8 mx-auto"
          style={{ fontSize: '1rem', color: 'rgba(245,242,236,0.35)', maxWidth: '480px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.9' }}
        >
          Every quarter of inaction compounds recoverable, measurable revenue loss. One conversation with Marc changes the trajectory.
        </p>
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
          <a
            href="mailto:marc@sergiodental.com?subject=Strategic%20Revenue%20Audit%20Request"
            className="inline-flex items-center gap-3 px-8 py-4 transition-colors duration-200"
            style={{ background: '#1D4ED8', color: '#F5F2EC', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1D4ED8'; }}
          >
            Begin Qualification
            <ArrowRight size={13} strokeWidth={1.5} />
          </a>
        </div>
        <div
          className="mt-12 pt-10"
          style={{ borderTop: '1px solid rgba(255,252,245,0.05)' }}
        >
          <p
            style={{ fontSize: '11px', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.04em', color: 'rgba(245,242,236,0.2)' }}
          >
            Marc evaluates every new client personally. Two deployment slots available per month.
          </p>
        </div>
      </div>
    </section>
  );
}
