import { useContext, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';

const Timer = () => {
  const { state: { isPlaying, timer }, dispatch } = useContext(GameContext);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-xl font-mono">
      {formatTime(timer)}
    </div>
  );
};

export default Timer;