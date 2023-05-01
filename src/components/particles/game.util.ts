import { Tiles } from "../../types/game";

export const getStartingTiles = (): Tiles => {
  const tiles: Tiles = {
    0: {
      clock: 0,
      health: 14,
      order: 5,
    },
    1: {
      clock: 1,
      health: 3,
      order: 6,
    },
    3: {
      clock: 3,
      health: 3,
      order: 9,
    },
    5: {
      clock: 5,
      health: 3,
      order: 8,
    },
    6: {
      clock: 6,
      health: 3,
      order: 7,
    },
    7: {
      clock: 7,
      health: 3,
      order: 4,
    },
    9: {
      clock: 9,
      health: 3,
      order: 1,
    },
    11: {
      clock: 11,
      health: 3,
      order: 2,
    },
    12: {
      clock: 12,
      health: 3,
      order: 3,
    },
  };

  return tiles;
};
