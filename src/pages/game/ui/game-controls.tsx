import {gameActionsContext} from "@/pages/game/model/game-provider.tsx";
import {useContext} from "react";
import type {GameActions} from "@/pages/game/lib/types";
import {Button} from "@/shared/ui";

export default function GameControls() {
  const {move, moveDownInHistory, moveUpInHistory, startGame} = useContext(gameActionsContext) as GameActions;

  return (
    <>
      <Button onClick={() => move("up")}>up</Button>
      <Button onClick={() => move("left")}>left</Button>
      <Button onClick={() => move("right")}>right</Button>
      <Button onClick={() => move("down")}>down</Button>
      <br/>
      <Button onClick={startGame}>start</Button>
      <br/>
      <Button onClick={moveUpInHistory}>
        up in history
      </Button>
      <Button onClick={moveDownInHistory}>
        down in history
      </Button>
    </>
  )
}