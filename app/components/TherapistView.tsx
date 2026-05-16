'use client';

import { useState } from 'react';
import { mockClients, mockInsights, calculateAverageMood, getMoodTrend, getCommonEmotions } from '@/lib/mockData';
import MoodChart from './MoodChart';
import { Users, TrendingUp, TrendingDown, Minus, AlertCircle, Brain, Lightbulb } from 'lucide-react';

export default function TherapistView() {
  const [selectedClientId, setSelectedClientId] = useState(mockClients[0].id);
  const selectedClient = mockClients.find(c => c.id === selectedClientId);
  const clientInsights = mockInsights.filter(i => i.clientId === selectedClientId);

  if (!selectedClient) return null;

  const avgMood = calculateAverageMood(selectedClient.moodEntries);
  const trend = getMoodTrend(selectedClient.moodEntries);
  const commonEmotions = getCommonEmotions(selectedClient.moodEntries);

  const getTrendIcon = () => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="text-green-600" size={20} />;
      case 'declining':
        return <TrendingDown className="text-red-600" size={20} />;
      default:
        return <Minus className="text-yellow-600" size={20} />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'improving':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'declining':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-primary-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Client Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockClients.map((client) => {
            const clientAvg = calculateAverageMood(client.moodEntries);
            const clientTrend = getMoodTrend(client.moodEntries);
            
            return (
              <button
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left card-hover ${
                  selectedClientId === client.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
              >
                <div className="font-semibold text-gray-800 mb-1">{client.name}</div>
                <div className="text-sm text-gray-600 mb-2">{client.email}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Avg Mood: {clientAvg}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    clientTrend === 'improving' ? 'bg-green-100 text-green-700' :
                    clientTrend === 'declining' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {clientTrend}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Client Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Mood */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-2">Average Mood</div>
          <div className="text-4xl font-bold text-primary-600 mb-2">{avgMood}/10</div>
          <div className="text-xs text-gray-500">Last 7 days</div>
        </div>

        {/* Mood Trend */}
        <div className={`rounded-lg shadow-md p-6 border-2 ${getTrendColor()}`}>
          <div className="text-sm mb-2">Mood Trend</div>
          <div className="flex items-center gap-2 mb-2">
            {getTrendIcon()}
            <span className="text-2xl font-bold capitalize">{trend}</span>
          </div>
          <div className="text-xs">Based on recent patterns</div>
        </div>

        {/* Entry Count */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-2">Total Entries</div>
          <div className="text-4xl font-bold text-secondary-600 mb-2">
            {selectedClient.moodEntries.length}
          </div>
          <div className="text-xs text-gray-500">Mood check-ins</div>
        </div>
      </div>

      {/* Mood Chart */}
      <MoodChart 
        entries={selectedClient.moodEntries} 
        title={`${selectedClient.name}'s Mood Trend`}
        color="#1E3A8A"
      />

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="text-purple-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">AI-Powered Insights</h2>
          <span className="ml-auto text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
            MCP Ready
          </span>
        </div>

        <div className="space-y-4">
          {clientInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border-2 ${
                insight.priority === 'high'
                  ? 'bg-red-50 border-red-300'
                  : insight.priority === 'medium'
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-green-50 border-green-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {insight.type === 'alert' && <AlertCircle className="text-red-600 flex-shrink-0" size={20} />}
                {insight.type === 'recommendation' && <Lightbulb className="text-yellow-600 flex-shrink-0" size={20} />}
                {insight.type === 'pattern' && <TrendingUp className="text-green-600 flex-shrink-0" size={20} />}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.priority === 'high'
                        ? 'bg-red-200 text-red-800'
                        : insight.priority === 'medium'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MCP Integration Note */}
        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-dashed border-purple-300">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-purple-600">🤖 AI Integration:</span>{' '}
            These insights are currently using mock data. Connect to IBM Watson or OpenAI via MCP 
            for real-time sentiment analysis, pattern detection, and personalized recommendations.
          </p>
        </div>
      </div>

      {/* Common Emotions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Common Emotions</h3>
        <div className="flex flex-wrap gap-2">
          {commonEmotions.map((emotion) => (
            <span
              key={emotion}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {emotion}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {selectedClient.moodEntries
            .slice()
            .reverse()
            .slice(0, 5)
            .map((entry) => (
              <div
                key={entry.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {entry.moodScore}/10
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {entry.emotions.map((emotion) => (
                    <span
                      key={emotion}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
