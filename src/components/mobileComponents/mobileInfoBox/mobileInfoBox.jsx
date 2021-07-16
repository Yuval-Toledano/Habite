import React, {useState, useEffect} from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    getChallengeDocumentData,
    updateNoti,
    updateCurrentChallenge,
    updateScore,
    notiForGroupMembers,
    generateChallengeLog,
    updateSuccessChallengeLog,
    getChallengeLogData,
  } from "../../../server/firebaseTools";
import { StyledTitle, StyledText, InfoBoxDiv,  } from "../../designSystem/mobileDS";
import LinkIcon from '@material-ui/icons/Link';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { WhatsappShareButton } from 'react-share';
import { colors } from "@material-ui/core";

export function MobileInfoBox(props) {

    const { type } = props;
    const { userData, groupData, groupMemberData, forceRender, loadData, updateVal} = useAuth();
    const groupId = groupData? groupData.id : "No group Id"
    const groupCount = groupData? groupData.countGroup : "No group count"
    const userScore = userData? userData.score : "Loading score"
    const userLevel = userData? userData.level : "Loading level"
    const userChallenges = userData? userData.successChallenge.length : "Loading challenges"
    const [urlJG, setURL] = useState()

    // generate the whatsapp link for sharing the group code
    useEffect(() => {
        if (groupData){
          setURL(`http://localhost:3001/signup/${groupData.id}`)
          console.log("Whatapp share function")
        }
      },[groupData])

    // copy the group code to clipboard
    const copyGroupCode = () => {
        if (groupData){  
            navigator.clipboard.writeText(groupId);
            console.log("copied!");
        }
      };

    if (type === "groupAdd") {
        // Add members to group when there is only 1 member
        if (groupCount === 1) {
            console.log("1 member!")
            return (
                <InfoBoxDiv className="d-flex flex-column">
                    <StyledText>Oh no, looks like your your group is empty</StyledText>
                    <StyledTitle type={"subtitle"}>Invite friends to the group</StyledTitle>
                    <div className="d-flex flex-row justify-content-between">
                        <LinkIcon style={{fill: "#E71C7D"}} onClick={()=>{copyGroupCode()}}/>
                        <WhatsappShareButton
                        title="Join My Group"
                        url= {urlJG}
                        >
                        <WhatsAppIcon style={{fill: "#E71C7D"}} onClick={()=>{console.log("Whatapp share function")}}/>
                        </WhatsappShareButton>
                    </div>
                </InfoBoxDiv>
            );
        } else {
            // Add members to group when there are at least 2 members
            console.log("more than 1 member!")
            return (
                <InfoBoxDiv className="d-flex flex-column">
                    <StyledText>Share group code</StyledText>
                    <StyledTitle type={"subtitle"}>Make your group bigger and stronger</StyledTitle>
                    <div className="d-flex flex-row justify-content-between">
                    <LinkIcon style={{fill: "#E71C7D"}} onClick={()=>{copyGroupCode()}}/>
                        <WhatsappShareButton
                        title="Join My Group"
                        url= {urlJG}
                        >
                        <WhatsAppIcon style={{fill: "#E71C7D"}} onClick={()=>{console.log("Whatapp share function")}}/>
                        </WhatsappShareButton>
                    </div>
                </InfoBoxDiv>
            );
        }
    } else if (type === "statBox") {
        return (
            <InfoBoxDiv className="d-flex flex-column">
                <StyledText>My Stats</StyledText>
                <div className="d-flex flex-row">
                    <StyledTitle type={"subtitle"} color={"#00397B"}>level {userLevel}</StyledTitle>
                </div>
                <StyledTitle type={"subtitle"}>all time points {userScore}</StyledTitle>
                <StyledTitle type={"subtitle"}>challenges completed {userChallenges}</StyledTitle>
            </InfoBoxDiv>
        );
    }

}