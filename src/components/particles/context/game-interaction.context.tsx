import { createContext, useContext, useEffect, useState } from "react";
import useBlueMeteor from "../hooks/useBlueMeteor";
import { Tiles } from "../types/game";
import { calculateBlueDamage } from "../utils/blue.util";
import {
  calculatePlacement,
  getInitialHardPath,
  getStartingTiles,
} from "../utils/game.util";
import {
  calculateYellowDamage,
  getNextYellowPlacement,
} from "../utils/yellow.util";

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
  currentMechIndex: number;
  setCurrentMechIndex: React.Dispatch<React.SetStateAction<number>>;
  dropYellowMeteor: (order?: number) => void;
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
  currentMechIndex: 0,
  setCurrentMechIndex: () => {},
  dropYellowMeteor: () => {},
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
  const [currentMechIndex, setCurrentMechIndex] = useState<number>(0);

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
    console.log("reset");
    const tilesWithMeteor = getStartingTiles();
    const path = getInitialHardPath();

    for (let i = 0; i < path.blue.length; i++) {
      const order = path.blue[i];
      tilesWithMeteor[order].destroyedBy188 = undefined;
      tilesWithMeteor[order].placement?.blue.push(i + 1);
    }

    if (path.yellow) {
      tilesWithMeteor[path.yellow].placement.yellow = true;
    }

    setTiles(tilesWithMeteor);
    resetBlueMeteor();
    setStarted(false);
    setCurrentMechIndex(0);
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
    tiles[order].health = 3;

    calculatePlacement(tiles, nextBlueCount);
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
    calculateYellowDamage(updatedTiles, path.yellow || -1, true);
    calculateBlueDamage(updatedTiles, path);

    // calculate new placements
    calculatePlacement(updatedTiles, nextBlueCount);

    // update with placement
    setTiles(updatedTiles);

    // set to next mech
    setCurrentMechIndex(currentMechIndex + 1);
  };

  const dropYellowMeteor = (order?: number) => {
    // if order undefined :: drop on recommended slot
    calculateYellowDamage(tiles, order ? order : getNextYellowPlacement(tiles));

    // calculate new placements
    calculatePlacement(tiles, nextBlueCount);
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
        currentMechIndex,
        setCurrentMechIndex,
        dropYellowMeteor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameInteraction = () => useContext(GameContext);
