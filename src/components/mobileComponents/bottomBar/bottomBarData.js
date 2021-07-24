import React from "react";
import { Home, ScatterPlot, Dashboard, Info } from "@material-ui/icons";

/**
 * mobile bottom bar icons
 */
export const bottomsideData = [
  {
    title: "Home",
    icon: <Home />,
    link: "/overview",
    mode: "white",
  },
  {
    title: "Challenges",
    icon: <ScatterPlot />,
    link: "/challenges",
    mode: "black",
  },
  {
    title: "Achievements",
    icon: <Dashboard />,
    link: "/achievements",
    mode: "white",
  },
  {
    title: "Rules",
    icon: <Info />,
    link: "/rulesOfGame",
    mode: "black",
  },
];
