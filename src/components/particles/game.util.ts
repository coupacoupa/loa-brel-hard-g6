import { Placement, Tile, Tiles } from "../../types/game";
import { TILES_DIRECTION_ORDER } from "./game.constant";

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
  console.log(
    `calculating next placement - blue: ${nextBlueCount}, shandi: ${shandi}`
  );
  // priority to place on (clock 11,12,1 order 1,2,5) or (clock 5,6,7 order 3,6,7) or (clock 7,9,11 order 3,0,1) or (clock 1,3,5 or 5,8,7)
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

  // get which have lower health
  const priorityOrder = getDirectionPriority(tiles);

  // fills placements based on priority first
  // if both filled, then fill spare left right
  const path: number[] = [];
  const history: { [order: number]: number } = {};

  for (let i = 0; i < nextBlueCount; i++) {
    const healthRequirement = canDestroy ? 2 : 1;

    for (const order of priorityOrder) {
      const damageFromHistory = history[order] ? history[order] : 0;

      if (tiles[order].health - damageFromHistory > healthRequirement) {
        history[order] = history[order] ? history[order]++ : 1;
        path.push(order);
        break;
      }
    }
  }

  console.log("Calculated placement path", path);

  return path;
};

const getDirectionPriority = (tiles: Tiles) => {
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
