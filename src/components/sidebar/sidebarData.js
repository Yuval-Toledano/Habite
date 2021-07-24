import React from 'react'
import Home from '@material-ui/icons';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export const SidebarData = [
    {
        title: "Home",
        icon: <Home />,
        link: "/overview"
    },
    {
        title: "Challenges",
        icon: <PlaylistAddCheckIcon />,
        link: "/challenges"
    },
    {
        title: "Progress",
        icon: <TrendingUpIcon />,
        link: "/progress"
    }
]
