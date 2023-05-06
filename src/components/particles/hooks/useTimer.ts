import { useState, useEffect } from "react";

export const useTimer = (initialTime: number) => {
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
    let timeoutId: number;

    if (isActive && time > 0) {
      timeoutId = setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsActive(false);
    }

    return () => clearTimeout(timeoutId);
  }, [isActive, time]);

  return { time, startTimer, resetTimer, isActive };
};
