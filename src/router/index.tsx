import { createBrowserRouter } from "react-router-dom";
import LayoutBasic from "../layouts/LayoutBasic";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import User from "../pages/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutBasic />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:username",
        element: <User />,
      },
    ],
  },
]);
