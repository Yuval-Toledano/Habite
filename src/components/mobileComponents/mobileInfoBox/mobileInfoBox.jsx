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
import { StyledTitle, StyledText, InfoBoxDiv, StyledButton } from "../../designSystem/mobileDS";
import LinkIcon from '@material-ui/icons/Link';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { WhatsappShareButton } from 'react-share';
import { useHistory } from "react-router-dom";
import ChallengeTimer from "../../timer/challengeTimer";

export function MobileInfoBox(props) {

    const { type } = props;
    const { userData, groupData, groupMemberData, forceRender, loadData, updateVal} = useAuth();
    const [currChallenge, setCurrChallenge] = useState();
    const [challengeLogSuccess, setChallengeLogSuccess] = useState(null);
    const [disabledButton, setDisabledButton] = useState(true);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [successDate, setSuccessDate] = useState(); 
    const nowDate = new Date().getDate();
    const groupId = groupData? groupData.id : "No group Id"
    const groupCount = groupData? groupData.countGroup : "No group count"
    const userScore = userData? userData.score : "Loading score"
    const userLevel = userData? userData.level : "Loading level"
    const userChallenges = userData? userData.successChallenge.length : "Loading challenges"
    const [urlJG, setURL] = useState()
    
    // types of notifications
    const GO_VOTE = 0;
    const MEMBER_VOTED = 1;
    const MEMBER_SUCCESS = 2;
    const NEW_CHALLENGE = 3;
    const CLASSIC_UPDATE = 1;
    const NO_APPROVED_UPDATE = 2;
    const NO_CURR_UPDATE = 3;

    // generate the whatsapp link for sharing the group code
    useEffect(() => {
        if (groupData){
            console.log("Whatapp share function")
            setURL(`http://localhost:3001/signup/${groupData.id}`)
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
                        <WhatsAppIcon style={{fill: "#E71C7D"}}/>
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
                        <WhatsAppIcon style={{fill: "#E71C7D"}}/>
                        </WhatsappShareButton>
                    </div>
                </InfoBoxDiv>
            );
        }
    } else if (type === "statBox") {
        return (
            <InfoBoxDiv className="d-flex flex-column">
                <StyledText>My Stats</StyledText>
                <div className="d-flex flex-row justify-content-between">
                    <StyledTitle type={"subtitle"}>Level</StyledTitle>
                    <StyledTitle type={"subtitle"} color={"#00397B"}>{userLevel}</StyledTitle>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <StyledTitle type={"subtitle"}>All time points</StyledTitle>
                    <StyledTitle type={"subtitle"} color={"#00397B"}>{userScore}</StyledTitle>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <StyledTitle type={"subtitle"}>Challenges completed</StyledTitle>
                    <StyledTitle type={"subtitle"} color={"#00397B"}>{userChallenges}</StyledTitle>
                </div>
            </InfoBoxDiv>
        );
    } else if (type === "currChallenge") {
        return (
            <InfoBoxDiv className="d-flex flex-column">
                <StyledText>CurrChallnge</StyledText>
            </InfoBoxDiv>
        );
    }

}