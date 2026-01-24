import Header from "@/widgets/header/ui/Header.tsx";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
