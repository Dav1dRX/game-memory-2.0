import React, { useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import { Card } from '@/components/ui/card';

export const GameBoard = () => {
  const { cards, selectedCards, handleCardClick, isPlaying, gameOver, score } = useGame();

  if (!isPlaying && !gameOver) {
    return (
      <div className="flex justify-center items-center h-64">
        <button 
          onClick={startNewGame}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cards.map(card => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card)}
          className={`
            card 
            ${card.matched ? 'matched' : ''} 
            ${selectedCards.find(c => c.id === card.id) ? 'selected' : ''}
          `}
        >
          {(card.matched || selectedCards.find(c => c.id === card.id)) 
            ? card.value 
            : '?'}
        </div>
      ))}
    </div>
  );
};