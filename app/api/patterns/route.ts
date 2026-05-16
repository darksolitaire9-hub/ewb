import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/patterns
 * 
 * MCP Integration Point: Pattern Detection
 * 
 * This endpoint analyzes mood entries to detect behavioral patterns,
 * triggers, and recurring themes using AI-powered analysis.
 * 
 * MCP Integration:
 * - Connect to IBM Watson Natural Language Understanding
 * - Use OpenAI for advanced pattern recognition
 * - Implement time-series analysis for trend detection
 */

export async function POST(request: NextRequest) {
  try {
    const { clientId, moodEntries, timeRange } = await request.json();

    if (!clientId || !moodEntries) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: MCP Integration for advanced pattern detection
    // const patterns = await mcpClient.detectPatterns({
    //   entries: moodEntries,
    //   algorithms: ['time-series', 'clustering', 'anomaly-detection']
    // });

    // Mock pattern detection
    const patterns = [];

    // Detect mood volatility
    const moodScores = moodEntries.map((e: any) => e.moodScore);
    const variance = calculateVariance(moodScores);
    
    if (variance > 4) {
      patterns.push({
        type: 'high_volatility',
        title: 'High Mood Volatility Detected',
        description: 'Mood scores show significant fluctuation, suggesting unstable emotional state',
        severity: 'high',
        confidence: 0.87,
        recommendation: 'Consider discussing mood stabilization strategies',
      });
    }

    // Detect weekly patterns
    const dayOfWeekScores: { [key: string]: number[] } = {};
    moodEntries.forEach((entry: any) => {
      const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!dayOfWeekScores[day]) dayOfWeekScores[day] = [];
      dayOfWeekScores[day].push(entry.moodScore);
    });

    Object.entries(dayOfWeekScores).forEach(([day, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (avg < 5 && scores.length >= 2) {
        patterns.push({
          type: 'weekly_pattern',
          title: `Lower Mood on ${day}s`,
          description: `Mood tends to be lower on ${day}s (avg: ${avg.toFixed(1)}/10)`,
          severity: 'medium',
          confidence: 0.75,
          recommendation: `Explore potential stressors or triggers associated with ${day}s`,
        });
      }
    });

    // Detect emotion clusters
    const emotionFrequency: { [key: string]: number } = {};
    moodEntries.forEach((entry: any) => {
      entry.emotions.forEach((emotion: string) => {
        emotionFrequency[emotion] = (emotionFrequency[emotion] || 0) + 1;
      });
    });

    const dominantEmotions = Object.entries(emotionFrequency)
      .filter(([_, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (dominantEmotions.length > 0) {
      patterns.push({
        type: 'emotion_cluster',
        title: 'Recurring Emotional Themes',
        description: `Frequently reported emotions: ${dominantEmotions.map(([e]) => e).join(', ')}`,
        severity: 'low',
        confidence: 0.92,
        recommendation: 'Explore underlying causes of these recurring emotions',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        patterns,
        summary: {
          totalPatterns: patterns.length,
          highSeverity: patterns.filter(p => p.severity === 'high').length,
          analyzedEntries: moodEntries.length,
        },
      },
    });
  } catch (error) {
    console.error('Pattern detection error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateVariance(numbers: number[]): number {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
}

// Made with Bob
