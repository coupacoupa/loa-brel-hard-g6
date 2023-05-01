import "./App.css";
import TileAtom from "./components/atoms/tile.atom";
import useGameInteraction from "./components/particles/hooks/useGameInteraction";

function App() {
  const { tiles, reset } = useGameInteraction();

  const onClick = () => {
    console.log("hello world");
  };

  return (
    <div className="grid -rotate-45 transform grid-cols-3 gap-2">
      {Object.values(tiles)
        .sort((a, b) => a.order - b.order)
        .map((tile, i) => (
          <div key={i} className="rotate-45 transform">
            <TileAtom
              text={`${tile.clock} - ${tile.health}`}
              onClick={onClick}
            />
          </div>
        ))}
    </div>
  );
}

export default App;
