import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/recommendations
 * 
 * MCP Integration Point: AI-Powered Recommendations
 * 
 * This endpoint generates personalized therapeutic recommendations
 * based on mood patterns, emotional states, and behavioral data.
 * 
 * MCP Integration:
 * - IBM Watson Assistant for conversational recommendations
 * - OpenAI GPT-4 for context-aware therapeutic suggestions
 * - Custom ML models for personalized intervention strategies
 */

export async function POST(request: NextRequest) {
  try {
    const { clientId, moodEntries, clientProfile } = await request.json();

    if (!clientId || !moodEntries) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: MCP Integration for AI-powered recommendations
    // const recommendations = await mcpClient.generateRecommendations({
    //   clientData: { id: clientId, profile: clientProfile },
    //   moodHistory: moodEntries,
    //   context: 'therapeutic_intervention'
    // });

    // Calculate metrics
    const avgMood = moodEntries.reduce((sum: number, e: any) => sum + e.moodScore, 0) / moodEntries.length;
    const recentTrend = calculateTrend(moodEntries);
    const emotionAnalysis = analyzeEmotions(moodEntries);

    // Generate recommendations based on analysis
    const recommendations = [];

    // Mood-based recommendations
    if (avgMood < 4) {
      recommendations.push({
        category: 'immediate_intervention',
        priority: 'high',
        title: 'Schedule Additional Session',
        description: 'Client shows consistently low mood scores. Consider scheduling an additional therapy session this week.',
        actions: [
          'Contact client to check in',
          'Assess for crisis intervention needs',
          'Review current treatment plan effectiveness',
        ],
        evidence: `Average mood: ${avgMood.toFixed(1)}/10 over last ${moodEntries.length} entries`,
      });

      recommendations.push({
        category: 'coping_strategies',
        priority: 'high',
        title: 'Introduce Crisis Coping Techniques',
        description: 'Teach immediate coping strategies for managing low mood episodes.',
        actions: [
          'Practice grounding techniques (5-4-3-2-1 method)',
          'Develop safety plan',
          'Identify emergency contacts and resources',
        ],
        evidence: 'Persistent low mood indicates need for immediate coping tools',
      });
    } else if (avgMood >= 7) {
      recommendations.push({
        category: 'maintenance',
        priority: 'low',
        title: 'Maintain Current Strategies',
        description: 'Client is doing well. Focus on maintaining positive momentum.',
        actions: [
          'Reinforce effective coping strategies',
          'Set new wellness goals',
          'Discuss relapse prevention',
        ],
        evidence: `Strong average mood: ${avgMood.toFixed(1)}/10`,
      });
    } else {
      recommendations.push({
        category: 'monitoring',
        priority: 'medium',
        title: 'Continue Regular Monitoring',
        description: 'Mood is in moderate range. Maintain current treatment approach with close monitoring.',
        actions: [
          'Review mood patterns in next session',
          'Identify potential stressors',
          'Adjust interventions as needed',
        ],
        evidence: `Moderate mood range: ${avgMood.toFixed(1)}/10`,
      });
    }

    // Trend-based recommendations
    if (recentTrend === 'declining') {
      recommendations.push({
        category: 'intervention',
        priority: 'high',
        title: 'Address Declining Mood Trend',
        description: 'Recent entries show declining mood pattern requiring attention.',
        actions: [
          'Explore recent life changes or stressors',
          'Review medication effectiveness (if applicable)',
          'Consider adjusting therapy frequency',
        ],
        evidence: 'Mood scores declining over recent entries',
      });
    }

    // Emotion-based recommendations
    if (emotionAnalysis.anxietyLevel === 'high') {
      recommendations.push({
        category: 'therapeutic_technique',
        priority: 'high',
        title: 'Anxiety Management Focus',
        description: 'High frequency of anxiety-related emotions detected.',
        actions: [
          'Teach progressive muscle relaxation',
          'Practice cognitive restructuring for anxious thoughts',
          'Explore exposure therapy if appropriate',
        ],
        evidence: `Anxiety-related emotions appear in ${emotionAnalysis.anxietyCount} of ${moodEntries.length} entries`,
      });
    }

    if (emotionAnalysis.stressLevel === 'high') {
      recommendations.push({
        category: 'lifestyle',
        priority: 'medium',
        title: 'Stress Management Strategies',
        description: 'Frequent stress indicators suggest need for stress reduction techniques.',
        actions: [
          'Discuss work-life balance',
          'Introduce time management strategies',
          'Explore mindfulness and meditation practices',
        ],
        evidence: `Stress-related emotions frequently reported`,
      });
    }

    // Behavioral activation recommendations
    if (emotionAnalysis.hasLowEnergy) {
      recommendations.push({
        category: 'behavioral_activation',
        priority: 'medium',
        title: 'Increase Activity and Engagement',
        description: 'Low energy and motivation patterns detected.',
        actions: [
          'Create activity schedule with small, achievable goals',
          'Identify previously enjoyed activities',
          'Build routine and structure',
        ],
        evidence: 'Patterns suggest low behavioral activation',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        recommendations: recommendations.slice(0, 5), // Top 5 recommendations
        summary: {
          totalRecommendations: recommendations.length,
          highPriority: recommendations.filter(r => r.priority === 'high').length,
          averageMood: avgMood.toFixed(1),
          trend: recentTrend,
        },
        nextSteps: [
          'Review recommendations with client in next session',
          'Prioritize high-priority interventions',
          'Document implementation and outcomes',
        ],
      },
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateTrend(entries: any[]): 'improving' | 'declining' | 'stable' {
  if (entries.length < 3) return 'stable';
  
  const recent = entries.slice(-3);
  const earlier = entries.slice(0, 3);
  
  const recentAvg = recent.reduce((sum, e) => sum + e.moodScore, 0) / recent.length;
  const earlierAvg = earlier.reduce((sum, e) => sum + e.moodScore, 0) / earlier.length;
  
  const diff = recentAvg - earlierAvg;
  
  if (diff > 0.5) return 'improving';
  if (diff < -0.5) return 'declining';
  return 'stable';
}

function analyzeEmotions(entries: any[]): any {
  const anxietyEmotions = ['anxious', 'worried', 'stressed', 'nervous'];
  const stressEmotions = ['stressed', 'overwhelmed', 'frustrated'];
  const lowEnergyEmotions = ['tired', 'exhausted', 'lonely', 'sad'];

  let anxietyCount = 0;
  let stressCount = 0;
  let lowEnergyCount = 0;

  entries.forEach((entry: any) => {
    const emotions = entry.emotions.map((e: string) => e.toLowerCase());
    
    if (emotions.some((e: string) => anxietyEmotions.includes(e))) anxietyCount++;
    if (emotions.some((e: string) => stressEmotions.includes(e))) stressCount++;
    if (emotions.some((e: string) => lowEnergyEmotions.includes(e))) lowEnergyCount++;
  });

  return {
    anxietyLevel: anxietyCount >= entries.length * 0.5 ? 'high' : 'normal',
    anxietyCount,
    stressLevel: stressCount >= entries.length * 0.5 ? 'high' : 'normal',
    stressCount,
    hasLowEnergy: lowEnergyCount >= entries.length * 0.4,
  };
}

// Made with Bob
