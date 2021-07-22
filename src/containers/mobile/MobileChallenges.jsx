import React from "react";
import Yellow from "../../components/svgs/mobileBackgrounds/Yellow.svg";
import NotificationBar from "../../components/MobileNotification/MobileBar";
import { BackgroundCircle, FlyingBox, StyledTitle } from "../../components/designSystem/mobileDS";
import { ChallengesDiv } from "../../components/mobileComponents/Challenges/ChallengesDiv";
import { useLocation} from "react-router-dom";


export default function MobileChallenges() {
    
    const location = useLocation();

    if(location){
        console.log("test test test: ", location)
    }

    

    return (
        <>
            {/* NotificationBar starts here */}
            <NotificationBar/>
            {/* NotificationBar ends here */}
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