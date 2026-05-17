'use client';

interface EmotionTagsProps {
  selectedEmotions: string[];
  onChange: (emotions: string[]) => void;
  disabled?: boolean;
}

const availableEmotions = [
  { name: 'Happy', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { name: 'Sad', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { name: 'Anxious', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { name: 'Calm', color: 'bg-green-100 text-green-800 border-green-300' },
  { name: 'Excited', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { name: 'Frustrated', color: 'bg-red-100 text-red-800 border-red-300' },
  { name: 'Content', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  { name: 'Worried', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { name: 'Hopeful', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  { name: 'Stressed', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  { name: 'Grateful', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { name: 'Lonely', color: 'bg-slate-100 text-slate-800 border-slate-300' },
];

export default function EmotionTags({ selectedEmotions, onChange, disabled = false }: EmotionTagsProps) {
  const toggleEmotion = (emotion: string) => {
    if (disabled) return;
    
    if (selectedEmotions.includes(emotion)) {
      onChange(selectedEmotions.filter(e => e !== emotion));
    } else {
      onChange([...selectedEmotions, emotion]);
    }
  };

  return (
    <div className="w-full">
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-3" id="emotion-tags-label">
          How are you feeling? (Select all that apply)
        </legend>
        
        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {selectedEmotions.length > 0
            ? `${selectedEmotions.length} emotion${selectedEmotions.length > 1 ? 's' : ''} selected: ${selectedEmotions.join(', ')}`
            : 'No emotions selected yet. Please select at least one emotion.'}
        </div>
        
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="emotion-tags-label"
          aria-describedby="emotion-tags-description"
        >
          {availableEmotions.map((emotion) => {
            const isSelected = selectedEmotions.includes(emotion.name);
            
            return (
              <button
                key={emotion.name}
                type="button"
                onClick={() => toggleEmotion(emotion.name)}
                disabled={disabled}
                role="checkbox"
                aria-checked={isSelected}
                aria-label={`${emotion.name}${isSelected ? ', selected' : ', not selected'}`}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  ${isSelected
                    ? `${emotion.color} scale-105 shadow-md`
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }
                  ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'}
                `}
              >
                {emotion.name}
                {isSelected && (
                  <span className="ml-1 font-bold" aria-hidden="true">✓</span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Hidden description for screen readers */}
        <div id="emotion-tags-description" className="sr-only">
          Select one or more emotions that describe how you're feeling. Use Space or Enter to toggle selection.
        </div>
      </fieldset>

      {selectedEmotions.length > 0 && (
        <div
          className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          role="status"
          aria-label="Selected emotions summary"
        >
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Selected:</span>{' '}
            {selectedEmotions.join(', ')}
          </p>
        </div>
      )}
      
      {selectedEmotions.length === 0 && (
        <div className="mt-2 text-sm text-gray-500" role="alert" aria-live="polite">
          Please select at least one emotion to continue
        </div>
      )}
    </div>
  );
}

// Made with Bob
