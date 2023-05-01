import { Tile } from "../../types/game";

interface Props {
  tile: Tile;
  onClick: Function;
}

export default ({ tile, onClick }: Props) => {
  return (
    <a
      className="flex aspect-square cursor-pointer select-none flex-col items-center justify-center border-2 border-current"
      onClick={() => onClick()}
    >
      <div className="grid h-full w-full rotate-45 grid-rows-3 place-items-center">
        <span>{tile.clock}</span>
        <div>
          <div className="grid w-1/2 grid-cols-2 place-items-center">
            {tile.placement?.map((meteor) => (
              <div
                className={`ml-2 flex h-6 w-6 items-center justify-center rounded-full ${
                  meteor.type === "YELLOW" ? "bg-yellow-200" : "bg-blue-200"
                } text-xs text-gray-700`}
              >
                {meteor.order}
              </div>
            ))}
          </div>
        </div>
        <div>timer</div>
      </div>
    </a>
  );
};
