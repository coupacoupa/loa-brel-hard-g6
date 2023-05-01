import { useState } from "react";
import "./App.css";
import TileAtom from "./components/atoms/tile.atom";
import { Tile } from "./types/game";

function App() {
  const [tiles, setTiles] = useState<Tile[]>([
    {
      clock: 12,
      health: 3,
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
      clock: 11,
      health: 3,
    },
    {
      clock: 0,
      health: 14,
    },
    {
      clock: 5,
      health: 3,
    },
    {
      clock: 9,
      health: 3,
    },
    {
      clock: 7,
      health: 3,
    },
    {
      clock: 6,
      health: 3,
    },
  ]);

  const onClick = () => {
    console.log("hello world");
  };

  return (
    <div className="grid rotate-45 transform grid-cols-3 gap-2">
      {tiles.map((tile, i) => (
        <div key={i} className="-rotate-45 transform">
          <TileAtom text={`${tile.clock} - ${tile.health}`} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

export default App;
