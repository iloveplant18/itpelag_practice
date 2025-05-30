import {gameSettingsContext, gameSettingsActionsContext} from "@/features/game-settings/model/game-settings-provider.tsx";
import {useContext} from "react";
import type {GameSettings, GameSettingsActions} from "@/features/game-settings";
import {Input} from "@/shared/ui";

export default function Settings() {
  const {boardSize} = useContext(gameSettingsContext) as GameSettings;
  const {setBoardSize} = useContext(gameSettingsActionsContext) as GameSettingsActions;

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex justify-between items-center">
        <span>Board size</span>
        <Input className="w-15" value={boardSize} onChange={(event) => setBoardSize(+event.target.value)} />
      </div>
    </div>
  )
}
