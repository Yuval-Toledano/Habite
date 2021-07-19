import React, { useState, useEffect } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle, FlyingBox, StyledText, StyledTitle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";
import { MobileUserDetailsHeader } from "../../components/mobileUserDetailesHeader/mobileUserDetailsHeader";

export default function MobileOverview() {
    return (
        <>
            <FlyingBox zindx={1} top={50}>
                <MobileUserDetailsHeader></MobileUserDetailsHeader>
                <TopThree />
                <MobileLeaderboard/>
                <MobileInfoBox type="groupAdd" />
                <MobileInfoBox type="statBox" />
                <MobileInfoBox type="currChallenge" />
            </FlyingBox>

            <BackgroundCircle src={Teal} alt="Upper background color" />
        </>
    );
}