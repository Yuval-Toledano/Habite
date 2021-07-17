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
    const groupId = groupData? groupData.id : "No group Id";
    const groupCount = groupData? groupData.countGroup : "No group count";
    const userScore = userData? userData.score : "Loading score";
    const userLevel = userData? userData.level : "Loading level";
    const userChallenges = userData? userData.successChallenge.length : "Loading challenges";
    const [urlJG, setURL] = useState();
    
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

    // Start of currChallenge choosing proccess
    useEffect(() => {

        // check if the the date is valid for the current challenge
        const isValidDate = () => {
          var date = Math.round(new Date().getTime() / 1000);
          return !(groupData.timeStampEnd2.seconds < date);
        };
    
        //gets current challenge to show
        const fetchChallenge = () => {
          console.log("use effect change challenge")
          if (!groupData ) {
            return;
          }
          
          const currentChallengeId = groupData.currentChallenge;
    
          if (currentChallengeId) {
            // CASE 1: valid current challenge
            if (isValidDate()) {
              console.log("case 1")
              const challengePromise = getChallengeDocumentData(currentChallengeId);
              challengePromise.then((doc) => {
                if (doc.exists) {
                  const challengeData = { ...doc.data(), id: doc.id };
                  setCurrChallenge(challengeData);
                }
              });
            } else if (groupData.approvedChallenges.length !== 0) {
              // CASE 2: update new current challenge after curr is not valid
              
              console.log("case 2")
              updateCurrentChallenge(groupData, CLASSIC_UPDATE);
              
              setSuccessDate(-1)
              const newChallengeId = groupData.approvedChallenges[0];
              
              // creates current challengeLog because there is a new current challenge
              generateChallengeLog(groupMemberData, newChallengeId);
    
              // send notification on a new current challenge for the group members
              notiForGroupMembers(groupMemberData, userData.id, NEW_CHALLENGE);
              
              //gets the new current challenge
              const challengePromise = getChallengeDocumentData(newChallengeId);
              challengePromise.then((doc) => {
                if (doc.exists) {
                  const challengeData = { ...doc.data(), id: doc.id };
                  setCurrChallenge(challengeData);
                  setDisabledButton(false)
                }
              });
              forceRender();
            } else {
              // CASE 3: update current challenge while the is not another challenge
              console.log("case 3")
              updateCurrentChallenge(groupData, NO_APPROVED_UPDATE);
              
              //send notification go vote for challenges
              updateNoti(userData, GO_VOTE);
              setCurrChallenge("noChallenge");
    
              forceRender();
            }
          } else {
            if (groupData.approvedChallenges.length !== 0) {
              // CASE 4: init new current challenge
              console.log("case 4")
              updateCurrentChallenge(groupData, NO_CURR_UPDATE);
              setSuccessDate(-1)
              const newChallengeId = groupData.approvedChallenges[0];
              
              // creates current challengeLog because there is a new current challenge
              generateChallengeLog(groupMemberData, newChallengeId);
              
              // send notification on a new current challenge for the group members
              notiForGroupMembers(groupMemberData, userData.id, NEW_CHALLENGE);
    
              //gets the new current challenge
              const challengePromise = getChallengeDocumentData(newChallengeId);
              challengePromise.then((doc) => {
                if (doc.exists) {
                  const challengeData = { ...doc.data(), id: doc.id };
                  setCurrChallenge(challengeData);
                }
              });
              forceRender();
            } else {
              // CASE 5: render message for voting
              console.log("case 5")
              setCurrChallenge("noChallenge");
              // send notification to the group members
              updateNoti(userData, GO_VOTE);
              //forceRender();
            }
          }
        };
    
        fetchChallenge();
      }, [userData, groupData]);

    // Last step of currChallenge proccess
    var whatToDisplay = groupData ? (
    groupData.countGroup === 1 ? (
        <InfoBox id="current_challenge_box">
        <div className="row">
            <IndicationText>current challenge</IndicationText>
            <SubTitle>
            <b>Your group is empty 😭</b>
            </SubTitle>
            <IndicationText>
            Invite your friends to start the journey
            </IndicationText>
        </div>
        </InfoBox>
    ) : (
        showCurrentChallenge
    )
    ) : (
    <InfoBox></InfoBox>
    );

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
                {whatToDisplay}
            </InfoBoxDiv>
        );
    }

}