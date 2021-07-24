import React from 'react';
import { StatBoxContainer, StatBoxNumber, StatBoxText } from "../designSystem/common";
import TrophyLogo from "../../components/svgs/Trophy.svg";

/**
 * Single Group Stat Box component
 */
export function GroupStatBox(props) {
    // the component takes the data as props and positions it in the component
    return (
        <StatBoxContainer>
            <div className="row">
                <div className="col-2">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <img src={TrophyLogo} alt="Crown Logo" />
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