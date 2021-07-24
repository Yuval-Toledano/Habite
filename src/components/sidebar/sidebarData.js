import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export const SidebarData = [
    {
        title: "Overview",
        icon: <DashboardIcon />,
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
