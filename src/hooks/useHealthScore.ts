import { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '../utils/spreadsheet';
import { calculateHealthScores, getHealthColor, type HealthColor } from '../utils/healthScore';
import { getRefreshInterval } from '../config/refreshRates';

interface HealthScoreDisplay {
  displayText: string;
  color: HealthColor;
}

export function useHealthScore(): HealthScoreDisplay {
  const [displayText, setDisplayText] = useState('0 | 0');
  const [color, setColor] = useState<HealthColor>('green');
  
  useEffect(() => {
    let mounted = true;
    
    async function fetchHealthData() {
      const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID;
      
      try {
        const [
          targetScoreData,
          score5Data,
          score4Data,
          score3Data,
          score2Data,
          score1Data
        ] = await Promise.all([
          fetchGoogleSheetData(sheetId, 'Summary!B9'),
          fetchGoogleSheetData(sheetId, 'Summary!B11'),
          fetchGoogleSheetData(sheetId, 'Summary!B12'),
          fetchGoogleSheetData(sheetId, 'Summary!B13'),
          fetchGoogleSheetData(sheetId, 'Summary!B14'),
          fetchGoogleSheetData(sheetId, 'Summary!B15')
        ]);

        if (!mounted) return;

        const healthData = {
          targetScore: Number(targetScoreData.values?.[0]?.[0] ?? 0),
          score5: Number(score5Data.values?.[0]?.[0] ?? 0),
          score4: Number(score4Data.values?.[0]?.[0] ?? 0),
          score3: Number(score3Data.values?.[0]?.[0] ?? 0),
          score2: Number(score2Data.values?.[0]?.[0] ?? 0),
          score1: Number(score1Data.values?.[0]?.[0] ?? 0)
        };

        const { currentScore, maxScore } = calculateHealthScores(healthData);
        const newColor = getHealthColor(currentScore, maxScore);
        
        setColor(newColor);
        setDisplayText(`${currentScore} | ${maxScore}`);
      } catch (error) {
        console.error('Failed to fetch health score data:', error);
        setDisplayText('0 | 0');
        setColor('green');
      }
    }

    fetchHealthData();
    const interval = setInterval(fetchHealthData, getRefreshInterval('health'));
    
    return () => {
      mounted = true;
      clearInterval(interval);
    };
  }, []);

  return { displayText, color };
}