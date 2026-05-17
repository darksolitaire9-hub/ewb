'use client';

import { useState } from 'react';

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const moodLabels = [
  { value: 1, label: 'Very Low', emoji: '😢', color: 'text-red-600' },
  { value: 2, label: 'Low', emoji: '😟', color: 'text-red-500' },
  { value: 3, label: 'Poor', emoji: '😕', color: 'text-orange-600' },
  { value: 4, label: 'Below Average', emoji: '😐', color: 'text-orange-500' },
  { value: 5, label: 'Neutral', emoji: '😶', color: 'text-yellow-600' },
  { value: 6, label: 'Fair', emoji: '🙂', color: 'text-yellow-500' },
  { value: 7, label: 'Good', emoji: '😊', color: 'text-green-500' },
  { value: 8, label: 'Very Good', emoji: '😄', color: 'text-green-600' },
  { value: 9, label: 'Great', emoji: '😁', color: 'text-green-700' },
  { value: 10, label: 'Excellent', emoji: '🤩', color: 'text-green-800' },
];

export default function MoodSlider({ value, onChange, disabled = false }: MoodSliderProps) {
  const currentMood = moodLabels.find(m => m.value === value) || moodLabels[4];

  return (
    <div className="w-full" role="group" aria-labelledby="mood-slider-label">
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current mood: {currentMood.label}, {value} out of 10
      </div>

      <div className="mb-6 text-center">
        <div
          className={`text-6xl mb-2 ${currentMood.color}`}
          role="img"
          aria-label={`Mood emoji: ${currentMood.label}`}
        >
          {currentMood.emoji}
        </div>
        <div className="text-2xl font-semibold text-gray-800" id="mood-label-text">
          {currentMood.label}
        </div>
        <div className="text-4xl font-bold text-primary-600 mt-1" aria-label={`Mood score: ${value} out of 10`}>
          {value}/10
        </div>
      </div>

      <div className="relative">
        {/* Slider Track */}
        <div
          className="h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full shadow-inner"
          aria-hidden="true"
        />
        
        {/* Slider Input */}
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          aria-label="Mood slider: Select your mood level from 1 (Very Low) to 10 (Excellent)"
          aria-valuemin={1}
          aria-valuemax={10}
          aria-valuenow={value}
          aria-valuetext={`${currentMood.label}, ${value} out of 10`}
          aria-describedby="mood-slider-description"
          className="absolute top-0 left-0 w-full h-3 appearance-none bg-transparent cursor-pointer slider-thumb focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          style={{
            background: 'transparent',
          }}
        />
        
        {/* Hidden description for screen readers */}
        <div id="mood-slider-description" className="sr-only">
          Use arrow keys to adjust your mood level. Left and down arrows decrease, right and up arrows increase.
        </div>

        {/* Tick Marks */}
        <div className="flex justify-between mt-2 px-1" role="group" aria-label="Quick mood selection buttons">
          {moodLabels.map((mood) => (
            <button
              key={mood.value}
              onClick={() => !disabled && onChange(mood.value)}
              disabled={disabled}
              aria-label={`Set mood to ${mood.value}: ${mood.label}`}
              aria-pressed={value === mood.value}
              className={`text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded ${
                value === mood.value
                  ? 'text-primary-600 scale-110 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {mood.value}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1E3A8A;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1E3A8A;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb:disabled::-webkit-slider-thumb {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .slider-thumb:disabled::-moz-range-thumb {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

// Made with Bob
