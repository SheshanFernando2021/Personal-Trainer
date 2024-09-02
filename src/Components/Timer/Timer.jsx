import React, { useState, useEffect, useRef } from 'react';
import './timer.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [user] = useAuthState(auth);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const userSignOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/');
      })
      .catch(console.error('Sign out error:', error));
  };

  const startTimer = () => {
    if (!isActive) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds > 0) {
        setIsActive(true);
        setIsPaused(false);
        setTimeRemaining(totalSeconds);
        timerRef.current = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timerRef.current);
              setIsActive(false);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    } else if (isPaused) {
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(0);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return {
      hrs: String(hrs).padStart(2, '0'),
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  };

  const { hrs, mins, secs } = formatTime(timeRemaining);

  return (
    <>
      {user ? (
        <>
          {' '}
          <div className="timer-container">
            <div className="navbtnns">
              <button onClick={userSignOutHandler}>Sign Out</button>
              <button onClick={() => navigate('/recipe')}>to Recipe</button>
              <button onClick={() => navigate('/dashboard')}>
                to Dashboard
              </button>
            </div>

            <h1>Timer</h1>
            <div className="input-container">
              <input
                style={{
                  width: '50px',
                  backgroundColor: 'transparent',
                  border: '0.5px solid white',
                  fontSize: '20px',
                  fontFamily: 'Aldrich',
                  marginTop: '10px',
                }}
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                placeholder="Hours"
                min="0"
              />
              <input
                style={{
                  width: '50px',
                  backgroundColor: 'transparent',
                  border: '0.5px solid white',
                  fontSize: '20px',
                  fontFamily: 'Aldrich',
                  marginTop: '10px',
                }}
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                placeholder="Minutes"
                min="0"
                max="59"
              />
              <input
                style={{
                  width: '50px',
                  backgroundColor: 'transparent',
                  border: '0.5px solid white',
                  fontSize: '20px',
                  fontFamily: 'Aldrich',
                  marginTop: '10px',
                }}
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                placeholder="Seconds"
                min="0"
                max="59"
              />
            </div>
            <div className="timerbtns">
              <button onClick={startTimer} disabled={isActive && !isPaused}>
                {isPaused ? 'Resume Timer' : 'Start Timer'}
              </button>
              <button onClick={pauseTimer} disabled={!isActive || isPaused}>
                Pause Timer
              </button>
              <button onClick={stopTimer}>Stop Timer</button>
            </div>
            <div>
              <h2>
                {hrs}:{mins}:{secs}
              </h2>
              {!isActive &&
                timeRemaining === 0 &&
                (hours > 0 || minutes > 0 || seconds > 0) && <p>Timer Done!</p>}
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/')}>Sign back in</button>
        </>
      )}
    </>
  );
};

export default Timer;
