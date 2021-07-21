import React from "react";
import { useAuth } from "../../context/AuthContext";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle, FlyingBox } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";
import { MobileUserDetailsHeader } from "../../components/mobileUserDetailesHeader/mobileUserDetailsHeader";

export default function MobileOverview() {

    const { groupData } = useAuth();
    const groupCount = groupData ? groupData.countGroup : "No group count";

    if (groupCount > 1) {
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
    } else {
        return (
            <>
                <FlyingBox zindx={1} top={50}>
                    <MobileUserDetailsHeader></MobileUserDetailsHeader>
                    <MobileInfoBox type="groupAdd" />
                </FlyingBox>
    
                <BackgroundCircle src={Teal} alt="Upper background color" />
            </>
        );
    }
}