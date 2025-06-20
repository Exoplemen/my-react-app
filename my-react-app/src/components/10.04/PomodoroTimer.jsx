import { useState, useEffect, useRef } from 'react';

function PomodoroTimer() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeLeft(isWorkTime ? workTime * 60 : breakTime * 60);
  }, [workTime, breakTime, isWorkTime]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      audioRef.current.play();
      setIsWorkTime(!isWorkTime);
      setTimeLeft(isWorkTime ? breakTime * 60 : workTime * 60);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkTime, workTime, breakTime]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsWorkTime(true);
    setTimeLeft(workTime * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{isWorkTime ? 'Work Time' : 'Break Time'}</h2>
      <div style={{ fontSize: '48px', margin: '20px' }}>
        {formatTime(timeLeft)}
      </div>
      
      <div style={{ margin: '20px' }}>
        <label>
          Work Time (min):
          <input 
            type="number" 
            value={workTime} 
            onChange={(e) => setWorkTime(Number(e.target.value))}
            disabled={isActive}
          />
        </label>
      </div>
      
      <div style={{ margin: '20px' }}>
        <label>
          Break Time (min):
          <input 
            type="number" 
            value={breakTime} 
            onChange={(e) => setBreakTime(Number(e.target.value))}
            disabled={isActive}
          />
        </label>
      </div>
      
      <div>
        <button onClick={toggleTimer}>
          {isActive ? 'Пауза' : 'Старт'}
        </button>
        <button onClick={resetTimer}>Сброс</button>
      </div>
      
      <audio ref={audioRef} src="https://www.soundjay.com/buttons/sounds/button-09.mp3" />
    </div>
  );
}
export default PomodoroTimer