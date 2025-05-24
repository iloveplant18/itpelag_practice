import { Button } from "@/shared/ui";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="content-padding flex items-center justify-between py-2">
      <Button variant={"outline"}>
        <Menu />
      </Button>
    </header>
  );
}
