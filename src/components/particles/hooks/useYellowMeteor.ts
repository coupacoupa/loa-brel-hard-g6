import { useState } from "react";
import { Tiles } from "../types/game";
import { calculateYellowDamage } from "../utils/yellow.util";

export default () => {
  const [yellowDropCount, setYellowDropCount] = useState<number>(0);

  const dropYellowMeteor = (order: number, tiles: Tiles) => {
    const updatedTiles = { ...tiles };

    // if order undefined :: drop on recommended slot
    calculateYellowDamage(updatedTiles, order);
    setYellowDropCount(yellowDropCount + 1);

    return updatedTiles;
  };

  const resetYellowMeteor = () => {
    setYellowDropCount(0);
  };

  return {
    yellowDropCount,
    dropYellowMeteor,
    resetYellowMeteor,
  };
};
