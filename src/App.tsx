import "./App.css";
import TileMolecule from "./components/molecules/tile.molecule";
import useGameInteraction from "./components/particles/hooks/useGameInteraction";
import { Tile } from "./types/game";

function App() {
  const { tiles, reset, updateTileHealth } = useGameInteraction();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 space-y-24 px-8 py-32">
      <header className="body-font text-gray-600">
        <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
          <nav className="flex flex-wrap items-center justify-center text-base md:ml-4 md:py-1 md:pl-4">
            <a className="mr-5 ">212</a>
            <a className="mr-5 ">188</a>
            <a className="mr-5 ">137</a>
            <a className="mr-5 border-2">113</a>
            <a className="mr-5 ">87</a>
            <a className="mr-5 ">37</a>
            <a className="mr-5 ">28</a>
            <a className="mr-5 ">25</a>
            <a className="mr-5 ">7</a>
            <a className="mr-5 ">0</a>
          </nav>
          <button
            className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none md:mt-0"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </header>
      <div className="grid w-full grid-cols-2 place-items-center">
        <div className="grid w-80 -rotate-45 grid-cols-3 gap-2">
          {Object.values(tiles)
            .sort((a: Tile, b: Tile) => a.order - b.order)
            .map((tile: Tile, i) => (
              <TileMolecule
                key={i}
                tile={tile}
                onClick={() => updateTileHealth(tile.clock, -1)}
              />
            ))}
        </div>
        <div className="flex h-full flex-col gap-4">
          <div>Next Blue Meteor: {52} seconds</div>
          <div className="border">
            <h1 className="mb-4 text-center text-base font-medium text-gray-900 sm:text-3xl">
              Meteor
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <button>Drop Blue Recommended</button>
              <button>Drop Yellow Recommended</button>
              <button>Drop Yellow Manual</button>
              <button>Undo</button>
            </div>
          </div>
          <div className="border">
            <h1 className="mb-4 text-center text-base font-medium text-gray-900 sm:text-3xl">
              Mech Start
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <button>Dreamworld - Shapes</button>
              <button>Shandi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
