import TileMolecule from "../molecules/tile.molecule";
import { Tile, Tiles } from "../particles/types/game";

interface Props {
  tiles: Tiles;
}

export default ({ tiles }: Props) => {
  return (
    <div className="grid -rotate-45 grid-cols-3 gap-2">
      {Object.values(tiles).map((tile: Tile, i) => (
        <TileMolecule key={i} tile={tile} />
      ))}
    </div>
  );
};
