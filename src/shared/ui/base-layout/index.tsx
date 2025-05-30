import { Outlet } from "react-router";
import Header from "./header.tsx";
import {SidebarProvider} from "@/shared/ui";
import AppSidebar from "@/shared/ui/base-layout/app-sidebar";

export default function BaseLayout() {
  return (
    <SidebarProvider>
      <div className="bg-background min-h-screen w-full flex flex-col">
        <Header />
        <AppSidebar />        
        <main className="h-full grow flex flex-col items-stretch">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
