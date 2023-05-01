import { createContext, useContext, useEffect, useState } from "react";
import { Tiles } from "../../../types/game";
import {
  getInitialHardPath,
  getNeighbourTiles,
  getStartingTiles,
} from "../game.util";
import useBlueMeteor from "../hooks/useBlueMeteor";
import { BLUE_DAMAGE, YELLOW_DAMAGE } from "../game.constant";

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
});

export const GameInteractionProvider = ({ children }: Provider) => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());
  const { nextBlueTime, startBlueMeteor, resetBlueMeteor } = useBlueMeteor();

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const tilesWithMeteor = getStartingTiles();
    const path = getInitialHardPath();

    for (let i = 0; i < path.length; i++) {
      const meteor = path[i];
      tilesWithMeteor[meteor.order].destroyedBy188 = undefined;
      tilesWithMeteor[meteor.order].placement?.push({
        order: i + 1,
        type: meteor.type,
      });
    }
    setTiles(tilesWithMeteor);
    resetBlueMeteor();
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
    if (mech === 188) {
      handle188Mech();
    }
  };

  const handle188Mech = () => {
    startBlueMeteor();
    const path = getInitialHardPath();

    // drop starting meteors
    const updatedTiles = getStartingTiles();

    for (let i = 0; i < path.length; i++) {
      const meteor = path[i];
      const tile = updatedTiles[meteor.order];
      const isYellow = meteor.type === "YELLOW";

      // skip dropping if tile already dead
      if (tile.health <= 0) continue;

      // set current type state
      tile.health -= isYellow ? YELLOW_DAMAGE : BLUE_DAMAGE;
      tile.destroyedBy188 = isYellow ? true : false;
      tile.placement = [];

      if (isYellow) {
        // splash neighbours if yellow
        const neighbours = getNeighbourTiles(meteor.order);

        for (let i = 0; i < neighbours.length; i++) {
          updatedTiles[neighbours[i]].health -= 3;
          updatedTiles[neighbours[i]].destroyedBy188 = true;
        }
      }
    }

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameInteraction = () => useContext(GameContext);
