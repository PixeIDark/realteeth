import { RouterProvider } from "react-router";
import { router } from "./routes/router.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import Header from "@/widgets/header/ui/Header.tsx";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <QueryProvider>
          <Header />
          <RouterProvider router={router} />
        </QueryProvider>
      </div>
    </div>
  );
}

export default App;
