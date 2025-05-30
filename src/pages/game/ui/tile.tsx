import { GameSettings, gameSettingsContext } from "@/features/game-settings";
import { Position } from "@/pages/game/lib/types.ts";
import { cache, HTMLAttributes, useEffect, useRef, useContext } from "react";
import { twMerge } from "tailwind-merge";


type TileProps = HTMLAttributes<HTMLDivElement> & {
  keyframes?: Keyframe[];
  animationOptions?: KeyframeAnimationOptions;
  value: number;
  position: Position;
  size: number;
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

export default function Tile({keyframes, animationOptions, value, size, position, className, style, ...props}: TileProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && keyframes) {
      ref.current.animate(keyframes, animationOptions);
    }
  }, [keyframes, animationOptions]);

  return (
    <div
      className={twMerge(`absolute aspect-square grid place-items-center rounded-md border-border border ${calcStylesByValue(value)}`, className)}
      style={{
        width: `${size}%`,
        top: `${size * position.y}%`, 
        left: `${size * position.x}%`, 
        ...style
      }}
      ref={ref}
      {...props}
    >
      {value}
    </div>
  )
}