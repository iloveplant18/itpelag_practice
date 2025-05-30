import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/shared/ui";

export default function Header() {
  return (
    <header className="content-padding flex items-center justify-between py-2">
      <SidebarTrigger>
        <Menu />
      </SidebarTrigger>
    </header>
  );
}
