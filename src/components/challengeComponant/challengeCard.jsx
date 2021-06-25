import React, { useEffect, useState } from "react";
import { ChallengeBoard, SubTitle, IndicationText, SingleVoter, TextInPage } from "../designSystem/common";
import { Button, DisableButton } from "../../components/button/button";
import {useAuth} from "../../context/AuthContext";
import {getChallengeDocumentData, generateVotesDocument, notiForGroupMembers} from "../../server/firebaseTools";

// types of notifications
const MEMBER_VOTED = 1;


export function ChallengeCard(props) {
    const { curr } = props;
    const [challenge, setChallenge] = useState(null);
    const [votersPhotos, setVotersPhotos] = useState([]);
    const [isDisabled, setDisabled] = useState(false);
    const {userData, groupMemberData, forceRender, updateVal} = useAuth();
  
    useEffect(() => {
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
  
    // useEffect(() => {
    //   const fetchVotersPhotos = () => {
    //     if (currUser == null || challenge == null) {
    //       return;
    //     }
    //     const votePromise = getVoteDocData(challenge.id, currUser.groupId);
    //     votePromise.then(async (doc) => {
    //       if (doc != null) {
    //         const votersId = doc.votersId.filter((id) => id !== currUser.id);
  
    //         const usersPromiseArr = votersId.map((userId) => {
    //           const userPromise = getUserDocumentData(userId);
    //           const userData = userPromise.then((doc) => {
    //             return { ...doc.data(), id: doc.id };
    //           });
    //           return userData;
    //         });
  
    //         var usersData = await Promise.all(usersPromiseArr);
    //         const usersUrlPhotoPromiseArr = usersData.map((user) =>
    //           downloadImg(user)
    //         );
    //         var usersUrlPhoto = await Promise.all(usersUrlPhotoPromiseArr);
    //         setVotersPhotos(usersUrlPhoto);
    //       } else {
    //         console.log("vote document does not exist");
    //         setVotersPhotos([]);
    //       }
    //     });
    //   };
  
    //   fetchVotersPhotos();
    // }, [challenge, currUser]);
  
    const handleVote = (event) => {
      event.preventDefault();
      setDisabled(true);
      generateVotesDocument(userData, challenge);
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
  
    if (!challenge) {
      return <div></div>;
    }
  
    const button = isDisabled ? (
      <DisableButton>I'm in</DisableButton>
    ) : (
      <Button onClick={handleVote}>
        I'm in
      </Button>
    );
  
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
            See how group members voted:
          </IndicationText>
          <div className="d-flex flex-row justify-content-between">
            <div className="">
              {votersPhotos &&
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
                })}
            </div>
            <div className="in-out-buttons justify-content-end">
              {button}
            </div>
          </div>
        </div>
      </ChallengeBoard>
    );
  }