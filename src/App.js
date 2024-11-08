import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Header from './components/Header/Header';
import GameBoard from './components/GameBoard/GameBoard';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Timer from './components/Timer/Timer';
import { Button } from '@/components/ui/button';
import { generateCards } from './utils/gameUtils';

const App = () => {
  const [gameMode, setGameMode] = useState('menu'); 
  
  const startGame = (mode) => {
    const cards = generateCards('normal');
    setGameMode(mode);
  };

  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        {gameMode === 'menu' ? (
          <div className="container mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-8">Selecciona el Modo de Juego</h2>
            <div className="space-y-4">
              <Button 
                onClick={() => startGame('singlePlayer')}
                className="w-64"
              >
                Un Jugador
              </Button>
              <Button 
                onClick={() => startGame('multiPlayer')}
                className="w-64"
              >
                Multijugador
              </Button>
            </div>
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="flex justify-center mb-4">
              <Timer />
            </div>
            <GameBoard />
            <div className="mt-8">
              <ScoreBoard />
            </div>
          </div>
        )}
      </div>
    </GameProvider>
  );
};

export default App;
