import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { Card } from './Card';  

const GameBoard = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="space-y-8">
      {/* Player Info - Ahora visible también en single player */}
      <div className="player-info">
        <h3 className="text-xl font-bold mb-4 neon-text">
          {state.gameMode === 'single' ? 'Player' : `Player ${state.currentPlayer}`}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-cyan-400">Matches</p>
            <p className="text-2xl">{state.players[1].matches}</p>
          </div>
          <div>
            <p className="text-cyan-400">Score</p>
            <p className="text-2xl">{state.players[1].score}</p>
          </div>
        </div>
      </div>

      {/* Grid de cartas */}
      <motion.div 
        className="grid grid-cols-4 gap-6 p-6 max-w-3xl mx-auto"
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
    </div>
  );
};

export default GameBoard;