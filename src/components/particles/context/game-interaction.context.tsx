import { createContext, useContext, useEffect, useState } from "react";
import useBlueMeteor from "../hooks/useBlueMeteor";
import { Placement, Tiles } from "../types/game";
import { calculateBlueDamage } from "../utils/blue.util";
import { getInitialHardPath, getStartingTiles } from "../utils/game.util";
import { calculateYellowDamage } from "../utils/yellow.util";
import usePlacement from "../hooks/usePlacement";

interface Provider {
  children: JSX.Element;
}

interface Context {
  tiles: Tiles;
  setTiles: React.Dispatch<React.SetStateAction<Tiles>>;
  resetGame: () => void;
  start: () => void;
  inputBlueMeteor: (order: number) => void;
  dropYellowMeteor: (order: number) => void;
  nextBlueCount: number;
  placement: Placement;
  recalculatePlacement: () => void;
  blueInput: number[];
  placementClock: number[];
}

const GameContext = createContext<Context>({
  tiles: {},
  setTiles: () => {},
  resetGame: () => {},
  start: () => {},
  inputBlueMeteor: () => {},
  dropYellowMeteor: () => {},
  nextBlueCount: 2,
  placement: {},
  recalculatePlacement: () => {},
  blueInput: [],
  placementClock: [],
});

export const GameInteractionProvider = ({ children }: Provider) => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());
  const { nextBlueCount, resetBlueMeteor, inputBlueMeteor, blueInput } =
    useBlueMeteor();
  const { placement, calculatePlacement, resetPlacement, placementClock } =
    usePlacement();

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (nextBlueCount > 2) {
      calculatePlacement(tiles, nextBlueCount);
    }
  }, [nextBlueCount]);

  const resetGame = () => {
    console.log("reset");
    const tilesWithMeteor = getStartingTiles();
    setTiles(tilesWithMeteor);

    resetPlacement();
    resetBlueMeteor();
  };

  const start = () => {
    // get recommended path
    const path = getInitialHardPath();
    const updatedTiles = getStartingTiles();

    // drop starting meteors
    calculateYellowDamage(updatedTiles, path.yellow);
    calculateBlueDamage(updatedTiles, path);

    // calculate new placements
    calculatePlacement(updatedTiles, nextBlueCount);

    // update with placement
    setTiles(updatedTiles);
  };

  const dropYellowMeteor = (order: number) => {
    const updatedTiles = { ...tiles };

    // if order undefined :: drop on recommended slot
    calculateYellowDamage(updatedTiles, order);

    // calculate new placements
    calculatePlacement(updatedTiles, nextBlueCount);

    setTiles(updatedTiles);
  };

  const recalculatePlacement = () => {
    calculatePlacement(tiles, nextBlueCount);
  };

  return (
    <GameContext.Provider
      value={{
        tiles,
        setTiles,
        resetGame,
        start,
        inputBlueMeteor,
        dropYellowMeteor,
        nextBlueCount,
        placement,
        recalculatePlacement,
        blueInput,
        placementClock,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameInteraction = () => useContext(GameContext);
