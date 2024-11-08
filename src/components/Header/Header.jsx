import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import Timer from '../Timer/Timer';  

export default function Header() {
  const { state: { gameMode, players, currentPlayer, isPlaying } } = useContext(GameContext);

  return (
    <div className="flex justify-between items-center p-4 bg-slate-800 text-white">
      <div className="flex gap-4">
        {gameMode === 'multi' && (
          <div className="flex gap-2">
            {Object.entries(players).map(([id, player]) => (
              <div 
                key={id}
                className={`p-2 rounded ${
                  currentPlayer === Number(id) ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <p>{player.name}</p>
                <p className="text-sm">Score: {player.score}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {isPlaying && <Timer />}
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};