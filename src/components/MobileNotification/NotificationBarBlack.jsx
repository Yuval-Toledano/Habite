import React, { useState, useEffect } from 'react'
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components"
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { NotificationWindow } from "./MobileNotiWindow";
import { JoinFriendsWindow } from "../joinFriends/joinWindow";
import { JoinFriendsBG } from "../joinFriends/joinBG";

/****************** STYLED NOTIFICATION BAR ELEMENTS ******************/

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
//   align-items: center;
`;

// bell component
const Bell = () => (
    <div>
        <NotificationsIcon className="iconDesignMobile" style={{ color: "black" }} />
    </div>
)

// bell's notification component
const Dot = () => (
    <RedDot></RedDot>
)

// add members to group component
const JoinFriends = () => (
    <div className="groupIcon">
        <GroupAddIcon className="iconDesignMobile" style={{ color: "black" }} />
    </div>
)

const defaultOnClick = () => alert("onClick is undefined")

// add members to group component's flag
const JoinFriendsIndicator = ({ onClick = defaultOnClick }) => {
    return (
        <div>
            <JoinFriends />
        </div>
    )
}

// notofocation component's flag
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

// notifocation bar on bright background
function NotificationBarBlack(props) {
    const { userData, usePrevious } = useAuth();
    const [show, setShow] = useState(false);
    const [showDot, setShowDot] = useState(false);
    const [notiData, setNotiData] = useState([]);
    const [showJoin, setShowJoin] = useState(false);
    const prevNoti = usePrevious(notiData);

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
           
        }
        fetchNotification();
    }, [userData, prevNoti, showDot, show]);

    // close notification window
    const closeWindow = () => {
        setShow(!show);

    }

    // close add member window
    const closeWindowJoin = () => {
        setShowJoin(!showJoin);

    }

    return (
        <>
            <JoinFriendsBG showJoin={showJoin} closeWindowJoin={closeWindowJoin} />
            <NotiBarContainer className="w-100">
                <button className="JoinButton" style={{ border: "none" }} onClick={closeWindowJoin}>
                    <JoinFriendsIndicator />
                    <JoinFriendsWindow showJoin={showJoin} closeWindowJoin={closeWindowJoin} />
                </button>
                <BellContainer>
                    <button className="BellButton" style={{ border: "none" }} onClick={closeWindow}><NotificationIndicator showDot={showDot} onClick={() => setShowDot(false)} /></button>
                    <NotificationWindow show={show} showDot={setShowDot} notiData={notiData} closeWindow={closeWindow} />
                </BellContainer>
            </NotiBarContainer>
        </>
    );
}

export default NotificationBarBlack;