import { useGame } from '../../context/GameContext';
import { useEffect } from 'react';

const Timer = () => {
  const { state, dispatch } = useGame();
  
  useEffect(() => {
    let interval;
    if (state.isPlaying) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, dispatch]);

  return (
    <div className="text-2xl font-bold">
      {state.turnTimer}s
    </div>
  );
};

export default Timer;