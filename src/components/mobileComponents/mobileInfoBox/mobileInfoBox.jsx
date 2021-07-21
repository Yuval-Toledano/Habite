import React, { useState, useEffect } from "react";
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
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { WhatsappShareButton } from 'react-share';
import { useHistory } from "react-router-dom";
import ChallengeTimer from "../../timer/challengeTimer";
import SugarPile from "../../svgs/avatars/1-sugarPile.svg";
import SugarCube from "../../svgs/avatars/2-sugarCube.svg";
import Marshmellow from "../../svgs/avatars/3-marshmellow.svg";

export function MobileInfoBox(props) {

  const { type } = props;
  const { userData, groupData, groupMemberData, forceRender, loadData, updateVal } = useAuth();
  const [currChallenge, setCurrChallenge] = useState();
  const [challengeLogSuccess, setChallengeLogSuccess] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const history = useHistory();
  const [successDate, setSuccessDate] = useState();
  const nowDate = new Date().getDate();
  const groupId = groupData ? groupData.id : "No group Id";
  const groupCount = groupData ? groupData.countGroup : "No group count";
  const userScore = userData ? userData.score : <StyledText>Loading score...</StyledText>;
  const userLevel = userData ? userData.level : <StyledText>Loading level...</StyledText>;
  const userChallenges = userData ? userData.successChallenge.length : <StyledText>Loading challenges...</StyledText>;
  const [urlJG, setURL] = useState();
  const dimentions = useWindowDimensions();

  // types of notifications
  const GO_VOTE = 0;
  const MEMBER_SUCCESS = 2;
  const NEW_CHALLENGE = 3;
  const CLASSIC_UPDATE = 1;
  const NO_APPROVED_UPDATE = 2;
  const NO_CURR_UPDATE = 3;

  // get window dimensions to route desktop and mobile when needed
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

  // generate the whatsapp link for sharing the group code
  useEffect(() => {
    if (groupData) {
      setURL(`https://habite-fd756.web.app/signup/${groupData.id}`)
    }
  }, [groupData])

  // copy the group code to clipboard
  const copyGroupCode = () => {
    if (groupData) {
      navigator.clipboard.writeText(groupId);
      document.getElementById("indicationCopy").innerHTML = "&nbsp;copied!";
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
      if (!groupData) {
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

  // second challenge useEffect to determine if challenge was filled today
  useEffect(() => {
    //check if the user already click the success button
    const checkDisabled = () => {
      if (userData == null || currChallenge == null || currChallenge === "noChallenge") {
        return;
      }

      var date = new Date();
      const disabled = successDate === date.getDate();
      setDisabledButton(disabled);

    }
    checkDisabled();
  }, [successDate, nowDate]);

  // third challenge useEffect for pulling full challenge data
  useEffect(() => {
    const fetchChallengeLog = async () => {
      if (groupMemberData == null || currChallenge == null || currChallenge === "noChallenge") {
        return;
      }
      const usersChallengeLogPromise = groupMemberData.map((user) => {
        const challengeLogPromise = getChallengeLogData(
          currChallenge.id,
          user.id
        ).then((doc) => {
          if (doc != null) {
            if (doc.userId === userData.id) {
              setSuccessDate(doc.dateSuccess)
            }
            return doc;
          } else {
            console.log("challengeLog doc not found");
          }
        });
        return challengeLogPromise;
      });
      var challengeLogData = await Promise.all(usersChallengeLogPromise);

      if (challengeLogData.some(item => item === undefined)) {
        // forceRender()
        return;
      }
      else {
        setChallengeLogSuccess(challengeLogData);
      }
    }

    fetchChallengeLog();
  }, [currChallenge, groupMemberData, updateVal]);

  if (loadData) {
    return (
      <StyledText>Loading...</StyledText>
    )
  }

  // update user succeeded the challenge today
  const handleSuccess = () => {
    updateSuccessChallengeLog(userData.id, currChallenge.id);

    //update score
    updateScore(userData.id, currChallenge.id)

    // sent notification to the group members about user's success
    notiForGroupMembers(groupMemberData, userData.id, MEMBER_SUCCESS);
    setDisabledButton(true);
    forceRender();
  };

  // decide which button to display
  var successButton =
    disabledButton ? (
      <div></div>
    ) : (
      <>
        <StyledText className="d-flex justify-content-center mt-2">
          Managed to keep up today?
        </StyledText>
        <div className="d-flex flex-row justify-content-around p-2">
          <StyledButton type="primary" onClick={handleSuccess}>
            <MoodIcon />
          </StyledButton>
          <br />
          <StyledButton type="secondary"><MoodBadIcon/></StyledButton >
        </div>
      </>
    );

  // display the current challenge or go to vote message
  var showCurrentChallenge = currChallenge ? (
    currChallenge === "noChallenge" ? (
      <InfoBoxDiv id="current_challenge_box">
        <div className="row">
          <StyledText>Current challenge</StyledText>
          <StyledTitle type={"subtitle"}>
            <b>No challenge selected</b>
          </StyledTitle>
          <StyledText>Suggest your group a new challenge!</StyledText>
          <div className="d-flex justify-content-end p-2">
            <StyledButton
              type="primary"
              wide="true"
              onClick={() => {
                if (dimentions.width < 500) {
                  history.push("/mobile/challenges");
                } else {
                  history.push("/user/challenges");
                }
              }}
            >
              Choose a challenge
            </StyledButton>
          </div>
        </div>
      </InfoBoxDiv>
    ) : (
      <InfoBoxDiv id="current_challenge_box">
        <div className="row">
          <StyledText>Current challenge</StyledText>
          <StyledTitle type={"subtitle"} size="22">
            <b>{currChallenge.challengeName}</b>
          </StyledTitle>
          <StyledText size="15">{currChallenge.description}</StyledText>
          {groupData && groupData.timeStampEnd2 && <ChallengeTimer />}
          {successButton}
        </div>
      </InfoBoxDiv>
    )
  ) : (
    <InfoBoxDiv>
      <StyledText>Loading...</StyledText>
    </InfoBoxDiv>
  );

  // Last step of currChallenge proccess
  var whatToDisplay = groupData ? (
    groupData.countGroup === 1 ? (
      <InfoBoxDiv id="current_challenge_box">
        <div className="row">
          <StyledText>Current challenge</StyledText>
          <StyledTitle type={"subtitle"}>
            <b>Your group is empty 😭</b>
          </StyledTitle>
          <StyledText>
            Invite your friends to start the journey
          </StyledText>
        </div>
      </InfoBoxDiv>
    ) : (
      showCurrentChallenge
    )
  ) : (
    <InfoBoxDiv></InfoBoxDiv>
  );

  if (type === "groupAdd") {
    // Add members to group when there is only 1 member
    if (groupCount === 1) {
      return (
        <InfoBoxDiv className="d-flex flex-column">
          <StyledText>Oh no, looks like your your group is empty</StyledText>
          <StyledTitle type={"subtitle"}>Invite friends to the group</StyledTitle>
          <div className="d-flex flex-row justify-content-evenly w-50 pt-3 pb-">
            <LinkIcon style={{ fill: "#E71C7D", cursor:'pointer' }} 
            fontSize="large" 
            onClick={() => { copyGroupCode()}} />
            <WhatsappShareButton
              title="Join My Group"
              url={urlJG}
            >
              <WhatsAppIcon style={{ fill: "#E71C7D" }} fontSize="large" />
            </WhatsappShareButton>
          </div>
          <div>
            <StyledText id="indicationCopy" className="group_code_text"></StyledText>
          </div>
        </InfoBoxDiv>
      );
    } else {
      // Add members to group when there are at least 2 members
      return (
        <InfoBoxDiv className="d-flex flex-column">
          <StyledText>Share group code</StyledText>
          <StyledTitle type={"subtitle"}>Make your group bigger and stronger</StyledTitle>
          <div className="d-flex flex-row justify-content-between">
          <LinkIcon style={{ fill: "#E71C7D", cursor:'pointer' }} 
            fontSize="large" 
            onClick={() => { copyGroupCode() }} />
            <WhatsappShareButton
              title="Join My Group"
              url={urlJG}
            >
              <WhatsAppIcon style={{ fill: "#E71C7D" }} />
            </WhatsappShareButton>
          </div>
        </InfoBoxDiv>
      );
    }
  } else if (type === "statBox") {

    function GetAvatar() {
      if (userLevel == "1") {
        return SugarPile
      }
      else if (userLevel == "2") {
        return SugarCube
      }
      else if (userLevel == "3") {
        return Marshmellow
      }
      else {
        return ""
      }
    }
    return (
      <InfoBoxDiv className="d-flex flex-column justify-content-between">
        <StyledText>My Stats</StyledText>
        <div className="d-flex flex-row justify-content-between align-items-center w-100 px-3 py-1">
          <StyledTitle type={"subtitle"}>Level&nbsp;</StyledTitle>
          <img src={GetAvatar()} className="d-flex w-25"/>
        </div>
        <div className="d-flex flex-row justify-content-between w-100 px-3 py-1">
          <StyledTitle type={"subtitle"}>Total points&nbsp;</StyledTitle>
          <StyledTitle className="d-flex m-3" type={"subtitle"} color={"#00397B"}>{userScore}</StyledTitle>
        </div>
        <div className="d-flex flex-row justify-content-between w-100 px-3 py-1">
          <StyledTitle type={"subtitle"}>Total challenges&nbsp;</StyledTitle>
          <StyledTitle type={"subtitle"} color={"#00397B"}>{userChallenges}</StyledTitle>
        </div>
      </InfoBoxDiv>
    );
  } else if (type === "currChallenge") {
    return (
      <div>
        {whatToDisplay}
      </div>
    );
  } else {
    return (
      <div>default</div>
    )
  }

}