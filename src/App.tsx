import "./App.css";
import TileMolecule from "./components/molecules/tile.molecule";
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

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 space-y-24 px-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-full w-full grid-rows-3 gap-2">
          <button onClick={() => dropYellowMeteor(2)}>YELLOW TOP</button>
          <div className="m-20 grid -rotate-45 grid-cols-3 gap-2">
            {Object.values(tiles).map((tile: Tile, i) => (
              <TileMolecule key={i} tile={tile} />
            ))}
          </div>
          <button onClick={() => dropYellowMeteor(6)}>YELLOW BOTTOM</button>
        </div>
        <div>
          <h1 className="mb-4 text-center text-base font-medium text-gray-900 sm:text-3xl">
            Mech Start
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => start()}>START</button>
            <button onClick={() => resetGame()}>RESET</button>
          </div>
          <h1 className="mb-4 mt-6 text-center text-base font-medium text-gray-900 sm:text-3xl">
            Blue Input
          </h1>
          <div className="grid w-3/4 grid-cols-4">
            {Array.from({ length: nextBlueCount }, (_, i) => (
              <div
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-xs text-gray-700 ${
                  i < blueInput.length ? "border-2 border-blue-600" : undefined
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
