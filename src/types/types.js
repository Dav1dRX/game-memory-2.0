export const saveHighScore = (score: HighScore) => {
    const scores = getHighScores();
    scores.push(score);
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(scores.slice(0, 10)));
  };