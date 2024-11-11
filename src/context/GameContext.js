import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { generateCards } from '../utils/gameUtils';

// Constants
const MATCH_POINTS = 10;
const MIN_PENALTY = 2;
const DEFAULT_TIMER = 60;
const MAX_HIGH_SCORES = 10;

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
  turnTimer: DEFAULT_TIMER,
  timerStarted: false,
  gameOver: false,
  winner: null,
  highScores: JSON.parse(
    localStorage.getItem('memory-game-scores') || 
    '{"single":[], "multi":[]}'
  )
};

export const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME': {
      const { mode } = action.payload;
      return {
        ...initialState,
        isPlaying: true,
        gameOver: false,
        gameMode: mode,
        cards: generateCards(),
        highScores: state.highScores,
        players: {
          1: {
            id: 1,
            name: mode === 'single' ? 'Player' : 'Player 1',
            score: 0,
            matches: 0
          },
          ...(mode === 'multi' && {
            2: {
              id: 2,
              name: 'Player 2',
              score: 0,
              matches: 0
            }
          })
        }
      };
    }

    case 'RESET_GAME': {
      return {
        ...initialState,
        gameMode: state.gameMode,
        highScores: state.highScores
      };
    }

    case 'SELECT_CARD': {
      if (state.selectedCards.length >= 2) return state;
      
      const newState = {
        ...state,
        selectedCards: [...state.selectedCards, action.payload]
      };

      if (!state.timerStarted) {
        newState.timerStarted = true;
      }

      return newState;
    }

    case 'CHECK_MATCH': {
      const [first, second] = state.selectedCards;
      const isMatch = first.value === second.value;
      const currentScore = state.players[state.currentPlayer].score;
      const penaltyPoints = Math.min(currentScore, MIN_PENALTY);

      const updatedCards = state.cards.map(card => 
        isMatch && (card.id === first.id || card.id === second.id)
          ? { ...card, matched: true }
          : card
      );

      const allMatched = updatedCards.every(card => card.matched);

      const updatedState = {
        ...state,
        cards: updatedCards,
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            score: currentScore + (isMatch ? MATCH_POINTS : -penaltyPoints),
            matches: isMatch ? state.players[state.currentPlayer].matches + 1 : state.players[state.currentPlayer].matches
          }
        },
        currentPlayer: state.gameMode === 'multi' && !isMatch
          ? (state.currentPlayer === 1 ? 2 : 1)
          : state.currentPlayer,
        selectedCards: []
      };

      if (allMatched) {
        return handleGameEnd(updatedState);
      }

      return updatedState;
    }

    case 'UPDATE_TIMER': {
      if (state.turnTimer <= 0) {
        return handleGameEnd(state);
      }
      return { ...state, turnTimer: state.turnTimer - 1 };
    }

    case 'PLAY_AGAIN': {
      return {
        ...initialState,
        gameMode: state.gameMode,
        highScores: state.highScores,
        isPlaying: true,
        cards: generateCards(),
      };
    }

    case 'SYNC_SCORES': {
      return {
        ...state,
        highScores: action.payload
      };
    }

    default:
      return state;
  }
};

const handleGameEnd = (state) => {
  const currentPlayer = state.players[state.currentPlayer];
  const winner = state.gameMode === 'multi'
    ? state.players[1].score > state.players[2].score
      ? state.players[1]
      : state.players[2]
    : currentPlayer;

  const newScore = {
    playerName: state.gameMode === 'single' ? 'You' : winner.name,
    score: winner.score,
    date: new Date().toISOString(),
    mode: state.gameMode,
    id: Date.now()
  };

  const savedScores = JSON.parse(
    localStorage.getItem('memory-game-scores') ||
    '{"single":[], "multi":[]}'
  );

  const currentModeScores = savedScores[state.gameMode];
  if (!currentModeScores.some(score => score.id === newScore.id)) {
    currentModeScores.push(newScore);
    currentModeScores.sort((a, b) => b.score - a.score);
    savedScores[state.gameMode] = currentModeScores.slice(0, MAX_HIGH_SCORES);
    localStorage.setItem('memory-game-scores', JSON.stringify(savedScores));
  }

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
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const syncScores = useCallback(() => {
    const savedScores = JSON.parse(
      localStorage.getItem('memory-game-scores') ||
      '{"single":[], "multi":[]}'
    );
    dispatch({
      type: 'SYNC_SCORES',
      payload: savedScores
    });
  }, []);

  useEffect(() => {
    window.addEventListener('storage', syncScores);
    syncScores(); // Initial load

    return () => window.removeEventListener('storage', syncScores);
  }, [syncScores]);

  const value = {
    state,
    dispatch,
    actions: {
      startGame: (mode) => dispatch({ type: 'START_GAME', payload: { mode } }),
      resetGame: () => dispatch({ type: 'RESET_GAME' }),
      selectCard: (card) => dispatch({ type: 'SELECT_CARD', payload: card }),
      checkMatch: () => dispatch({ type: 'CHECK_MATCH' }),
      updateTimer: () => dispatch({ type: 'UPDATE_TIMER' }),
      playAgain: () => dispatch({ type: 'PLAY_AGAIN' })
    }
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};