import { createContext, useContext, useEffect, useState } from "react";
import useBlueMeteor from "../hooks/useBlueMeteor";
import usePlacement from "../hooks/usePlacement";
import { Placement, Tiles } from "../types/game";
import { calculateBlueDamage } from "../utils/blue.util";
import { getInitialHardPath, getStartingTiles } from "../utils/game.util";
import useYellowMeteor from "../hooks/useYellowMeteor";

interface Provider {
  children: JSX.Element;
}
interface Context {
  tiles: Tiles;
  game: {
    reset: () => void;
    start: () => void;
    isStarted: boolean;
  };
  meteor: {
    blue: {
      drop: (order: number) => void;
      count: number;
      blueInput: number[];
      additional: {
        isAdditional: boolean;
        setIsAdditional: React.Dispatch<React.SetStateAction<boolean>>;
      };
    };
    yellow: {
      drop: (order: number) => void;
      count: number;
    };
  };
  recommendation: {
    placements: Placement;
    recalculate: () => void;
    clocks: number[];
  };
  settings: {
    autocopy: {
      value: boolean;
      setValue: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };
}

const GameContext = createContext<Context>({
  tiles: {},
  game: { start: () => {}, reset: () => {}, isStarted: false },
  meteor: {
    blue: {
      drop: () => {},
      count: 2,
      blueInput: [],
      additional: {
        isAdditional: false,
        setIsAdditional: () => {},
      },
    },
    yellow: {
      drop: () => {},
      count: 0,
    },
  },
  recommendation: {
    placements: {},
    recalculate: () => {},
    clocks: [],
  },
  settings: {
    autocopy: {
      value: false,
      setValue: () => {},
    },
  },
});

export const GameInteractionProvider = ({ children }: Provider) => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());
  const [isStarted, setIsStarted] = useState(false);
  const { dropYellowMeteor, resetYellowMeteor, yellowDropCount } =
    useYellowMeteor();
  const {
    nextBlueCount,
    resetBlueMeteor,
    inputBlueMeteor,
    blueInput,
    time: nextBlueTime,
    isAdditional,
    setIsAdditional,
  } = useBlueMeteor();
  const {
    placements,
    calculateUntimedPlacement,
    resetPlacement,
    placementClocks,
    setInputValue: setBlueInputValue,
  } = usePlacement();
  const [isAutocopy, setIsAutocopy] = useState(false);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (nextBlueCount > 2) {
      setBlueInputValue({ currentTiles: tiles, nextBlueCount, nextBlueTime });
    }
  }, [nextBlueCount]);

  const reset = () => {
    setIsStarted(false);

    const tilesWithMeteor = getStartingTiles();
    setTiles(tilesWithMeteor);

    resetPlacement();
    resetBlueMeteor();
    resetYellowMeteor();
  };

  const start = () => {
    setIsStarted(true);

    // get recommended path
    const path = getInitialHardPath();
    const updatedTiles = getStartingTiles();

    // drop starting meteors
    dropYellowMeteor(path.yellow, updatedTiles);
    calculateBlueDamage(updatedTiles, path);

    // calculate new placements
    setBlueInputValue({
      currentTiles: updatedTiles,
      nextBlueCount,
      nextBlueTime,
    });

    // update with placement
    setTiles(updatedTiles);
  };

  const recalculatePlacement = () => {
    setBlueInputValue({ currentTiles: tiles, nextBlueCount, nextBlueTime });
  };

  const dropYellow = (order: number) => {
    dropYellowMeteor(order, tiles);
    recalculatePlacement();
  };

  return (
    <GameContext.Provider
      value={{
        tiles,
        game: { start, reset, isStarted },
        meteor: {
          blue: {
            blueInput,
            drop: inputBlueMeteor,
            count: nextBlueCount,
            additional: {
              isAdditional,
              setIsAdditional,
            },
          },
          yellow: {
            count: yellowDropCount,
            drop: dropYellow,
          },
        },
        recommendation: {
          placements,
          recalculate: recalculatePlacement,
          clocks: placementClocks,
        },
        settings: {
          autocopy: {
            value: isAutocopy,
            setValue: setIsAutocopy,
          },
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameInteraction = () => useContext(GameContext);
