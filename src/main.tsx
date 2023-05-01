import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameInteractionProvider } from "./components/particles/context/game-interaction.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameInteractionProvider>
      <App />
    </GameInteractionProvider>
  </React.StrictMode>
);
