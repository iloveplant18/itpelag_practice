import { gameInfoContext } from "@/pages/game/model/game-provider";
import type { GameInfo } from "@/pages/game/lib/types.ts";
import { useContext } from "react";
import calcScore from "@/pages/game/lib/calcScore.ts";

export default function GameOverBlanket() {
  const { history, currentHistoryIndex } = useContext(
    gameInfoContext,
  ) as GameInfo;

  const score = calcScore(history[currentHistoryIndex]?.tiles);

  return (
    <div className="glass bg-foreground/40 text-background absolute inset-0 grid place-items-center rounded-md text-center font-bold uppercase duration-(--animation-duration) starting:opacity-0">
      <div>
        <span className="text-4xl">
          game over
          <br />
        </span>
        <span className="text-2xl">your score:{" " + score}</span>
      </div>
    </div>
  );
}
