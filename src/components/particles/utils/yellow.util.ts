import { Tiles } from "../types/game";
import {
  ALLOWED_YELLOW_DROP_LOCATIONS,
  YELLOW_DAMAGE,
} from "../constants/game.constant";
import { getDirectionPriority } from "./game.util";

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

export const calculateYellowDamage = (tiles: Tiles, order: number) => {
  // set damage
  const tile = tiles[order];
  tile.health -= YELLOW_DAMAGE;

  // splash neighbours if yellow
  const neighbours = getNeighbourTiles(order);

  for (let i = 0; i < neighbours.length; i++) {
    const newHealth = Math.max(tiles[neighbours[i]].health - 3, 0);
    tiles[neighbours[i]].health = newHealth;
  }
};

export const getNextYellowPlacement = (tiles: Tiles) => {
  // get which have lower health
  const priorityOrder = getDirectionPriority(tiles).filter((x) => {
    return ALLOWED_YELLOW_DROP_LOCATIONS.includes(x) && tiles[x].health > 0;
  });

  return priorityOrder[0];
};
