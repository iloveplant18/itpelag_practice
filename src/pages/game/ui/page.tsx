import Tooltip from "./tooltip";
import Gameboard from "./gameboard";

export default function GamePage() {

  return (
    <section className="content-padding flex flex-col">
      <Tooltip className="w-fit self-end" />
      <Gameboard />
    </section>
  );
}
