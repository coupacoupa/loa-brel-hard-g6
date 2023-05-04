import { useState } from "react";

export default () => {
  const [nextBlueCount, setNextBlueCount] = useState<number>(2);
  const [blueInput, setBlueInput] = useState<number[]>([]);

  const resetBlueMeteor = () => {
    setNextBlueCount(2);
    console.log("reset blue");
  };

  const inputBlueMeteor = (order: number) => {
    const newBlueInput = [...blueInput, order];

    if (newBlueInput.length >= nextBlueCount) {
      // set next blue meteor count
      // order will be 2 first then 3,4,3,4,3,4...
      const newCount = nextBlueCount === 3 ? 4 : 3;
      setNextBlueCount(newCount);
      setBlueInput([]);
    } else {
      setBlueInput(newBlueInput);
    }
  };

  return {
    resetBlueMeteor,
    nextBlueCount,
    inputBlueMeteor,
    blueInput,
  };
};
