import { Outlet } from "react-router";
import Header from "./header.tsx";

export default function BaseLayout() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="h-full grow flex flex-col items-stretch">
        <Outlet />
      </main>
    </div>
  );
}
