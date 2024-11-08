import React, { createContext, useContext, useReducer } from 'react';

export const GameContext = createContext();

const generateCards = () => {
  // Implementar lógica de generación de cartas
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = [...values, ...values]
    .map((value, index) => ({ id: index, value, matched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

const initialState = {
  isPlaying: false,
  gameMode: 'single', // 'single' or 'multi'
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

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        cards: generateCards(),
        matches: 0,
        timer: 0,
        gameMode: action.payload.mode,
        players: action.payload.mode === 'multi' 
          ? { 
              1: { name: action.payload.player1Name, score: 0 },
              2: { name: action.payload.player2Name, score: 0 }
            }
          : state.players
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

    case 'MATCH_FOUND':
      return {
        ...state,
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            score: state.players[state.currentPlayer].score + 10
          }
        },
        matches: state.matches + 1
      };

    case 'SWITCH_PLAYER':
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1
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

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};