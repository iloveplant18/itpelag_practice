import Board from "@/pages/game/ui/board.tsx";
import GameProvider from "@/pages/game/model/game-provider";
import GameControls from "@/pages/game/ui/game-controls";
import Score from "@/pages/game/ui/score";
import {HTMLAttributes} from "react"

export default function Game({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <GameProvider>
        <Board />
        <Score />
        <GameControls />
      </GameProvider>
    </div>
  )
}
