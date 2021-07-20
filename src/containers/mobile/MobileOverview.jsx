import React from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle, FlyingBox } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";
import { MobileUserDetailsHeader } from "../../components/mobileUserDetailesHeader/mobileUserDetailsHeader";

export default function MobileOverview() {
    return (
        <>
            <FlyingBox zindx={1} top={50}>
                <MobileUserDetailsHeader></MobileUserDetailsHeader>
                <MobileInfoBox type="currChallenge" />
                <TopThree />
                <MobileLeaderboard/>
                <MobileInfoBox type="groupAdd" />
            </FlyingBox>

            <BackgroundCircle src={Teal} alt="Upper background color" />
        </>
    );
}