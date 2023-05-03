import { useState } from "react";
import { Placement, Tiles } from "../types/game";
import { getNextBluePlacement } from "../utils/blue.util";
import { getEmptyPlacement, getInitialHardPath } from "../utils/game.util";
import { getNextYellowPlacement } from "../utils/yellow.util";

export default () => {
  const [placement, setPlacement] = useState<Placement>(getEmptyPlacement());

  const calculatePlacement = (currentTiles: Tiles, nextBlueCount: number) => {
    const newPlacement: Placement = { ...getEmptyPlacement() };

    // set new yellow placements
    const order = getNextYellowPlacement(currentTiles);
    newPlacement[order].yellow = true;

    // set new blue placements
    const path = getNextBluePlacement(nextBlueCount, currentTiles, false);
    for (let i = 0; i < path.length; i++) {
      const order = path[i];
      newPlacement[order].blue.push(i + 1);
    }

    setPlacement(newPlacement);
  };

  const resetPlacement = () => {
    const newPlacement: Placement = { ...getEmptyPlacement() };

    const path = getInitialHardPath();

    for (let i = 0; i < path.blue.length; i++) {
      const order = path.blue[i];
      newPlacement[order].blue.push(i + 1);
    }

    if (path.yellow) {
      newPlacement[path.yellow].yellow = true;
    }

    setPlacement(newPlacement);
  };

  return {
    placement,
    calculatePlacement,
    resetPlacement,
  };
};
