import React from 'react'
import "./joinWindow.css"
import { MobileInfoBox } from "../mobileComponents/mobileInfoBox/mobileInfoBox"

export const JoinFriendsWindow = ({showJoin}) => {
    return (
        <div className="join-container" style={{visibility: showJoin ? 'visible' : 'hidden'}}>
            <div className="text-container">
                <MobileInfoBox type="groupAddBar" />
            </div>
        </div>
        
    )
}