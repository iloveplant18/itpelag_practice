import { useState, useMemo, useCallback, useContext } from "react";
import type { Tile, Position, GameStatus } from "@/pages/game/lib/types";
import { NeverError } from "@/shared/lib";
import type {
  GameActions,
  GameInfo,
  GameSnapshot,
  MoveDirection,
} from "@/pages/game/lib/types";
import { gameSettingsContext } from "@/features/game-settings";
import { GameSettings } from "@/features/game-settings";

type GroupedTiles = Record<number, Tile[]>;
let tilesId = 0;

export default function useGame() {
  const [history, setHistory] = useState<GameSnapshot[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1);
  const { boardSize } = useContext(gameSettingsContext) as GameSettings;

  const move = useCallback(
    (moveDirection: MoveDirection) => {
      const groupingTarget =
        moveDirection === "up" || moveDirection === "down" ? "column" : "row";
      let groupedTiles = groupTilesBy(
        history[currentHistoryIndex].tiles,
        groupingTarget,
      );
      groupedTiles = mergeTilesWithSameValues(groupedTiles);
      switch (moveDirection) {
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
          throw new NeverError(moveDirection);
      }
      const tiles = degroupTiles(groupedTiles);
      const newTile = createTileAtRandomFreePosition(tiles);
      let gameStatus: GameStatus = "play";
      if (!newTile) {
        gameStatus = "game over";
      } else {
        tiles.push(newTile);
      }
      const newGameSnapshot: GameSnapshot = {
        tiles,
        gameStatus,
        moveDirection,
      };
      const newHistory = [
        ...history.slice(0, currentHistoryIndex + 1),
        newGameSnapshot,
      ];
      setHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);

      // moving tiles
      function groupTilesBy(tiles: Tile[], groupingTarget: "column" | "row") {
        const groupingProperty = groupingTarget === "column" ? "x" : "y";
        const groupedTiles: GroupedTiles = Object.groupBy(
          tiles,
          (tile) => tile.position[groupingProperty],
        ) as GroupedTiles;
        const sortingProperty = groupingProperty === "x" ? "y" : "x";
        for (const i in groupedTiles) {
          groupedTiles[i].sort(
            (a: Tile, b: Tile) =>
              a.position[sortingProperty] - b.position[sortingProperty],
          );
        }
        return groupedTiles;
      }

      function mergeTilesWithSameValues(groupedTiles: GroupedTiles) {
        for (const i in groupedTiles) {
          for (let j = 0; j < groupedTiles[i].length - 1; j++) {
            if (groupedTiles[i][j].value === groupedTiles[i][j + 1].value) {
              groupedTiles[i][j] = {
                ...groupedTiles[i][j],
                value: groupedTiles[i][j].value * 2,
                mergeHistory: [
                  ...groupedTiles[i][j].mergeHistory,
                  groupedTiles[i][j + 1].id,
                ],
              };
              groupedTiles[i].splice(j + 1, 1);
              continue;
            }
          }
        }
        return groupedTiles;
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
              },
            };
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
              },
            };
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
              },
            };
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
              },
            };
            groupedTiles[i].reverse();
          }
        }
        return groupedTiles;
      }
    },
    [history, currentHistoryIndex, boardSize],
  );

  // creating tiles

  const createTileAtRandomFreePosition = useCallback(
    (tiles: Tile[]): Tile | null => {
      const occupiedPositions = tiles.map((tile) => tile.position);
      const freePosition = findRandomFreePosition(occupiedPositions);
      if (!freePosition) {
        return null;
      }
      return {
        id: tilesId++,
        value: 2,
        position: freePosition,
        mergeHistory: [],
      };

      function findRandomFreePosition(
        occupiedPositions: Position[],
      ): Position | undefined {
        const freePositions: Position[] = [];

        for (let i = 0; i < boardSize; i++) {
          for (let j = 0; j < boardSize; j++) {
            const position = { x: i, y: j };
            if (checkIsPositionOccupied(position, occupiedPositions)) continue;
            freePositions.push(position);
          }
        }

        const randomPositionIndex = Math.floor(
          Math.random() * freePositions.length,
        );
        return freePositions[randomPositionIndex];
      }

      function checkIsPositionOccupied(
        position: Position,
        occupiedPositions: Position[],
      ) {
        for (const i of occupiedPositions) {
          if (position.x === i.x && position.y === i.y) return true;
        }
        return false;
      }
    },
    [boardSize],
  );

  const createStartGameSnapshot = useCallback((): GameSnapshot => {
    return {
      tiles: createStartTiles(),
      gameStatus: "play",
      moveDirection: "up",
    };

    function createStartTiles(): Tile[] {
      const firstTile = createTileAtRandomFreePosition([]) as Tile;
      const secondTile = createTileAtRandomFreePosition([]) as Tile;
      return [firstTile, secondTile];
    }
  }, [createTileAtRandomFreePosition]);

  const startGame = useCallback(() => {
    const startGameSnapshot = createStartGameSnapshot();
    setHistory([startGameSnapshot]);
    setCurrentHistoryIndex(0);
  }, [createStartGameSnapshot]);

  const moveUpInHistory = useCallback(() => {
    setCurrentHistoryIndex(Math.max(0, currentHistoryIndex - 1));
  }, [currentHistoryIndex]);

  const moveDownInHistory = useCallback(() => {
    setCurrentHistoryIndex(
      Math.min(history.length - 1, currentHistoryIndex + 1),
    );
  }, [currentHistoryIndex, history.length]);

  const gameActions: GameActions = useMemo(
    () => ({
      move,
      startGame,
      moveUpInHistory,
      moveDownInHistory,
    }),
    [move, startGame, moveUpInHistory, moveDownInHistory],
  );

  const gameInfo: GameInfo = useMemo(
    () => ({
      currentHistoryIndex,
      history,
    }),
    [currentHistoryIndex, history],
  );

  return { gameInfo, gameActions };
}
