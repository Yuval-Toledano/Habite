import React from "react";
import { Home, ScatterPlot, Dashboard, Info } from "@material-ui/icons";

export const bottomsideData = [
  {
    title: "Home",
    icon: <Home />,
    link: "/mobile/overview",
    mode: "white",
  },
  {
    title: "Challenges",
    icon: <ScatterPlot />,
    link: "/mobile/challenges",
    mode: "black",
  },
  {
    title: "Achievements",
    icon: <Dashboard />,
    link: "/mobile/achievements",
    mode: "white",
  },
  {
    title: "Rules",
    icon: <Info />,
    link: "/mobile/rulesOfGame",
    mode: "black",
  },
];
