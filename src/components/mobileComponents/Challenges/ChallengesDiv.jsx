import React, {useEffect, useState} from "react";
import {getChallengesData} from "../../../server/firebaseTools";
import {useAuth} from "../../../context/AuthContext";
import { SingleChallengeDiv, ChallengeButton, StyledButton, StyledText, StyledTitle, VoterPhoto } from "../../designSystem/mobileDS";
import { generateVotesDocument, notiForGroupMembers, getVoteDocData} from "../../../server/firebaseTools";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

// types of notifications
const MEMBER_VOTED = 1;

export function SingleChallenge(props) {

  const [isOpen, setIsOpen] = useState(false);
  const { curr } = props;
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
        userVotes.includes(curr.id)
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };
    fetchUsersVotes();
  }, [userData, curr]);

  useEffect(() => {
    const fetchVotersPhotos = () => {
      if (userData == null || curr == null) {
        return;
      }
      const votePromise = getVoteDocData(curr.id, userData.groupId);
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
  }, [curr, userData, groupMemberData]);

  const handleVote = (event) => {
    event.preventDefault();
    setDisabled(true);
    // creates vote document with the user's vote
    generateVotesDocument(userData, curr, groupMemberData);
    //send notification to the other group members
    notiForGroupMembers(groupMemberData, userData.id, MEMBER_VOTED);
    forceRender();
  };

  const images = votersPhotos.length > 0 ? (
    votersPhotos.map((voter, index) => {
      return (
        <VoterPhoto key={index} className="single-voter"
            src={
              voter ||
              "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
            }
            alt="group member"
          >
        </VoterPhoto>
      );
    })) : <StyledText>No votes yet</StyledText>

  return (
      <SingleChallengeDiv className="collapsible d-flex flex-column">
          <ChallengeButton 
          className="d-flex flex-column"
          onClick={() => {setIsOpen(!isOpen)}}>
              <StyledTitle type="subtitle" size="20">{curr.challengeName}</StyledTitle>
              <div className="d-flex flex-row justify-content-between">
                <StyledText size="15">{curr.challengeXp} xp</StyledText>
                {isOpen ? <ExpandLessIcon style={{ color: "#E71C7D"}}/> : <ExpandMoreIcon style={{ color: "#E71C7D"}}/>}
              </div>
          </ChallengeButton>
          {isOpen && <div className="hidden content d-flex flex-column">
            <StyledText size="15">{curr.description}</StyledText>
            <div className="votes and buttons d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">{images}</div>
              {isDisabled ? <StyledText>Already voted</StyledText> :
                <StyledButton type="primary" onClick={handleVote} ><ThumbUpIcon style={{ color: "#ffffff"}}/></StyledButton>
              }
            </div>
          </div>}
      </SingleChallengeDiv>
  );
}


// ////////////////////////////// end of single challenge component /////////////////////////
// ////////////////////////////// Start of full challenge div component /////////////////////////


export function ChallengesDiv() {

    const [challenges, setChallenges] = useState([]);

    //gets the  10 challenges from db order by level
    useEffect(() => {
        const fetchChallenges = async () => {
          const challengesPromise = getChallengesData();
          challengesPromise.then((doc) => setChallenges(doc));
        };
        fetchChallenges();
      }, []);

    var displayChallenges = challenges ? (
        challenges.map((challenge) => {
          return (
            <SingleChallenge 
            key={challenge.id}
            curr={challenge}
            />
          );
        })
      ) : (
        <SingleChallengeDiv>
          <StyledText>Loading...</StyledText>
        </SingleChallengeDiv>
      );

    return (
        <div className="d-flex flex-column align-items-center">
            {displayChallenges}
        </div>
    );
}