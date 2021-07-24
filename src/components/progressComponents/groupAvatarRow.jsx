import React from 'react';
import SugarPile from "../../components/svgs/avatars/1-sugarPile.svg";
import SugarCube from "../../components/svgs/avatars/2-sugarCube.svg";
import Marshmellow from "../../components/svgs/avatars/3-marshmellow.svg";
import { PrevPeronalAvatarDiv, CurrPeronalAvatarDiv, IndicationText } from "../designSystem/common";

/**
 * web avatars display
 */
export function GroupAvatarRow(props) {
    return (
        <div className="row d-flex align-items-center">
            <div className="row d-flex justify-content-between">
                <div className="col-2 d-flex justify-content-center">
                    <div className="row justify-content-center"><IndicationText>Augustus</IndicationText></div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <div className="row justify-content-center"><IndicationText>Violet</IndicationText></div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <div className="row justify-content-center"><IndicationText>Oompa Lumpa</IndicationText></div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <div className="row justify-content-center"><IndicationText>Charlie</IndicationText></div>
                </div>
            </div>
            <div className="row d-flex justify-content-between">
                <div className="col-2 d-flex align-items-center">
                    <div className="row justify-content-center">
                        <PrevPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                            <img src={SugarPile} alt="Sugarpile"/>
                        </PrevPeronalAvatarDiv>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <div className="row justify-content-center">
                        <PrevPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                            <img src={SugarCube} alt="Sugarcube"/>
                        </PrevPeronalAvatarDiv>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <div className="row d-flex justify-content-center">
                        <PrevPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                            <img src={SugarCube} alt="Sugarcube"/>
                        </PrevPeronalAvatarDiv>
                    </div>
                </div>
                <div className="col-4 d-flex align-items-center">
                    <div className="row d-flex align-items-center justify-content-center">
                        <CurrPeronalAvatarDiv className="d-flex align-items-center justify-content-center">
                            <img src={Marshmellow} alt="Marshmellow"/>
                        </CurrPeronalAvatarDiv>
                    </div>
                </div>
            </div>
        </div>
    );
}