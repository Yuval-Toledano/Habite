import React, { useState, useEffect } from "react";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import { BackgroundCircle } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";

export default function Overview() {
    return (

        <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column">
                <BackgroundCircle className="col 12" src={Teal} alt="Upper background color" />
                <MobileInfoBox type="statBox" />
                <h1>This is the mobile overview page</h1>
            </div>
        </div>
    );
}