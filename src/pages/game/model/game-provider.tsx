import type { GameActions, GameInfo } from "@/pages/game/lib/types";
import useGame from "@/pages/game/model/useGame";
import { createContext, HTMLAttributes } from "react";

export const gameInfoContext = createContext<GameInfo | null>(null);
export const gameActionsContext = createContext<GameActions | null>(null);

export default function GameProvider({
  children,
}: HTMLAttributes<HTMLElement>) {
  const { gameInfo, gameActions } = useGame();

  return (
    <gameInfoContext.Provider value={gameInfo}>
      <gameActionsContext.Provider value={gameActions}>
        {children}
      </gameActionsContext.Provider>
    </gameInfoContext.Provider>
  );
}
