import { useEffect, useContext } from "react";
import { gameActionsContext } from "@/pages/game/model/game-provider.tsx";
import type { GameActions } from "@/pages/game/lib/types.ts";

export default function useKeyboardControl() {
  const { move } = useContext(gameActionsContext) as GameActions;

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      switch (event.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  });
}
