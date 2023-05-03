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
      className={`flex aspect-square cursor-pointer select-none flex-col items-center justify-center border-2 border-current ${getTileColor()} `}
      onClick={() => {
        inputBlueMeteor(tile.order);
        tile.health--;
      }}
    >
      <div className="grid h-full w-full rotate-45 grid-rows-3 place-items-center">
        <span>{tile.clock}</span>
        <div>
          <div className="grid w-full grid-cols-2 place-items-center">
            {placement[tile.order]?.yellow ? (
              <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-200 text-xs text-gray-700"></div>
            ) : undefined}
            {placement[tile.order]?.blue.map((order, i) => (
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
