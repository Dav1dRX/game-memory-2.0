import { useContext, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';
import { Card } from './Card';

export default function GameBoard() {
  const { 
    state: { cards, selectedCards, isPlaying },
    dispatch 
  } = useContext(GameContext);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (first.value === second.value) {
        setTimeout(() => {
          dispatch({ type: 'MATCH_FOUND' });
        }, 500);
      } else {
        setTimeout(() => {
          dispatch({ type: 'SWITCH_PLAYER' });
        }, 1000);
      }
      dispatch({ type: 'CLEAR_SELECTED' });
    }
  }, [selectedCards, dispatch]);

  if (!isPlaying) {
    return (
      <div className="flex justify-center items-center h-96">
        <button 
          onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'single' }})}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mr-4"
        >
          Single Player
        </button>
        <button 
          onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'multi' }})}
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Multi Player
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cards.map(card => (
        <Card 
          key={card.id}
          card={card}
          isSelected={selectedCards.some(c => c.id === card.id)}
          onSelect={() => dispatch({ type: 'SELECT_CARD', payload: card })}
        />
      ))}
    </div>
  );
};