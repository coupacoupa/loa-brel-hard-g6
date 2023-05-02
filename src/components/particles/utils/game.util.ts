import { Path, Tiles } from "../types/game";
import { TILES_DIRECTION_ORDER } from "../constants/game.constant";
import { getNextBluePlacement } from "./blue.util";
import { getNextYellowPlacement } from "./yellow.util";

export const getStartingTiles = (): Tiles => {
  return {
    4: {
      clock: 0,
      health: 14,
      order: 4,
      placement: { blue: [], yellow: false },
    },
    5: {
      clock: 1,
      health: 3,
      order: 5,
      placement: { blue: [], yellow: false },
    },
    8: {
      clock: 3,
      health: 3,
      order: 8,
      placement: { blue: [], yellow: false },
    },
    7: {
      clock: 5,
      health: 3,
      order: 7,
      placement: { blue: [], yellow: false },
    },
    6: {
      clock: 6,
      health: 3,
      order: 6,
      placement: { blue: [], yellow: false },
    },
    3: {
      clock: 7,
      health: 3,
      order: 3,
      placement: { blue: [], yellow: false },
    },
    0: {
      clock: 9,
      health: 3,
      order: 0,
      placement: { blue: [], yellow: false },
    },
    1: {
      clock: 11,
      health: 3,
      order: 1,
      placement: { blue: [], yellow: false },
    },
    2: {
      clock: 12,
      health: 3,
      order: 2,
      placement: { blue: [], yellow: false },
    },
  };
};

export const getInitialHardPath = (): Path => {
  return {
    yellow: 6,
    blue: [6, 3, 0, 1, 2, 5, 5],
  };
};

export const getDirectionPriority = (tiles: Tiles) => {
  const sectionsWithHealth = TILES_DIRECTION_ORDER.map((section) => ({
    health: section.reduce((sum, index) => sum + tiles[index].health, 0),
    indices: section,
  }));

  sectionsWithHealth.sort((a, b) => a.health - b.health);

  const sortedIndices = sectionsWithHealth
    .map((section) => section.indices)
    .flat();

  return sortedIndices;
};

export const calculatePlacement = (
  currentTiles: Tiles,
  nextBlueCount: number
) => {
  // reset current placements
  for (const tile of Object.values(currentTiles)) {
    tile.placement = { blue: [], yellow: false };
  }

  // set new yellow placements
  const order = getNextYellowPlacement(currentTiles);
  currentTiles[order].placement.yellow = true;

  // set new blue placements
  const path = getNextBluePlacement(nextBlueCount, currentTiles, false);
  for (let i = 0; i < path.length; i++) {
    const order = path[i];
    currentTiles[order].placement.blue.push(i + 1);
  }
};
