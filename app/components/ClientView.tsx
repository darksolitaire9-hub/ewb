'use client';

import { useState, useEffect } from 'react';
import { MoodEntry } from '@/lib/types';
import MoodSlider from './MoodSlider';
import EmotionTags from './EmotionTags';
import MoodChart from './MoodChart';
import { Calendar, Save, History } from 'lucide-react';

export default function ClientView() {
  const [moodScore, setMoodScore] = useState(7);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('moodEntries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = () => {
    const newEntry: MoodEntry = {
      id: `entry-${Date.now()}`,
      clientId: 'demo-client',
      date: new Date().toISOString().split('T')[0],
      moodScore,
      emotions: selectedEmotions,
      notes,
      timestamp: Date.now(),
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));

    // Reset form
    setMoodScore(7);
    setSelectedEmotions([]);
    setNotes('');

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isFormValid = selectedEmotions.length > 0;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-fade-in">
          <p className="font-medium">✓ Mood entry saved successfully!</p>
        </div>
      )}

      {/* Mood Entry Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="text-primary-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Track Your Mood</h2>
        </div>

        <div className="space-y-8">
          {/* Mood Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How are you feeling today?
            </label>
            <MoodSlider value={moodScore} onChange={setMoodScore} />
          </div>

          {/* Emotion Tags */}
          <EmotionTags
            selectedEmotions={selectedEmotions}
            onChange={setSelectedEmotions}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Any specific events or thoughts you'd like to share..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              isFormValid
                ? 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Save size={20} />
            Save Mood Entry
          </button>
        </div>
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <History className="text-primary-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Your Mood History</h2>
        </div>

        {entries.length > 0 ? (
          <>
            <MoodChart entries={entries} title="Your 7-Day Mood Trend" />
            
            {/* Recent Entries */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Entries</h3>
              <div className="space-y-3">
                {entries
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
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
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
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No mood entries yet.</p>
            <p className="text-sm text-gray-400">
              Start tracking your mood above to see your progress!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
