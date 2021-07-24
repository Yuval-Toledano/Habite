import React from 'react';
import SugarPile from "../../components/svgs/avatars/1-sugarPile.svg";
import SugarCube from "../../components/svgs/avatars/2-sugarCube.svg";
import Marshmellow from "../../components/svgs/avatars/3-marshmellow.svg";
import Dots from "../../components/svgs/avatars/AvatarProgressDots.svg";
import { PrevPeronalAvatarDiv, CurrPeronalAvatarDiv, IndicationText } from "../designSystem/common";

/**
 * display personal avatar
 */
export function PersonalAvatarRow(props) {
    return (
        <div className="row d-flex align-items-center">
            <div className="col-2">
                <div className="row justify-content-center"><IndicationText>Sugar Pile</IndicationText></div>
                <div className="row justify-content-center">
                    <PrevPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                        <img src={SugarPile} alt="Sugarpile"/>
                    </PrevPeronalAvatarDiv>
                </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
                <img src={Dots} alt="dots"/>
            </div>
            <div className="col-2">
            <div className="row justify-content-center"><IndicationText>Sugar Cube</IndicationText></div>
                <div className="row justify-content-center">
                    <PrevPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                        <img src={SugarCube} alt="Sugarcube"/>
                    </PrevPeronalAvatarDiv>
                </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
                <img src={Dots} alt="dots"/>
            </div>
            <div className="col-4">
                <CurrPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                    <img src={Marshmellow} alt="Marshmellow"/>
                </CurrPeronalAvatarDiv>
            </div>
        </div>
    );
}