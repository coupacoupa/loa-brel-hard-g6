import { useEffect } from "react";
import { Tile } from "../../types/game";
import { useGameInteraction } from "../particles/context/game-interaction.context";
import { useTimer } from "../particles/hooks/useTimer";

interface Props {
  tile: Tile;
}

export default ({ tile }: Props) => {
  const { updateTileHealth, resetTileHealth } = useGameInteraction();
  const { time, startTimer, resetTimer, isActive } = useTimer(100);

  const getTileColor = () => {
    if (tile.health > 2) return "bg-green-100";
    if (tile.health < 1) return "bg-gray-100";
    if (tile.health === 2) return "bg-orange-100";
    if (tile.health === 1) return "bg-red-100";
  };

  useEffect(() => {
    if (tile.health <= 0) {
      resetTimer();
      startTimer();
    }
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
      onClick={() => updateTileHealth(tile.clock, -1)}
    >
      <div className="grid h-full w-full rotate-45 grid-rows-3 place-items-center">
        <span>{tile.clock}</span>
        <div>
          <div className="grid w-full grid-cols-2 place-items-center">
            {tile.placement?.map((meteor) => (
              <div
                className={`ml-2 flex h-6 w-6 items-center justify-center rounded-full ${
                  meteor.type === "YELLOW" ? "bg-yellow-200" : "bg-blue-200"
                } text-xs text-gray-700`}
              >
                {meteor.order}
              </div>
            ))}
          </div>
        </div>
        <div>{isActive ? time : tile.health}</div>
      </div>
    </a>
  );
};
