import React from "react";
import { FlyingBox, SingleRuleDiv, StyledTitle, StyledText } from "../../components/designSystem/mobileDS";
import NotificationBarBlack from "../../components/MobileNotification/NotificationBarBlack";
import { BackgroundRules } from "../../components/designSystem/mobileDS";
import SugarCube from "../../components/svgs/avatars/2-sugarCube.svg";


export default function MobileRules() {
    return (
        <>
            {/* NotificationBar starts here */}
            <NotificationBarBlack/>
            {/* NotificationBar ends here */}

            <FlyingBox zindx={1} top={50}>
                <div className="d-flex flex-column align-items-center mb-4">
                    <StyledTitle type="title">Game Rules</StyledTitle>
                    <SingleRuleDiv className="d-flex flex-column m-2">
                        <StyledTitle type="subtitle" size="20">1. Form a new group or join an existing one</StyledTitle>
                        <StyledText>We recommend having at least 3 members to enjoy all app features</StyledText>
                    </SingleRuleDiv>
                    <SingleRuleDiv className="d-flex flex-column m-2">
                        <StyledTitle type="subtitle" size="20">2. Start a new challenge together</StyledTitle>
                        <StyledText>Challenges will be chosen through a majority vote (to keep you on your toes...)</StyledText>
                    </SingleRuleDiv>
                    <SingleRuleDiv className="d-flex flex-column m-2">
                        <StyledTitle type="subtitle" size="20">3. Share your progress with the group members</StyledTitle>
                        <StyledText>To earn points you'll need to report daily if you managed to fulfill the challenge</StyledText>
                    </SingleRuleDiv>
                    <SingleRuleDiv className="d-flex flex-column m-2">
                        <StyledTitle type="subtitle" size="20">4. Rinse and repeat!</StyledTitle>
                        <StyledText>Remember: the goal is not to stop consuming sugar completely, but to consume it wisely. May the force be with you!</StyledText>
                    </SingleRuleDiv>
                    <div className="d-flex flex-column m-2 w-25">
                        <img src={SugarCube} alt="Sugar cube"/>
                    </div>
                </div>
            </FlyingBox>

            <BackgroundRules alt="Upper background color" />
        </>
    );
}