import { RouterProvider } from "react-router";
import { router } from "./routes/router.ts";
import { QueryProvider } from "./providers/QueryProvider.tsx";

function App() {
  return (
    <div>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </div>
  );
}

export default App;
