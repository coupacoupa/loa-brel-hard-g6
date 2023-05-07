import {
  BLUE_DAMAGE,
  CORNER_TILES,
  SPARE_TILES,
} from "../constants/game.constant";
import { BLUE_INTERVAL } from "../constants/setting.constant";
import { Path, Tile, Tiles } from "../types/game";
import { getTimeDifference } from "./date.util";
import { getDirectionPriority } from "./game.util";

export const getNextBluePlacement = (nextBlueCount: number, tiles: Tiles) => {
  console.log(`calculating next placement - blue: ${nextBlueCount}`);
  // priority to place on (clock 11,12,1 order 1,2,5) or (clock 5,6,7 order 3,6,7) or (clock 7,9,11 order 3,0,1) or (clock 1,3,5 or 5,8,7)
  // max efficiency would be 3,2,2 = 7 damage before yellow

  console.log("deb", tiles);

  // get number of tiles destroyed 60 seconds from now
  const destroyedTilesCount = Object.values(tiles).reduce(
    (count: number, tile: Tile) => {
      if (
        tile.health <= 0 &&
        getTimeDifference(tile.recovery) < BLUE_INTERVAL
      ) {
        return count + 1;
      }
      return count;
    },
    0
  );

  let canDestroy = destroyedTilesCount === 0;

  console.log("destroyed", destroyedTilesCount, canDestroy);

  // stack and break
  if (canDestroy) {
    return stackAndBreak(tiles, nextBlueCount);
  }

  // count number of damage on both sides and get higher of both
  return fillByPriority(tiles, nextBlueCount);
};

export const stackAndBreak = (tiles: Tiles, nextBlueCount: number) => {
  // get which have lower health
  const priorityOrder = getDirectionPriority(tiles)
    .filter((order) => !CORNER_TILES.includes(order))
    .filter((order) => {
      return tiles[order].health === 1 || tiles[order].health === 2;
    });

  console.log("stackAndBreak debug", priorityOrder);

  let remainder = nextBlueCount;
  const path: number[] = [];

  if (priorityOrder.length > 0) {
    // push two to path
    path.push(priorityOrder[0]);
    path.push(priorityOrder[0]);
    remainder -= 2;
  }

  // fill remainder by priority
  return [...path, ...fillByPriority(tiles, remainder, path)];
};

export const fillByPriority = (
  tiles: Tiles,
  nextBlueCount: number,
  excludeList: number[] = []
) => {
  // get which have lower health
  const priorityOrder = [...getDirectionPriority(tiles), ...SPARE_TILES]
    .filter((x) => !excludeList.includes(x))
    .filter((order) => {
      return (
        tiles[order].health > 1 ||
        getTimeDifference(tiles[order].recovery) < BLUE_INTERVAL
      );
    });

  console.log("priority debug", priorityOrder);

  // fills placements based on priority first
  // if both filled, then fill spare left right
  const path: number[] = [];
  const history: { [order: number]: number } = {};

  for (let i = 0; i < nextBlueCount; i++) {
    for (const order of priorityOrder) {
      const damageFromHistory = history[order] ? history[order] : 0;

      if (tiles[order].health - damageFromHistory > 1) {
        history[order] = history[order] ? history[order] + 1 : 1;
        path.push(order);
        break;
      }
    }
  }

  return path;
};

export const calculateBlueDamage = (tiles: Tiles, path: Path) => {
  for (let i = 0; i < path.blue.length; i++) {
    const order = path.blue[i];
    const tile = tiles[order];

    // skip dropping if tile already dead
    if (tile.health <= 0) continue;

    // set current type state
    tile.health -= BLUE_DAMAGE;
  }
};
