import { Link } from "react-router";
import { LINKS } from "@/app/routes/route.ts";

function Header() {
  return (
    <header className="mb-2 sm:mb-4">
      <Link
        to={LINKS.HOME()}
        className="group inline-flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
      >
        <div className="flex h-9 w-9 items-center justify-center sm:h-11 sm:w-11">
          <img src={"icons/cloud.svg"} alt="cloud image" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">Clima</h1>
          <span className="text-muted-foreground hidden text-xs sm:block">날씨 정보 서비스</span>
        </div>
      </Link>
    </header>
  );
}

export default Header;
