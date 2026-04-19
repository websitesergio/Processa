import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SectionHeader } from './AEOLogicVisualizer';

const FAQS = [
  {
    q: 'Why is my clinic invisible inside SearchGPT and Perplexity?',
    a: 'Most clinic websites are structured for legacy search crawlers, not for AI retrieval. Large language models surface content by semantic relevance to a patient\'s query — not by domain age or page rank. If your content is not structured for AI extraction, your clinic is absent from the answer entirely. Processa installs the architecture that places your clinic inside those answers.',
  },
  {
    q: 'What is the diagnosed revenue loss for a clinic with slow lead response?',
    a: 'Lead Response Management research confirms a 5-minute response window yields a 21× higher qualification rate than 30 minutes. For a private implant clinic receiving 40 enquiries per month at a case value of £5,000, a 30-minute average response time produces a diagnosed revenue loss of approximately £168,000 per year in recoverable appointments. Run the Revenue Diagnostic above to calculate your exact figure.',
  },
  {
    q: 'How does patient enquiry routing work for a dental clinic?',
    a: 'Every inbound enquiry is classified within 5 seconds against a deterministic intent framework and routed to one of three outcomes: high-value enquiries go directly into the clinical CRM with an immediate alert to your treatment coordinator; long-term enquiries enter a structured nurture sequence; disqualified enquiries are archived automatically. Mean time from enquiry to routed outcome: under 60 seconds.',
  },
  {
    q: 'How is Processa different from a dental marketing agency?',
    a: 'Marketing agencies produce content volume and keyword rankings. Processa installs conversion infrastructure: your clinic becomes the cited authority in AI search results, every patient enquiry is actioned within 60 seconds, and every appointment can be traced back to its original acquisition source. The deliverable is diagnosed, measurable revenue recovery — not traffic reports.',
  },
  {
    q: 'What does the 14-day engagement include?',
    a: 'Days 1–3: Marc conducts a full revenue diagnostic and delivers your diagnosed leakage figure before any engineering commitment is made. Days 4–14: Sergio\'s systems team installs the full infrastructure — AI citation architecture, patient routing, and attribution tracking — wired into your existing workflow. A structured handover report closes the engagement.',
  },
  {
    q: 'Who does Processa work with?',
    a: 'Processa operates exclusively with private dental practices focused on high-ticket implant and Invisalign treatment. We do not work with general practices, NHS mixed clinics, or marketing-only scopes. Two installation slots are available per month. Access is via direct qualification with Marc only.',
  },
];

export default function SemanticFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative py-24"
      style={{ borderBottom: '1px solid rgba(255,252,245,0.05)' }}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader
          tag="04 / Clinic Owner Questions"
          title="Questions from clinic owners who found this page."
          body="Each answer is structured for AI extraction. When a patient asks SearchGPT about private implant clinics in your area, this architecture is what surfaces your clinic as the cited authority."
        />

        <div
          className="mt-12"
          style={{ border: '1px solid rgba(255,252,245,0.07)' }}
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                style={{
                  borderBottom: i < FAQS.length - 1 ? '1px solid rgba(255,252,245,0.06)' : 'none',
                  background: isOpen ? 'rgba(255,252,245,0.012)' : 'transparent',
                  transition: 'background 0.2s ease',
                }}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-7 py-5 flex items-center justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                  style={{ transition: 'background 0.15s ease' }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1rem',
                      fontWeight: isOpen ? 500 : 400,
                      color: isOpen ? '#F5F2EC' : 'rgba(245,242,236,0.65)',
                      lineHeight: '1.4',
                      letterSpacing: '-0.01em',
                      textAlign: 'left',
                    }}
                    itemProp="name"
                  >
                    {item.q}
                  </span>
                  <span style={{ color: 'rgba(245,242,236,0.25)', flexShrink: 0 }}>
                    {isOpen
                      ? <Minus size={16} strokeWidth={1.5} />
                      : <Plus size={16} strokeWidth={1.5} />}
                  </span>
                </button>
                {isOpen && (
                  <div
                    className="pb-6 px-7"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      style={{ fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, lineHeight: '1.9', color: 'rgba(245,242,236,0.45)', maxWidth: '640px' }}
                      itemProp="text"
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
