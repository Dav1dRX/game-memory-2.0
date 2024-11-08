import { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';

export const useGame = () => {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    if (state.selectedCards.length === 2) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [state.selectedCards]);

  useEffect(() => {
    if (state.matches === (state.cards.length / 2)) {
      dispatch({ type: 'END_GAME' });
    }
  }, [state.matches]);

  const handleCardClick = (card) => {
    if (card.matched || state.selectedCards.length === 2) return;
    dispatch({ type: 'SELECT_CARD', payload: card });
  };

  const startNewGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  return {
    ...state,
    handleCardClick,
    startNewGame
  };
};