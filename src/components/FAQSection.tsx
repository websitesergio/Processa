import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does AI identify revenue leakage in a dental practice?',
    a: `Revenue leakage in high-ticket dental practices occurs at three predictable points: the enquiry window, the qualification stage, and the booking confirmation. AI-driven diagnostic systems analyse your inbound lead volume, average response latency, and historical conversion data to calculate the exact monetary value lost at each stage.\n\nFor a practice receiving 40 Implant or Invisalign enquiries per month at an average treatment value of £3,500, a response delay of just 30 minutes reduces conversion probability by up to 78% compared to a sub-5-minute response. Processa's diagnostic engine maps this against your specific case mix to produce a precise annual revenue leakage figure — not an estimate, but a data-driven calculation grounded in your own practice metrics.\n\nThe AI model also identifies secondary leakage sources: unconverted recall patients, abandoned consultation bookings, and leads that entered the funnel but were never followed up. Together, these figures constitute the recoverable revenue opportunity that most practices never quantify.`,
  },
  {
    q: 'What is sub-60-second lead routing and why does it matter for dental clinics?',
    a: `Sub-60-second lead routing is the automated process of receiving a new patient enquiry and initiating a personalised response — by SMS, WhatsApp, or email — within 60 seconds of the submission, 24 hours a day, 7 days a week.\n\nResearch published in the Harvard Business Review demonstrates that the probability of qualifying a sales lead drops by over 400% when response time exceeds five minutes. In the premium dental sector, this effect is compounded: high-intent Implant and Invisalign patients typically contact two to three practices simultaneously, and book with whichever responds first with a confident, professional message.\n\nProcessa's routing infrastructure eliminates the human bottleneck entirely. When a patient submits an enquiry — through your website, a paid ad, or a social media form — the system immediately triages the lead, sends a branded acknowledgement tailored to the treatment type, and queues a follow-up task for your patient coordinator. The average response window drops from 4–12 hours to under 60 seconds, with measurable conversion uplift visible within the first 30 days of deployment.`,
  },
  {
    q: 'Is Processa\'s AI patient acquisition system GDPR compliant for European dental clinics?',
    a: `Yes. GDPR compliance is a foundational requirement for any patient data system operating in the European Economic Area, and Processa's infrastructure is built to meet the full requirements of the UK GDPR, EU GDPR 2016/679, and the Data Protection Act 2018.\n\nAll patient enquiry data is processed under a lawful basis — typically legitimate interest or explicit consent, depending on the acquisition channel. Data is stored on EU-region servers, encrypted at rest and in transit, and subject to strict retention limits aligned with ICO and CNIL guidance for healthcare data controllers.\n\nProcessa's automated messaging layer sends only content that patients have consented to receive, with clear opt-out mechanisms included in every communication. No patient data is shared with third-party advertising platforms, sold to data brokers, or used for profiling outside the defined scope of patient acquisition and retention. Practices receive a Data Processing Agreement (DPA) as standard, along with documentation suitable for inclusion in their own GDPR compliance records.\n\nFor UK-based practices, Processa operates as a data processor under the clinic's data controller registration. For EU practices, we support dual-compliance frameworks covering both UK GDPR and EU GDPR where required.`,
  },
  {
    q: 'How quickly can Processa be deployed at my practice?',
    a: `Full deployment takes 14 days from onboarding. In week one, Processa audits your existing enquiry infrastructure, configures the AI routing layer, and builds your branded patient communication templates. In week two, the system goes live in a controlled rollout — typically starting with one acquisition channel before expanding across all active lead sources.\n\nThe sub-60-second response SLA is active from day one of the live phase. AEO (Answer Engine Optimisation) citation authority compounds over 60–90 days as Google, SearchGPT, and Perplexity index and verify the new content architecture associated with your practice.`,
  },
  {
    q: 'Which types of dental practices benefit most from AI patient acquisition?',
    a: `Processa is purpose-built for high-ticket private dental practices with a case mix that includes Dental Implants, All-on-4, Invisalign, composite bonding, or full-mouth rehabilitation. These treatments carry average treatment values between £1,500 and £30,000, meaning the financial impact of even a modest improvement in lead conversion is substantial.\n\nPractices with monthly inbound enquiry volumes above 20 leads see the strongest ROI. The system is also particularly effective for practices investing in paid media — Google Ads, Meta, or TikTok — where slow response times directly inflate cost-per-acquisition and erode ad spend efficiency.\n\nWe work with solo-practitioner boutique clinics, group practices, and multi-site dental groups across the UK, Ireland, Spain, and the Netherlands.`,
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        background: '#f8fafc',
        borderTop: '1px solid rgba(15,23,42,0.06)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 2rem)',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            Common Questions
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: '1rem',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1.0625rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#475569',
              maxWidth: '54ch',
              margin: '0 auto',
            }}
          >
            Everything you need to know about AI patient acquisition, revenue
            leakage diagnostics, and GDPR-compliant automation for European
            dental clinics.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderTop: '1px solid rgba(15,23,42,0.08)',
                  ...(i === FAQS.length - 1
                    ? { borderBottom: '1px solid rgba(15,23,42,0.08)' }
                    : {}),
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    padding: '1.5rem 0',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                      lineHeight: 1.4,
                      color: '#0f172a',
                    }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      flexShrink: 0,
                      color: '#64748b',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>

                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '1000px' : '0',
                    transition: isOpen
                      ? 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)'
                      : 'max-height 0.3s cubic-bezier(0.4,0,1,1)',
                  }}
                >
                  <div style={{ paddingBottom: '1.75rem' }}>
                    {faq.a.split('\n\n').map((para, j) => (
                      <p
                        key={j}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '0.9375rem',
                          fontWeight: 400,
                          lineHeight: 1.75,
                          color: '#475569',
                          marginBottom: j < faq.a.split('\n\n').length - 1 ? '1rem' : 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
