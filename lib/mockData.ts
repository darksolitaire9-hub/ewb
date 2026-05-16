import { Client, MoodEntry, AIInsight } from './types';

// Generate mock mood entries for the last 7 days
const generateMoodEntries = (clientId: string, basePattern: number[]): MoodEntry[] => {
  const entries: MoodEntry[] = [];
  const emotions = [
    'Happy', 'Sad', 'Anxious', 'Calm', 'Excited', 
    'Frustrated', 'Content', 'Worried', 'Hopeful', 'Stressed'
  ];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const moodScore = basePattern[6 - i] + Math.floor(Math.random() * 2);
    const selectedEmotions = emotions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2);
    
    entries.push({
      id: `entry-${clientId}-${i}`,
      clientId,
      date: dateStr,
      moodScore: Math.min(10, Math.max(1, moodScore)),
      emotions: selectedEmotions,
      notes: generateNotes(moodScore, selectedEmotions),
      timestamp: date.getTime(),
    });
  }
  
  return entries;
};

const generateNotes = (mood: number, emotions: string[]): string => {
  const notes = [
    'Had a productive day at work. Feeling accomplished.',
    'Struggled with anxiety today. Need to practice breathing exercises.',
    'Great therapy session. Learned new coping strategies.',
    'Feeling overwhelmed with responsibilities.',
    'Spent quality time with family. Felt connected and supported.',
    'Work stress is affecting my sleep. Need to address this.',
    'Practiced mindfulness meditation. Helped me feel centered.',
    'Difficult conversation with a friend. Processing emotions.',
    'Accomplished my goals for the day. Feeling motivated.',
    'Feeling isolated. Need to reach out to support network.',
  ];
  
  return notes[Math.floor(Math.random() * notes.length)];
};

// Mock clients with different mood patterns
export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    therapistId: 'therapist-1',
    joinDate: '2024-01-15',
    moodEntries: generateMoodEntries('client-1', [6, 7, 6, 8, 7, 8, 9]), // Improving trend
  },
  {
    id: 'client-2',
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    therapistId: 'therapist-1',
    joinDate: '2024-02-01',
    moodEntries: generateMoodEntries('client-2', [7, 6, 5, 5, 4, 5, 4]), // Declining trend
  },
  {
    id: 'client-3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    therapistId: 'therapist-1',
    joinDate: '2024-01-20',
    moodEntries: generateMoodEntries('client-3', [6, 7, 6, 7, 6, 7, 6]), // Stable trend
  },
];

// Mock AI insights for demonstration
export const mockInsights: AIInsight[] = [
  {
    id: 'insight-1',
    clientId: 'client-1',
    type: 'pattern',
    title: 'Positive Trend Detected',
    description: 'Sarah has shown consistent mood improvement over the past week. Work-related accomplishments appear to be a key factor.',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'insight-2',
    clientId: 'client-2',
    type: 'alert',
    title: 'Declining Mood Pattern',
    description: 'Michael\'s mood scores have decreased over 4 consecutive days. Anxiety and work stress are recurring themes.',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'insight-3',
    clientId: 'client-2',
    type: 'recommendation',
    title: 'Intervention Suggested',
    description: 'Consider scheduling an additional session to address work-related stressors and anxiety management techniques.',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'insight-4',
    clientId: 'client-3',
    type: 'pattern',
    title: 'Stable Mood Pattern',
    description: 'Emily maintains a consistent mood range. Social connections and mindfulness practice appear beneficial.',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'insight-5',
    clientId: 'client-1',
    type: 'recommendation',
    title: 'Maintain Current Strategies',
    description: 'Current coping mechanisms are effective. Encourage continued use of goal-setting and achievement tracking.',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
];

// Helper function to get client by ID
export const getClientById = (clientId: string): Client | undefined => {
  return mockClients.find(client => client.id === clientId);
};

// Helper function to get insights for a client
export const getInsightsForClient = (clientId: string): AIInsight[] => {
  return mockInsights.filter(insight => insight.clientId === clientId);
};

// Helper function to calculate average mood
export const calculateAverageMood = (entries: MoodEntry[]): number => {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + entry.moodScore, 0);
  return Math.round((sum / entries.length) * 10) / 10;
};

// Helper function to get mood trend
export const getMoodTrend = (entries: MoodEntry[]): 'improving' | 'declining' | 'stable' => {
  if (entries.length < 3) return 'stable';
  
  const recent = entries.slice(-3);
  const earlier = entries.slice(0, 3);
  
  const recentAvg = calculateAverageMood(recent);
  const earlierAvg = calculateAverageMood(earlier);
  
  const difference = recentAvg - earlierAvg;
  
  if (difference > 0.5) return 'improving';
  if (difference < -0.5) return 'declining';
  return 'stable';
};

// Helper function to get common emotions
export const getCommonEmotions = (entries: MoodEntry[]): string[] => {
  const emotionCounts: { [key: string]: number } = {};
  
  entries.forEach(entry => {
    entry.emotions.forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });
  });
  
  return Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([emotion]) => emotion);
};

// Made with Bob
