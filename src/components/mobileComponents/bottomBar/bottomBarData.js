import React from "react";
import { Home, ScatterPlot, Dashboard, Info } from "@material-ui/icons";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

/**
 * mobile bottom bar icons
 */
export const BottomSideData = [
  {
    title: "Home",
    icon: <Home />,
    link: "/overview",
    mode: "white",
  },
  {
    title: "Challenges",
    icon: <PlaylistAddCheckIcon />,
    link: "/challenges",
    mode: "black",
  },
  {
    title: "Achievements",
    icon: <TrendingUpIcon />,
    link: "/progress",
    mode: "white",
  },
  {
    title: "Rules",
    icon: <Info />,
    link: "/rulesOfGame",
    mode: "black",
  },
];
