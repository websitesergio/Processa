export default function ClinicalMethodology() {
  return (
    <section
      id="methodology"
      style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(15,23,42,0.06)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 2rem)',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        <p style={eyebrow}>Clinical Methodology</p>

        <h2 style={sectionTitle}>
          How Processa Recovers Revenue for European Dental Practices
        </h2>

        {/* --- H2 Block 1 --- */}
        <h2 style={h2}>The Physics of Revenue Haemorrhage</h2>
        <p style={body}>
          Revenue haemorrhage in private dental practices is not a marketing
          failure — it is a systems failure operating silently at scale. Every
          time a high-intent patient submits an enquiry for a Dental Implant,
          All-on-4, or Invisalign treatment and receives no response within five
          minutes, the probability of that patient converting drops by 78%.
          Within 30 minutes, the conversion window has effectively closed. The
          patient has contacted two or three competing practices, received a
          response from one of them, and begun the psychological process of
          committing elsewhere.
        </p>
        <p style={body}>
          For a practice with an average treatment value of £3,500 and 40
          monthly inbound enquiries, this latency failure translates to a
          calculable annual revenue loss — typically between £18,000 and
          £45,000 — that never appears as a line item on any financial report.
          It is invisible precisely because it represents patients who never
          booked, not patients who cancelled. Processa's diagnostic model
          surfaces this figure with specificity: not an estimate, but a
          data-driven calculation grounded in your practice's own enquiry
          volume, case mix, and historical response latency.
        </p>

        {/* --- H2 Block 2 --- */}
        <h2 style={h2}>Sub-60-Second Lead Routing: The European Industry Standard</h2>
        <p style={body}>
          The 60-second response standard is not aspirational — it is the
          operational threshold at which conversion rates remain commercially
          viable for high-ticket dental treatments. Research published across
          multiple elective healthcare and premium service sectors, including
          data from the Harvard Business Review and MIT Sloan lead-response
          studies, establishes a consistent finding: lead qualification
          probability declines by over 400% when first contact exceeds five
          minutes from the point of enquiry submission.
        </p>
        <p style={body}>
          Processa installs an automated routing layer that eliminates the human
          bottleneck at the triage stage entirely. When a patient submits an
          enquiry — through a website contact form, a Google Ads landing page,
          a Meta lead form, or a social media direct message — the system
          immediately identifies the treatment type from the submission content,
          selects the appropriate personalised response template, and dispatches
          a branded acknowledgement via the patient's preferred channel: SMS,
          WhatsApp, or email. This entire sequence completes within 60 seconds,
          24 hours a day, 365 days a year, with no dependency on practice
          opening hours or coordinator availability. A follow-up task is
          simultaneously queued for the patient coordinator with the lead's full
          context, ready for the next working session.
        </p>

        {/* --- H2 Block 3 --- */}
        <h2 style={h2}>GDPR and Dental Data Security in Europe</h2>
        <p style={body}>
          Patient enquiry data in Europe is personal data under the EU General
          Data Protection Regulation (GDPR 2016/679) and, for UK practices,
          the UK GDPR as retained and amended by the Data Protection Act 2018.
          Any automated processing of this data — including AI-driven triage,
          personalised messaging, and CRM logging — requires a documented
          lawful basis, explicit data subject information, enforced retention
          limits, and compliance with cross-border transfer rules where
          applicable.
        </p>
        <p style={body}>
          Processa's infrastructure is built to satisfy these requirements by
          architectural default, not as an afterthought. All patient data is
          processed on EU-region servers certified to ISO 27001. Data is
          encrypted at rest using AES-256 and in transit using TLS 1.3
          throughout the entire pipeline. Retention schedules are aligned with
          ICO guidance for healthcare-adjacent data controllers, and no patient
          data is shared with advertising platforms, sold to data brokers, or
          used for any purpose outside the defined scope of patient acquisition
          and retention. Every practice partnership includes a Data Processing
          Agreement as standard, along with audit-ready documentation for
          inclusion in the practice's own GDPR compliance records. For EU
          practices, Processa supports dual-compliance frameworks covering both
          EU GDPR and applicable national implementing legislation.
        </p>

        {/* --- H2 Block 4 --- */}
        <h2 style={h2}>Quantifying Growth: The Mathematics Behind the Calculator</h2>
        <p style={body}>
          The Processa revenue calculator is not a marketing tool — it is a
          diagnostic instrument. It takes four inputs that every practice can
          verify against their own records: monthly inbound enquiry volume,
          average treatment value, current response time window, and estimated
          current conversion rate. From these inputs, it computes the annual
          revenue that is recoverable through response-time optimisation alone,
          using a conversion-decay model calibrated against real dental sector
          data.
        </p>
        <p style={body}>
          The output is intentionally conservative. The model applies a 60%
          recapture coefficient — meaning it credits only 60% of the
          theoretical maximum uplift as recoverable, to account for leads that
          were never genuinely convertible regardless of response speed. This
          ensures that the figure presented to practice owners is defensible,
          not optimistic. For most Implant and Invisalign practices operating
          at standard European market conversion rates, the recoverable revenue
          figure falls between one and four times the annual cost of
          implementing the routing infrastructure. The return on investment is
          structural and compounding: faster response reduces patient
          acquisition cost, improves paid media efficiency, and builds
          reputation through consistent patient experience — effects that
          accumulate across every future month of operation.
        </p>

        <p style={{ ...body, color: 'rgba(71,85,105,0.6)', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
          Source references: Harvard Business Review Lead Response Management
          Study; MIT Sloan Management Review; EU GDPR Regulation 2016/679;
          UK Data Protection Act 2018; ICO Guidance on Legitimate Interests.
        </p>

      </div>
    </section>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.26em',
  textTransform: 'uppercase',
  color: 'rgba(15,23,42,0.45)',
  marginBottom: '1rem',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  color: '#0f172a',
  marginBottom: '2.75rem',
};

const h2: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  color: '#0f172a',
  marginTop: '2.5rem',
  marginBottom: '0.875rem',
};

const body: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.8,
  color: '#475569',
  marginBottom: '1.25rem',
};
