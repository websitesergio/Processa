import DiagnosticCalculator from '../components/DiagnosticCalculator';
import MathematicsOfSpeed from '../components/MathematicsOfSpeed';
import { useInView } from '../lib/useInView';

export default function DiagnosticPage() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <main className="mesh-gradient-light min-h-screen">
      <section className="px-6 md:px-12 pt-36 pb-0">
        <div className="max-w-7xl mx-auto">
          <div
            ref={headerRef}
            className="max-w-2xl mb-16 animate-start"
            style={headerVisible ? {
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            } : {}}
          >
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.24em',
                textTransform: 'uppercase' as const,
                color: '#1d4ed8',
                marginBottom: '20px',
              }}
            >
              Revenue Diagnostic
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                color: '#0f172a',
                marginBottom: '16px',
              }}
            >
              The cost of your current inaction, precisely calculated.
            </h1>
            <p
              style={{
                fontSize: '14px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.9,
                color: 'rgba(15,23,42,0.5)',
                maxWidth: '52ch',
              }}
            >
              Set your practice parameters below and receive your exact annual revenue exposure — calculated against Lead Response Management research, not estimated.
            </p>
          </div>
        </div>
      </section>

      <DiagnosticCalculator />
      <MathematicsOfSpeed />
    </main>
  );
}
