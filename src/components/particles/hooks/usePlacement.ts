import { useEffect, useState } from "react";
import { Placement, Tiles } from "../types/game";
import { getNextBluePlacement } from "../utils/blue.util";
import {
  getEmptyPlacement,
  getInitialHardPath,
  getStartingTiles,
} from "../utils/game.util";
import { getNextYellowPlacement } from "../utils/yellow.util";
import useDebounce from "./useDebounce";

export default () => {
  const [placements, setPlacements] = useState<Placement>(getEmptyPlacement());
  const [placementClocks, setPlacementClocks] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<{
    currentTiles: Tiles;
    nextBlueCount: number;
    nextBlueTime: number;
  }>();
  const debouncedValue = useDebounce(inputValue, 100);

  useEffect(() => {
    // to handle when multiple tiles recover at once, eg when yellow destroys 3

    if (!inputValue || !debouncedValue) return;

    const { nextBlueCount, nextBlueTime, currentTiles } = debouncedValue;

    const newPlacement: Placement = { ...getEmptyPlacement() };

    // set new yellow placements
    const order = getNextYellowPlacement(currentTiles);

    if (order) {
      newPlacement[order].yellow = true;
    }

    // set new blue placements
    const path = getNextBluePlacement(
      nextBlueCount,
      nextBlueTime,
      currentTiles
    );
    for (let i = 0; i < path.length; i++) {
      const order = path[i];
      newPlacement[order].blue.push(i + 1);
    }

    setPlacements(newPlacement);

    // convert path to clock
    const tiles = getStartingTiles();
    const clock = path.map((key) => tiles[key].clock);

    setPlacementClocks(clock);

    setInputValue(undefined);
  }, [debouncedValue]);

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
    setInputValue,
    resetPlacement,
    placementClocks,
  };
};
