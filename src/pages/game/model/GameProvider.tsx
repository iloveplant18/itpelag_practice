import { createContext } from "react";

const gameInfoContext = createContext(initialGameInfo);

const initialGameInfo = {
  gameStatus: "start",
  tiles: [],
}

const initialGameControl = {

}