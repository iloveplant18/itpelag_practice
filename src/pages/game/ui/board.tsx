import {useContext} from "react";
import {boardSize} from "@/pages/game/lib/consts.ts";
import type {GameInfo, GameStatus} from "@/pages/game/lib/types.ts";
import {gameInfoContext} from "@/pages/game/model/game-provider.tsx";
import TilesToRender from "@/pages/game/ui/tiles-to-render.tsx";
import GameOverBlanket from "@/pages/game/ui/game-over-blanket.tsx";

export default function Board() {
  const {history, currentHistoryIndex} = useContext(gameInfoContext) as GameInfo;

  const gameStatus: GameStatus = history[currentHistoryIndex]?.gameStatus ?? "start";2

  return (
    <div>
      <div className="relative">
        <div
          className={`relative grid border-border border-t border-l ${gameStatus === 'game over' && 'animate-scale-down'}`}
          style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`, gridTemplateRows: `repeat(${boardSize}, 1fr)`}}
        >
          <TilesToRender />
          {(Array(boardSize ** 2).fill(0).map((_, i) => (
            <div className="w-full aspect-square border-b border-r border-border" key={i}></div>
          )))}
        </div>
        
        {gameStatus === 'game over' && (
          <GameOverBlanket />
        )}
      </div>
    </div>
  );
}
