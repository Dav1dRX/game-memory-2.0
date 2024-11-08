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

    case 'SELECT_CARD':
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
      const currentPlayerScore = state.players[state.currentPlayer].score;
      const matchPoints = 10;
      const missPoints = -2;

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
            score: currentPlayerScore + (isMatch ? matchPoints : missPoints),
            matches: isMatch 
              ? state.players[state.currentPlayer].matches + 1 
              : state.players[state.currentPlayer].matches
          }
        },
        currentPlayer: state.gameMode === 'multi' && !isMatch
          ? (state.currentPlayer === 1 ? 2 : 1)
          : state.currentPlayer,
        selectedCards: []
      };

    case 'UPDATE_TIMER':
      const newTimer = state.turnTimer - 1;
      
      if (newTimer < 0) {
        return {
          ...state,
          isPlaying: false,
          gameOver: true
        };
      }

      return {
        ...state,
        turnTimer: newTimer
      };

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

      return {
        ...state,
        isPlaying: false,
        gameOver: true,
        winner,
        highScores: {
          ...state.highScores,
          [state.gameMode]: [
            ...state.highScores[state.gameMode] || [],
            newScore
          ].sort((a, b) => b.score - a.score).slice(0, 10)
        }
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