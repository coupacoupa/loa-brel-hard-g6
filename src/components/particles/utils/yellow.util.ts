import { Tiles } from "../../../types/game";
import { YELLOW_DAMAGE } from "../game.constant";

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

export const handleYellowDrop = (
  tiles: Tiles,
  order: number,
  is118: boolean = false
) => {
  // set damage
  const tile = tiles[order];
  tile.health -= YELLOW_DAMAGE;
  tile.destroyedBy188 = is118 ? true : false;
  tile.placement = { ...tile.placement, yellow: undefined };

  // splash neighbours if yellow
  const neighbours = getNeighbourTiles(order);

  for (let i = 0; i < neighbours.length; i++) {
    tiles[neighbours[i]].health -= 3;
    tiles[neighbours[i]].destroyedBy188 = true;
  }
};
