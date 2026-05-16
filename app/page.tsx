'use client';

import { useState } from 'react';
import { ViewMode } from '@/lib/types';
import ClientView from './components/ClientView';
import TherapistView from './components/TherapistView';
import { Users, User } from 'lucide-react';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('client');

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary-700 mb-2">
                MoodBoard Pro
              </h1>
              <p className="text-gray-600">
                AI-Powered Mental Health Tracking Platform
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setViewMode('client')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  viewMode === 'client'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User size={20} />
                Client View
              </button>
              <button
                onClick={() => setViewMode('therapist')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  viewMode === 'therapist'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Therapist View
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="animate-fade-in">
          {viewMode === 'client' ? <ClientView /> : <TherapistView />}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            MoodBoard Pro - Built with Next.js 15, React 19, TypeScript, and AI-powered insights
          </p>
          <p className="mt-1">
            Ready for MCP integration with IBM Watson and OpenAI
          </p>
        </footer>
      </div>
    </main>
  );
}

// Made with Bob
