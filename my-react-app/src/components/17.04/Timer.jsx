import { useState, useEffect, useRef } from 'react';

function CountdownTimer() {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, time]);

  const handleStart = () => {
    const seconds = parseInt(inputTime, 10);
    if (seconds > 0) {
      setTime(seconds);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    setInputTime('');
  };

  return (
    <div>
      <h2>Таймер обратного отсчёта</h2>
      <div>
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Введите время в секундах"
          disabled={isRunning}
        />
        <button onClick={handleStart} disabled={isRunning || !inputTime}>
          Старт
        </button>
        <button onClick={handleReset}>Сброс</button>
      </div>
      <div>
        {time > 0 ? (
          <h3>Осталось: {time} секунд</h3>
        ) : (
          isRunning === false && time === 0 && inputTime && <h3>Время вышло!</h3>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;