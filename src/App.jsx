// src/App.js
import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import Header from './components/Header/Header';
import GameBoard from './components/GameBoard/GameBoard';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

function GameContent() {
  const { state, dispatch } = useGame();

  if (!state.isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-3xl font-bold mb-8">Choose Game Mode</h2>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'single' }})}
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     transform transition hover:scale-105"
          >
            Single Player
          </button>
          <button
            onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'multi' }})}
            className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 
                     transform transition hover:scale-105"
          >
            Multiplayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <GameBoard />
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold mb-4">Game Info</h3>
            {state.gameMode === 'multi' && (
              <div className="mb-4">
                <p className="text-lg">
                  Current Player: {state.players[state.currentPlayer].name}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-sm">Matches</p>
                <p className="text-xl font-bold">{state.matches}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-sm">Score</p>
                <p className="text-xl font-bold">
                  {state.players[state.currentPlayer].score}
                </p>
              </div>
            </div>
          </div>
          <ScoreBoard />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;