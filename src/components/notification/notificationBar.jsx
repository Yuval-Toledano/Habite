import React, { useState, useEffect, useRef } from 'react'
import {useAuth} from "../../context/AuthContext";
import styled from "styled-components"
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationWindow } from "./notificationWindow";


const NotiBarContainer = styled.div`
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 60px;
    margin-left: 0px;
    background: #F8F7F5;
    border-bottom: 1px dashed rgba(231, 28, 150, 0.2);
`;

const RedDot = styled.div`
    height: 9px;
    width: 9px;
    background: #E71C96;
    border-radius: 50%;
    position: absolute;
    top: 5;
    left: 2;
   
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Bell = () => (
    <div>
        <NotificationsIcon className="iconDesign"/>
    </div>
)

const Dot = () => (
    <RedDot></RedDot>
  )

const defaultOnClick = () => alert("onClick is undefined")
const NotificationIndicator = ({
    showDot = false,
    onClick = defaultOnClick,
  }) => {
    const dot = showDot ? <Dot /> : null
    const divStyle = {
        height: "24px",
        width: "24px",
        border: "1 solid black",
        position: "relative",
        display: "flex",
        justifyContent: "top",
        alignItems: "top",
    }
    return (
        <div>
            <div
            className="notiButton"
            >
            <div style={divStyle}>
                {dot}
                <Bell />
            </div>
            </div>
        </div>
        )
    }

    
function NotificationBar(props) {
    const {userData, usePrevious} = useAuth();
    const [show, setShow] = useState(false);
    const [showDot, setShowDot] = useState(false)
    const [notiData, setNotiData] = useState([])

    const prevNoti = usePrevious(notiData)

    useEffect(() => {
        const isEqual = (notiPrev, notiNew) => {
            return( notiPrev && notiNew && notiPrev.length === notiNew.length 
                && notiPrev.every((v,i)=> v === notiNew[i]))
        }

        const fetchNotification = () =>{
            if (userData == null){return}
            const noti = userData.notification
            const isNewNoti = isEqual(prevNoti, noti)
            setNotiData(noti)
            setShowDot(!isNewNoti)
        }
        fetchNotification();
    }, [userData, prevNoti, showDot, show])
    
    const closeWindow = () => {
        setShow(!show);
    }

    return (
            <NotiBarContainer>
                <IconsContainer>
                    <button className="BellButton" style={{border:"none"}} onClick={closeWindow}><NotificationIndicator showDot={showDot} onClick={()=> setShowDot(false)}/></button>                        
                    <NotificationWindow show={show} showDot={setShowDot} notiData={notiData} closeWindow={closeWindow}/>
                </IconsContainer>
            </NotiBarContainer>
        );
    }

export default NotificationBar;
