import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Interests from "./pages/Interests";
import Skills from "./pages/Skills";
import Statistics from "./pages/Statistics";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "interests", Component: Interests },
      { path: "skills", Component: Skills },
      { path: "statistics", Component: Statistics },
    ],
  },
]);
