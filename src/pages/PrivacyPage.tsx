const LAST_UPDATED = '20 April 2026';

const SECTIONS = [
  {
    title: 'Who We Are',
    body: `Processa Advisory Ltd ("Processa", "we", "us", "our") is a strategic advisory firm registered in England and Wales. We deliver AI patient acquisition infrastructure to private dental practices. Our registered address and Data Protection Officer contact details are available upon written request to marc@sergiodental.com.\n\nWe are committed to protecting and respecting your privacy in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
  },
  {
    title: 'What Data We Collect',
    body: `We collect the following categories of personal data when you interact with our website or submit an application:\n\n• Identity Data: full name, practice name, job title.\n• Contact Data: business email address, telephone number, website URL.\n• Usage Data: pages visited, session duration, calculator inputs, and interaction metrics collected via anonymised analytics.\n• Diagnostic Data: self-reported monthly enquiry volumes and revenue estimates entered into the diagnostic calculator. This data is processed in aggregate and is not linked to an identifiable individual unless you subsequently submit an application form.\n• Correspondence Data: any written communications you send to us, including the contents of application forms.`,
  },
  {
    title: 'How We Use Your Data',
    body: `We process your personal data for the following purposes:\n\n• To assess your application and determine suitability for our advisory engagement.\n• To contact you regarding your application and the outcome of our qualification review.\n• To fulfil our contractual obligations where an engagement is agreed.\n• To comply with our legal and regulatory obligations under UK law.\n• To improve our diagnostic tools and service offering using aggregated, anonymised data.\n\nWe do not use your personal data for unsolicited marketing communications. We will never sell, rent, or trade your personal data to third parties.`,
  },
  {
    title: 'Legal Basis for Processing',
    body: `We process your personal data on the following lawful bases under UK GDPR Article 6:\n\n• Legitimate Interests (Article 6(1)(f)): Processing application data to evaluate suitability for our advisory services, where our interests are not overridden by your data protection rights.\n• Contractual Necessity (Article 6(1)(b)): Processing required to perform a contract with you or to take steps prior to entering a contract at your request.\n• Legal Obligation (Article 6(1)(c)): Where processing is necessary to comply with applicable UK law.\n• Consent (Article 6(1)(a)): Where you have provided explicit consent via the consent checkbox on our application forms. You may withdraw this consent at any time without affecting the lawfulness of prior processing.`,
  },
  {
    title: 'Data Security & Encryption',
    body: `We take the security of your personal data seriously and have implemented appropriate technical and organisational measures in accordance with UK GDPR Article 32.\n\n• All data is transmitted over encrypted HTTPS connections using TLS 1.2 or higher.\n• Application data is stored in a secure, SOC 2 Type II certified cloud database infrastructure (Supabase / AWS eu-west-2 region, London).\n• Data at rest is encrypted using AES-256 encryption.\n• Access to personal data is restricted to authorised personnel only, operating on a strict need-to-know basis.\n• We conduct periodic security reviews and maintain incident response procedures in compliance with UK GDPR Article 33 notification obligations.\n\nDespite these measures, no transmission over the internet is entirely secure. If you have reason to believe your interaction with us is no longer secure, please notify us immediately at marc@sergiodental.com.`,
  },
  {
    title: 'Data Retention',
    body: `We retain personal data only for as long as necessary to fulfil the purposes outlined in this Policy:\n\n• Application data from enquirers who do not proceed to engagement: retained for 12 months from the date of submission, then securely deleted.\n• Data relating to active or completed engagements: retained for 7 years from the end of the engagement, in accordance with UK Companies Act record-keeping obligations.\n• Anonymised, aggregated diagnostic data may be retained indefinitely for service improvement purposes.\n\nUpon expiry of the applicable retention period, data is permanently deleted or irreversibly anonymised.`,
  },
  {
    title: 'Cookies & Tracking',
    body: `Our website uses essential cookies required for site functionality and, where you have consented, analytics cookies to understand how visitors interact with our diagnostic tools.\n\nEssential cookies: These are strictly necessary for the website to operate and cannot be declined. They include session management and security tokens.\n\nAnalytics cookies: Used to measure engagement with our diagnostic calculator and content. These cookies collect anonymised data and are only placed following your explicit consent via our cookie consent banner.\n\nYou may withdraw your cookie consent at any time by clearing your browser's local storage. This will cause the consent banner to reappear on your next visit.`,
  },
  {
    title: 'Your Rights Under UK GDPR',
    body: `You have the following rights in relation to your personal data under UK GDPR:\n\n• Right of Access (Article 15): To request a copy of the personal data we hold about you.\n• Right to Rectification (Article 16): To request correction of inaccurate or incomplete data.\n• Right to Erasure (Article 17): To request deletion of your data, subject to our legal obligations.\n• Right to Restrict Processing (Article 18): To request that we limit how we use your data.\n• Right to Data Portability (Article 20): To receive your data in a structured, machine-readable format.\n• Right to Object (Article 21): To object to processing based on legitimate interests.\n• Rights in Relation to Automated Decision-Making (Article 22): We do not make solely automated decisions with significant legal effects.\n\nTo exercise any of these rights, submit a written request to marc@sergiodental.com. We will respond within one calendar month in accordance with UK GDPR Article 12.`,
  },
  {
    title: 'Third-Party Services',
    body: `We use the following third-party services that may process personal data on our behalf as data processors:\n\n• Supabase Inc. (database infrastructure): Subject to EU Standard Contractual Clauses adapted for UK GDPR. Data stored in AWS eu-west-2 (London).\n• Netlify Inc. (website hosting): Processes server access logs. Privacy policy available at netlify.com/privacy.\n\nAll third-party processors are bound by Data Processing Agreements that comply with UK GDPR Chapter V requirements for international transfers where applicable.`,
  },
  {
    title: 'Changes to This Policy',
    body: `We reserve the right to update this Privacy Policy at any time. Material changes will be communicated via the website. The "Last Updated" date at the top of this page indicates when the most recent revision was made. Continued use of our website following any update constitutes acceptance of the revised Policy.`,
  },
  {
    title: 'Contact & Complaints',
    body: `For all privacy-related enquiries or to exercise your data subject rights, contact us at:\n\nProcessa Advisory Ltd\nEmail: marc@sergiodental.com\n\nIf you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK supervisory authority for data protection:\n\nInformation Commissioner's Office\nWycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF\nTelephone: 0303 123 1113\nWebsite: ico.org.uk`,
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(15,23,42,0.5)', lineHeight: 1.7 }}>
            Last updated: {LAST_UPDATED} &nbsp;&middot;&nbsp; Processa Advisory Ltd &nbsp;&middot;&nbsp; UK GDPR Compliant
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
            This Privacy Policy explains how Processa Advisory Ltd collects, processes, stores, and protects your personal data when you visit our website or submit an application for our advisory services. Please read this document carefully. By using this website you confirm that you have read and understood this Policy.
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
          &copy; 2026 Processa Advisory Ltd. Registered in England and Wales. UK Data Protection Act 2018 compliant.
        </p>
      </section>

    </main>
  );
}
