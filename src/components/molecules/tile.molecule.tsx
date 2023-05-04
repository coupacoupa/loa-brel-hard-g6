import { useEffect } from "react";
import { TILE_RECOVERY } from "../particles/constants/game.constant";
import { useGameInteraction } from "../particles/context/game-interaction.context";
import { useTimer } from "../particles/hooks/useTimer";
import { Tile } from "../particles/types/game";

interface Props {
  tile: Tile;
}

export default ({ tile }: Props) => {
  const { inputBlueMeteor, placement, recalculatePlacement } =
    useGameInteraction();
  const { time, startTimer, resetTimer, isActive } = useTimer(TILE_RECOVERY);

  const getTileColor = () => {
    if (tile.health > 2) return "bg-green-100";
    if (tile.health < 1) return "bg-gray-100";
    if (tile.health === 2) return "bg-orange-100";
    if (tile.health === 1) return "bg-red-100";
  };

  const getTileHealthColor = () => {
    if (tile.health < 1) return "text-gray-400";
  };

  useEffect(() => {
    if (tile.health <= 0) {
      if (!isActive) {
        startTimer();
      }
    } else {
      resetTimer();
    }
  }, [tile.health]);

  useEffect(() => {
    if (time <= 0) {
      tile.health = 3;
      recalculatePlacement();
    }
  }, [time]);

  return (
    <a
      className={`flex aspect-square w-28 cursor-pointer select-none flex-col items-center justify-center border-2 border-current ${getTileColor()} `}
      onClick={() => {
        inputBlueMeteor(tile.order);
        tile.health--;
      }}
    >
      <div className="grid h-full rotate-45 grid-rows-3 place-items-center">
        {placement[tile.order]?.yellow ? (
          <div className="border-1 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-xs text-gray-700">
            {tile.clock}
          </div>
        ) : (
          <div>{tile.clock}</div>
        )}
        <div>
          <div className="flex w-full flex-auto place-items-center gap-2">
            {placement[tile.order]?.blue.map((order, i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-xs text-gray-700"
              >
                {order}
              </div>
            ))}
          </div>
        </div>
        <div className={`${getTileHealthColor()}`}>
          {isActive ? time : tile.health}
        </div>
      </div>
    </a>
  );
};
