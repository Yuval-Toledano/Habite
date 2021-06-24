import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export const SidebarData = [
    {
        title: "Overview",
        icon: <DashboardIcon />,
        link: "/user/overview"
    },
    {
        title: "Progress",
        icon: <TrendingUpIcon />,
        link: "/user/progress"
    },
    {
        title: "Challenges",
        icon: <PlaylistAddCheckIcon />,
        link: "/user/challenges"
    },

]
