import { useState } from "react";
import "./App.css";
import TileMolecule from "./components/molecules/tile.molecule";
import { YELLOW_THRESHOLD } from "./components/particles/constants/game.constant";
import { useGameInteraction } from "./components/particles/context/game-interaction.context";
import { Tile } from "./components/particles/types/game";

function App() {
  const {
    tiles,
    resetGame,
    start,
    dropYellowMeteor,
    blueInput,
    nextBlueCount,
  } = useGameInteraction();

  const [yellowDropped, setYellowDropped] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 space-y-24 px-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-full w-full grid-rows-3 gap-2">
          <button
            onClick={() => {
              dropYellowMeteor(2);
              setYellowDropped(yellowDropped + 1);
            }}
          >
            YELLOW TOP
          </button>
          <div className="m-20 grid -rotate-45 grid-cols-3 gap-2">
            {Object.values(tiles).map((tile: Tile, i) => (
              <TileMolecule key={i} tile={tile} />
            ))}
          </div>
          <button
            onClick={() => {
              dropYellowMeteor(6);
              setYellowDropped(yellowDropped + 1);
            }}
          >
            YELLOW BOTTOM
          </button>
        </div>
        <div>
          <h1 className="mb-4 text-center text-base font-medium text-gray-900 sm:text-3xl">
            Mech Start
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                start();
                setYellowDropped(yellowDropped + 1);
              }}
            >
              START
            </button>
            <button
              onClick={() => {
                resetGame();
                setYellowDropped(0);
              }}
            >
              RESET
            </button>
          </div>
          <h1 className="mb-4 mt-6 text-center text-base font-medium text-gray-900 sm:text-3xl">
            Blue Input
          </h1>
          <div className="grid w-3/4 grid-cols-4">
            {Array.from({ length: nextBlueCount }, (_, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-xs text-gray-700 ${
                  i < blueInput.length ? "border-2 border-blue-600" : undefined
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <h1 className="mb-4 mt-6 text-center text-base font-medium text-gray-900 sm:text-3xl">
            Yellow Meteor
          </h1>
          <div className="grid w-3/4 grid-cols-4">
            {Array.from(YELLOW_THRESHOLD, (_, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200 text-xs text-gray-700 ${
                  i < yellowDropped ? "border-2 border-yellow-600" : undefined
                }`}
              >
                {YELLOW_THRESHOLD[i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
