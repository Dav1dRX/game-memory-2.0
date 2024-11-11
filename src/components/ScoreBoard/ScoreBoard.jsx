import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreBoard = () => {
  const { state } = useGame();
  const scores = state.highScores?.[state.gameMode] || [];

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-2 border-cyan-500/20 max-w-md">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          High Scores - {state.gameMode === 'single' ? 'Single Player' : 'Multiplayer'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-black/20 
                      scrollbar-thumb-cyan-500/60">
          <AnimatePresence>
            {scores.map((score, index) => (
              <motion.div
                key={`score-${score.date}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between p-2 bg-black/40 rounded-lg border border-cyan-500/10"
              >
                <span className="text-cyan-300 text-sm">{score.playerName}</span>
                <span className="font-bold text-white text-sm">{score.score}</span>
              </motion.div>
            ))}
            {scores.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-cyan-500/50 text-sm py-4"
              >
                No high scores yet!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;