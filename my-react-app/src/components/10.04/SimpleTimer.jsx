import { useState, useEffect } from 'react';

function SimpleTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Таймер: {time} сек</h2>
      <button onClick={toggleTimer}>
        {isActive ? 'Пауза' : 'Старт'}
      </button>
      <button onClick={resetTimer}>Сброс</button>
    </div>
  );
}

export default SimpleTimer;