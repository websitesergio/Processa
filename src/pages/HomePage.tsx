import Hero from '../components/Hero';
import CredibilityStrip from '../components/CredibilityStrip';
import Calculator from '../components/Calculator';
import MarketReality from '../components/MarketReality';
import Process from '../components/Process';
import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Calculator />
      <MarketReality />
      <Process />
      <FAQSection />
      <ContactForm />
    </>
  );
}
