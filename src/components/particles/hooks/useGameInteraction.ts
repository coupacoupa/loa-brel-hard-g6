import { useState } from "react";
import { Tile, Tiles } from "../../../types/game";
import { getStartingTiles } from "../game.util";

export default () => {
  const [tiles, setTiles] = useState<Tiles>(getStartingTiles());

  const reset = () => {
    setTiles(getStartingTiles());
  };

  const reduceTileHealth = () => {};

  return { tiles, reset };
};
