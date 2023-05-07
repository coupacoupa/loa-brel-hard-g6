import { useEffect } from "react";
import IndicatorAtom from "../atoms/indicator.atom";
import { TILE_RECOVERY } from "../particles/constants/setting.constant";
import { useGameInteraction } from "../particles/context/game-interaction.context";
import { useTimer } from "../particles/hooks/useTimer";
import { Tile } from "../particles/types/game";
import { getDateSecondsFromNow } from "../particles/utils/date.util";

interface Props {
  tile: Tile;
}

export default ({ tile }: Props) => {
  const {
    game,
    meteor: { blue },
    recommendation,
  } = useGameInteraction();
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
        tile.recovery = getDateSecondsFromNow(TILE_RECOVERY);
      }
    } else {
      resetTimer();
    }
  }, [tile.health]);

  useEffect(() => {
    if (time <= 0) {
      tile.health = 3;
      tile.recovery = undefined;
      recommendation.recalculate();
    }
  }, [time]);

  return (
    <a
      className={`flex aspect-square w-28 select-none flex-col items-center justify-center text-neutral ${getTileColor()} ${
        game.isStarted
          ? "cursor-pointer hover:border-2 hover:border-secondary-focus"
          : "cursor-not-allowed"
      }`}
      onClick={() => {
        if (!game.isStarted) return;

        blue.drop(tile.order);
        tile.health--;
      }}
    >
      <div className="grid h-full rotate-45 grid-rows-3 place-items-center">
        {recommendation.placements[tile.order]?.yellow ? (
          <IndicatorAtom size={7} background="yellow" text={tile.clock} />
        ) : (
          <div>{tile.clock}</div>
        )}
        <div>
          <div className="flex w-full flex-auto place-items-center gap-2">
            {recommendation.placements[tile.order]?.blue.map((order, i) => (
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
