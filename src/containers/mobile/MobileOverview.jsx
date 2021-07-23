import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import NotificationBarWhite from "../../components/MobileNotification/NotificationBarWhite";
import { BackgroundCircle, FlyingBox, StyledButton, StyledText } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";
import { MobileUserDetailsHeader } from "../../components/mobileUserDetailesHeader/mobileUserDetailsHeader";
import "../../index.css"
import styled from "styled-components"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BugReportIcon from '@material-ui/icons/BugReport';


export default function MobileOverview() {

    const { groupData, logOut, userData } = useAuth();
    const history = useHistory();
    const groupCount = groupData ? groupData.countGroup : "No group count";
    // to send users to the bug report page
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
    const bugLink = "https://docs.google.com/forms/d/e/1FAIpQLSejCMRe7KhMYlhLTL9ves71UXPS3TP5hkX8DGrermyF98QAjw/viewform"

    async function handleLogOut(event){
        event.preventDefault();
        try {
            await logOut();
            history.push("/")
        } catch(err){
            console.error("Error with logout ", err)
        }
    }

    if (groupCount > 1) {
        return (
            <div>
                {/* NotificationBar starts here */}
                <NotificationBarWhite/>
                {/* NotificationBar ends here */}
                <FlyingBox zindx={1} top={50}>
                    <MobileUserDetailsHeader/>
                    <MobileInfoBox type="currChallenge" />
                    <TopThree />
                    <MobileLeaderboard/>
                    <div className="d-flex flex-row justify-content-center m-2 mb-4">
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={(event) => handleLogOut(event)}><ExitToAppIcon />&nbsp;logout</StyledButton>
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={() => openInNewTab(bugLink)}><BugReportIcon />&nbsp;Report</StyledButton>
                    </div>
                </FlyingBox>
    
                <BackgroundCircle src={Teal} alt="Upper background color" />
            </div>
        );
    } else {
        return (
            <div>
                {/* NotificationBar starts here */}
                <NotificationBarWhite/>
                {/* NotificationBar ends here */}

                <FlyingBox zindx={1} top={50}>
                    <MobileUserDetailsHeader/>
                    {/* <MobileInfoBox type="groupAdd" /> */}
                    <div className="d-flex flex-row justify-content-center m-2">
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={(event) => handleLogOut(event)}><ExitToAppIcon />&nbsp;logout</StyledButton>
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={() => openInNewTab(bugLink)}><BugReportIcon />&nbsp;Report</StyledButton>
                    </div>
                </FlyingBox>
    
                <BackgroundCircle src={Teal} alt="Upper background color" />
            </div>
        );
    }
}