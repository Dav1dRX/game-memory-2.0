import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreBoard = () => {
  const { state } = useGame();
  
  // Get scores for current game mode
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
            {scores.length === 0 && (
              <p className="text-center text-gray-500">No high scores yet!</p>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;