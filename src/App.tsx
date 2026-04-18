import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Process from './components/Process';
import ContactForm from './components/ContactForm';

export default function App() {
  return (
    <div className="bg-white min-h-screen text-slate-900 antialiased">
      <Navbar />
      <Hero />
      <Calculator />
      <Process />
      <ContactForm />
    </div>
  );
}
