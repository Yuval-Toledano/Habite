import React, { useState, useEffect } from "react";
import { StyledButton, StyledTitle, Link, StyledText, Logo } from "../../components/designSystem/mobileDS";
import Yellow from "../../components/svgs/mobileBackgrounds/Yellow.svg";
import { BackgroundCircle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";

export default function MobileChallenges() {
    return (
        <div>
            <BackgroundCircle src={Yellow} alt="Upper background color" style={{zIndex: 0}} />
            <div className="d-flex flex-column" style={{zIndex: 2}}>
                <StyledTitle type={"title"} mode={"over_dark"}>Challenges</StyledTitle>
                <MobileInfoBox subtitle="Challenge is on!" title="Surprise sugar attack-sauce" text="Find a sauce that contains more sugar than you thought (look at the ingridients!) and replace it #1" />
                <h1>This is the mobile challenges page</h1>
            </div>
            <Bottombar />
        </div>
    );
}