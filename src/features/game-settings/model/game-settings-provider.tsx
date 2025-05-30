import { createContext, useState } from "react";
import type { GameSettings, GameSettingsActions } from "../lib/types";
import type { HTMLAttributes } from "react";

export const gameSettingsContext = createContext<GameSettings | null>(null);
export const gameSettingsActionsContext =
  createContext<GameSettingsActions | null>(null);

const initialBoardSize = 4;

export default function GameSettingsProvider({
  children,
}: HTMLAttributes<HTMLDivElement>) {
  const [boardSize, setBoardSize] = useState(initialBoardSize);

  const gameSettings: GameSettings = {
    boardSize: boardSize,
  };

  const gameSettingsActions: GameSettingsActions = {
    setBoardSize: setBoardSize,
  };

  return (
    <gameSettingsContext.Provider value={gameSettings}>
      <gameSettingsActionsContext.Provider value={gameSettingsActions}>
        {children}
      </gameSettingsActionsContext.Provider>
    </gameSettingsContext.Provider>
  );
}
