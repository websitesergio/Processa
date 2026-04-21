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
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(15,23,42,0.45)',
            marginBottom: '1rem',
          }}
        >
          Clinical Methodology
        </p>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#0f172a',
            marginBottom: '2.5rem',
          }}
        >
          The Science Behind Revenue Recovery for High-Ticket Dental Practices
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.8,
            color: '#475569',
          }}
        >
          <p>
            Revenue haemorrhage in elite dental practices is not a marketing
            problem — it is a systems failure. A high-intent patient searching
            for full-arch implants or Invisalign treatment has already made a
            psychological commitment to proceed. What determines whether that
            patient books with your practice or your competitor is not the
            quality of your clinical work: it is the speed and confidence of
            your first response. Research across more than 15,000 B2C service
            enquiries, including those in elective healthcare, demonstrates that
            the probability of converting an inbound lead drops by 78% if the
            initial response is delayed beyond five minutes. At 30 minutes, the
            lead is statistically lost. Most private dental practices in Europe
            operate with an average enquiry response time of four to twelve
            hours.
          </p>

          <p>
            Processa quantifies this haemorrhage with precision. By mapping a
            practice's inbound volume, average response latency, treatment case
            mix, and historical conversion rate, the diagnostic engine produces
            a monetised figure — not a percentage, but a specific annual revenue
            number that is recoverable through infrastructure change alone.
            For a practice receiving 40 Implant enquiries per month at an
            average treatment value of £3,500, a reduction in response time
            from four hours to under 60 seconds typically recovers between
            £18,000 and £42,000 in annual revenue. The maths is deterministic:
            more qualified leads converted at the point of highest intent
            directly reduces patient acquisition cost and improves the return
            on every pound spent on paid media.
          </p>

          <p>
            The 60-second routing standard is not an arbitrary benchmark. It is
            the point at which the patient's attention window remains fully
            open, the competing practice has not yet responded, and the
            psychological momentum of the initial search intent is still active.
            Processa's automated routing layer receives the enquiry, identifies
            the treatment type from the submission data, sends a branded and
            personalised acknowledgement via the patient's preferred channel —
            SMS, WhatsApp, or email — and queues a follow-up task for the
            patient coordinator, all within a 60-second SLA. This operates
            24 hours a day, 365 days a year, without human intervention at the
            triage stage.
          </p>

          <p>
            European dental practices face specific regulatory requirements
            under the EU General Data Protection Regulation (GDPR 2016/679)
            and, for UK practices, the UK GDPR and Data Protection Act 2018.
            Patient enquiry data constitutes personal data under both
            frameworks, and its automated processing requires a clear lawful
            basis, documented retention periods, and transparent communication
            to the data subject. Processa's infrastructure is architected to
            satisfy these requirements by default. All data is processed on
            EU-region servers, encrypted at rest using AES-256 and in transit
            using TLS 1.3, and subject to retention schedules aligned with ICO
            and CNIL guidance. No patient data is shared with third-party
            advertising platforms or used for profiling outside the defined
            scope of patient acquisition and retention communications. Every
            practice receives a Data Processing Agreement as standard.
          </p>

          <p>
            Answer Engine Optimisation (AEO) completes the acquisition
            architecture. In 2026, the majority of high-intent dental patient
            journeys begin not with a Google keyword search but with a
            conversational query to an AI engine — ChatGPT, Google AI
            Overviews, Perplexity, or Microsoft Copilot. These systems do not
            return ten blue links; they cite a single authoritative source.
            Practices that are not structurally recognised as trusted entities
            by these AI retrieval systems are invisible to the fastest-growing
            segment of the high-value patient market. Processa builds the
            semantic schema architecture, entity verification signals, and
            authoritative content structure that positions a practice for
            citation — not just ranking — across every major AI search
            platform operating in the European market.
          </p>
        </div>
      </div>
    </section>
  );
}
