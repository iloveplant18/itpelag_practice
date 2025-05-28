import Routing from "@/app/routing/routing";
import GameSettingsProvider from "@/features/game-settings/model/game-settings-provider.tsx";

export default function App() {

  return (
    <GameSettingsProvider>
      <Routing /> 
    </GameSettingsProvider>
  )
}
