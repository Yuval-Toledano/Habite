import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Orange from "../../components/svgs/mobileBackgrounds/Orange.svg";
import { BackgroundCircle, FlyingBox, StyledText, StyledTitle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";
import { MobileUserDetailsHeader } from "../../components/mobileUserDetailesHeader/mobileUserDetailsHeader";

export default function MobileAchievements() {

    return (
        <>
            <FlyingBox zindx={1} top={50}>
                <StyledTitle type={"title"} mode={"over_dark"}>Achievements</StyledTitle>
                <MobileInfoBox type="statBox" />
                <div>&nbsp;</div>
            </FlyingBox>

            <BackgroundCircle src={Orange} alt="Upper background color" />
        </>
    );
}