import React, { useState, useEffect } from 'react'
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components"
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { NotificationWindow } from "./MobileNotiWindow";
import useSound from 'use-sound';
import { JoinFriendsWindow } from "../joinFriends/joinWindow";
import { JoinFriendsBG } from "../joinFriends/joinBG";
import { StyledTitle } from "../../components/designSystem/mobileDS";


/****************** STYLED NOTIFICATION ICON WHITE ******************/

const NotiBarContainer = styled.div`
    display: inline-flex;
    justify-content: space-between;
    padding: 8px 16px;
    background:  "transparent";
    border - bottom: 1px dashed rgba(231, 28, 150, 0.2);
    position: fixed;
    top: 0;
    z-index: 2;
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

const BellContainer = styled.div`
//   display: flex;
//   align-items: center;
`;


const Bell = () => (
    <div>
        <NotificationsIcon className="iconDesignMobile" />
    </div>
)

const Dot = () => (
    <RedDot></RedDot>
)

const JoinFriends = () => (
    <div className="groupIcon">
        <GroupAddIcon className="iconDesignMobile" style={{alignSelf: "top"}}/>
    </div>
)


const defaultOnClick = () => alert("onClick is undefined");

const JoinFriendsIndicator = ({ onClick = defaultOnClick }) => {
    return (
        <div>
            <JoinFriends />
        </div>
    )
}

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
            <div className="notiButton">
                <div style={divStyle}>
                    {dot}
                    <Bell />
                </div>
            </div>
        </div>
    )
}


function NotificationBarWhite(props) {
    const { userData, usePrevious } = useAuth();
    const [show, setShow] = useState(false);
    const [showDot, setShowDot] = useState(false)
    const [notiData, setNotiData] = useState([])
    const [showJoin, setShowJoin] = useState(false)

    // error here
    const [play] = useSound('../../audio/piano.mp3', {
        onPlayError: () => { console.log("error audio") }
    })

    const prevNoti = usePrevious(notiData)

    useEffect(() => {
        const isEqual = (notiPrev, notiNew) => {
            return (notiPrev && notiNew && notiPrev.length === notiNew.length
                && notiPrev.every((v, i) => v === notiNew[i]))
        }

        const fetchNotification = () => {
            if (userData == null) { return }
            const noti = userData.notification
            const isNewNoti = isEqual(prevNoti, noti)
            setNotiData(noti)
            setShowDot(!isNewNoti)
            if (isNewNoti) {
                play()
            };
        }
        fetchNotification();
    }, [userData, prevNoti, showDot, show])

    const closeWindow = () => {
        setShow(!show);
        play();
    }

    const closeWindowJoin = () => {
        setShowJoin(!showJoin);
        play();
    }

    return (
        <>
            <JoinFriendsBG showJoin={showJoin} closeWindowJoin={closeWindowJoin} />
            <NotiBarContainer className="w-100 d-flex align-items-start">
                <button className="JoinButton" style={{ border: "none"}} onClick={closeWindowJoin}>
                    <JoinFriendsIndicator />
                    <JoinFriendsWindow showJoin={showJoin} closeWindowJoin={closeWindowJoin} />
                </button>
                <div>
                    <StyledTitle type={"little"} mode={'over_dark'}>Habite</StyledTitle>
                </div>
                <BellContainer>
                    <button className="BellButton" style={{ border: "none" }} onClick={closeWindow}><NotificationIndicator showDot={showDot} onClick={() => setShowDot(false)} /></button>
                    <NotificationWindow show={show} showDot={setShowDot} notiData={notiData} closeWindow={closeWindow} />
                </BellContainer>
            </NotiBarContainer>
        </>
    );
}

export default NotificationBarWhite;