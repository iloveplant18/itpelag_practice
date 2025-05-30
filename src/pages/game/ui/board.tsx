import { useContext } from "react";
import type { GameInfo, GameStatus } from "@/pages/game/lib/types.ts";
import { gameInfoContext } from "@/pages/game/model/game-provider.tsx";
import TilesToRender from "@/pages/game/ui/tiles-to-render.tsx";
import GameOverBlanket from "@/pages/game/ui/game-over-blanket.tsx";
import { gameSettingsContext } from "@/features/game-settings";

export default function Board() {
  const { history, currentHistoryIndex } = useContext(
    gameInfoContext,
  ) as GameInfo;
  const { boardSize } = useContext(gameSettingsContext) as GameSettings;

  const gameStatus: GameStatus =
    history[currentHistoryIndex]?.gameStatus ?? "start";
  2;

  return (
    <div>
      <div className="relative">
        <div
          className={`border-border relative grid border-t border-l ${gameStatus === "game over" && "animate-scale-down"}`}
          style={{
            gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
            gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          }}
        >
          <TilesToRender />
          {Array(boardSize ** 2)
            .fill(0)
            .map((_, i) => (
              <div
                className="border-border aspect-square w-full border-r border-b"
                key={i}
              ></div>
            ))}
        </div>

        {gameStatus === "game over" && <GameOverBlanket />}
      </div>
    </div>
  );
}
