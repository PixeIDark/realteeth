import { createBrowserRouter } from "react-router";
import { ROUTES } from "./route.ts";
import { HomePage } from "@/pages/home";
import { DetailPage } from "@/pages/detail";
import ErrorPage from "@/shared/ui/ErrorPage.tsx";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: HomePage,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.DETAIL,
    Component: DetailPage,
    errorElement: <ErrorPage />,
  },
]);
