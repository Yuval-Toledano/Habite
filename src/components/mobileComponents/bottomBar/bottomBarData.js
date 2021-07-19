import React from 'react';
import { Home, ScatterPlot, Dashboard, Info } from '@material-ui/icons';

export const bottomsideData = [
    {
        title: "Home",
        icon: <Home />,
        link: "/overview"
    },
    {
        title: "Challenges",
        icon: <ScatterPlot />,
        link: "/challenges"
    },
    {
        title: "Achievements",
        icon: <Dashboard />,
        link: "/achievements"
    },
    {
        title: "Rules",
        icon: <Info />,
        link: "/rulesOfGame"
    }

]
