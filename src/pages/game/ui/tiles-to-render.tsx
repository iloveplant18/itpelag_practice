import { GameSettings } from "@/features/game-settings";
import type {
  AnimationInfo,
  GameInfo,
  GameSnapshot,
  Tile as TileType,
} from "@/pages/game/lib/types.ts";
import { gameInfoContext } from "@/pages/game/model/game-provider.tsx";
import Tile from "@/pages/game/ui/tile.tsx";
import { ReactElement, useContext } from "react";
import { gameSettingsContext } from "@/features/game-settings";

type MoveInfo = {
  xShift: number;
  yShift: number;
};

type TileWithAnimationInfo = {
  tileInfo: TileType;
  animationInfo: AnimationInfo;
};

type TileOptions = {
  size: number;
};

const animationDuration = 100;

const createdAnimationInfo: AnimationInfo = {
  keyframes: [{ scale: 0.5 }, { scale: 1.1 }, { scale: 1 }],
  options: {
    duration: animationDuration * 2,
    delay: 100,
  },
};

const initialGameSnapshot: GameSnapshot = {
  tiles: [],
  gameStatus: "start",
  moveDirection: "up",
};

export default function TilesToRender() {
  const { history, currentHistoryIndex } = useContext(
    gameInfoContext,
  ) as GameInfo;
  const { boardSize } = useContext(gameSettingsContext) as GameSettings;

  const tileSize = 100 / boardSize;
  const tileOptions = { size: tileSize };
  const previousHistoryIndex = currentHistoryIndex - 1;

  const previousGameSnapshot: GameSnapshot =
    history[previousHistoryIndex] ?? initialGameSnapshot;
  const currentGameSnapshot: GameSnapshot =
    history[currentHistoryIndex] ?? initialGameSnapshot;

  const tilesWithAnimations = getTilesWithAnimation(
    previousGameSnapshot,
    currentGameSnapshot,
  );

  return createTilesComponents(tilesWithAnimations, tileOptions);
}

function getTilesWithAnimation(
  previousGameSnapshot: GameSnapshot,
  currentGameSnapshot: GameSnapshot,
): TileWithAnimationInfo[] {
  let result: TileWithAnimationInfo[] = [];

  for (const tileInfo of currentGameSnapshot.tiles) {
    const correspondingTileFromPreviousSnapshot = getTileById(
      tileInfo.id,
      previousGameSnapshot.tiles,
    );
    //created tile
    if (!correspondingTileFromPreviousSnapshot) {
      result.push({
        tileInfo,
        animationInfo: createdAnimationInfo,
      });
      continue;
    }
    const moveInfo: MoveInfo = {
      xShift:
        tileInfo.position.x - correspondingTileFromPreviousSnapshot.position.x,
      yShift:
        tileInfo.position.y - correspondingTileFromPreviousSnapshot.position.y,
    };
    // moved tile
    if (tileInfo.value === correspondingTileFromPreviousSnapshot.value) {
      result.push({
        tileInfo,
        animationInfo: {
          keyframes: [
            {
              translate: `${-moveInfo.xShift * 100}% ${-moveInfo.yShift * 100}%`,
              easing: "ease-in",
            },
            { translate: 0, easing: "ease-out" },
          ],
          options: {
            duration: animationDuration,
          },
        },
      });
      // updated and moved tile
    } else {
      result.push({
        tileInfo,
        animationInfo: {
          keyframes: [
            {
              translate: `${-moveInfo.xShift * 100}% ${-moveInfo.yShift * 100}%`,
            },
            { translate: 0, offset: 0.6, easing: "ease-out" },
            { scale: 1.1, offset: 0.8, easing: "ease-in" },
            { scale: 1, easing: "ease-out", offset: 1 },
          ],
          options: {
            duration: animationDuration + (animationDuration * 2) / 3,
          },
        },
      });
    }
  }

  // deleted tiles
  const deletedTiles = getDeletedTilesWithAnimation(
    previousGameSnapshot.tiles,
    currentGameSnapshot.tiles,
  );
  result = result.concat(deletedTiles);
  return result;
}

function getTileById(id: number, tilesArray: TileType[]) {
  for (let tile of tilesArray) {
    if (tile.id === id) return tile;
  }
  return false;
}

function getDeletedTilesWithAnimation(
  previousTiles: TileType[],
  currentTiles: TileType[],
): TileWithAnimationInfo[] {
  const deletedTiles = previousTiles.filter(
    (previousTile) =>
      !currentTiles.find((currentTile) => currentTile.id === previousTile.id),
  );
  return deletedTiles.map((deletedTile) => {
    const mergerTile = currentTiles.find((tile) =>
      tile.mergeHistory.includes(deletedTile.id),
    ) as TileType;
    const moveInfo: MoveInfo = {
      xShift: mergerTile.position.x - deletedTile.position.x,
      yShift: mergerTile.position.y - deletedTile.position.y,
    };
    return {
      tileInfo: deletedTile,
      animationInfo: {
        keyframes: [
          {
            translate: `${-moveInfo.xShift * 100}% ${-moveInfo.yShift * 100}%`,
            easing: "ease-in",
          },
          { translate: 0, offset: 0.95, easing: "ease-out" },
          { opacity: 0 },
        ],
        options: {
          duration: animationDuration,
          fill: "forwards",
        },
      },
    };
  });
}

function createTilesComponents(
  tiles: TileWithAnimationInfo[],
  tileOptions: TileOptions,
): ReactElement[] {
  return tiles.map((tile) => (
    <Tile
      keyframes={tile.animationInfo.keyframes}
      animationOptions={tile.animationInfo.options}
      size={tileOptions.size}
      key={tile.tileInfo.id}
      value={tile.tileInfo.value}
      position={tile.tileInfo.position}
    />
  ));
}
