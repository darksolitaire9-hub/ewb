// Core type definitions for MoodBoard Pro

export interface MoodEntry {
  id: string;
  clientId: string;
  date: string;
  moodScore: number; // 1-10
  emotions: string[];
  notes: string;
  timestamp: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  therapistId: string;
  joinDate: string;
  moodEntries: MoodEntry[];
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
  clients: Client[];
}

export interface MoodAnalysis {
  clientId: string;
  averageMood: number;
  moodTrend: 'improving' | 'declining' | 'stable';
  commonEmotions: string[];
  insights: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Pattern {
  type: 'recurring_emotion' | 'mood_decline' | 'mood_improvement' | 'trigger_detected';
  description: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high';
  detectedAt: string;
}

export interface AIInsight {
  id: string;
  clientId: string;
  type: 'pattern' | 'recommendation' | 'alert';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

// MCP Integration Types
export interface MCPAnalysisRequest {
  clientId: string;
  moodEntries: MoodEntry[];
  analysisType: 'sentiment' | 'pattern' | 'recommendation';
}

export interface MCPAnalysisResponse {
  success: boolean;
  data: {
    sentiment?: {
      score: number;
      label: string;
      confidence: number;
    };
    patterns?: Pattern[];
    recommendations?: string[];
    insights?: string[];
  };
  error?: string;
}

// View Types
export type ViewMode = 'client' | 'therapist';

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  mood: number;
}

export interface MoodChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

// Made with Bob
