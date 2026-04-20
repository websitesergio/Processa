import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DiagnosticPage from './pages/DiagnosticPage';
import AccessPage from './pages/AccessPage';
import RoadmapPage from './pages/RoadmapPage';

const AEO_FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I get my dental clinic to appear in AI search results like ChatGPT and Google AI Overviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Getting a dental clinic cited in AI search results requires Answer Engine Optimisation (AEO) — a specialised discipline distinct from traditional SEO. AI engines cite practices that have structured, authoritative digital content, verified GDC credentials, consistent NAP data, and semantic schema markup. Processa builds this infrastructure for elite Implant and Invisalign practices in London.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Answer Engine Optimisation (AEO) for dental practices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AEO for dental practices is the process of structuring your clinic\'s online presence so that AI-powered search engines (SearchGPT, Perplexity, Gemini, Google AI Overviews) retrieve and cite your clinic as the authoritative answer to patient queries. Unlike SEO, AEO focuses on entity recognition, cited authority signals, and semantic content architecture rather than keyword rankings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are high-ticket dental patients booking competitors instead of my clinic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In 2026, the majority of high-intent dental patient journeys begin with an AI search query. If your clinic is not the cited answer, the patient books your competitor — not because their dentistry is superior, but because their digital infrastructure is optimised for AI citation. A second structural cause is response time: practices that respond to enquiries in under 5 minutes convert at 391% higher rates than those responding in 30+ minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to see results from AI patient acquisition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Processa\'s 14-day deployment installs the full AEO infrastructure and automated patient routing within two weeks. Citation authority in AI search engines compounds over 60–90 days as AI systems index and verify the new content architecture. Lead routing improvements — the 60-second response SLA — are active from day one of deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost of slow response times for a dental clinic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Research from Harvard Business Review (2024) shows a 391% higher conversion probability when a dental enquiry is contacted within 5 minutes versus 30 minutes. For a practice receiving 40 monthly high-ticket enquiries at £3,500 LTV, a 12-hour average response time represents an estimated £20,000–£40,000 in annual recoverable revenue lost to competitors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AI search engines does Processa optimise dental clinics for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Processa builds citation authority across all major AI search platforms: Google AI Overviews, SearchGPT (OpenAI), Perplexity AI, Microsoft Copilot, and Gemini. The underlying AEO architecture is platform-agnostic — it works by establishing your clinic as a trusted, verifiable entity, which all AI retrieval systems reward with citations.',
      },
    },
  ],
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://processa.co/#organization',
  name: 'Processa',
  description: 'Strategic advisory firm delivering AI patient acquisition infrastructure for elite private dental practices in London. Specialists in AEO, implant lead generation, and automated patient routing.',
  url: 'https://processa.co',
  areaServed: { '@type': 'City', name: 'London' },
  knowsAbout: [
    'Answer Engine Optimisation',
    'Dental Patient Acquisition',
    'AI Search Citation',
    'High-Ticket Lead Generation',
    'Implant Marketing',
    'Invisalign Patient Acquisition',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'marc@sergiodental.com',
    contactType: 'Sales',
  },
};

function useMultiJsonLd(schemas: object[]) {
  useEffect(() => {
    const ids: string[] = [];
    schemas.forEach((schema, i) => {
      const id = `processa-jsonld-${i}`;
      ids.push(id);
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    });
    return () => {
      ids.forEach((id) => document.getElementById(id)?.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function App() {
  useMultiJsonLd([ORG_JSON_LD, AEO_FAQ_JSON_LD]);

  return (
    <div className="bg-white min-h-screen text-slate-900 antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/access" element={<AccessPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
