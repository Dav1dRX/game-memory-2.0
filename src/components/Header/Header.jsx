import React from 'react';
import { useGame } from '../../context/GameContext';
import Timer from '../Timer/Timer';

const Header = () => {
  const { state, dispatch } = useGame();

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-cyan-500/20 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="neon-text text-3xl md:text-4xl bg-clip-text text-transparent 
                     bg-gradient-to-r from-cyan-400 to-purple-400">
          Memory Game
        </h1>
        
        {state.isPlaying && (
          <div className="flex items-center gap-6">
            <Timer />
            <button
              onClick={() => dispatch({ type: 'RESET_GAME' })}
              className="arcade-btn text-red-500"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;