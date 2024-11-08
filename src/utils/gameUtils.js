export const generateCards = (difficulty = 'normal') => {
    const cardCounts = {
      easy: 6,
      normal: 8,
      hard: 12
    };
  
    const count = cardCounts[difficulty];
    const emojis = ['🌟', '🎮', '🎨', '🎵', '🎪', '🎭', '🎲', '🎯', '🎱', '🎳', '🎼', '🎸'];
    const selectedEmojis = emojis.slice(0, count);
    
    const cards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        value: emoji,
        isFlipped: false,
        isMatched: false
      }));
  
    return cards;
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