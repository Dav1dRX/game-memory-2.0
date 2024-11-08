import React, { useState, useEffect } from 'react';

const Timer = ({ isRunning, onTimeUp }) => {
  const [time, setTime] = useState(30); // 30 segundos por turno

  useEffect(() => {
    let interval;
    
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            onTimeUp?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time, onTimeUp]);

  useEffect(() => {
    if (!isRunning) {
      setTime(30); // Reset timer when not running
    }
  }, [isRunning]);

  return (
    <div className="text-center p-2 bg-gray-100 rounded">
      <div className="font-mono text-xl">
        Time: {time}s
      </div>
    </div>
  );
};

export default Timer;