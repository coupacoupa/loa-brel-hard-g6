import { Placement, Tiles } from "../../types/game";

export const getStartingTiles = (): Tiles => {
  return {
    4: {
      clock: 0,
      health: 14,
      order: 4,
      placement: [],
    },
    5: {
      clock: 1,
      health: 3,
      order: 5,
      placement: [],
    },
    8: {
      clock: 3,
      health: 3,
      order: 8,
      placement: [],
    },
    7: {
      clock: 5,
      health: 3,
      order: 7,
      placement: [],
    },
    6: {
      clock: 6,
      health: 3,
      order: 6,
      placement: [],
    },
    3: {
      clock: 7,
      health: 3,
      order: 3,
      placement: [],
    },
    0: {
      clock: 9,
      health: 3,
      order: 0,
      placement: [],
    },
    1: {
      clock: 11,
      health: 3,
      order: 1,
      placement: [],
    },
    2: {
      clock: 12,
      health: 3,
      order: 2,
      placement: [],
    },
  };
};

export const getInitialHardPath = (): Placement[] => {
  return [
    {
      type: "YELLOW",
      order: 6,
    },
    {
      type: "BLUE",
      order: 6,
    },
    {
      type: "BLUE",
      order: 3,
    },
    {
      type: "BLUE",
      order: 0,
    },
    {
      type: "BLUE",
      order: 1,
    },
    {
      type: "BLUE",
      order: 2,
    },
    {
      type: "BLUE",
      order: 5,
    },
    {
      type: "BLUE",
      order: 5,
    },
  ];
};

export const getNeighbourTiles = (cellIndex: number): number[] => {
  const cellsPerRow = 3;
  const numRows = 3;
  const totalCells = cellsPerRow * numRows;
  const neighboringCells: number[] = [];

  // check if cellIndex is within the grid
  if (cellIndex < 0 || cellIndex >= totalCells) {
    return neighboringCells;
  }

  // get row and column of cell
  const row = Math.floor(cellIndex / cellsPerRow);
  const col = cellIndex % cellsPerRow;

  // loop over rows and columns of neighboring cells
  for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, numRows - 1); i++) {
    for (
      let j = Math.max(0, col - 1);
      j <= Math.min(col + 1, cellsPerRow - 1);
      j++
    ) {
      const index = i * cellsPerRow + j;

      // exclude the current cell and add the neighboring cell index to the array
      if (index !== cellIndex) {
        neighboringCells.push(index);
      }
    }
  }

  return neighboringCells;
};
