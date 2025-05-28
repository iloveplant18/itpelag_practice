import MenuPage from "@/pages/menu";
import { HashRouter, Route, Routes } from "react-router";
import BaseLayout from "@/shared/ui/base-layout";
import GamePage from "@/pages/game";
import SettingsPage from "@/pages/settings";

export default function Routing() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
