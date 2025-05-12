import Tooltip from "./tooltip";
import Gameboard from "./gameboard";
import {Button} from "@/shared/ui";
import {useState} from "react";

export default function GamePage() {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <section className="content-padding flex flex-col">
      <Tooltip className="w-fit self-end" />
      <Gameboard />
      <Button onClick={() => setIsAnimated(!isAnimated)}>show create animation</Button>
      {isAnimated && <div className="w-10 aspect-square bg-chart-5 duration-500 animate-create"></div>}
    </section>
  );
}
