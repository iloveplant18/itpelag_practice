
export type Position = {
  x: number;
  y: number;
}

type TileId = number;

export type Tile = {
  id: TileId;
  value: number;
  position: Position;
  mergeHistory: TileId[],
};

export type GameStatus = "start" | "play" | "game over";

export type GameInfo = {
  history: GameSnapshot[];
  currentHistoryIndex: number;
}

export type MoveDirection = "up" | "left" | "right" | "down";

export type GameSnapshot = {
  tiles: Tile[];
  gameStatus: GameStatus;
  moveDirection: MoveDirection;
}

export type GameActions = {
  move: (direction: MoveDirection) => void;
  startGame: () => void;
  moveUpInHistory: () => void;
  moveDownInHistory: () => void;
}

export type AnimationInfo = {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
}