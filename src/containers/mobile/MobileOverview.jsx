import React, { useState, useEffect } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle, FlyingBox } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";

export default function MobileOverview() {
    return (
        <>
            <FlyingBox zindx={1} top={50}>
                <MobileInfoBox type="currChallenge" />
            </FlyingBox>
            <BackgroundCircle src={Teal} alt="Upper background color" />
        </>
    );
}