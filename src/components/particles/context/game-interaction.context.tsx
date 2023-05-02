import { createContext, useContext, useEffect, useState } from "react";
import { Placement, Tiles } from "../../../types/game";
import { BLUE_DAMAGE, YELLOW_DAMAGE } from "../game.constant";
import {
  getInitialHardPath,
  getNeighbourTiles,
  getNextPlacement,
  getStartingTiles,
} from "../game.util";
import useBlueMeteor from "../hooks/useBlueMeteor";

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
      calculatePlacement(tiles);
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
    startBlueMeteor();
    const path = getInitialHardPath();

    // drop starting meteors
    let updatedTiles = handleYellowDrop(
      getStartingTiles(),
      path.yellow || -1,
      true
    );
    updatedTiles = handleBlueDrop(updatedTiles, path);

    // calculate new placements
    calculatePlacement(updatedTiles);
  };

  const handleYellowDrop = (
    tiles: Tiles,
    order: number,
    is118: boolean = false
  ) => {
    // set damage
    const tile = tiles[order];
    tile.health -= YELLOW_DAMAGE;
    tile.destroyedBy188 = is118 ? true : false;
    tile.placement = { ...tile.placement, yellow: undefined };

    // splash neighbours if yellow
    const neighbours = getNeighbourTiles(order);

    for (let i = 0; i < neighbours.length; i++) {
      tiles[neighbours[i]].health -= 3;
      tiles[neighbours[i]].destroyedBy188 = true;
    }

    setTiles(tiles);
    return tiles;
  };

  const handleBlueDrop = (tiles: Tiles, path: Placement) => {
    for (let i = 0; i < path.blue.length; i++) {
      const order = path.blue[i];
      const tile = tiles[order];

      // skip dropping if tile already dead
      if (tile.health <= 0) continue;

      // set current type state
      tile.health -= BLUE_DAMAGE;
      tile.placement = { ...tile.placement, blue: [] };
    }

    setTiles(tiles);
    return tiles;
  };

  const calculatePlacement = (currentTiles: Tiles) => {
    const tilesWithMeteor = { ...currentTiles };
    const path = getNextPlacement(nextBlueCount, tilesWithMeteor, false);

    // reset current placements
    for (const tile of Object.values(tilesWithMeteor)) {
      tile.placement = { blue: [], yellow: undefined };
    }

    // set new placements
    for (let i = 0; i < path.length; i++) {
      const order = path[i];
      tilesWithMeteor[order].placement?.blue.push(i + 1);
    }
    setTiles(tilesWithMeteor);
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
