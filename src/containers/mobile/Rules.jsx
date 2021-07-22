import React, { useState, useEffect } from "react";
import { FlyingBox, RulesPageDiv, SingleRuleDiv, StyledTitle, StyledText } from "../../components/designSystem/mobileDS";
import Pink from "../../components/svgs/mobileBackgrounds/Pink.svg";
import NotificationBar from "../../components/MobileNotification/MobileBar";
import { BackgroundCircle } from "../../components/designSystem/mobileDS";
import SugarCube from "../../components/svgs/avatars/2-sugarCube.svg";


export default function MobileRules() {
    return (
        <>
            {/* NotificationBar starts here */}
            <NotificationBar/>
            {/* NotificationBar ends here */}

            <FlyingBox zindx={1} top={50}>
                <div className="d-flex flex-column align-items-center">
                    <StyledTitle type="title">Game Rules</StyledTitle>
                    <RulesPageDiv className="d-flex mt-2">
                        <SingleRuleDiv className="d-flex flex-column m-2">
                            <StyledTitle type="subtitle" size="20">Form a new group or join an existing one</StyledTitle>
                            <StyledText>We recommend having at least 3 members to enjoy all app features</StyledText>
                        </SingleRuleDiv>
                        <SingleRuleDiv className="d-flex flex-column m-2">
                            <StyledTitle type="subtitle" size="20">Start a new challenge together</StyledTitle>
                            <StyledText>Challenges will be chosen through a majority vote (to keep you on your toes...)</StyledText>
                        </SingleRuleDiv>
                        <SingleRuleDiv className="d-flex flex-column m-2">
                            <StyledTitle type="subtitle" size="20">Share you progress with the group members</StyledTitle>
                            <StyledText>To earn points you'll need to report daily if you managed to fulfill the challenge</StyledText>
                        </SingleRuleDiv>
                        <SingleRuleDiv className="d-flex flex-column m-2">
                            <StyledTitle type="subtitle" size="20">Rinse and repeat!</StyledTitle>
                            <StyledText>Remember: the goal is not to stop consuming sugar completely, but to consume it wisely</StyledText>
                            
                        </SingleRuleDiv>
                    </RulesPageDiv>
                    <div className="d-flex flex-column m-4 justify-content-end align-self-stretch w-25">
                        <img src={SugarCube} alt="Sugar cube"/>
                    </div>
                </div>
            </FlyingBox>

            <BackgroundCircle src={Pink} alt="Upper background color" />
        </>
    );
}