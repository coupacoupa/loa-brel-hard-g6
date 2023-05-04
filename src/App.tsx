import { useState } from "react";
import TileMolecule from "./components/molecules/tile.molecule";
import { YELLOW_THRESHOLD } from "./components/particles/constants/game.constant";
import { useGameInteraction } from "./components/particles/context/game-interaction.context";
import { Tile } from "./components/particles/types/game";
import NavbarOrganism from "./components/organism/navbar.organism";
import ButtonAtom from "./components/atoms/button.atom";
import IndicatorAtom from "./components/atoms/indicator.atom";

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
    <div className="h-full bg-white">
      <NavbarOrganism />
      <div className="flex w-full flex-col items-center justify-center gap-10 space-y-24 px-8 pt-20">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 flex h-full w-full grid-rows-3 flex-col items-center justify-center gap-2">
            <ButtonAtom
              text="YELLOW TOP"
              type="btn-accent"
              onClick={() => {
                dropYellowMeteor(2);
                setYellowDropped(yellowDropped + 1);
              }}
            />
            <div className="m-20 grid -rotate-45 grid-cols-3 gap-2">
              {Object.values(tiles).map((tile: Tile, i) => (
                <TileMolecule key={i} tile={tile} />
              ))}
            </div>
            <ButtonAtom
              text="YELLOW BOTTOM"
              type="btn-accent"
              onClick={() => {
                dropYellowMeteor(6);
                setYellowDropped(yellowDropped + 1);
              }}
            />
          </div>
          <div>
            <h1 className="mb-4 text-center text-base font-medium text-gray-900 sm:text-3xl">
              Mech Start
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <ButtonAtom
                text="START"
                type="btn-primary"
                onClick={() => {
                  start();
                  setYellowDropped(yellowDropped + 1);
                }}
              />
              <ButtonAtom
                text="RESET"
                type="btn-primary"
                onClick={() => {
                  resetGame();
                  setYellowDropped(0);
                }}
              />
            </div>
            <h1 className="mb-4 mt-6 text-center text-base font-medium text-gray-900 sm:text-3xl">
              Blue Input
            </h1>
            <div className="grid w-3/4 grid-cols-4">
              {Array.from({ length: nextBlueCount }, (_, i) => (
                <IndicatorAtom
                  key={i}
                  size={8}
                  background="blue"
                  border={i < blueInput.length ? "blue" : undefined}
                  text={i + 1}
                />
              ))}
            </div>
            <h1 className="mb-4 mt-6 text-center text-base font-medium text-gray-900 sm:text-3xl">
              Yellow Meteor
            </h1>
            <div className="grid w-3/4 grid-cols-4">
              {Array.from(YELLOW_THRESHOLD, (_, i) => (
                <IndicatorAtom
                  key={i}
                  size={8}
                  background="yellow"
                  border={i < yellowDropped ? "yellow" : undefined}
                  text={YELLOW_THRESHOLD[i]}
                />
              ))}
            </div>
            <h1 className="mb-4 mt-6 text-center text-base font-medium text-gray-900 sm:text-3xl">
              How to use
            </h1>
            <div>
              <ol>
                <li>1) Click start when yellow meteor first drops</li>
                <li>2) Click on tile to drop blue meteor</li>
                <li>
                  3) Blue Input on right panel indicates <br />
                  how many blue meteor to drop
                </li>
                <li>5) Click yellow buttons to drop yellow meteor</li>
                <li>6) Click reset to reset to first step</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
