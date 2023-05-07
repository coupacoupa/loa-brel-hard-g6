import BoardTemplate from "./components/templates/board.template";
import ControlsTemplate from "./components/templates/controls.template";
import NavbarTemplate from "./components/templates/navbar.template";

function App() {
  return (
    <div className="h-full">
      <NavbarTemplate />
      <div className="flex w-full flex-col items-center justify-center gap-10 space-y-24 px-8 pt-20">
        <div className="grid grid-cols-3 gap-12">
          <BoardTemplate />
          <ControlsTemplate />
        </div>
      </div>
    </div>
  );
}

export default App;
