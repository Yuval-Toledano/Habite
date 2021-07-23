import React, { useEffect, useState } from "react";
import { ChallengeBoard, SubTitle, IndicationText, SingleVoter, TextInPage } from "../designSystem/common";
import { Button, DisableButton } from "../../components/button/button";
import {useAuth} from "../../context/AuthContext";
import {getChallengeDocumentData, generateVotesDocument, notiForGroupMembers} from "../../server/firebaseTools";
import {getVoteDocData} from "../../server/firebaseTools";

// types of notifications
const MEMBER_VOTED = 1;


export function ChallengeCard(props) {
    const { curr } = props;
    const [challenge, setChallenge] = useState(null);
    const [votersPhotos, setVotersPhotos] = useState([]);
    const [isDisabled, setDisabled] = useState(false);
    const {userData, groupMemberData, forceRender} = useAuth();
  
    useEffect(() => {
      // set disabled button if needed
      const fetchUsersVotes = () => {
        if (userData == null) {
          return;
        }
        const userVotes = userData.challengeVotes;
        if (
          userVotes &&
          userVotes.some((challengeIds) => challengeIds === curr)
        ) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      };
      fetchUsersVotes();
    }, [userData, curr]);
  
    useEffect(() => {
      // gets challenge data
      const fetchChallenge = () => {
        const challengePromise = getChallengeDocumentData(curr);
        challengePromise.then((doc) => {
          if (doc.exists) {
            setChallenge({ ...doc.data(), id: doc.id });
          } else {
            console.log("document does not exist");
          }
        });
      };
  
      if (curr) {
        fetchChallenge();
      }
    }, [curr]);
  
    useEffect(() => {
      const fetchVotersPhotos = () => {
        if (userData == null || challenge == null) {
          return;
        }
        // //TODO: ask about how its looking
        // setVotersPhotos([]);
        const votePromise = getVoteDocData(challenge.id, userData.groupId);
        votePromise.then(async (doc) => {
          if (doc != null) {
            const votersId = doc.votersId.filter((id) => id !== userData.id);
            let images = []
            groupMemberData.forEach((member) => {
              if (votersId.includes(member.id)){
                images.push(member.profilePic)
              }
            })
            setVotersPhotos(images);
          } else {
            setVotersPhotos([]);
          }
        })   
      };
  
      fetchVotersPhotos();
    }, [challenge, userData, groupMemberData]);
  
    const handleVote = (event) => {
      event.preventDefault();
      setDisabled(true);
      // creates vote document with the user's vote
      generateVotesDocument(userData, challenge, groupMemberData);
      //send notification to the other group members
      notiForGroupMembers(groupMemberData, userData.id, MEMBER_VOTED);
      forceRender();
    };
  
    function getLevel() {
      if (challenge.level === 1) {
        return "Beginner";
      } else if (challenge.level === 2) {
        return "Intermediate";
      } else {
        return "Advanced";
      }
    }
  
    const images = votersPhotos.length > 0 ? (
      votersPhotos.map((voter, index) => {
        return (
          <SingleVoter key={index} className="single-voter">
            <img
              src={
                voter ||
                "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
              }
              alt="group member"
              style={{
                height: "56px",
                borderRadius: "56px",
                border: "4px #FBE536 solid",
              }}
            ></img>
          </SingleVoter>
        );
      })) : <div>no group member voted for this challenge</div>
    
    const button = isDisabled ? (
      <DisableButton>I'm in</DisableButton>
      ) : (
        <Button onClick={handleVote}>
        I'm in
      </Button>
    );
    
    if (!challenge) {
      return <div></div>;
    }

    return (
      <ChallengeBoard>
        <SubTitle>
          <b>{challenge.challengeName}</b>
        </SubTitle>
        <div className="row">
          <div className="d-flex justify-content-between border-bottom mb-3">
            <IndicationText>{challenge.challengeXp}XP</IndicationText>
            <IndicationText>Level: {getLevel()}</IndicationText>
            <IndicationText>Duration: {challenge.duration} Days</IndicationText>
          </div>
        </div>
        {/* <Separator className="mt-2" /> */}
        <div className="row border-bottom mb-3">
          <TextInPage>{challenge.description}</TextInPage>
          <div className="mt-3">
            <IndicationText>Challenge Rewards:</IndicationText>
            <IndicationText>{challenge.rewards}</IndicationText>
          </div>
        </div>
        {/* <Separator /> */}
        <div className="row">
          <IndicationText className="">
            See who of your group members voted:
          </IndicationText>
          <div className="d-flex flex-row justify-content-between">
            <div className="">
              {images}
            </div>
            <div className="in-out-buttons justify-content-end">
              {button}
            </div>
          </div>
        </div>
      </ChallengeBoard>
    );
  }