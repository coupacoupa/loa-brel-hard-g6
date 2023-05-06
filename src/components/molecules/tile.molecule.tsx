import { useEffect } from "react";
import IndicatorAtom from "../atoms/indicator.atom";
import { TILE_RECOVERY } from "../particles/constants/setting.constant";
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
    if (tile.health > 2) return "bg-green-300";
    if (tile.health < 1) return "bg-gray-400";
    if (tile.health === 2) return "bg-orange-300";
    if (tile.health === 1) return "bg-red-300";
  };

  const getTileHealthColor = () => {
    if (tile.health < 1) return "text-gray-600";
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
      className={`flex aspect-square w-28 cursor-pointer select-none flex-col items-center justify-center text-neutral hover:border-2 hover:border-secondary-focus ${getTileColor()}`}
      onClick={() => {
        inputBlueMeteor(tile.order);
        tile.health--;
      }}
    >
      <div className="grid h-full rotate-45 grid-rows-3 place-items-center">
        {placement[tile.order]?.yellow ? (
          <IndicatorAtom size={7} background="yellow" text={tile.clock} />
        ) : (
          <div>{tile.clock}</div>
        )}
        <div>
          <div className="flex w-full flex-auto place-items-center gap-2">
            {placement[tile.order]?.blue.map((order, i) => (
              <IndicatorAtom key={i} size={6} background="blue" text={order} />
            ))}
          </div>
        </div>
        <div className={`${getTileHealthColor()}`}>
          {isActive ? time : undefined}
        </div>
      </div>
    </a>
  );
};
