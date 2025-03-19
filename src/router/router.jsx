import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Skills from "../components/Skills";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
    ],
  },
]);
