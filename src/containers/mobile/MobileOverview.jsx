import React, { useState, useEffect } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";

export default function Overview() {
    return (

        <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column">
                <BackgroundCircle src={Teal} alt="Upper background color" />
                <MobileInfoBox subtitle="Challenge is on!" title="Surprise sugar attack-sauce" text="Find a sauce that contains more sugar than you thought (look at the ingridients!) and replace it #1" />
                <MobileInfoBox subtitle="Challenge is on!" title="Surprise sugar attack-sauce" text="Find a sauce that contains more sugar than you thought (look at the ingridients!) and replace it #1" />
                <h1>This is the mobile overview page</h1>
            </div>
        </div>
    );
}