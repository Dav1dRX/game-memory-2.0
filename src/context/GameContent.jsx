// src/components/GameContent.jsx
import React from 'react';
import { useGame } from '../context/GameContext';
import { User, Users } from 'lucide-react';
import GameBoard from './GameBoard/GameBoard';
import ScoreBoard from './ScoreBoard/ScoreBoard';

const GameContent = () => {
  const { state, dispatch } = useGame();

  return !state.isPlaying ? (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={`purple-${i}`}
            className="absolute w-1 h-1 bg-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
        {[...Array(100)].map((_, i) => (
          <div
            key={`cyan-${i}`}
            className="absolute w-1 h-1 bg-cyan-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>

      {/* Menu Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-16">
        <h1 className="text-7xl font-bold text-center tracking-wider relative 
                     text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500
                     animate-pulse">
          MEMORY GAME
          <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-30"></span>
        </h1>
        
        <h2 className="text-3xl font-bold text-center text-purple-400 animate-pulse">
          Choose Game Mode
        </h2>
        
        <div className="flex gap-8">
          <button 
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700
                     text-white py-8 px-12 text-2xl font-bold tracking-wide rounded-lg
                     border border-purple-400/30 group relative overflow-hidden
                     transition-all duration-300 animate-pulse
                     hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]"
            onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'single' }})}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 
                         group-hover:opacity-20 transition-opacity"></span>
            <div className="flex flex-col items-center gap-2">
              <User className="h-8 w-8" />
              Single Player
            </div>
          </button>

          <button 
            className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700
                     text-white py-8 px-12 text-2xl font-bold tracking-wide rounded-lg
                     border border-cyan-400/30 group relative overflow-hidden
                     transition-all duration-300 animate-pulse
                     hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]"
            onClick={() => dispatch({ type: 'START_GAME', payload: { mode: 'multi' }})}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 
                         group-hover:opacity-20 transition-opacity"></span>
            <div className="flex flex-col items-center gap-2">
              <Users className="h-8 w-8" />
              Multiplayer
            </div>
          </button>
        </div>

        <div className="text-purple-400 text-xl animate-bounce mt-16 opacity-75">
          Press Start
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <GameBoard />
        </div>
        <ScoreBoard />
      </div>
    </div>
  );
};

export default GameContent;