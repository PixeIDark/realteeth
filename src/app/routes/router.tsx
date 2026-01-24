import { createBrowserRouter } from "react-router";
import { ROUTES } from "./route.ts";
import { HomePage } from "@/pages/home";
import { DetailPage } from "@/pages/detail";
import ErrorPage from "@/shared/ui/ErrorPage.tsx";
import RootLayout from "@/app/layouts/RootLayout.tsx";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        Component: HomePage,
      },
      {
        path: ROUTES.DETAIL,
        Component: DetailPage,
      },
    ],
  },
]);
