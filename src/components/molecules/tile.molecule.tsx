import { useEffect } from "react";
import {
  TILE_RECOVERY,
  YELLOW_APPEAR_TILL_DROP_BUFFER,
} from "../particles/constants/game.constant";
import { useGameInteraction } from "../particles/context/game-interaction.context";
import { useTimer } from "../particles/hooks/useTimer";
import { Tile } from "../particles/types/game";
import { getNextYellowHealth } from "../particles/utils/yellow.util";

interface Props {
  tile: Tile;
}

export default ({ tile }: Props) => {
  const {
    updateTileHealth,
    resetTileHealth,
    inputBlueMeteor,
    currentMechIndex,
  } = useGameInteraction();
  const { time, startTimer, resetTimer, isActive } = useTimer(TILE_RECOVERY);

  const getTileColor = () => {
    if (tile.health > 2) return "bg-green-100";
    if (tile.health < 1) return "bg-gray-100";
    if (tile.health === 2) return "bg-orange-100";
    if (tile.health === 1) return "bg-red-100";
  };

  const nextYellow = getNextYellowHealth(currentMechIndex);

  useEffect(() => {
    if (tile.health <= 0) {
      startTimer(tile.destroyedBy188 ? YELLOW_APPEAR_TILL_DROP_BUFFER : 0);
    } else {
      if (isActive) {
        // detect game reset
        resetTimer();
      }
    }
    tile.destroyedBy188 = false;
  }, [tile.health]);

  useEffect(() => {
    if (time <= 0) {
      resetTileHealth(tile.order);
    }
  }, [time]);

  return (
    <a
      className={`flex aspect-square select-none flex-col items-center justify-center border-2 border-current ${getTileColor()} ${
        !isActive ? "cursor-pointer" : "pointer-events-none cursor-not-allowed"
      }`}
      onClick={() => {
        inputBlueMeteor(tile.order);
        updateTileHealth(tile.order, -1);
      }}
    >
      <div className="grid h-full w-full rotate-45 grid-rows-3 place-items-center">
        <span>{tile.clock}</span>
        <div>
          <div className="grid w-full grid-cols-2 place-items-center">
            {tile.placement?.yellow && nextYellow ? (
              <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-200 text-xs text-gray-700">
                {nextYellow}
              </div>
            ) : undefined}
            {tile.placement?.blue.map((order, i) => (
              <div
                key={i}
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-xs text-gray-700"
              >
                {order}
              </div>
            ))}
          </div>
        </div>
        <div>{isActive ? time : tile.health}</div>
      </div>
    </a>
  );
};
