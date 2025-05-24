import Tooltip from "./tooltip";
import Game from "./game.tsx";

export default function GamePage() {
  return (
    <section className="content-padding flex flex-col">
      <Tooltip className="w-fit self-end" />
      <Game />
    </section>
  );
}
