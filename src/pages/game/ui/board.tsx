import {useContext} from "react";
import {boardSize} from "@/pages/game/lib/consts.ts";
import type {GameInfo} from "@/pages/game/lib/types.ts";
import {gameInfoContext} from "@/pages/game/model/game-provider.tsx";
import TilesToRender from "@/pages/game/ui/tiles-to-render.tsx";

export default function Board() {
  const {gameStatus} = useContext(gameInfoContext) as GameInfo;

  return (
    <div>
      <div
        className="relative grid border-border border-t border-l"
        style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`, gridTemplateRows: `repeat(${boardSize}, 1fr)`}}
      >
        {gameStatus === "play" && <TilesToRender />}
        {gameStatus === 'play' && (Array(boardSize ** 2).fill(0).map((_, i) => (
          <div className="w-full aspect-square border-b border-r border-border" key={i}></div>
        )))
        }
      </div>
      {gameStatus === "game over" && <div>game over</div>}
    </div>
  );
}
