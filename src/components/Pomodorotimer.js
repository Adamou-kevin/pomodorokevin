import React, { useState, useEffect } from 'react';
import './Pomodoro.css'; // import du fichier de style CSS

function Pomodoro() {
  const [time, setTime] = useState(25 * 60); // temps initial de 25 minutes
  const [active, setActive] = useState(false); // active/désactive le chronomètre
  const [breakTime, setBreakTime] = useState(5 * 60); // temps initial de 5 minutes pour les pauses
  const [longBreakTime, setLongBreakTime] = useState(30 * 60); // temps initial de 30 minutes pour la pause longue
  const [breakCount, setBreakCount] = useState(0); // compteur pour alterner entre les pauses courtes et longues

  useEffect(() => {
    let interval = null;

    if (active && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (active && time === 0) {
      clearInterval(interval);

      // si le compteur arrive à zéro, on alterne entre les pauses courtes et longues
      if (breakCount % 2 === 0) {
        setTime(breakTime);
      } else {
        setTime(longBreakTime);
      }

      setBreakCount(breakCount => breakCount + 1);
      setActive(false);
    }

    return () => clearInterval(interval);
  }, [active, time, breakTime, longBreakTime, breakCount]);

  const resetTimer = () => {
    setTime(25 * 60);
    setBreakTime(5 * 60);
    setLongBreakTime(30 * 60);
    setBreakCount(0);
    setActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="pomodoro-container">
      <h1 className="pomodoro-title">Pomodoro</h1>
      <div className="timer-container">
        <p className="timer">{formatTime(time)}</p>
        <div className="timer-buttons">
          <button className="start-button" onClick={() => setActive(true)}>Start</button>
          <button className="stop-button" onClick={() => setActive(false)}>Stop</button>
        </div>
      </div>
      <div className="break-buttons">
        <button className="short-break" onClick={() => setTime(breakTime)}>Short Break</button>
        <button className="long-break" onClick={() => setTime(longBreakTime)}>Long Break</button>
      </div>
      <button className="reset-button" onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Pomodoro;
