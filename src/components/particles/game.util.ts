import { Tile } from "../../types/game";

export const getStartingTiles = (): Tile[] => {
  const tiles = [
    {
      clock: 12,
      health: 3,
    },
    {
      clock: 1,
      health: 3,
    },
    {
      clock: 3,
      health: 3,
    },
    {
      clock: 11,
      health: 3,
    },
    {
      clock: 0,
      health: 14,
    },
    {
      clock: 5,
      health: 3,
    },
    {
      clock: 9,
      health: 3,
    },
    {
      clock: 7,
      health: 3,
    },
    {
      clock: 6,
      health: 3,
    },
  ];

  return tiles;
};
