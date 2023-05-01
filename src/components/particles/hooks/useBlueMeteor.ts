import { useEffect, useState } from "react";
import { BLUE_METEOR_INTERVAL } from "../game.constant";
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
  };

  const inputBlueMeteor = (order: number) => {
    setManualBlue([...manualBlue, order]);
  };

  useEffect(() => {
    if (manualBlue.length > 0) {
      setManualBlue([]);

      // set next blue meteor count
      // order will be 2 first then 3,4,3,4,3,4...
      if (nextBlueCount === 3) {
        setNextBlueCount(4);
      } else {
        setNextBlueCount(3);
      }
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
