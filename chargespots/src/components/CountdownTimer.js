import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ showTimer }) => {
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    let interval;

    if (showTimer) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showTimer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!showTimer) {
    return null; // Render nothing if showTimer is false
  }

  return (
    <div className="text-right">
      <p>{formatTime(timer)}</p>
    </div>
  );
};

export default CountdownTimer;
