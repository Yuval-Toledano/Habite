import React from 'react';
import { Home, ScatterPlot, Dashboard, Info } from '@material-ui/icons';

export const bottomsideData = [
    {
        title: "Home",
        icon: <Home />,
        link: "/mobile/overview"
    },
    {
        title: "Challenges",
        icon: <ScatterPlot />,
        link: "/mobile/challenges"
    },
    {
        title: "Achievements",
        icon: <Dashboard />,
        link: "/mobile/achievements"
    },
    {
        title: "Rules",
        icon: <Info />,
        link: "/mobile/rulesOfGame"
    }

]
