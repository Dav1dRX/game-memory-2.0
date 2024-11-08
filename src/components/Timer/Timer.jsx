import { useGame } from '../../context/GameContext';
import { useEffect } from 'react';

const Timer = () => {
  const { state, dispatch } = useGame();
  
  useEffect(() => {
    let interval;
    if (state.isPlaying && state.timerStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.timerStarted, dispatch]);

  return (
    <div className={`text-2xl font-bold ${state.turnTimer <= 5 ? 'text-red-500' : ''}`}>
      {state.turnTimer}s
    </div>
  );
};

export default Timer;