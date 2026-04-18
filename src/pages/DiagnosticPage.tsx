import DiagnosticCalculator from '../components/DiagnosticCalculator';
import MathematicsOfSpeed from '../components/MathematicsOfSpeed';

export default function DiagnosticPage() {
  return (
    <main className="bg-white min-h-screen">
      <DiagnosticCalculator />
      <MathematicsOfSpeed />
    </main>
  );
}
