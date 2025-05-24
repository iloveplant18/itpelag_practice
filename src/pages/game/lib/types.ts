
export type Position = {
  x: number;
  y: number;
}

export type Tile = {
  id: number;
  value: number;
  position: Position;
};

export type GameStatus = "start" | "play" | "game over";

export type GameInfo = {
  history: GameSnapshot[];
  currentHistoryIndex: number;
  gameStatus: GameStatus;
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