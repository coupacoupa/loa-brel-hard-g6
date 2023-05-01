import { Placement, Tile, Tiles } from "../../types/game";

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

export const getNextPlacement = (
  nextBlueCount: number,
  tiles: Tiles,
  shandi: boolean
) => {
  // priority to place on (clock 11,12,1 order 1,2,5) or (clock 5,6,7 order 3,6,7)
  // max efficiency would be 3,2,2 = 7 damage before yellow

  // get number of tiles already destroyed
  const currentDestroyed = Object.values(tiles).reduce(
    (count: number, tile: Tile) => {
      if (tile.health <= 0) {
        return count + 1;
      }
      return count;
    },
    0
  );

  let canDestroy = currentDestroyed === 0 && !shandi;

  // count number of damage on both sides and get higher of both
  const topHealth = tiles[1].health + tiles[2].health + tiles[5].health;
  const bottomHealth = tiles[3].health + tiles[6].health + tiles[7].health;

  // get which have lower health
  const priorityOrder =
    topHealth <= bottomHealth
      ? [1, 2, 5, 3, 6, 7, 0, 8, 4]
      : [3, 6, 7, 1, 2, 5, 0, 8, 4];

  // fills placements based on priority first
  // if both filled, then fill spare left right
  const path: Placement[] = [];
  const history: { [order: number]: number } = {};

  for (let i = 0; i < nextBlueCount; i++) {
    const healthRequirement = canDestroy ? 2 : 1;

    for (const order of priorityOrder) {
      const damageFromHistory = history[order] ? history[order] : 0;

      if (tiles[order].health - damageFromHistory > healthRequirement) {
        history[order] = history[order] ? history[order]++ : 1;
        path.push({ order, type: "BLUE" });
        break;
      }
    }
  }

  return path;
};
