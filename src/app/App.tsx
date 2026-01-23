import { RouterProvider } from "react-router";
import { router } from "./routes/router.ts";
import { QueryProvider } from "./providers/QueryProvider.tsx";

function App() {
  // 사이트이름 하드코딩되잇는데 바궈야해
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <QueryProvider>
          <header className="mb-2 sm:mb-4">
            <a href="/" className="group inline-flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3">
              <div className="flex h-9 w-9 items-center justify-center sm:h-11 sm:w-11">
                <img src={"icons/cloud.svg"} alt="cloud image" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">Clima</h1>
                <span className="text-muted-foreground hidden text-xs sm:block">날씨 정보 서비스</span>
              </div>
            </a>
          </header>
          <RouterProvider router={router} />
        </QueryProvider>
      </div>
    </div>
  );
}

export default App;
