import React, { useState, useEffect } from "react";

export const Timer = () => {
  const [timerMinutes, setTimerMinutes] = useState(25); //25*60 Стартуем с 25 минут
  const [timerState, setTimerState] = useState("stop");
  const [pomidorka, setPomidorka] = useState("work");
  const seconds = timerMinutes % 60; // Получаем секунды
  const minutes = (timerMinutes / 60) % 60; // Получаем минуты

  const strTimerValue = () => {
    let strTimer = `${Math.trunc(minutes)} : ${seconds}`;

    if (minutes < 10) {
      strTimer = `0${Math.trunc(minutes)} : ${seconds}`;
    }

    if (seconds < 10) {
      strTimer = `${Math.trunc(minutes)} : 0${seconds}`;
    }

    if (minutes < 10 && seconds < 10) {
      strTimer = `0${Math.trunc(minutes)} : 0${seconds}`;
    }
    return strTimer;
  };

  console.log("timerMinutes", timerMinutes);

  const timerTick = () => {
    setTimerMinutes(timerMinutes - 1);
  };

  const setPomidorTimer = () => {
    if (pomidorka === "work" && timerMinutes === 0) {
      setPomidorka("break");
      setTimerMinutes(5);
    } else if (pomidorka === "break" && timerMinutes === 0) {
      setPomidorka("work");
      setTimerMinutes(25);
    }
  };

  console.log("pomidorka:", pomidorka);

  const handleClick = () => {
    console.log("Click");
    if (timerState === "stop") {
      setTimerState("start");
      return;
    }
    setTimerState("stop");
  };

  console.log("timerState:", timerState);

  useEffect(() => {
    console.log("use effect");
    const timer = setInterval(() => {
      console.log("use effect timerMinutes:", timerMinutes);
      if (timerState === "start") {
        timerTick();
        if (timerMinutes <= 0) {
          setPomidorTimer();
          return;
        }
      } else if (timerState === "stop") {
        clearInterval(timer);
        return;
      }
    }, 1000);
    console.log("strTimer:", strTimerValue());
    return () => {
      clearInterval(timer);
    };
  }, [timerMinutes, timerState]);

  return (
    <div className="clock">
      <h1>Pomidorka timer</h1>
      <h2>{strTimerValue()}</h2>
      <button onClick={handleClick}>play</button>
    </div>
  );
};
