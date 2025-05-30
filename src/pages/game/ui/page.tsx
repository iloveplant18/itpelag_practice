import Tooltip from "./tooltip";
import Game from "./game.tsx";

export default function GamePage() {
  return (
    <section className="content-padding flex flex-col">
      <Tooltip className="mb-5 w-fit self-end" />
      <Game />
    </section>
  );
}
