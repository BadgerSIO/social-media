import Home from "../pages/Home/Home";
import Login from "../pages/LoginRegister/Login/Login";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Register from "../pages/LoginRegister/Register/Register";
import Media from "../pages/Media/Media";
import Messages from "../pages/Messages/Messages";
import PostDetails from "../pages/PostDetails/PostDetails";
import UserProfile from "../pages/UserProfile/UserProfile";
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
          fetch(`https://social-media-server-nu.vercel.app/posts/${params.id}`),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/messages",
        element: (
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        ),
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
