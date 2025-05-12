
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
