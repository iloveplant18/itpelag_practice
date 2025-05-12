import {cache, HTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";
import {Position} from "@/pages/game/lib/types.ts";


type TileProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  position: Position;
}

const calcStylesByValue = cache((value: number) => {
  const remainderFromDivision = value % 254;
  switch (remainderFromDivision) {
    case 2:
      return "bg-accent text-accent-foreground";
    case 4:
      return "bg-primary text-primary-foreground";
    case 8:
      return "bg-chart-1";
    case 16:
      return "bg-chart-2";
    case 32:
      return "bg-chart-3";
    case 64:
      return "bg-chart-4";
    case 128:
      return "bg-chart-5";
  }
})

export default function Tile({value, position, className, ...props}: TileProps) {
  return (
    <div
      className={twMerge(`absolute w-1/4 grid place-items-center aspect-square rounded-md border-border border ${calcStylesByValue(value)}`, className)}
      style={{top: `${25 * position.y}%`, left: `${25 * position.x}%`}}
      {...props}
    >
      {value}
    </div>
  )
}