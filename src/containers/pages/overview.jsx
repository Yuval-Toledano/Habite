import React, { useState, useEffect} from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  Title,
  SubTitle,
  InfoBox,
  IndicationText,
} from "../../components/designSystem/common";
import {
  Button,
  TextualButton,
  SecondaryButton,
} from "../../components/button/button";
import { Separator, Marginer } from "../../components/marginer/marginer";
import {
  getChallengeDocumentData,
  updateNoti,
  updateCurrentChallenge,
  updateScore,
  notiForGroupMembers,
  generateChallengeLog,
  updateSuccessChallengeLog,
  getChallengeLogData,
} from "../../server/firebaseTools";
import { LeaderBoard } from "../../components/leaderBoard/leaderBoard";
import FileCopy from "@material-ui/icons/FileCopy";
import styled from "styled-components";
// import Chart from "../../components/chart/chart";
import ChallengeTimer from "../../components/timer/challengeTimer";
import { WhatsappShareButton } from 'react-share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const LeaderBoardContainer = styled.div`
  margin-top: 8px;
  justify-content: space-evenly;
`;

// types of notifications
const GO_VOTE = 0;
const MEMBER_SUCCESS = 2;
const NEW_CHALLENGE = 3;
const CLASSIC_UPDATE = 1;
const NO_APPROVED_UPDATE = 2;
const NO_CURR_UPDATE = 3;


export default function Overview() {
  const { userData, groupData, groupMemberData, forceRender, loadData, updateVal} = useAuth();
  const [currChallenge, setCurrChallenge] = useState();
  // const [challengeLogSuccess, setChallengeLogSuccess] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const history = useHistory();

  const [successDate, setSuccessDate] = useState(); 
  const nowDate = new Date().getDate();
  //const [groupCode, setGroupCode] = useState()
  const [urlJG, setURL] = useState()
  
  useEffect(() => {
    if (groupData){
      setURL(`http://localhost:3001/signup/${groupData.id}`)
    }
  },[groupData])


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

  useEffect(() => {
    //check if the user already click the success button
    const checkDisabled = () => {
      if (userData == null || currChallenge == null || currChallenge === "noChallenge"){
        return;
      }
      
      var date = new Date();
      const disabled = successDate === date.getDate();
      setDisabledButton(disabled);
      
        }
    checkDisabled();
  }, [successDate, nowDate]);
  
  useEffect(() => {
    const fetchChallengeLog = async () => {
      if(groupMemberData == null || currChallenge == null || currChallenge === "noChallenge"){
        return;
      }
      const usersChallengeLogPromise = groupMemberData.map((user) => {
        const challengeLogPromise = getChallengeLogData(
          currChallenge.id,
          user.id
        ).then((doc) => {
          if (doc != null) {
            if (doc.userId === userData.id){
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
    
      if (challengeLogData.some(item => item === undefined)){
        // forceRender()
        return;
      }
      else {
        // setChallengeLogSuccess(challengeLogData);
      }
    }

    fetchChallengeLog();
  }, [currChallenge, groupMemberData, updateVal]);

    
  if(loadData){
    return(
      <IndicationText>Loading...</IndicationText>
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
        <IndicationText>
          Today you haven't documented anything yet.
          <br />
          How are you doing?
        </IndicationText>
        <div className="d-flex justify-content-around p-2">
          <Button width="100%" onClick={handleSuccess}>
            I succeeded today
          </Button>
          <br />
          <SecondaryButton width="100%">I didn’t make it</SecondaryButton>
        </div>
      </>
    );

  // display the current challenge or go to vote message
  var showCurrentChallenge = currChallenge ? (
    currChallenge === "noChallenge" ? (
      <InfoBox id="current_challenge_box">
        <div className="row">
          <IndicationText>Current challenge</IndicationText>
          <SubTitle>
            <b>No challenge selected</b>
          </SubTitle>
          <IndicationText>Suggest your group a new challenge!</IndicationText>
          <div className="d-flex justify-content-end p-2">
            <Button
              width="100%"
              onClick={() => {
                history.push("/challenges");
              }}
            >
              Choose a challenge
            </Button>
          </div>
        </div>
      </InfoBox>
    ) : (
      <InfoBox id="current_challenge_box">
        <div className="row">
          <IndicationText>Current challenge</IndicationText>
          <SubTitle>
            <b>{currChallenge.challengeName}</b>
          </SubTitle>
          <IndicationText>{currChallenge.description}</IndicationText>
          <Marginer direction="vertical" margin="16px"></Marginer>
          {groupData && groupData.timeStampEnd2 && <ChallengeTimer/>}
          <Marginer direction="vertical" margin="16px"></Marginer>
          {successButton}
        </div>
      </InfoBox>
    )
  ) : (
    <InfoBox>
      <IndicationText>Loading...</IndicationText>
    </InfoBox>
  );

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



  const copyGroupCode = () => {
    if (groupData.id){
      
      
    }
    
    var copyText = document.getElementById("groupCodeText").innerText;
    navigator.clipboard.writeText(copyText);
    document.getElementById("indicationCopy").innerHTML = "&nbsp;copied!";
  };

  
  return (
    <>
      <div className="content">
        {/* Page header */}
        <div className="header">
          <Title>Overview</Title>
          <SubTitle size={16}>
            Track your personal and your group’s progress throughout the
            challenges
          </SubTitle>
          <Separator />
        </div>
      </div>
      {/* Page content ends here */}
      <div className="row m-0">
        {/* Challenge primary column start */}
        <div className="col me-2 my-0">
          {/* Current challenge row start */}
          {whatToDisplay}
          {/* Leaderboard row start */}
          <div className="" id="leaderboard_box">
            <InfoBox>
              <IndicationText>Leaderboard</IndicationText>
              <LeaderBoardContainer className="d-flex flex-row">
                    <LeaderBoard/>
                  </LeaderBoardContainer>
            </InfoBox>
          </div>
          {/* Leaderboard row end */}
          {/* Current challenge row end */}

          {/* Group code row start */}
          <div className="" id="group_code_box">
            <InfoBox>
              <IndicationText>Share group code</IndicationText>
              <SubTitle className="title">
                <b>Make your group bigger & stronger</b>
              </SubTitle>
              <div className="d-flex flex-row">
                <div id="groupCodeText" className="group_code_div">
                  {groupData && groupData.id}
                </div>
                <TextualButton
                  id="btn_copy"
                  onClick={copyGroupCode}
                  color="#0890A7">
                  <FileCopy />
                </TextualButton>
                <WhatsappShareButton
                title="Join My Group"
                url= {urlJG}
                className="onHoverIconChange"
                >
                  <WhatsAppIcon style={{ fill: "#0890A7", onHover: "#FD35BD" }} fontSize="medium" />
                </WhatsappShareButton>
                <div id="indicationCopy" className="group_code_text"></div>
              </div>
            </InfoBox>
          </div>
          {/* Group code row end */}
        </div>
        {/* Challenge primary column end */}
        {/* ----------------------------------- */}
        {/* Charts secondary column start */}
        <div className="col me-2 my-0">

          {/* Chart place start */}
          <div className="" id="progress_chart_box">
            {/* <InfoBox>
              <div className="row">
                <IndicationText>Group progress</IndicationText>
                <SubTitle>
                  <b>Challenge success rate </b>
                </SubTitle>
                <IndicationText>
                  See how your friends are doing in this challenge
                </IndicationText>
              </div>

              <div className="col">
                {challengeLogSuccess && <Chart challengeLog={challengeLogSuccess}/>}
              </div>
            </InfoBox> */}
          </div>
          {/* Chart place end */}
        </div>
        {/* Charts secondary column end */}
      </div>
    </>
  );
}
