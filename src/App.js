// src/App.js
import Header from './components/Header/Header';
import Timer from './components/Timer/Timer';
import GameBoard from './components/GameBoard/GameBoard';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <div className="container mx-auto p-4">
        <Header />
        <Timer />
        <GameBoard />
      </div>
    </GameProvider>
  );
}

export default App;