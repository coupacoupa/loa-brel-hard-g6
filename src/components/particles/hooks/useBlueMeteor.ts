import { useState } from "react";
import { useTimer } from "./useTimer";
import { BLUE_INTERVAL } from "../constants/setting.constant";

export default () => {
  const [nextBlueCount, setNextBlueCount] = useState<number>(2);
  const [blueInput, setBlueInput] = useState<number[]>([]);
  const { startTimer, resetTimer, time } = useTimer(BLUE_INTERVAL);

  const resetBlueMeteor = () => {
    setNextBlueCount(2);
    setBlueInput([]);
    resetTimer();
  };

  const inputBlueMeteor = (order: number) => {
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
  };
};
