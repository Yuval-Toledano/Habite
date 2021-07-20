import React from 'react';
import { StatBoxContainer, StatBoxNumber, StatBoxText } from "../designSystem/common";
import CrownLogo from "../../components/svgs/topThreeSvgs/crown.svg";

export function PersonalStatBox(props) {
    return (
        <StatBoxContainer>
            <div className="row">
                <div className="col-2">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <img src={CrownLogo} alt="Crown Logo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <StatBoxNumber>{props.title}</StatBoxNumber>
                        </div>
                    </div>
                </div>
                <div className="col-10 d-flex justify-content-start align-items-center">
                    <StatBoxText>{props.subtitle}</StatBoxText>
                </div>
            </div>
        </StatBoxContainer>
    );
}