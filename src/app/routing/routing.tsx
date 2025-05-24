import MenuPage from "@/pages/menu";
import { HashRouter, Route, Routes } from "react-router";
import BaseLayout from "@/shared/ui/base-layout";
import GamePage from "@/pages/game";

export default function Routing() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
