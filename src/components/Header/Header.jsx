import React from 'react';
import { useGame } from '../../context/GameContext';
import Timer from '../Timer/Timer';

const Header = () => {
  const { state, dispatch } = useGame();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Memory Game</h1>
        
        {state.isPlaying && (
          <div className="flex items-center gap-4">
            <Timer />
            <button
              onClick={() => dispatch({ type: 'RESET_GAME' })}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
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