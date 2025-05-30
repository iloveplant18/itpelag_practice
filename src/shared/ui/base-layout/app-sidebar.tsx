import { Sidebar, SidebarContent, Button } from "@/shared/ui";
import {Link} from "react-router";
import {useSidebar} from "@/shared/ui";

export default function AppSidebar() {
    const { toggleSidebar } = useSidebar();

    return (
        <Sidebar>
            <SidebarContent className="content-padding pt-7">
                <Button asChild variant={"outline"}>
                    <Link onClick={toggleSidebar} to={"/menu"}>Menu</Link>
                </Button>
                <Button asChild variant={"outline"}>
                    <Link onClick={toggleSidebar} to={"/game"}>Game</Link>
                </Button>
                <Button asChild variant={"outline"}>
                    <Link onClick={toggleSidebar} to={"/settings"}>Settings</Link>
                </Button>
            </SidebarContent>
        </Sidebar>
    )
}