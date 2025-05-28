import {gameSettingsContext, gameSettingsActionsContext} from "@/features/game-settings/model/game-settings-provider.tsx";
import {useContext} from "react";
import type {GameSettings, GameSettingsActions} from "@/features/game-settings/lib/types.ts";

export default function Settings() {
  const {boardSize} = useContext(gameSettingsContext) as GameSettings;
  const {setBoardSize} = useContext(gameSettingsActionsContext) as GameSettingsActions;

  return (
    <div className="flex flex-col items-stretch">
      Settings
    </div>
  )
}
