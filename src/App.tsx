import { useState } from "react";
import "./App.css";
import { Tile } from "./types/game";

function App() {
  const [tiles, setTiles] = useState<Tile[]>([
    {
      clock: 0,
      health: 14,
    },
    {
      clock: 1,
      health: 3,
    },
    {
      clock: 3,
      health: 3,
    },
    {
      clock: 5,
      health: 3,
    },
    {
      clock: 6,
      health: 3,
    },
    {
      clock: 7,
      health: 3,
    },
    {
      clock: 9,
      health: 3,
    },
    {
      clock: 11,
      health: 3,
    },
    {
      clock: 12,
      health: 3,
    },
  ]);

  return (
    <>
      {tiles.map((tile) => (
        <div>
          {tile.clock} - {tile.health}
        </div>
      ))}
    </>
  );
}

export default App;
