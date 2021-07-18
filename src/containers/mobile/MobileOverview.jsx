import React, { useState, useEffect } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";

export default function MobileOverview() {
    return (
        <>
            <BackgroundCircle className="col 12" src={Teal} alt="Upper background color" />
            <div className="position-absolute">
                <TopThree />
            </div>
        </>
    );
}