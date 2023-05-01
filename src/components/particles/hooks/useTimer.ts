import { useState, useEffect } from "react";

export const useTimer = (initialTime: number, autoReset: boolean = false) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    if (time <= 0) {
      if (autoReset) {
        setTime(initialTime);
      } else {
        setIsActive(false);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  return { time, startTimer, resetTimer, isActive };
};
