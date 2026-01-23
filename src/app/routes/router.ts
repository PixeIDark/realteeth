import { createBrowserRouter } from "react-router";
import { ROUTES } from "./route.ts";
import { HomePage } from "@/pages/home";
import { DetailPage } from "@/pages/detail";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: HomePage,
  },
  {
    path: ROUTES.DETAIL,
    Component: DetailPage,
  },
]);
