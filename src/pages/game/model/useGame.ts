import {useRef, useState} from "react";
import type {Tile, GameStatus, Position} from "@/pages/game/lib/types";
import {NeverError} from "@/shared/lib";

type GroupedTiles = Record<number, Tile[]>;
import {boardSize} from "@/pages/game/lib/consts";

export default function useGame() {
  const [history, setHistory] = useState<Tile[][]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1);
  const [gameStatus, setGameStatus] = useState<GameStatus>("start");
  const tilesId = useRef<number>(0);

  function startGame() {
    const startTiles = createStartTiles();
    setHistory([startTiles]);
    setCurrentHistoryIndex(0);
    setGameStatus("play");
  }

  function loseGame() {
    setGameStatus("game over");
  }

  function createStartTiles(): Tile[] {
    const firstTile = createTileAtRandomFreePosition([]);
    const secondTile = createTileAtRandomFreePosition([]);
    return [firstTile, secondTile];
  }

  function createTileAtRandomFreePosition(tiles: Tile[]): Tile {
    const occupiedPositions = tiles.map(tile => tile.position);
    const freePosition = findRandomFreePosition(occupiedPositions);
    if (!freePosition) {
      loseGame();
      throw new Error("No free position");
    }
    return {
      id: tilesId.current++,
      value: 2,
      position: freePosition,
    }
  }

  function findRandomFreePosition(occupiedPositions: Position[]): Position | undefined {
    const freePositions: Position[] = [];

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const position = {x: i, y: j};
        if (checkIsPositionOccupied(position, occupiedPositions))
          continue;
        freePositions.push(position);
      }
    }

    const randomPositionIndex = Math.floor(Math.random() * freePositions.length);
    return freePositions[randomPositionIndex];
  }

  function checkIsPositionOccupied(position: Position, occupiedPositions: Position[]) {
    for (const i of occupiedPositions) {
      if (position.x === i.x && position.y === i.y)
        return true;
    }
    return false;
  }

  function move(direction: "up" | "left" | "right" | "down") {
    const groupingTarget = direction === "up" || direction === "down" ? "column" : "row";
    let groupedTiles = groupTilesBy(history[currentHistoryIndex], groupingTarget);
    groupedTiles = mergeTilesWithSameValues(groupedTiles);
    switch (direction) {
      case "up":
        groupedTiles = moveTilesUp(groupedTiles);
        break;
      case "left":
        groupedTiles = moveTilesLeft(groupedTiles);
        break;
      case "right":
        groupedTiles = moveTilesRight(groupedTiles);
        break;
      case "down":
        groupedTiles = moveTilesDown(groupedTiles);
        break;
      default:
        throw new NeverError(direction);
    }
    const tiles = degroupTiles(groupedTiles);
    try {
      const newTile = createTileAtRandomFreePosition(tiles);
      tiles.push(newTile);
      const newHistory = [...history.slice(0, currentHistoryIndex + 1), tiles];
      setHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);
    } catch (e) {
      console.log(e);
    }
  }

  function groupTilesBy(tiles: Tile[], groupingTarget: "column" | "row") {
    const groupingProperty = groupingTarget === "column" ? "x" : "y";
    const groupedTiles: GroupedTiles = Object.groupBy(tiles, (tile) => tile.position[groupingProperty]);
    const sortingProperty = groupingProperty === "x" ? "y" : "x";
    for (const i in groupedTiles) {
      groupedTiles[i].sort((a: Tile, b: Tile) => a.position[sortingProperty] - b.position[sortingProperty]);
    }
    return groupedTiles;
  }

  function mergeTilesWithSameValues(groupedTiles: GroupedTiles) {
    for (const i in groupedTiles) {
      while (true) {
        const neighbors = getIndexesOfNeighborsWithSameValue(groupedTiles[i]);
        if (neighbors) {
          groupedTiles[i].splice(neighbors[1], 1);
          groupedTiles[i][neighbors[0]] = {
            ...groupedTiles[i][neighbors[0]],
            value: groupedTiles[i][neighbors[0]].value * 2
          };
          continue;
        }
        break;
      }
    }
    return groupedTiles;
  }

  function getIndexesOfNeighborsWithSameValue(tiles: Tile[]): [number, number] | undefined {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i].value === tiles[i + 1].value) {
        return [i, i + 1];
      }
    }
  }

  function degroupTiles(groupedTiles: GroupedTiles) {
    const result = [];
    for (const i in groupedTiles) {
      for (const tile of groupedTiles[i]) {
        result.push(tile);
      }
    }
    return result;
  }

  function moveTilesUp(groupedTiles: GroupedTiles) {
    for (const i in groupedTiles) {
      for (let j = 0; j < groupedTiles[i].length; j++) {
        groupedTiles[i][j] = {
          ...groupedTiles[i][j],
          position: {
            x: groupedTiles[i][j].position.x,
            y: j,
          }
        }
      }
    }
    return groupedTiles;
  }

  function moveTilesLeft(groupedTiles: GroupedTiles) {
    for (const i in groupedTiles) {
      for (let j = 0; j < groupedTiles[i].length; j++) {
        groupedTiles[i][j] = {
          ...groupedTiles[i][j],
          position: {
            x: j,
            y: groupedTiles[i][j].position.y,
          }
        }
      }
    }
    return groupedTiles;
  }

  function moveTilesRight(groupedTiles: GroupedTiles) {
    for (const i in groupedTiles) {
      for (let j = 0; j < groupedTiles[i].length; j++) {
        groupedTiles[i].reverse();
        groupedTiles[i][j] = {
          ...groupedTiles[i][j],
          position: {
            x: boardSize - j - 1,
            y: groupedTiles[i][j].position.y,
          }
        }
        groupedTiles[i].reverse();
      }
    }
    return groupedTiles;
  }

  function moveTilesDown(groupedTiles: GroupedTiles) {
    for (const i in groupedTiles) {
      for (let j = 0; j < groupedTiles[i].length; j++) {
        groupedTiles[i].reverse();
        groupedTiles[i][j] = {
          ...groupedTiles[i][j],
          position: {
            x: groupedTiles[i][j].position.x,
            y: boardSize - j - 1,
          }
        }
        groupedTiles[i].reverse();
      }
    }
    return groupedTiles;
  }

  return {history, currentHistoryIndex, gameStatus, startGame, move, setCurrentHistoryIndex};
}
