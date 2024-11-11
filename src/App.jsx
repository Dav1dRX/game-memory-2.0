import React from 'react';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import Header from './components/Header/Header';
import GameBoard from './components/GameBoard/GameBoard';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import GameOverModal from './components/GameOverModal';
import { User, Users } from 'lucide-react';

function GameContent() {
  const { state, dispatch } = useGame();

  if (!state.isPlaying) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black" />
          {[...Array(100)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random()
              }}
            />
          ))}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-16">
          <h1 className="text-6xl md:text-7xl font-bold text-center tracking-wider
                       text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500
                       animate-pulse relative">
            MEMORY GAME
            <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-30" />
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-400 animate-pulse">
            Choose Game Mode
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <button
              onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'single' }})}
              className="arcade-btn text-cyan-400 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 
                           group-hover:opacity-20 transition-opacity" />
              <div className="flex flex-col items-center gap-2">
                <User className="w-6 h-6 md:w-8 md:h-8" />
                Single Player
              </div>
            </button>

            <button
              onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'multi' }})}
              className="arcade-btn text-purple-400 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 
                           group-hover:opacity-20 transition-opacity" />
              <div className="flex flex-col items-center gap-2">
                <Users className="w-6 h-6 md:w-8 md:h-8" />
                Multiplayer
              </div>
            </button>
          </div>

          <div className="text-purple-400 text-lg md:text-xl animate-bounce mt-8 md:mt-16 opacity-75">
            Press Start
          </div>
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
        <ScoreBoard />
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Header />
        <GameContent />
        <GameOverModal />
      </div>
    </GameProvider>
  );
}

export default App;