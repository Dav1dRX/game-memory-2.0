import { useGame } from '../../context/GameContext';
import { Card } from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as UICard, CardHeader, CardTitle, CardContent } from '../ui/card';

const GameBoard = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {state.gameMode === 'multi' && (
          <div className="flex justify-between mb-4">
            {Object.values(state.players).map(player => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <UICard>
                  <CardHeader>
                    <CardTitle>{player.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`
                      p-4 rounded-lg ${
                        state.currentPlayer === player.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100'
                      }
                    `}>
                      <p>Score: {player.score}</p>
                      <p>Matches: {player.matches}</p>
                    </div>
                  </CardContent>
                </UICard>
              </motion.div>
            ))}
          </div>
        )}

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
      </AnimatePresence>
    </div>
  );
};

const ScoreBoard = () => {
  const { state } = useGame();
  
  // Only show scores for current game mode
  const scores = state.highScores?.[state.gameMode] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          High Scores - {state.gameMode === 'single' ? 'Single Player' : 'Multiplayer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <AnimatePresence>
            {scores.map((score, index) => (
              <motion.div
                key={`score-${score.date}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between p-2 bg-gray-50 rounded mb-2"
              >
                <span>{score.playerName}</span>
                <span>{score.score}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameBoard;