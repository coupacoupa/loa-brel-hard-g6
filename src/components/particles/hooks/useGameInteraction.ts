import { useState } from "react";
import { Tiles } from "../../../types/game";
import { getInitialHardPath, getStartingTiles } from "../game.util";

export default () => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());

  const reset = () => {
    const tilesWithMeteor = getStartingTiles();
    const path = getInitialHardPath();

    for (let i = 0; i < path.length; i++) {
      const meteor = path[i];
      tilesWithMeteor[meteor.clock].placement?.push({
        order: i + 1,
        type: meteor.type,
      });
    }

    setTiles(tilesWithMeteor);
  };

  const updateTileHealth = (clock: number, modifier: number) => {
    setTiles((prevTiles) => {
      const updatedTile = {
        ...prevTiles[clock],
        health: prevTiles[clock].health + modifier,
      };

      return {
        ...prevTiles,
        [clock]: updatedTile,
      };
    });
  };

  return { tiles, reset, updateTileHealth };
};
