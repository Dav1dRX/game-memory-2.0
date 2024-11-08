import { useState } from 'react';
import { saveHighScore } from '../utils/storage';

export const GameOverModal = ({ score, onNewGame }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    saveHighScore({
      name: playerName,
      score,
      date: new Date().toISOString()
    });
    onNewGame();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Game Over!</h2>
        <p>Final Score: {score}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="border p-2 my-4"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Score
          </button>
        </form>
      </div>
    </div>
  );
};