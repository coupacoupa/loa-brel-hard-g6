import { useState } from "react";
import { useTimer } from "./useTimer";
import { BLUE_INTERVAL } from "../constants/setting.constant";

export default () => {
  const [nextBlueCount, setNextBlueCount] = useState(2);
  const [blueInput, setBlueInput] = useState<number[]>([]);
  const [isAdditional, setIsAdditional] = useState(false);
  const { startTimer, resetTimer, time } = useTimer(BLUE_INTERVAL);

  const resetBlueMeteor = () => {
    setNextBlueCount(2);
    setBlueInput([]);
    setIsAdditional(false);
    resetTimer();
  };

  const inputBlueMeteor = (order: number) => {
    if (isAdditional) return;

    const newBlueInput = [...blueInput, order];

    if (newBlueInput.length >= nextBlueCount) {
      // set next blue meteor count
      // order will be 2 first then 3,4,3,4,3,4...
      const newCount = nextBlueCount === 3 ? 4 : 3;
      setNextBlueCount(newCount);
      setBlueInput([]);
      resetTimer();
      startTimer();
    } else {
      setBlueInput(newBlueInput);
    }
  };

  return {
    resetBlueMeteor,
    nextBlueCount,
    inputBlueMeteor,
    blueInput,
    time,
    isAdditional,
    setIsAdditional,
  };
};
