import React from 'react';

/**
 * black modal background
 */
export const JoinFriendsBG = ({ showJoin }) => {
    return (
        <div style={{ visibility: showJoin ? 'visible' : 'hidden', display: showJoin ? 'unset' : 'none', width: "calc(100vw)", height: "calc(100vh)", background: "rgba(0,0,0,0.4)", position: "absolute", zIndex: "2"}}>
            &nbsp;
        </div>
    )
}