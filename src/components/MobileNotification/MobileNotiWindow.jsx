import React from 'react';
import '../notification/notificationWindow.css';
import { NotificationData } from '../notification/notificationData.js';
import { StyledTitle, StyledText } from "../../components/designSystem/mobileDS";

/**
 * open mobile notification window component
 */
export const NotificationWindow = ({ show, notiData}) => {
    const reverseNotiArr = notiData.reverse() ;
    const displayNoti = notiData? (notiData.length > 3 ? notiData.slice(-3) : reverseNotiArr) : []
    
    return (
        <div className="MobileNotiWrapper"
            style={{visibility: show ? 'visible' : 'hidden'}}
            >
            <div className="NotiHeader">
                <StyledTitle type={"subtitle"}>Notifications</StyledTitle>
            
            <div className="NotiBody">
                <ul className="NotiList">
                {displayNoti && displayNoti.map((val, key) => {
                    return (
                    <li key={key} className="row">
                        <div className="NotiListTitle"><StyledText>{NotificationData[val].title}</StyledText></div>
                        <div className="NotiListData"><StyledText>{NotificationData[val].data}</StyledText></div>
                    </li>);
                    })}
                </ul>
                </div>
            </div>
        </div>
    )
};
