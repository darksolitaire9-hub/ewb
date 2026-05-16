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
    <div className="w-full">
      <div className="mb-6 text-center">
        <div className={`text-6xl mb-2 ${currentMood.color}`}>
          {currentMood.emoji}
        </div>
        <div className="text-2xl font-semibold text-gray-800">
          {currentMood.label}
        </div>
        <div className="text-4xl font-bold text-primary-600 mt-1">
          {value}/10
        </div>
      </div>

      <div className="relative">
        {/* Slider Track */}
        <div className="h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full shadow-inner" />
        
        {/* Slider Input */}
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="absolute top-0 left-0 w-full h-3 appearance-none bg-transparent cursor-pointer slider-thumb"
          style={{
            background: 'transparent',
          }}
        />

        {/* Tick Marks */}
        <div className="flex justify-between mt-2 px-1">
          {moodLabels.map((mood) => (
            <button
              key={mood.value}
              onClick={() => !disabled && onChange(mood.value)}
              disabled={disabled}
              className={`text-xs font-medium transition-all ${
                value === mood.value
                  ? 'text-primary-600 scale-110'
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
