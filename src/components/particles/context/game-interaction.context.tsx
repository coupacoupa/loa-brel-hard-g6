import { createContext, useContext, useState } from "react";
import { Tiles } from "../../../types/game";
import {
  getInitialHardPath,
  getNeighbourTiles,
  getStartingTiles,
} from "../game.util";
import { useTimer } from "../hooks/useTimer";

interface Provider {
  children: JSX.Element;
}

interface Context {
  tiles: Tiles;
  resetGame: () => void;
  updateTileHealth: (clock: number, modifier: number) => void;
  resetTileHealth: (clock: number) => void;
  time: number;
  startTimer: () => void;
  resetTimer: () => void;
  startMech: (mech: 188 | 137 | 28) => void;
}

const GameContext = createContext<Context>({
  tiles: {},
  resetGame: () => {},
  updateTileHealth: () => {},
  resetTileHealth: () => {},
  time: 0,
  startTimer: () => {},
  resetTimer: () => {},
  startMech: () => {},
});

export const GameInteractionProvider = ({ children }: Provider) => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());
  const { time, startTimer, resetTimer } = useTimer(80, true); // blue meteor every 80 seconds

  const resetGame = () => {
    const tilesWithMeteor = getStartingTiles();
    const path = getInitialHardPath();

    for (let i = 0; i < path.length; i++) {
      const meteor = path[i];
      tilesWithMeteor[meteor.order].placement?.push({
        order: i + 1,
        type: meteor.type,
      });
    }

    setTiles(tilesWithMeteor);
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
    const path = getInitialHardPath();

    resetTimer();
    startTimer();

    if (mech === 188) {
      // drop starting meteors
      const updatedTiles = getStartingTiles();

      for (let i = 0; i < path.length; i++) {
        const meteor = path[i];

        updatedTiles[meteor.order].health -= meteor.type === "YELLOW" ? 3 : 1;
        updatedTiles[meteor.order].placement = [];

        if (meteor.type === "YELLOW") {
          // splash neighbours too
          const neighbours = getNeighbourTiles(meteor.order);
          console.log("neighbours", neighbours);

          for (let i = 0; i < neighbours.length; i++) {
            updatedTiles[neighbours[i]].health -= 3;
          }
        }
      }

      setTiles(updatedTiles);
    }
  };

  return (
    <GameContext.Provider
      value={{
        tiles,
        resetGame,
        updateTileHealth,
        resetTileHealth,
        time,
        startTimer,
        resetTimer,
        startMech,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameInteraction = () => useContext(GameContext);
