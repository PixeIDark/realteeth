import { RouterProvider } from "react-router";
import { router } from "./routes/router.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import "./style/global.css";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
