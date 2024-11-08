import React, { createContext, useContext, useReducer } from 'react';
import { generateCards } from '../utils/gameUtils';

const initialState = {
  isPlaying: false,
  gameMode: null,
  currentPlayer: 1,
  players: {
    1: { name: 'Player 1', score: 0, matches: 0 },
    2: { name: 'Player 2', score: 0, matches: 0 }
  },
  cards: [],
  selectedCards: [],
  turnTimer: 30,
  highScores: {
    single: [],
    multi: []
  }
};

export const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        gameMode: action.payload.mode,
        cards: generateCards(),
        turnTimer: 30,
        selectedCards: [],
        currentPlayer: 1
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        gameMode: state.gameMode,
        highScores: state.highScores // Preserve high scores
      };

    case 'SELECT_CARD':
      // Start timer on first card click aadgbpiudgvpDASDV
      if (!state.timerStarted && state.isPlaying) {
        return {
          ...state,
          timerStarted: true,
          selectedCards: [action.payload]
        };
      }
      
      if (state.selectedCards.length >= 2) return state;
      if (state.selectedCards.find(c => c.id === action.payload.id) || 
          state.cards.find(c => c.id === action.payload.id).matched) {
        return state;
      }
      
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload]
      };

    case 'CHECK_MATCH':
      const [first, second] = state.selectedCards;
      const isMatch = first.value === second.value;
      const currentScore = state.players[state.currentPlayer].score;
      const matchPoints = 10;
      const penaltyPoints = Math.min(currentScore, 2); // Never go below 0

      return {
        ...state,
        cards: state.cards.map(card => 
          isMatch && (card.id === first.id || card.id === second.id)
            ? { ...card, matched: true }
            : card
        ),
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            score: currentScore + (isMatch ? matchPoints : -penaltyPoints),
            matches: isMatch ? state.players[state.currentPlayer].matches + 1 : state.players[state.currentPlayer].matches
          }
        },
        currentPlayer: state.gameMode === 'multi' && !isMatch
          ? (state.currentPlayer === 1 ? 2 : 1)
          : state.currentPlayer,
        selectedCards: []
      };

    case 'UPDATE_TIMER':
      if (state.turnTimer <= 0) {
        const currentPlayer = state.players[state.currentPlayer];
        const newScore = {
          playerName: state.gameMode === 'single' ? 'You' : currentPlayer.name,
          score: currentPlayer.score,
          date: new Date().toISOString(),
          mode: state.gameMode,
          id: Date.now() // Add unique ID to prevent duplicates
        };

        // Get existing scores
        const savedScores = JSON.parse(
          localStorage.getItem('memory-game-scores') || 
          '{"single":[], "multi":[]}'
        );

        // Check for duplicates and add new score
        const currentModeScores = savedScores[state.gameMode];
        if (!currentModeScores.some(score => score.id === newScore.id)) {
          currentModeScores.push(newScore);
          currentModeScores.sort((a, b) => b.score - a.score);
          savedScores[state.gameMode] = currentModeScores.slice(0, 10);
          localStorage.setItem('memory-game-scores', JSON.stringify(savedScores));
        }

        return {
          ...state,
          isPlaying: false,
          gameOver: true,
          winner: {
            name: state.gameMode === 'single' ? 'You' : currentPlayer.name,
            score: currentPlayer.score
          },
          highScores: savedScores
        };
      }
      return { ...state, turnTimer: state.turnTimer - 1 };

    case 'END_GAME':
      const winner = state.gameMode === 'multi' 
        ? state.players[1].score > state.players[2].score 
          ? state.players[1] 
          : state.players[2]
        : state.players[1];

      const newScore = {
        playerName: winner.name,
        score: winner.score,
        date: new Date().toISOString(),
        mode: state.gameMode
      };

      // Save to localStorage
      const savedScores = JSON.parse(localStorage.getItem('memory-game-scores') || '{"single":[], "multi":[]}');
      savedScores[state.gameMode].push(newScore);
      savedScores[state.gameMode].sort((a, b) => b.score - a.score);
      savedScores[state.gameMode] = savedScores[state.gameMode].slice(0, 10);
      localStorage.setItem('memory-game-scores', JSON.stringify(savedScores));

      return {
        ...state,
        isPlaying: false,
        gameOver: true,
        winner: {
          name: winner.name,
          score: winner.score
        },
        highScores: savedScores
      };

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};