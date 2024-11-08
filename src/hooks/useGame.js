// src/hooks/useGame.js - Handle card matching logic
import { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';

export const useGame = () => {
  const { state, dispatch } = useContext(GameContext);

  // Check for matches when 2 cards are selected
  useEffect(() => {
    if (state.selectedCards.length === 2) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [state.selectedCards, dispatch]);

  const handleCardClick = (card) => {
    if (card.matched || state.selectedCards.length === 2) return;
    dispatch({ type: 'SELECT_CARD', payload: card });
  };

  return { state, dispatch, handleCardClick };
};