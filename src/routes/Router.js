import Home from "../pages/Home/Home";
import Media from "../pages/Media/Media";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main/Main");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/media",
        element: <Media />,
      },
    ],
  },
]);
export default router;
