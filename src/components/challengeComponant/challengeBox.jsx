import React from "react";
import {
  ChallengeBoxContainer,
  IndicationText,
  SubTitle,
} from "../designSystem/common";
import { Marginer } from "../marginer/marginer";

export function ChallengeBox(props) {
  const {background, onClick, challenge} = props;

  return (
    <>
      <ChallengeBoxContainer
        background={background}
        onClick={onClick}
      >
        <SubTitle size="14"><b>{challenge.challengeName}</b></SubTitle>
        <IndicationText className="">{challenge.challengeXp}XP</IndicationText>
        <Marginer direction="vertical" margin={10} />
      </ChallengeBoxContainer>
    </>
  );
}