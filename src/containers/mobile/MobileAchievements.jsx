import React, { useState, useEffect } from "react";
import { StyledButton, StyledTitle, Link, StyledText, Logo } from "../../components/designSystem/mobileDS";
import Orange from "../../components/svgs/mobileBackgrounds/Orange.svg";
import { BackgroundCircle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { Bottombar } from "../../components/mobileComponents/bottomBar/bottomBar";

export default function MobileAchievements() {
    return (
        <div>
            <div className="d-flex flex-column">
                <BackgroundCircle src={Orange} alt="Upper background color" />
                <MobileInfoBox subtitle="Challenge is on!" title="Surprise sugar attack-sauce" text="Find a sauce that contains more sugar than you thought (look at the ingridients!) and replace it #1" />
                <MobileInfoBox subtitle="Challenge is on!" title="Surprise sugar attack-sauce" text="Find a sauce that contains more sugar than you thought (look at the ingridients!) and replace it #1" />
                <h1>This is the mobile achievements page</h1>
            </div>
            <Bottombar />
        </div>
    );
}