import React, { createContext, useContext, useReducer } from 'react';
import { generateCards } from '../utils/gameUtils';

const initialState = {
  isPlaying: false,
  gameMode: 'single',
  currentPlayer: 1,
  players: {
    1: { name: 'Player 1', score: 0 },
    2: { name: 'Player 2', score: 0 }
  },
  cards: [],
  selectedCards: [],
  matches: 0,
  timer: 0
};

export const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameState: 'playing',
        gameMode: action.payload.mode,
        cards: generateCards(),
        timer: 0,
        selectedCards: []
      };
    
    case 'SELECT_CARD':
      if (state.selectedCards.length >= 2) return state;
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload]
      };

    case 'CHECK_MATCH':
      const [first, second] = state.selectedCards;
      const isMatch = first.value === second.value;
      
      return {
        ...state,
        cards: state.cards.map(card => 
          (isMatch && (card.id === first.id || card.id === second.id))
            ? { ...card, matched: true }
            : card
        ),
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            score: isMatch 
              ? state.players[state.currentPlayer].score + 10
              : state.players[state.currentPlayer].score - 2,
            matches: isMatch 
              ? state.players[state.currentPlayer].matches + 1
              : state.players[state.currentPlayer].matches
          }
        },
        selectedCards: [],
        currentPlayer: !isMatch && state.gameMode === 'multi'
          ? (state.currentPlayer === 1 ? 2 : 1)
          : state.currentPlayer
      };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timer: state.timer + 1,
        gameState: state.turnTime <= state.timer ? 'finished' : state.gameState
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