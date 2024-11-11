import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import { useEffect } from 'react';

const GameOverModal = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    const savedScores = localStorage.getItem('memory-game-scores');
    if (savedScores) {
      dispatch({ 
        type: 'LOAD_SCORES', 
        payload: JSON.parse(savedScores)
      });
    }
  }, [dispatch]); 

  if (!state.gameOver) return null;

  const handlePlayAgain = () => {
    dispatch({ type: 'START_GAME', payload: { mode: state.gameMode } });
  };

  const handleMainMenu = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl 
                     border-2 border-cyan-500/20 shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text 
                        bg-gradient-to-r from-cyan-400 to-purple-400">
            Game Over!
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/10">
              <p className="text-cyan-400 mb-1">Winner</p>
              <p className="text-2xl text-white">{state.winner?.name}</p>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/10">
              <p className="text-cyan-400 mb-1">Score</p>
              <p className="text-2xl text-white">{state.winner?.score}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePlayAgain}
              className="arcade-btn text-cyan-400 flex-1"
            >
              Play Again
            </button>
            <button
              onClick={handleMainMenu}
              className="arcade-btn text-purple-400 flex-1"
            >
              Main Menu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GameOverModal;