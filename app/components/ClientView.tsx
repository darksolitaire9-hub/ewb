"use client";

import { useState, useEffect } from "react";
import { MoodEntry } from "@/lib/types";
import MoodSlider from "./MoodSlider";
import EmotionTags from "./EmotionTags";
import MoodChart from "./MoodChart";
import { Calendar, Save, History } from "lucide-react";

export default function ClientView() {
  const [moodScore, setMoodScore] = useState(7);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = () => {
    const newEntry: MoodEntry = {
      id: `entry-${Date.now()}`,
      clientId: "demo-client",
      date: new Date().toISOString().split("T")[0],
      moodScore,
      emotions: selectedEmotions,
      notes,
      timestamp: Date.now(),
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));

    // Reset form
    setMoodScore(7);
    setSelectedEmotions([]);
    setNotes("");

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isFormValid = selectedEmotions.length > 0;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-fade-in"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-medium">✓ Mood entry saved successfully!</p>
        </div>
      )}

      {/* Mood Entry Form */}
      <section
        className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        aria-labelledby="mood-entry-heading"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="text-primary-600" size={24} aria-hidden="true" />
          <h2
            id="mood-entry-heading"
            className="text-2xl font-bold text-gray-800"
          >
            Track Your Mood
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) handleSubmit();
          }}
          className="space-y-8"
          aria-describedby="form-description"
        >
          {/* Hidden form description for screen readers */}
          <div id="form-description" className="sr-only">
            Complete this form to track your daily mood. Select your mood level,
            choose emotions, and optionally add notes.
          </div>

          {/* Mood Slider */}
          <div>
            <label
              id="mood-slider-label"
              className="block text-sm font-medium text-gray-700 mb-4"
            >
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
            <label
              htmlFor="mood-notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Notes (Optional)
            </label>
            <textarea
              id="mood-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Any specific events or thoughts you'd like to share..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-900 bg-white placeholder:text-gray-400"
              rows={4}
              maxLength={1000}
              aria-describedby="notes-hint"
            />
            <div id="notes-hint" className="mt-1 text-xs text-gray-500">
              {notes.length}/1000 characters
            </div>
          </div>

          {/* Validation Message */}
          {!isFormValid && (
            <div
              className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-yellow-800">
                ⚠️ Please select at least one emotion to save your mood entry.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
            aria-describedby={
              !isFormValid ? "submit-disabled-reason" : undefined
            }
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              isFormValid
                ? "bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Save size={20} aria-hidden="true" />
            Save Mood Entry
          </button>
          {!isFormValid && (
            <div id="submit-disabled-reason" className="sr-only">
              Button is disabled because no emotions are selected
            </div>
          )}
        </form>
      </section>

      {/* Mood History */}
      <section
        className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        aria-labelledby="mood-history-heading"
      >
        <div className="flex items-center gap-2 mb-6">
          <History className="text-primary-600" size={24} aria-hidden="true" />
          <h2
            id="mood-history-heading"
            className="text-2xl font-bold text-gray-800"
          >
            Your Mood History
          </h2>
        </div>

        {entries.length > 0 ? (
          <>
            <div aria-label="Mood trend chart">
              <MoodChart entries={entries} title="Your 7-Day Mood Trend" />
            </div>

            {/* Recent Entries */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Entries
              </h3>
              <div
                className="space-y-3"
                role="list"
                aria-label="Recent mood entries"
              >
                {entries
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((entry) => (
                    <article
                      key={entry.id}
                      role="listitem"
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors focus-within:ring-2 focus-within:ring-primary-500"
                      aria-label={`Mood entry from ${new Date(
                        entry.date,
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}, mood score ${entry.moodScore} out of 10`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <time
                          className="text-sm font-medium text-gray-600"
                          dateTime={entry.date}
                        >
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span
                          className="text-lg font-bold text-primary-600"
                          aria-label={`Mood score: ${entry.moodScore} out of 10`}
                        >
                          {entry.moodScore}/10
                        </span>
                      </div>
                      <div
                        className="flex flex-wrap gap-2 mb-2"
                        role="list"
                        aria-label="Emotions felt"
                      >
                        {entry.emotions.map((emotion) => (
                          <span
                            key={emotion}
                            role="listitem"
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {emotion}
                          </span>
                        ))}
                      </div>
                      {entry.notes && (
                        <p
                          className="text-sm text-gray-600 mt-2"
                          aria-label="Notes"
                        >
                          {entry.notes}
                        </p>
                      )}
                    </article>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12" role="status" aria-live="polite">
            <p className="text-gray-500 mb-2">No mood entries yet.</p>
            <p className="text-sm text-gray-400">
              Start tracking your mood above to see your progress!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

// Made with Bob
