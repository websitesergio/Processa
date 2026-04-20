// Dental industry technology partners — grayscale SVG wordmarks rendered inline
// for performance and precise opacity control

const BRANDS = [
  {
    name: 'Invisalign',
    svg: (
      <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Invisalign">
        <text x="0" y="22" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="400" fontSize="22" fill="currentColor" letterSpacing="-0.5">Invisalign</text>
      </svg>
    ),
  },
  {
    name: 'Straumann',
    svg: (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Straumann">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="currentColor" letterSpacing="2">STRAUMANN</text>
      </svg>
    ),
  },
  {
    name: 'Henry Schein',
    svg: (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Henry Schein">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="currentColor" letterSpacing="1">HENRY SCHEIN</text>
      </svg>
    ),
  },
  {
    name: 'Nobel Biocare',
    svg: (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nobel Biocare">
        <text x="0" y="22" fontFamily="Georgia, serif" fontWeight="400" fontSize="18" fill="currentColor" letterSpacing="0.5">Nobel Biocare</text>
      </svg>
    ),
  },
  {
    name: 'Dentsply Sirona',
    svg: (
      <svg viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Dentsply Sirona">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="currentColor" letterSpacing="2">DENTSPLY SIRONA</text>
      </svg>
    ),
  },
  {
    name: 'Carestream',
    svg: (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Carestream">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="currentColor" letterSpacing="1.5">CARESTREAM</text>
      </svg>
    ),
  },
];

export default function IndustryTrustBar() {
  return (
    <section
      style={{
        background: '#fafaf9',
        borderBottom: '1px solid rgba(15,23,42,0.06)',
        padding: '36px 0 40px',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase' as const,
            color: 'rgba(15,23,42,0.3)',
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          Systems Compatible With Industry Leaders
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0',
          }}
        >
          {BRANDS.map((brand, i) => (
            <div
              key={brand.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 32px',
                borderRight: i < BRANDS.length - 1 ? '1px solid rgba(15,23,42,0.08)' : 'none',
                color: 'rgba(15,23,42,0.22)',
                height: '40px',
                filter: 'grayscale(1)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = 'rgba(15,23,42,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = 'rgba(15,23,42,0.22)';
              }}
            >
              <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>
                {brand.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
