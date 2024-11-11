// src/hooks/useGame.js - Handle card matching logic
import { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';

export const useGame = () => {
  const { state, dispatch } = useContext(GameContext);

  // Add initialization of scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('memory-game-scores');
    if (savedScores) {
      dispatch({ 
        type: 'LOAD_SCORES', 
        payload: JSON.parse(savedScores)
      });
    }
  }, [dispatch]); // Added dispatch to dependency array

  // Handle card matching logic
  useEffect(() => {
    if (state.selectedCards.length === 2) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [state.selectedCards, dispatch]);

  // Handle game end
  useEffect(() => {
    const allMatched = state.cards.every(card => card.matched);
    if (allMatched && state.cards.length > 0) {
      dispatch({ type: 'END_GAME' });
    }
  }, [state.cards, dispatch]);

  const handleCardClick = (card) => {
    if (card.matched || state.selectedCards.length >= 2) return;
    dispatch({ type: 'SELECT_CARD', payload: card });
  };

  return { state, dispatch, handleCardClick };
};