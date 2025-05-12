import {
  Tooltip as LibTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";
import {
  Info,
  SquareArrowUp,
  SquareArrowRight,
  SquareArrowDown,
  SquareArrowLeft,
} from "lucide-react";
import {HTMLAttributes} from "react";

export default function Tooltip({className}: HTMLAttributes<HTMLDivElement>) {
  return (
    <TooltipProvider>
      <LibTooltip>
        <TooltipTrigger className={className}>
          <Info size={16}/>
        </TooltipTrigger>
        <TooltipContent>
          <p className="align-middle">
            Используйте клавиши{" "}
            <span className="inline-flex gap-x-1">
              <SquareArrowUp/> <SquareArrowLeft/> <SquareArrowRight/>{" "}
              <SquareArrowDown/>
            </span><br/>
            для перемещения тайлов
          </p>
        </TooltipContent>
      </LibTooltip>
    </TooltipProvider>
  );
}
