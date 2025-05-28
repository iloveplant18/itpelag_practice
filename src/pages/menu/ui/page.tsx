import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export default function MenuPage() {
  return (
    <section className="content-padding mx-auto mt-18 flex w-fit flex-col items-stretch justify-center gap-y-5">
      <Button asChild>
        <Link to={"/game"}>Start</Link>
      </Button>
      <Button asChild>
        <Link to={"/settings"}>Settings</Link>
      </Button>
      <Button asChild>
        <Link to={"/"}>Leaderboard</Link>
      </Button>
    </section>
  );
}
