import React from 'react';

const Header = ({ currentPlayer, scores }) => {
  return (
    <header className="w-full p-4 bg-blue-500 text-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Memory Game</h1>
        <div className="flex justify-center gap-8">
          <div className={`p-2 rounded ${currentPlayer === 1 ? 'bg-blue-700' : ''}`}>
            Player 1: {scores?.player1 || 0}
          </div>
          <div className={`p-2 rounded ${currentPlayer === 2 ? 'bg-blue-700' : ''}`}>
            Player 2: {scores?.player2 || 0}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;