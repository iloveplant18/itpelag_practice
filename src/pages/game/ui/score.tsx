import { useContext } from "react";
import calcScore from "@/pages/game/lib/calcScore";
import { gameInfoContext } from "@/pages/game/model/game-provider";
import type { GameInfo } from "@/pages/game/lib/types.ts";

export default function Score() {
  const { history, currentHistoryIndex } = useContext(
    gameInfoContext,
  ) as GameInfo;

  const score = calcScore(history[currentHistoryIndex]?.tiles);
  const gameStatus = history[currentHistoryIndex]?.gameStatus;

  return (
    <div
      className={`text-chart-2 mt-2 text-center text-xl font-bold uppercase ${gameStatus !== "play" && "hidden"}`}
    >
      score: {score}
    </div>
  );
}
