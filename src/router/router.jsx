import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Skills from "../components/Skills";
import PrivateRouter from "../config/PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "projects",
        element: (
          <PrivateRouter>
            <Projects />
          </PrivateRouter>
        ),
      },
      {
        path: "blogs",
        element: (
          <PrivateRouter>
            <Blogs />
          </PrivateRouter>
        ),
      },
      {
        path: "skills",
        element: (
          <PrivateRouter>
            <Skills />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
