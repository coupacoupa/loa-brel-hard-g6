import { TILES_DIRECTION_ORDER } from "../constants/game.constant";
import { Path, Placement, Tiles } from "../types/game";

export const getStartingTiles = (): Tiles => {
  return {
    4: {
      clock: 0,
      health: 14,
      order: 4,
    },
    5: {
      clock: 1,
      health: 3,
      order: 5,
    },
    8: {
      clock: 3,
      health: 3,
      order: 8,
    },
    7: {
      clock: 5,
      health: 3,
      order: 7,
    },
    6: {
      clock: 6,
      health: 3,
      order: 6,
    },
    3: {
      clock: 7,
      health: 3,
      order: 3,
    },
    0: {
      clock: 9,
      health: 3,
      order: 0,
    },
    1: {
      clock: 11,
      health: 3,
      order: 1,
    },
    2: {
      clock: 12,
      health: 3,
      order: 2,
    },
  };
};

export const getInitialHardPath = (): Path => {
  return { yellow: 6, blue: [6, 3, 0, 1, 2, 5, 5] };
};

export const getEmptyPlacement = (): Placement => {
  return {
    4: { blue: [], yellow: false },
    5: {
      blue: [],
      yellow: false,
    },
    8: {
      blue: [],
      yellow: false,
    },
    7: {
      blue: [],
      yellow: false,
    },
    6: {
      blue: [],
      yellow: false,
    },
    3: {
      blue: [],
      yellow: false,
    },
    0: {
      blue: [],
      yellow: false,
    },
    1: {
      blue: [],
      yellow: false,
    },
    2: {
      blue: [],
      yellow: false,
    },
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
