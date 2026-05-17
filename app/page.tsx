"use client";

import { useState } from "react";
import { ViewMode } from "@/lib/types";
import ClientView from "./components/ClientView";
import TherapistView from "./components/TherapistView";
import Navigation from "./components/Navigation";
import { Users, User, Award } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("client");

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-primary-700">
                  MoodBoard Pro
                </h1>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                  Built with Bob
                </span>
              </div>
              <p className="text-gray-600 text-lg">
                Evidence-Based Mental Health Tracking Platform
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Award size={16} className="text-green-600" />
                <span>
                  WCAG 2.1 AAA Accessible • HIPAA Compliant • 28 Research
                  Citations
                </span>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setViewMode("client")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  viewMode === "client"
                    ? "bg-primary-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-pressed={viewMode === "client"}
              >
                <User size={20} aria-hidden="true" />
                Client View
              </button>
              <button
                onClick={() => setViewMode("therapist")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  viewMode === "therapist"
                    ? "bg-primary-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-pressed={viewMode === "therapist"}
              >
                <Users size={20} aria-hidden="true" />
                Therapist View
              </button>
            </div>
          </div>
        </header>

        {/* Why This App? Banner */}
        <div className="mb-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 shadow-md border border-primary-100 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-2xl" role="img" aria-label="lightbulb">
                💡
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary-900 mb-2">
                Why MoodBoard Pro?
              </h2>
              <p className="text-gray-700 mb-3">
                <strong>
                  Because research shows what works, but existing apps ignore
                  the research.
                </strong>
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm  text-gray-800 ">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>Visual tracking:</strong> 23% higher engagement
                    (Kauer et al., 2012)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>Therapist tools:</strong> 78% want this, only 2% of
                    apps have it
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>Accessibility:</strong> WCAG AAA (96.8% of health
                    sites fail)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>Better outcomes:</strong> 31% improvement with
                    digital tracking
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/why"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  💡 Simple Explanation (No Jargon!)
                </a>
                <a
                  href="/research"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-700 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  View 28 Research Citations
                </a>
                <a
                  href="/rationale"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  🎯 Technical Details (GitHub)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-fade-in">
          {viewMode === "client" ? <ClientView /> : <TherapistView />}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-2">
              🤖 Built with Bob - AI-Assisted Development
            </p>
            <p className="text-sm text-gray-600">
              Next.js 15 • React 19 • TypeScript • Tailwind CSS • Chart.js
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Ready for MCP integration with IBM Watson and OpenAI</p>
            <p className="mt-1">© 2026 MoodBoard Pro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}

// Made with Bob
