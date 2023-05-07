import { useState } from "react";
import { Placement, Tiles } from "../types/game";
import { getNextBluePlacement } from "../utils/blue.util";
import {
  getEmptyPlacement,
  getInitialHardPath,
  getStartingTiles,
} from "../utils/game.util";
import { getNextYellowPlacement } from "../utils/yellow.util";

export default () => {
  const [placements, setPlacements] = useState<Placement>(getEmptyPlacement());
  const [placementClocks, setPlacementClocks] = useState<number[]>([]);

  const calculatePlacement = (currentTiles: Tiles, nextBlueCount: number) => {
    const newPlacement: Placement = { ...getEmptyPlacement() };

    // set new yellow placements
    const order = getNextYellowPlacement(currentTiles);

    if (order) {
      newPlacement[order].yellow = true;
    }

    // set new blue placements
    const path = getNextBluePlacement(nextBlueCount, currentTiles);
    for (let i = 0; i < path.length; i++) {
      const order = path[i];
      newPlacement[order].blue.push(i + 1);
    }

    setPlacements(newPlacement);

    // convert path to clock
    const tiles = getStartingTiles();
    const clock = path.map((key) => tiles[key].clock);

    setPlacementClocks(clock);
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

    setPlacementClocks([]);
    setPlacements(newPlacement);
  };

  return {
    placements,
    calculatePlacement,
    resetPlacement,
    placementClocks,
  };
};
