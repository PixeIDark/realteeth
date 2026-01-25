import { RouterProvider } from "react-router";
import { router } from "./routes/router.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { Toaster } from "@/shared/ui/Toast.tsx";
import "./style/global.css";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster duration={2000} />
    </QueryProvider>
  );
}

export default App;
