import { gameReducer } from '../context/GameContext';

describe('GameContext', () => {
  test('should initialize game correctly', () => {
    const initialState = {
      isPlaying: false,
      players: { 1: { score: 0 }, 2: { score: 0 } }
    };

    const action = {
      type: 'START_GAME',
      payload: { mode: 'single' }
    };

    const newState = gameReducer(initialState, action);
    expect(newState.isPlaying).toBe(true);
    expect(newState.cards.length).toBe(16);
  });
});