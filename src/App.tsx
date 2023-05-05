import { useEffect, useState } from "react";
import ButtonAtom from "./components/atoms/button.atom";
import IndicatorAtom from "./components/atoms/indicator.atom";
import TileMolecule from "./components/molecules/tile.molecule";
import { YELLOW_THRESHOLD } from "./components/particles/constants/game.constant";
import { useGameInteraction } from "./components/particles/context/game-interaction.context";
import { Tile } from "./components/particles/types/game";
import NavbarTemplate from "./components/templates/navbar.template";
import InfoTemplate from "./components/templates/info.template";
import { useTimer } from "./components/particles/hooks/useTimer";

function App() {
  const {
    tiles,
    resetGame,
    start,
    dropYellowMeteor,
    blueInput,
    nextBlueCount,
    placementClock,
  } = useGameInteraction();

  const [yellowDropped, setYellowDropped] = useState(0);
  const { startTimer, isActive } = useTimer(1);
  const [isAutocopy, setIsAutocopy] = useState(false);

  useEffect(() => {
    if (isAutocopy) {
      navigator.clipboard.writeText(placementClock.join(" "));
      startTimer();
    }
  }, [placementClock]);

  return (
    <div className="h-full">
      <NavbarTemplate />
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
          <div className="rounded-xl bg-info-content p-6">
            <InfoTemplate title="Mech Start">
              <div className="grid w-full grid-cols-2 gap-2">
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
            </InfoTemplate>
            <InfoTemplate title="Blue Input">
              <div className="grid w-3/4 grid-cols-4 place-items-center gap-2">
                {Array.from({ length: nextBlueCount }, (_, i) => (
                  <IndicatorAtom
                    key={i}
                    size={8}
                    background="blue"
                    focused={i < blueInput.length}
                    text={i + 1}
                  />
                ))}
              </div>
            </InfoTemplate>
            <InfoTemplate title="Yellow Meteor">
              <div className="grid w-3/4 grid-cols-4 place-items-center gap-2">
                {Array.from(YELLOW_THRESHOLD, (_, i) => (
                  <IndicatorAtom
                    key={i}
                    size={8}
                    background="yellow"
                    focused={i < yellowDropped}
                    text={YELLOW_THRESHOLD[i]}
                  />
                ))}
              </div>
            </InfoTemplate>
            <InfoTemplate title="Clipboard">
              <div>
                <div className="form-control grid w-full grid-cols-3 gap-2 ">
                  <div className="col-span-2">
                    <input
                      type="text"
                      className="input-bordered input w-full max-w-xs"
                      value={placementClock.join(" ")}
                      disabled
                    />
                    <label className="label cursor-pointer">
                      <span className="label-text">Enable Autocopy</span>
                      <input
                        type="checkbox"
                        className="toggle-primary toggle"
                        onChange={(e) => {
                          setIsAutocopy(e.target.checked);
                        }}
                      ></input>
                    </label>
                  </div>
                  <ButtonAtom
                    text={isActive ? "Copied" : "Copy"}
                    type="btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(placementClock.join(" "));
                      startTimer();
                    }}
                  />
                </div>
              </div>
            </InfoTemplate>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
