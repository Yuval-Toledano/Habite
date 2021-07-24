import React from 'react'
import "./joinWindow.css"
import { MobileInfoBox } from "../mobileComponents/mobileInfoBox/mobileInfoBox"

/**
 * invite friends to the group styled window
 */
export const JoinFriendsWindow = ({showJoin}) => {
    return (
        <div className="join-container" style={{visibility: showJoin ? 'visible' : 'hidden', width: "90%", display: "inline-grid", justifySelf: "center", justifyContent: "center", position: "absolute", zIndex: "7"}}>
            <div className="text-container">
                <MobileInfoBox type="groupAddBar"/>
            </div>
        </div>
        
    )
}