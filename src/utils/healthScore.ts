// Health score calculation and color determination
export type HealthColor = 'green' | 'yellow' | 'orange' | 'red';

interface HealthScoreData {
  targetScore: number;      // B9
  score5: number;          // B11
  score4: number;          // B12
  score3: number;          // B13
  score2: number;          // B14
  score1: number;          // B15
}

export function calculateHealthScores(data: HealthScoreData): {
  currentScore: number;
  maxScore: number;
} {
  const maxScore = data.targetScore * 5;
  const weightedSum = 
    data.score5 * 5 +
    data.score4 * 4 +
    data.score3 * 3 +
    data.score2 * 2 +
    data.score1 * 1;
  
  const currentScore = maxScore - weightedSum;
  
  return {
    currentScore,
    maxScore
  };
}

export function getHealthColor(currentScore: number, maxScore: number): HealthColor {
  const percentage = currentScore / maxScore;

  if (percentage >= 0.75) return 'red';
  if (percentage >= 0.5) return 'orange';
  if (percentage >= 0.25) return 'yellow';
  return 'green';
}