import { useGame } from '../hooks/useGame';

const GameOverModal = () => {
  const { state, dispatch } = useGame();
  
  if (!state.gameOver) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="mb-4">Winner: {state.winner.name}</p>
        <p className="mb-4">Score: {state.winner.score}</p>
        <button 
          onClick={() => dispatch({ type: 'RESET_GAME' })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}; 