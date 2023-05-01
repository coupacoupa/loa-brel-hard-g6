import { useState } from "react";
import { Tile } from "../../../types/game";
import { getStartingTiles } from "../game.util";

export default () => {
  const [tiles, setTiles] = useState<Tile[]>(getStartingTiles());

  const reset = () => {
    setTiles(getStartingTiles());
  };

  return { tiles, reset };
};
