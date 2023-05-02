import { Placement, Tiles } from "../../../types/game";
import { TILES_DIRECTION_ORDER } from "../game.constant";
import { getNextPlacement } from "./blue.util";

export const getStartingTiles = (): Tiles => {
  return {
    4: {
      clock: 0,
      health: 14,
      order: 4,
      placement: { blue: [] },
    },
    5: {
      clock: 1,
      health: 3,
      order: 5,
      placement: { blue: [] },
    },
    8: {
      clock: 3,
      health: 3,
      order: 8,
      placement: { blue: [] },
    },
    7: {
      clock: 5,
      health: 3,
      order: 7,
      placement: { blue: [] },
    },
    6: {
      clock: 6,
      health: 3,
      order: 6,
      placement: { blue: [] },
    },
    3: {
      clock: 7,
      health: 3,
      order: 3,
      placement: { blue: [] },
    },
    0: {
      clock: 9,
      health: 3,
      order: 0,
      placement: { blue: [] },
    },
    1: {
      clock: 11,
      health: 3,
      order: 1,
      placement: { blue: [] },
    },
    2: {
      clock: 12,
      health: 3,
      order: 2,
      placement: { blue: [] },
    },
  };
};

export const getInitialHardPath = (): Placement => {
  return {
    yellow: 6,
    blue: [6, 3, 0, 1, 2, 5, 5],
  };
};

export const getDirectionPriority = (tiles: Tiles) => {
  const sectionsWithHealth = TILES_DIRECTION_ORDER.map((section) => ({
    health: section.reduce((sum, index) => sum + tiles[index].health, 0),
  }));

  sectionsWithHealth.sort((a, b) => b.health - a.health);

  const sortedIndices = [
    ...new Set(sectionsWithHealth.flatMap((_, i) => TILES_DIRECTION_ORDER[i])),
  ];
  console.log("priority order", sortedIndices);

  return sortedIndices;
};

export const calculatePlacement = (
  currentTiles: Tiles,
  nextBlueCount: number
) => {
  // const tilesWithMeteor = { ...currentTiles };
  const path = getNextPlacement(nextBlueCount, currentTiles, false);

  // reset current placements
  for (const tile of Object.values(currentTiles)) {
    tile.placement = { blue: [], yellow: undefined };
  }

  // set new placements
  for (let i = 0; i < path.length; i++) {
    const order = path[i];
    currentTiles[order].placement?.blue.push(i + 1);
  }
};
