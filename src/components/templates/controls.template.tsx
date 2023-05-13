import { useEffect } from "react";
import ButtonAtom from "../atoms/button.atom";
import IndicatorAtom from "../atoms/indicator.atom";
import InfoOrganism from "../organism/info.organism";
import { YELLOW_THRESHOLD } from "../particles/constants/game.constant";
import { useGameInteraction } from "../particles/context/game-interaction.context";
import { useTimer } from "../particles/hooks/useTimer";

export default () => {
  const {
    game,
    meteor,
    recommendation,
    settings: { autocopy },
  } = useGameInteraction();
  const { startTimer, resetTimer, isActive } = useTimer(1);

  useEffect(() => {
    if (autocopy.value) {
      copyToClipboard();
    }
  }, [recommendation.clocks]);

  const copyToClipboard = () => {
    resetTimer();
    navigator.clipboard.writeText(recommendation.clocks.join(" "));
    startTimer();
  };

  return (
    <div className="rounded-xl bg-info-content p-6">
      <InfoOrganism title="Mech Start">
        <div className="grid w-full grid-cols-2 gap-2">
          <ButtonAtom
            text="START"
            type="btn-primary"
            disabled={game.isStarted}
            onClick={() => {
              game.start();
            }}
          />
          <ButtonAtom
            text="RESET"
            type="btn-primary"
            disabled={!game.isStarted}
            onClick={() => {
              game.reset();
            }}
          />
        </div>
      </InfoOrganism>
      <InfoOrganism title="Clipboard">
        <div>
          <div className="form-control grid w-full grid-cols-3 gap-2 ">
            <div className="col-span-2">
              <input
                type="text"
                className="input-bordered input w-full max-w-xs"
                value={recommendation.clocks.join(" ")}
                disabled
              />
              <label className="label cursor-pointer">
                <span className="label-text">Enable Autocopy</span>
                <input
                  type="checkbox"
                  className="toggle-primary toggle"
                  onChange={(e) => {
                    autocopy.setValue(e.target.checked);
                  }}
                ></input>
              </label>
            </div>
            <ButtonAtom
              text={isActive ? "Copied" : "Copy"}
              type="btn-primary"
              disabled={!game.isStarted}
              onClick={() => copyToClipboard()}
            />
          </div>
        </div>
      </InfoOrganism>
      <InfoOrganism title="Yellow Meteor">
        <div className="grid w-3/4 grid-cols-4 place-items-center gap-2">
          {Array.from(YELLOW_THRESHOLD, (_, i) => (
            <IndicatorAtom
              key={i}
              size={8}
              background="yellow"
              focused={i < meteor.yellow.count}
              text={YELLOW_THRESHOLD[i]}
            />
          ))}
        </div>
      </InfoOrganism>
      <InfoOrganism title="Blue Meteor">
        <div className="grid w-3/4 grid-cols-4 place-items-center gap-2">
          {Array.from({ length: meteor.blue.count }, (_, i) => (
            <IndicatorAtom
              key={i}
              size={8}
              background="blue"
              focused={i < meteor.blue.blueInput.length}
              text={i + 1}
            />
          ))}
        </div>
      </InfoOrganism>
      <InfoOrganism title="Blue Correction">
        <div className="grid w-full grid-cols-2 gap-2">
          <ButtonAtom
            text="UNDO"
            type="btn-primary"
            disabled={true}
            onClick={() => {
              game.start();
            }}
          />
          <ButtonAtom
            text={meteor.blue.additional.isAdditional ? "Cancel" : "+1"}
            type="btn-primary"
            disabled={!game.isStarted}
            onClick={() => {
              const {
                blue: {
                  additional: { isAdditional, setIsAdditional },
                },
              } = meteor;

              setIsAdditional(!isAdditional);
            }}
          />
        </div>
      </InfoOrganism>
    </div>
  );
};
