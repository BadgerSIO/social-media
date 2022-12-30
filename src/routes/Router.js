import Home from "../pages/Home/Home";
import Login from "../pages/LoginRegister/Login/Login";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Register from "../pages/LoginRegister/Register/Register";
import Media from "../pages/Media/Media";
import PostDetails from "../pages/PostDetails/PostDetails";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "/media/details/:id",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/posts/${params.id}`),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginRegister></LoginRegister>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404page</h1>,
  },
]);
export default router;
