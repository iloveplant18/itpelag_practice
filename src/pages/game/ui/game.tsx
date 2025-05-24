import Board from "@/pages/game/ui/board.tsx";
import GameProvider from "@/pages/game/model/game-provider";
import GameControls from "@/pages/game/ui/game-controls";

export default function Game() {
  return (
    <GameProvider>
      <Board />
      <GameControls />
      {/*<KeyboardEventHandler />*/}
    </GameProvider>
  )
}
