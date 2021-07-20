import React, { useState, useEffect } from "react";
import Yellow from "../../components/svgs/mobileBackgrounds/Yellow.svg";
import { BackgroundCircle, FlyingBox, StyledTitle, StyledText, StyledButton } from "../../components/designSystem/mobileDS";
import { ChallengesDiv } from "../../components/mobileComponents/Challenges/ChallengesDiv";
import { Button, DisableButton } from "../../components/button/button";
import {getChallengeDocumentData, generateVotesDocument, notiForGroupMembers} from "../../server/firebaseTools";
import {getVoteDocData} from "../../server/firebaseTools";

// types of notifications
const MEMBER_VOTED = 1;

export default function MobileChallenges() {
    return (
        <>
            <FlyingBox zindx={1} top={50}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <StyledTitle type={"title"} mode={"over dark"}>Open Challenges</StyledTitle>
                    <ChallengesDiv />
                </div>
            </FlyingBox>

            <BackgroundCircle src={Yellow} alt="Upper background color" />
        </>
    );
}