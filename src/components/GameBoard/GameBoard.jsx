import { useGame } from '../../context/GameContext';
import { Card } from './Card';
import { motion } from 'framer-motion';

const GameBoard = () => {
  const { state, dispatch } = useGame();

  return (
    <motion.div 
      className="grid grid-cols-4 gap-4 p-4 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {state.cards.map(card => (
        <Card
          key={card.id}
          card={card}
          isSelected={state.selectedCards.some(c => c.id === card.id)}
          onSelect={() => dispatch({ type: 'SELECT_CARD', payload: card })}
        />
      ))}
    </motion.div>
  );
};

export default GameBoard;