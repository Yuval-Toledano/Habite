import React, { useState, useEffect } from 'react'
import { H4, IndicationText} from '../../designSystem/common'
import './NotificationWindow.css'
import { NotificationData } from './NotificationData.js'
import NotificationBar from '../../notifictionBar/notificationBar';
import {db, auth} from "../../../config/firebase.js";
import { getUserDocumentData } from "../../../config/firebaseTools";


export const NotificationWindow = ({ show, showDot, notiData}) => {


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
                {displayNoti && displayNoti.map((val, key) => {
                    return (
                    <li key={key} className="row">
                        <div className="NotiListTitle"><IndicationText>{NotificationData[val].title}</IndicationText></div>
                        <div className="NotiListData">{NotificationData[val].data}</div>
                    </li>);
                    })}
                </ul>
                </div>
            </div>
        </div>
    )
};
