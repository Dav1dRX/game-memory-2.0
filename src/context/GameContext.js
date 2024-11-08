import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  cards: [],
  currentPlayer: 1,
  scores: {
    player1: 0,
    player2: 0
  },
  gameStatus: 'idle',
  flippedCards: [],
  matchedPairs: [],
  attempts: 0
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        cards: generateCards(),
        score: 0,
        matches: 0,
        selectedCards: []
      };

    case 'SELECT_CARD':
      if (state.selectedCards.length === 2) return state;
      
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload]
      };

    case 'CHECK_MATCH':
      const [first, second] = state.selectedCards;
      const isMatch = first.value === second.value;
      
      return {
        ...state,
        cards: state.cards.map(card => {
          if (isMatch && (card.id === first.id || card.id === second.id)) {
            return { ...card, matched: true };
          }
          return card;
        }),
        score: isMatch ? state.score + 10 : state.score - 2,
        matches: isMatch ? state.matches + 1 : state.matches,
        selectedCards: []
      };

    case 'END_GAME':
      return {
        ...state,
        isPlaying: false,
        gameOver: true
      };

    default:
      return state;
  }
};

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}