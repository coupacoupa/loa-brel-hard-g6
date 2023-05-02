import { createContext, useContext, useEffect, useState } from "react";
import { Tiles } from "../../../types/game";
import useBlueMeteor from "../hooks/useBlueMeteor";
import { handleBlueDrop } from "../utils/blue.util";
import {
  calculatePlacement,
  getInitialHardPath,
  getStartingTiles,
} from "../utils/game.util";
import { handleYellowDrop } from "../utils/yellow.util";

interface Provider {
  children: JSX.Element;
}

interface Context {
  tiles: Tiles;
  resetGame: () => void;
  updateTileHealth: (clock: number, modifier: number) => void;
  resetTileHealth: (clock: number) => void;
  nextBlueTime: number;
  startBlueMeteor: () => void;
  resetBlueMeteor: () => void;
  startMech: (mech: 188 | 137 | 28) => void;
  inputBlueMeteor: (order: number) => void;
}

const GameContext = createContext<Context>({
  tiles: {},
  resetGame: () => {},
  updateTileHealth: () => {},
  resetTileHealth: () => {},
  nextBlueTime: 0,
  startBlueMeteor: () => {},
  resetBlueMeteor: () => {},
  startMech: () => {},
  inputBlueMeteor: () => {},
});

export const GameInteractionProvider = ({ children }: Provider) => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());
  const {
    nextBlueTime,
    nextBlueCount,
    startBlueMeteor,
    resetBlueMeteor,
    inputBlueMeteor,
  } = useBlueMeteor();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (started) {
      // calculate next path triggered by manual blue meteors
      calculatePlacement(tiles, nextBlueCount);
    }
  }, [nextBlueCount]);

  const resetGame = () => {
    const tilesWithMeteor = getStartingTiles();
    const path = getInitialHardPath();

    for (let i = 0; i < path.blue.length; i++) {
      const order = path.blue[i];
      tilesWithMeteor[order].destroyedBy188 = undefined;
      tilesWithMeteor[order].placement?.blue.push(i + 1);
    }
    setTiles(tilesWithMeteor);
    resetBlueMeteor();
    setStarted(false);
  };

  const updateTileHealth = (order: number, modifier: number) => {
    setTiles((prevTiles) => {
      const updatedTile = {
        ...prevTiles[order],
        health: prevTiles[order].health + modifier,
      };

      return {
        ...prevTiles,
        [order]: updatedTile,
      };
    });
  };

  const resetTileHealth = (order: number) => {
    setTiles((prevTiles) => {
      const updatedTile = {
        ...prevTiles[order],
        health: 3,
      };

      return {
        ...prevTiles,
        [order]: updatedTile,
      };
    });
  };

  const startMech = (mech: 188 | 137 | 28) => {
    setStarted(true);

    if (mech === 188) {
      handle188Mech();
    }
  };

  const handle188Mech = () => {
    // start blue meteor timer
    startBlueMeteor();

    // get recommended path
    const path = getInitialHardPath();
    let updatedTiles = getStartingTiles();

    // drop starting meteors
    handleYellowDrop(updatedTiles, path.yellow || -1, true);
    handleBlueDrop(updatedTiles, path);

    // calculate new placements
    calculatePlacement(updatedTiles, nextBlueCount);

    // update with placement
    setTiles(updatedTiles);
  };

  return (
    <GameContext.Provider
      value={{
        tiles,
        resetGame,
        updateTileHealth,
        resetTileHealth,
        nextBlueTime,
        startBlueMeteor,
        resetBlueMeteor,
        startMech,
        inputBlueMeteor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameInteraction = () => useContext(GameContext);
