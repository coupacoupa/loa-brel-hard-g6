import { BLUE_METEOR_INTERVAL } from "../game.constant";
import { useTimer } from "./useTimer";

export default () => {
  const {
    time: nextBlueTime,
    startTimer,
    resetTimer,
  } = useTimer(BLUE_METEOR_INTERVAL, true);

  const startBlueMeteor = () => {
    startTimer();
  };

  const resetBlueMeteor = () => {
    resetTimer();
  };

  return { startBlueMeteor, resetBlueMeteor, nextBlueTime };
};
