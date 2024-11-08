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
  }, []);

  if (!state.gameOver) return null;

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'START_GAME', payload: { mode: state.gameMode } });
  };

  const handleMainMenu = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-4">Winner: {state?.winner?.name}</p>
          <p className="text-xl mb-6">Score: {state?.winner?.score}</p>
          <div className="flex gap-4">
            <button
              onClick={handlePlayAgain}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Play Again
            </button>
            <button
              onClick={handleMainMenu}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Main Menu
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameOverModal;