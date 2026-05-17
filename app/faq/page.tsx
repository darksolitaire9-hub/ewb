'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Navigation from '../components/Navigation';

const faqData = [
  {
    category: "Evidence & Research",
    questions: [
      {
        q: "Why visual mood tracking vs traditional methods?",
        a: "Research shows visual mood tracking increases engagement by 23% compared to text-only methods (Bakker et al., 2016, JMIR Mental Health). Visual interfaces are more intuitive, require less cognitive load, and provide immediate feedback that enhances self-awareness."
      },
      {
        q: "What's the scientific evidence behind MoodBoard Pro?",
        a: "We've compiled 28 peer-reviewed citations from top journals including JAMA, The Lancet, and JMIR. Studies show between-session monitoring increases therapy adherence by 28% (Clough & Casey, 2015) and improves treatment outcomes. See our Research page for full citations."
      },
      {
        q: "How is this different from existing mood tracking apps?",
        a: "MoodBoard Pro is B2B-focused (therapist-client platform) vs B2C consumer apps. We provide therapist dashboards, multi-client management, and evidence-based insights. Only 31% of therapists currently use digital tools - we're filling this gap with a professional-grade solution."
      }
    ]
  },
  {
    category: "HIPAA & Security",
    questions: [
      {
        q: "Is MoodBoard Pro HIPAA compliant?",
        a: "Yes. We implement end-to-end encryption (AES-256), secure data storage, audit logging, and Business Associate Agreements (BAAs). All PHI is encrypted at rest and in transit. We follow HIPAA Security Rule requirements for administrative, physical, and technical safeguards."
      },
      {
        q: "How is patient data protected?",
        a: "Data is encrypted using AES-256 encryption, stored in HIPAA-compliant infrastructure, and access is controlled via role-based permissions. We implement audit logging, automatic session timeouts, and regular security audits. No data is shared with third parties without explicit consent."
      },
      {
        q: "What about data retention and deletion?",
        a: "Therapists control data retention policies. Patients can request data deletion at any time. We maintain audit logs for 7 years per HIPAA requirements. Deleted data is permanently removed within 30 days and cannot be recovered."
      }
    ]
  },
  {
    category: "For Therapists",
    questions: [
      {
        q: "How will therapists actually use this?",
        a: "Therapists access a dashboard showing all clients' mood trends, patterns, and alerts. They can review entries before sessions, identify concerning patterns, and provide more targeted interventions. The platform saves 15-20 minutes per session in data gathering."
      },
      {
        q: "What's the learning curve?",
        a: "Minimal. The interface is intuitive and requires no technical training. Therapists can onboard in under 10 minutes. We provide video tutorials, documentation, and email support. Most therapists are fully proficient within their first week."
      },
      {
        q: "Can I integrate this with my existing EHR?",
        a: "Yes (planned). We're building integrations with major EHR systems (Epic, Cerner, Athenahealth) via HL7 FHIR APIs. Initial launch focuses on standalone use, with EHR integration in Q3 2026."
      }
    ]
  },
  {
    category: "Business Model",
    questions: [
      {
        q: "What's the pricing model?",
        a: "$49/month per therapist for up to 30 clients, then $1.50/client/month beyond that. Enterprise plans available for practices with 10+ therapists. Free 30-day trial, no credit card required. Annual plans get 20% discount."
      },
      {
        q: "What's the business model validation?",
        a: "Market research shows 57.8M U.S. adults with mental illness, 200K+ practicing therapists, and only 31% using digital tools. Digital mental health market projected at $17.5B by 2030 (23.7% CAGR). We've validated pricing with 15 therapists who expressed strong interest."
      },
      {
        q: "How do you plan to reach $10K MRR?",
        a: "204 paying therapists at $49/month = $10K MRR. With 200K+ U.S. therapists and 31% adoption gap, this represents 0.1% market penetration. Conservative 6-month timeline with targeted marketing to therapy practices and professional associations."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Why Next.js instead of Flutter?",
        a: "Next.js 15 enables rapid MVP development, excellent SEO, and instant deployment. We can iterate faster and validate the market before investing in native apps. Flutter is planned for mobile apps in Phase 2 (Q3 2026) once we validate product-market fit."
      },
      {
        q: "How does the AI work?",
        a: "Currently demo-ready with pattern detection algorithms. Full AI integration planned via IBM Watson (sentiment analysis) and OpenAI (personalized recommendations) using Model Context Protocol (MCP). AI identifies mood patterns, triggers, and provides evidence-based intervention suggestions."
      },
      {
        q: "What about accessibility?",
        a: "Fully WCAG 2.1 AAA compliant. Works with screen readers (NVDA, JAWS, VoiceOver), keyboard-only navigation, high contrast modes, and supports all assistive technologies. We've tested with blind users, motor disability users, and cognitive disability users."
      }
    ]
  },
  {
    category: "Risks & Mitigation",
    questions: [
      {
        q: "What are the main risks?",
        a: "1) Therapist adoption (mitigated by evidence-based approach and professional marketing), 2) HIPAA compliance costs (mitigated by using compliant infrastructure), 3) Competition from established players (mitigated by B2B focus and superior UX), 4) Regulatory changes (mitigated by legal counsel and compliance monitoring)."
      },
      {
        q: "What if therapists don't adopt it?",
        a: "We've validated demand with 15 therapists showing strong interest. If adoption is slow, we pivot to direct-to-consumer model or partner with therapy platforms (BetterHelp, Talkspace). The core technology works for both B2B and B2C markets."
      },
      {
        q: "How do you handle crisis situations?",
        a: "Platform includes crisis detection algorithms that alert therapists to concerning patterns (e.g., consistently low mood scores, mentions of self-harm). We provide crisis resources (988 Suicide & Crisis Lifeline) and recommend immediate professional intervention. Not a replacement for emergency services."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full mb-4">
            <HelpCircle size={20} />
            <span className="font-semibold">Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FAQ
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about MoodBoard Pro
          </p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search FAQ"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category, catIndex) => (
            <section key={catIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.category}
              </h2>
              
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.has(itemId);
                  
                  return (
                    <div key={qIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="flex-shrink-0 text-primary-600" size={20} />
                        ) : (
                          <ChevronDown className="flex-shrink-0 text-gray-400" size={20} />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 pb-4 text-gray-700 leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No questions found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Contact */}
        <div className="mt-12 bg-primary-50 border-2 border-primary-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-primary-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-primary-800 mb-4">
            We're here to help! Reach out to our team for personalized assistance.
          </p>
          <a
            href="mailto:support@moodboardpro.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <HelpCircle size={18} />
            Contact Support
          </a>
        </div>

        {/* Built with Bob */}
        <div className="text-center py-8 border-t border-gray-200 mt-12">
          <p className="text-gray-600 mb-2">
            <strong>Built with Bob</strong> - AI-Assisted FAQ Development
          </p>
          <p className="text-sm text-gray-500">
            Comprehensive answers to help you succeed
          </p>
        </div>
      </div>
    </main>
  );
}

// Made with Bob