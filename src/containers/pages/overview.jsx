import React, { useState, useEffect } from "react";
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
} from "../../components/button/button";
import { Separator, Marginer } from "../../components/marginer/marginer";
import {
  getChallengeDocumentData,
  updateNoti,
  updateCurrentChallenge,
  updateScore,
  notiForGroupMembers,
  generateChallengeLog,
} from "../../server/firebaseTools";
import { LeaderBoard } from "../../components/leaderBoard/leaderBoard";
import File_copy from "@material-ui/icons/FileCopy";
import styled from "styled-components";

const LeaderBoardContainer = styled.div`
  margin-top: 8px;
  justify-content: space-evenly;
`;

// types of notifications
const GO_VOTE = 0;
const MEMBER_VOTED = 1;
const MEMBER_SUCCESS = 2;
const NEW_CHALLENGE = 3;

const CLASSIC_UPDATE = 1;
const NO_APPROVED_UPDATE = 2;
const NO_CURR_UPDATE = 3;

export default function Overview() {
    const { userData, groupData, groupMemberData, forceRender, loadData } = useAuth();
    const [currChallenge, setCurrChallenge] = useState();
  const history = useHistory();

    console.log("group data in overview", groupData)
    console.log("group members data in overview", groupMemberData)
  useEffect(() => {
    // check if the the date is valid for the current challenge
    const isValidDate = () => {
      var date = Math.round(new Date().getTime() / 1000);
      return !(groupData.timeStampEnd2.seconds < date);
    };

    //gets current challenge to show
    const fetchChallenge = () => {
      if (!groupData ) {
          console.log('fetch challenge return', groupData)
        return;
      }
      const currentChallengeId = groupData.currentChallenge;

      if (currentChallengeId) {
          console.log("current challenge")
        // CASE 1: valid current challenge
        if (isValidDate()) {
          const challengePromise = getChallengeDocumentData(currentChallengeId);
          challengePromise.then((doc) => {
            if (doc.exists) {
              const challengeData = { ...doc.data(), id: doc.id };
              setCurrChallenge(challengeData);
            }
          });
        } else if (groupData.approvedChallenges.length !== 0) {
          // CASE 2: update new current challenge after curr is not valid
          updateCurrentChallenge(groupData, CLASSIC_UPDATE);

          const newChallengeId = groupData.approvedChallenges[0];
          // creates current challengeLog because there is a new current challenge
          generateChallengeLog(groupMemberData, newChallengeId);

          // send notification on a new current challenge for the group members
          notiForGroupMembers(groupMemberData, userData.id, NEW_CHALLENGE);

          // updates group members score and level if needed
          updateScore(groupMemberData, currentChallengeId);

          //gets the new current challenge
          const challengePromise = getChallengeDocumentData(newChallengeId);
          challengePromise.then((doc) => {
            if (doc.exists) {
              const challengeData = { ...doc.data(), id: doc.id };
              setCurrChallenge(challengeData);
            }
          });
        //   forceRender();
        } else {
          // CASE 3: update current challenge while the is not another challenge
          updateCurrentChallenge(groupData, NO_APPROVED_UPDATE);

          // updates group members score and level if needed
          updateScore(groupMemberData, currentChallengeId);

          //send notification go vote for challenges
          updateNoti(userData, GO_VOTE);
          setCurrChallenge("noChallenge");

        //   forceRender();
        }
      } else {
        if (groupData.approvedChallenges.length !== 0) {
          // CASE 4: init new current challenge
          updateCurrentChallenge(groupData, NO_CURR_UPDATE);

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
        //   forceRender();
        } else {
            console.log("case 5")
          // CASE 5: render message for voting
          setCurrChallenge("noChallenge");
          // send notification to the group members
          updateNoti(userData, GO_VOTE);
        // forceRender();
        }
      }
    };

    fetchChallenge();
  }, [userData, groupData]);

  // decide which button to display
//   var successButton =
//     disabledButton || loading ? (
//       <div></div>
//     ) : (
//       <>
//         <IndicationText>
//           Today you haven't documented anything yet.
//           <br />
//           How are you doing?
//         </IndicationText>
//         <div className="d-flex justify-content-around p-2">
//           <Button width="100%" onClick={handleSuccess}>
//             I succeeded today
//           </Button>
//           <br />
//           <SecondaryButton width="100%">I didn’t make it</SecondaryButton>
//         </div>
//       </>
//     );

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
                history.push("/user/challenges");
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
          {/* {successButton} */}
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
    var copyText = document.getElementById("groupCodeText").innerText;
    navigator.clipboard.writeText(copyText);
    document.getElementById("indicationCopy").innerHTML = "&nbsp;copied!";
  };

  console.log("current challenge: ", currChallenge)

  if(loadData){
    return(
      <IndicationText>Loading...</IndicationText>
    )
  }

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
                  color="#0890A7"
                >
                  <File_copy />
                </TextualButton>
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

          {/* Chart place start */}
          <div className="" id="progress_chart_box">
            <InfoBox>
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
                {/* <Chart
                      groupMembers={groupMembers}
                      challengeLogSuccess={challengeLogSuccess}
                    /> */}
              </div>

              <div className="col">Legend:</div>
            </InfoBox>
          </div>
          {/* Chart place end */}
        </div>
        {/* Charts secondary column end */}
      </div>
    </>
  );
}
