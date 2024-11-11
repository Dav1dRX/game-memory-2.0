export const emojis = [
  '🦊', '🐶', '🐱', '🦁', '🐯', '🐸', '🦄', '🐵',
  '🐼', '🐨', '🐷', '🦒', '🦘', '🦔', '🦦', '🦥'
];

// src/utils/gameUtils.js
export const generateCards = () => {
  const gameEmojis = emojis.slice(0, 8); // 8 pairs for 4x4 grid
  const pairs = [...gameEmojis, ...gameEmojis];
  
  return pairs
    .map((emoji, index) => ({
      id: `card-${index}`,  // Unique ID for React keys
      value: emoji,
      matched: false
    }))
    .sort(() => Math.random() - 0.5);
}; 

export const calculateScore = (timeLeft, attempts) => {
  const baseScore = 100;
  const timeBonus = timeLeft * 2;
  const penaltyPerAttempt = 5;
  
  return Math.max(0, baseScore + timeBonus - (attempts * penaltyPerAttempt));
};

export const saveScore = (playerName, score) => {
  const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
  
  highScores.push({
    playerName,
    score,
    date: new Date().toISOString()
  });

  highScores.sort((a, b) => b.score - a.score);
  const top10Scores = highScores.slice(0, 10);
  
  localStorage.setItem('highScores', JSON.stringify(top10Scores));
};