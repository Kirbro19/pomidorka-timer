import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Timer = () => {
  const [timerMinutes, setTimerMinutes] = useState(10); //25*60 Стартуем с 25 минут
  const [timerState, setTimerState] = useState("stop");
  const [timerStatus, setTimerStatus] = useState("work");
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

  const handleClick = () => {
    if (timerState === "stop") {
      setTimerState("start");
      return;
    }
    setTimerState("stop");
  };

  useEffect(() => {
    const setPomidorTimer = () => {
      if (timerStatus === "work" && timerMinutes === 0) {
        setTimerStatus("break");
        setTimerMinutes(5);
      } else if (timerStatus === "break" && timerMinutes === 0) {
        setTimerStatus("work");
        setTimerMinutes(10);
      }
    };
    const timer = setInterval(() => {
      if (timerState === "start") {
        setTimerMinutes(timerMinutes - 1);
        if (timerMinutes <= 0) {
          setPomidorTimer();
          return;
        }
      } else if (timerState === "stop") {
        clearInterval(timer);
        return;
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerMinutes, timerState, timerStatus]);

  return (
    <section
      className={timerStatus === "work" ? "pomidorka" : "pomidorka resting"}
    >
      <div>
        <Header />
        <div className="clock">
          <h2>{strTimerValue()}</h2>
          <div
            className={timerState === "stop" ? "button pause" : "button play"}
            onClick={handleClick}
          />
        </div>
        <Footer />
      </div>
    </section>
  );
};
