import useGame from "@/pages/game/model/useGame";
import {Button} from "@/shared/ui";
import {boardSize} from "@/pages/game/lib/consts";
import {useRef, ReactNode, useEffect} from "react";
import Tile from "@/pages/game/ui/tile";
import type {Tile as TileType} from "@/pages/game/lib/types";

export default function Gameboard() {
  const {startGame, move, setCurrentHistoryIndex, history, currentHistoryIndex, gameStatus} = useGame();

  const previousHistoryIndex = useRef(currentHistoryIndex);

  function upInHistory() {
    setCurrentHistoryIndex(Math.max(currentHistoryIndex - 1, 0));
  }

  function downInHistory() {
    setCurrentHistoryIndex(Math.min(currentHistoryIndex + 1, history.length - 1));
  }

  useEffect(() => {
    previousHistoryIndex.current = currentHistoryIndex;
  }, [currentHistoryIndex])

  const tilesToRender = createTilesToRender(history[previousHistoryIndex.current], history[currentHistoryIndex]);

  return (
    <div className="">
      {(gameStatus === "start" || gameStatus === "game over") && <Button onClick={startGame}>startGame</Button>}
      <Button onClick={() => move("up")}>move up</Button>
      <Button onClick={() => move("left")}>move left</Button>
      <Button onClick={() => move("right")}>move right</Button>
      <Button onClick={() => move("down")}>move down</Button>
      <Button onClick={upInHistory}>up in history</Button>
      <Button onClick={downInHistory}>down in history</Button>
      <div className="relative grid border-border border-t border-l"
           style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`, gridTemplateRows: `repeat(${boardSize}, 1fr)`}}>
        {gameStatus === "play" && tilesToRender}
        {gameStatus === 'play' && (Array(boardSize ** 2).fill(0).map((_, i) => (
          <div className="w-full aspect-square border-b border-r border-border" key={i}></div>
        )))
        }
      </div>
      {gameStatus === "game over" && <div>game over</div>}
    </div>
  );
}

function createTilesToRender(
  previousHistorySnapshot: TileType[],
  currentHistorySnapshot: TileType[]
) {
  console.log(currentHistorySnapshot, previousHistorySnapshot);
  if (!currentHistorySnapshot) return [];
  if (!previousHistorySnapshot) return currentHistorySnapshot.map((tile) => <Tile key={tile.id} value={tile.value} position={tile.position} />);
  const createdTiles = currentHistorySnapshot.filter(
    currentTile => !previousHistorySnapshot.find(previousTile => previousTile.id === currentTile.id)
  );
  const tiles = createTilesToRenderWithAnimation(createdTiles, "create");
  const restTiles = createTilesToRenderWithAnimation(currentHistorySnapshot.filter(
    currentTile => previousHistorySnapshot.find(previousTile => previousTile.id === currentTile.id)
  ), "delete");
  return [...tiles, ...restTiles] as ReactNode[];
}

function createTilesToRenderWithAnimation(tiles: TileType[], animation: "delete" | "create") {
  return tiles.map((tile) => (
    <Tile className={animation === "create" ? "animate-create" : '' } key={tile.id} value={tile.value} position={tile.position} />
  ));
}