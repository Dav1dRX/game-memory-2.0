const STORAGE_KEY = 'memory-game-scores';

export const saveScore = (score) => {
  const scores = getScores();
  const newScores = [...scores, score]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    single: newScores.filter(s => s.mode === 'single'),
    multi: newScores.filter(s => s.mode === 'multi')
  }));
};

export const getScores = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { single: [], multi: [] };
};