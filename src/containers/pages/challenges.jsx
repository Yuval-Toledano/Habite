import React, {useEffect, useState} from "react";
import {
    Title,
    SubTitle,
    TextInPage,
  } from "../../components/designSystem/common";
import {Separator} from "../../components/marginer/marginer";
import { ChallengeCard } from "../../components/challengeComponant/challengeCard";
import {ChallengeBox} from "../../components/challengeComponant/challengeBox";
import {getChallengesData} from "../../server/firebaseTools";
import {useAuth} from "../../context/AuthContext";

export default function ChallengePage() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActiveMode] = useState(null);
  const [isFirst, setFirst] = useState(true);
  const [clicked, setClicked] = useState(null);

  const {forceRender} = useAuth();

  useEffect(() => {
    //gets the  10 challenges from db order by level
    const fetchChallenges = async () => {
      const challengesPromise = getChallengesData();
      challengesPromise.then((doc) => setChallenges(doc));
      setLoading(false);
    };
    fetchChallenges();
  }, []);

  function handleClick(id) {
    if (active === id) {
      setActiveMode("selected");
      setFirst(false);
    } else {
      setActiveMode(id);
      setFirst(false);
      setClicked(id);
      setCurrentChallenge(id);
      forceRender();
    }
  }

  function changeColor(id) {
    if (isFirst && id === challenges[0].id) {
      return "#FBE536;";
    } else if (active === id || clicked === id) {
      return "#FBE536;";
    } else {
      return "#FEFDFB;";
    }
  }

  function setDefaultChallenge() {
    if (challenges[0] && currentChallenge === null) {
      setCurrentChallenge(challenges[0].id);
    }
  }

  var currChallengeCard = loading ? (
    <TextInPage>Loading...</TextInPage>
  ) : (
    <ChallengeCard curr={currentChallenge} />
  );

  var displayChallenges = challenges ? (
    challenges.map((challenge) => {
      return (
        <ChallengeBox
          key={challenge.id}
          challenge={challenge}
          background={changeColor(challenge.id)}
          onClick={() => handleClick(challenge.id)}
        />
      );
    })
  ) : (
    <TextInPage>Loading...</TextInPage>
  );

  return (
    <div className="content">
      {setDefaultChallenge()}
      {/* Page top starts here */}
      <div className="header">
        {/* Page header */}
        <Title>Challenges</Title>
        <SubTitle size={16}>
          Offer your group to take challenges together to overcome sugar. A
          challenge will open if all group members vote in its favour.
        </SubTitle>
        <Separator />
      </div>
      {/* Page top ends here */}

      {/* Page middle-bottom starts here */}
      <div className="row">
        <div className="col-4 challengeBoxDiv">
          {displayChallenges}
        </div>
        <div className="col-8">
          {currChallengeCard}
        </div>
      </div>
    </div>
  );

}