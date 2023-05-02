import { Tiles, Tile, Placement } from "../../../types/game";
import { BLUE_DAMAGE } from "../game.constant";
import { getDirectionPriority } from "./game.util";

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

export const handleBlueDrop = (tiles: Tiles, path: Placement) => {
  for (let i = 0; i < path.blue.length; i++) {
    const order = path.blue[i];
    const tile = tiles[order];

    // skip dropping if tile already dead
    if (tile.health <= 0) continue;

    // set current type state
    tile.health -= BLUE_DAMAGE;
    tile.placement = { ...tile.placement, blue: [] };
  }
};
