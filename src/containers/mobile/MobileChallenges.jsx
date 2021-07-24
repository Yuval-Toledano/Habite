import React from "react";
import Yellow from "../../components/svgs/mobileBackgrounds/Yellow.svg";
import NotificationBarBlack from "../../components/MobileNotification/NotificationBarBlack";
import { BackgroundCircle, FlyingBox, StyledTitle, BackgroundRegular } from "../../components/designSystem/mobileDS";
import { ChallengesDiv } from "../../components/mobileComponents/Challenges/ChallengesDiv";
import { useLocation } from "react-router-dom";

// Mobile challenges container
export default function MobileChallenges() {

    return (
        <>
            {/* NotificationBar starts here */}
            <NotificationBarBlack />
            {/* NotificationBar ends here */}
            <FlyingBox zindx={1} top={50}>
                <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <StyledTitle type={"title"} mode={"over dark"}>Open Challenges</StyledTitle>
                    <ChallengesDiv />
                </div>
            </FlyingBox>

            <BackgroundCircle src={Yellow} alt="Upper background color" />
            <BackgroundRegular alt="Upper background color" />
        </>
    );
}