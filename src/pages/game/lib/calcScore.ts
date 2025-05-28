import type {Tile} from "@/pages/game/lib/types";

export default function calcScore(tiles?: Tile[]) {
  return tiles ? tiles.reduce((sum, tile) => sum + tile.value, 0) : 0; 
}
  
