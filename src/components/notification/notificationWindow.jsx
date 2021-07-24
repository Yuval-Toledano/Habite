import React from 'react'
import { H4 } from '../designSystem/common'
import { StyledText } from "../designSystem/mobileDS";
import './notificationWindow.css'
import { NotificationData } from './notificationData.js'


/**
 * open web notification window component
 */
export const NotificationWindow = ({ show, notiData}) => {
    const reverseNotiArr = notiData.reverse() ;
    const displayNoti = notiData? (notiData.length > 3 ? notiData.slice(-3) : reverseNotiArr) : []
    
    return (
        <div className="NotiWrapper"
            style={{visibility: show ? 'visible' : 'hidden'}}
            >
            <div className="NotiHeader">
                <H4><b>Notifications</b></H4>
            
            <div className="NotiBody">
                <ul className="NotiList">
                {displayNoti && displayNoti.map((val, key) => 
                    {
                    return (
                    <li key={key} className="row">
                        <div className="NotiListTitle"><StyledText>{NotificationData[val].title}</StyledText></div>
                        <div className="NotiListData">
                        {/* check the text*/}
                        <StyledText>
                        {NotificationData[val].data}
                        </StyledText>
                        
                        </div>
                    </li>);
                    })}
                </ul>
                </div>
            </div>
        </div>
    )
};
