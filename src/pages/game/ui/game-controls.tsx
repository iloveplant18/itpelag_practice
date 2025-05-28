import {gameActionsContext, gameInfoContext} from "@/pages/game/model/game-provider.tsx";
import {useContext} from "react";
import type {GameActions, GameInfo} from "@/pages/game/lib/types";
import {Button} from "@/shared/ui";
import useKeyboardControl from "@/pages/game/model/useKeyboardControl.ts";


const GameControls = () => {
  const {startGame} = useContext(gameActionsContext) as GameActions;
  const {history, currentHistoryIndex} = useContext(gameInfoContext) as GameInfo;

  const gameStatus = history[currentHistoryIndex]?.gameStatus ?? 'start';
  
  useKeyboardControl();

  return (
    <div className="mt-2 flex flex-col items-stretch">
      {gameStatus !== 'play' && <Button className="uppercase" onClick={startGame}>start</Button>}
    </div>
  )
}

export default GameControls;
