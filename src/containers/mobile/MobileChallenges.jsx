import React from "react";
import Yellow from "../../components/svgs/mobileBackgrounds/Yellow.svg";
import { BackgroundCircle, FlyingBox, StyledTitle } from "../../components/designSystem/mobileDS";
import { ChallengesDiv } from "../../components/mobileComponents/Challenges/ChallengesDiv";

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