import React from 'react'


/**
 * type of notifications
 */
export const NotificationData = [
    {
        id: 0,
        title: "Go Vote!",
        data: "Your group doesn't have another challenge to start, go Vote to add start new challenges!",
        link: "/challenges",
        div: <div/>
    },
    {
        id: 1,
        title: "Your Friend has voted, what about you?",
        data: "One of your group members has added votes, go check the challenges",
        link: "/challenges",
        div: <div/>

    },
    {
        id: 2,
        title: "Quick!",
        data: "Your group member had accomplished the challenge today, what about you?",
        link: "/overview",
        div: <div/>
    },
    {
        id: 3,
        title: "New Challenge!",
        data: "Check out your new Challenge for this week",
        link: "/overview",
        div: <div/>
    },
    {
        id: 4,
        title: "Hi there :)",
        data: "Welcome to Habite. As a team member you will learn to intake sugar in a more responsible way. Things seem unclear? Click here to read the game's rules.",
        link: "/rulesOfGame",
        div: <div/>
    },

]
