import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);