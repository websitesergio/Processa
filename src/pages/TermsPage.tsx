const LAST_UPDATED = '20 April 2026';

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: `By accessing and using this website (processa.co) you accept and agree to be bound by these Terms of Service ("Terms"). These Terms constitute a legally binding agreement between you and Processa Advisory Ltd ("Processa", "we", "us").\n\nIf you do not agree to these Terms, you must cease using this website immediately. We reserve the right to amend these Terms at any time. Continued use of the website after any amendment constitutes your acceptance of the revised Terms.`,
  },
  {
    title: 'About Processa Advisory Ltd',
    body: `Processa Advisory Ltd is a strategic advisory firm registered in England and Wales. We provide AI patient acquisition infrastructure, Answer Engine Optimisation (AEO), and automated patient routing systems to private dental practices.\n\nAll advisory engagements are governed by separate Engagement Letters and Data Processing Agreements, which take precedence over these Terms in the event of any conflict.`,
  },
  {
    title: 'Use of This Website',
    body: `This website is provided for informational and qualification purposes. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.\n\nYou must not:\n\n• Attempt to gain unauthorised access to any part of the website, its servers, or any database connected to it.\n• Transmit any unsolicited commercial communications ("spam") through this website.\n• Upload or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.\n• Use any automated tool, bot, spider, or scraper to access, index, or collect data from this website without our prior written consent.\n• Impersonate any person or entity or misrepresent your affiliation with any person or entity in connection with your use of this website.`,
  },
  {
    title: 'Diagnostic Calculator & Data',
    body: `The revenue exposure calculator on this website is provided as an indicative diagnostic tool only. All figures generated are estimates based on industry benchmarks and self-reported inputs. They do not constitute financial advice, guaranteed outcomes, or a representation of any specific result that Processa can deliver.\n\nProcessa does not warrant the accuracy, completeness, or fitness for a particular purpose of any calculator output. You should not make business decisions solely on the basis of the calculator estimates without independent verification.`,
  },
  {
    title: 'Intellectual Property',
    body: `All content on this website — including but not limited to text, design, graphics, brand elements, methodology descriptions, and diagnostic tools — is the intellectual property of Processa Advisory Ltd and is protected by UK copyright law and applicable international treaties.\n\nYou may view and print content from this website for your personal, non-commercial use only. You must not reproduce, distribute, modify, publicly display, or create derivative works from any content on this website without our prior written consent.\n\n"Processa" and all associated brand marks are proprietary to Processa Advisory Ltd. Nothing on this website grants any licence to use our trade marks, brand names, or other proprietary marks.`,
  },
  {
    title: 'Application Forms & Qualification',
    body: `Submission of an application form via this website does not constitute an offer, acceptance, or binding contract. All applications are subject to review and qualification at our sole discretion.\n\nWe reserve the right to decline any application without providing a reason. Submission of false, misleading, or incomplete information in an application form may result in immediate disqualification and, where applicable, reporting to relevant authorities.\n\nWhere an engagement proceeds following a successful application, the specific terms, fees, scope, and deliverables will be documented in a separate Engagement Letter signed by both parties.`,
  },
  {
    title: 'Limitation of Liability',
    body: `To the fullest extent permitted by applicable UK law, Processa Advisory Ltd excludes all liability for any direct, indirect, incidental, special, or consequential loss or damage arising from:\n\n• Your use of, or inability to use, this website.\n• Any reliance on information or estimates provided by the diagnostic calculator.\n• Unauthorised access to or alteration of your data.\n• Any matter beyond our reasonable control.\n\nNothing in these Terms shall limit or exclude our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under English law.\n\nOur total aggregate liability to you in connection with any matter arising from these Terms shall not exceed £500.`,
  },
  {
    title: 'Third-Party Links',
    body: `This website may contain links to third-party websites for reference or convenience. We do not control, endorse, or accept responsibility for the content, privacy policies, or practices of any third-party sites. Accessing third-party sites is entirely at your own risk.`,
  },
  {
    title: 'Data Protection',
    body: `The collection, processing, and storage of personal data submitted through this website is governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy before submitting any personal data.\n\nWe are committed to compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. All data is processed lawfully, fairly, and transparently.`,
  },
  {
    title: 'Confidentiality',
    body: `Any diagnostic information, revenue data, or business details you share with us in connection with an application or engagement will be treated as strictly confidential. We will not disclose such information to third parties except where required by law, regulation, or court order, or where you have given explicit consent.\n\nThis obligation of confidentiality survives the termination of any engagement and these Terms.`,
  },
  {
    title: 'Governing Law & Jurisdiction',
    body: `These Terms and any dispute or claim arising from or in connection with them (including non-contractual disputes) are governed by and construed in accordance with the laws of England and Wales.\n\nThe courts of England and Wales shall have exclusive jurisdiction to settle any dispute arising from or in connection with these Terms, including claims relating to their formation, validity, or enforceability.`,
  },
  {
    title: 'Contact',
    body: `For any questions regarding these Terms, or to report a potential breach, please contact:\n\nProcessa Advisory Ltd\nEmail: marc@sergiodental.com\n\nWe aim to respond to all written enquiries within 5 business days.`,
  },
];

export default function TermsPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid rgba(15,23,42,0.07)',
          padding: 'clamp(6rem, 12vw, 10rem) 2rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.26em', textTransform: 'uppercase' as const, color: 'rgba(15,23,42,0.4)', marginBottom: '2rem' }}>
            Legal
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#0f172a',
              marginBottom: '1.5rem',
            }}
          >
            Terms of Service
          </h1>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(15,23,42,0.5)', lineHeight: 1.7 }}>
            Last updated: {LAST_UPDATED} &nbsp;&middot;&nbsp; Processa Advisory Ltd &nbsp;&middot;&nbsp; Governed by English Law
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(5rem, 10vw, 8rem) 2rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>

          {/* Intro */}
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 2,
              color: '#334155',
              marginBottom: '4rem',
              paddingBottom: '3rem',
              borderBottom: '1px solid rgba(15,23,42,0.07)',
            }}
          >
            These Terms of Service govern your access to and use of the Processa website and its diagnostic tools. Please read them carefully before proceeding. References to "you" or "your" means the individual accessing or using this website.
          </p>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {SECTIONS.map((section, i) => (
              <article key={section.title}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: 'rgba(15,23,42,0.1)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      flexShrink: 0,
                      minWidth: '2ch',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.025em',
                      color: '#0f172a',
                    }}
                  >
                    {section.title}
                  </h2>
                </div>
                <div style={{ paddingLeft: 'calc(1.5rem + 2ch)' }}>
                  {section.body.split('\n').map((para, j) => (
                    para.trim() === '' ? null : (
                      <p
                        key={j}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '14px',
                          fontWeight: 300,
                          lineHeight: 1.95,
                          color: para.startsWith('•') ? '#334155' : '#475569',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {para}
                      </p>
                    )
                  ))}
                </div>
                {i < SECTIONS.length - 1 && (
                  <div style={{ marginTop: '4rem', height: '1px', background: 'rgba(15,23,42,0.06)' }} />
                )}
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Footer strip */}
      <section
        style={{
          borderTop: '1px solid rgba(15,23,42,0.07)',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(15,23,42,0.3)' }}>
          &copy; 2026 Processa Advisory Ltd. Registered in England and Wales. Governed by the laws of England and Wales.
        </p>
      </section>

    </main>
  );
}
