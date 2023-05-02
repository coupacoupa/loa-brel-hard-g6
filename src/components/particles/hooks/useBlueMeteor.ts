import { useEffect, useState } from "react";
import { BLUE_METEOR_INTERVAL } from "../constants/game.constant";
import { useTimer } from "./useTimer";
import useDebounce from "./useDebounce";

export default () => {
  const {
    time: nextBlueTime,
    startTimer,
    resetTimer,
  } = useTimer(BLUE_METEOR_INTERVAL, true);
  const [nextBlueCount, setNextBlueCount] = useState<number>(2);

  // small hacks to handle not calculating results instantly
  const [manualBlue, setManualBlue] = useState<number[]>([]);
  const { debouncedValue } = useDebounce<number[]>(manualBlue, 2500);

  const startBlueMeteor = () => {
    startTimer();
  };

  const resetBlueMeteor = () => {
    resetTimer();
    setNextBlueCount(2);
    console.log("reset blue");
  };

  const inputBlueMeteor = (order: number) => {
    setManualBlue([...manualBlue, order]);
  };

  useEffect(() => {
    if (manualBlue.length > 0) {
      setManualBlue([]);

      // set next blue meteor count
      // order will be 2 first then 3,4,3,4,3,4...
      const newCount = nextBlueCount === 3 ? 4 : 3;
      console.log("next blue meteor count", newCount);
      setNextBlueCount(newCount);
    }
  }, [debouncedValue]);

  return {
    startBlueMeteor,
    resetBlueMeteor,
    nextBlueTime,
    nextBlueCount,
    inputBlueMeteor,
    debouncedValue,
  };
};
