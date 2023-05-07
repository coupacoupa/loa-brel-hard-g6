import ButtonAtom from "../atoms/button.atom";
import BoardOrganism from "../organism/board.organism";
import { useGameInteraction } from "../particles/context/game-interaction.context";

export default () => {
  const { tiles, meteor } = useGameInteraction();

  return (
    <div className="col-span-2 flex h-full w-full grid-rows-3 flex-col items-center justify-center gap-2">
      <ButtonAtom
        text="YELLOW TOP"
        type="btn-accent"
        onClick={() => {
          meteor.yellow.drop(2);
        }}
      />
      <div className="m-20">
        <BoardOrganism tiles={tiles} />
      </div>
      <ButtonAtom
        text="YELLOW BOTTOM"
        type="btn-accent"
        onClick={() => {
          meteor.yellow.drop(6);
        }}
      />
    </div>
  );
};
