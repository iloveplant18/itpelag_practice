import {ReactNode, StyleHTMLAttributes, useContext, useEffect, useRef} from "react";
import {gameInfoContext} from "@/pages/game/model/game-provider.tsx";
import type {GameInfo, Tile as TileType} from "@/pages/game/lib/types.ts";
import Tile from "@/pages/game/ui/tile.tsx";

type MoveInfo = {
  xShift: number;
  yShift: number;
}

type TileWithMoveInfo = {
  tileInfo: TileType,
  moveInfo: MoveInfo
};

export default function TilesToRender() {
  const {history, currentHistoryIndex} = useContext(gameInfoContext) as GameInfo;

  const previousHistoryIndex = useRef(currentHistoryIndex);

  useEffect(() => {
    previousHistoryIndex.current = currentHistoryIndex;
  }, [currentHistoryIndex])

  const previousHistorySnapshot = history[previousHistoryIndex.current];
  const currentHistorySnapshot = history[currentHistoryIndex];

  if (!currentHistorySnapshot)
    return [];

  if (!previousHistorySnapshot)
    return createTilesToRenderWithAnimation(currentHistorySnapshot, "none");

  const createdTiles = findCreatedTiles(currentHistorySnapshot, previousHistorySnapshot);
  const movedTilesWithMoveInfo = findMovedTilesAndCalcMoveInfo(currentHistorySnapshot, previousHistorySnapshot);
  const createdTilesToRender = createTilesToRenderWithAnimation(createdTiles, "create");
  const movedTilesToRender = createTilesToRenderWithAnimation(movedTilesWithMoveInfo, "move")

  return [...createdTilesToRender, ...movedTilesToRender] as ReactNode[];
}


function findCreatedTiles(currentHistorySnapshot: TileType[], previousHistorySnapshot: TileType[]): TileType[] {
  return currentHistorySnapshot.filter(
    currentTile => !previousHistorySnapshot.find(previousTile => previousTile.id === currentTile.id)
  );
}

function findMovedTilesAndCalcMoveInfo(
  currentHistorySnapshot: TileType[],
  previousHistorySnapshot: TileType[],
): TileWithMoveInfo[] {
  return currentHistorySnapshot.map(
    currentTile => {
      const correspondingPreviousTile = previousHistorySnapshot.find(previousTile => previousTile.id === currentTile.id);
      if (!correspondingPreviousTile) return null;
      const moveInfo = {
        xShift: currentTile.position.x - correspondingPreviousTile.position.x,
        yShift: currentTile.position.y - correspondingPreviousTile.position.y,
      }
      if (moveInfo.xShift === 0 && moveInfo.yShift === 0) return null;
      return {
        tileInfo: currentTile,
        moveInfo
      }
    }
  ).filter(tile => tile != null);
}


function createTilesToRenderWithAnimation(tiles: TileWithMoveInfo[], animationType: "move"): ReactNode[];
function createTilesToRenderWithAnimation(tiles: TileType[], animationType: "create" | "none"): ReactNode[];
function createTilesToRenderWithAnimation(tiles: TileType[] | TileWithMoveInfo[], animationType: "move" | "create" | "none") {
  if (animationType === "move") {
    const tilesInfo = (tiles as TileWithMoveInfo[]).map(value => value.tileInfo);
    const moveInfo = (tiles as TileWithMoveInfo[]).map(value => value.moveInfo)
    return tilesInfo.map((tile, i) => (
      <Tile
        className="animate-move"
        style={{
          "--x-shift": -moveInfo[i].xShift,
          "--y-shift": -moveInfo[i].yShift,
        } as StyleHTMLAttributes<HTMLElement>}
        key={tile.id}
        value={tile.value}
        position={tile.position}
      />
    ))
  }
  return (tiles as TileType[]).map((tile) => (
    <Tile
      className={animationType === "create" ? "animate-create" : ""}
      key={tile.id}
      value={tile.value}
      position={tile.position}
    />
  ));
}
