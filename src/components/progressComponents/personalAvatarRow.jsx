import React, {useState, useEffect} from 'react';
import { auth } from "../../firebase"
import { getUserDocumentData } from "../../server/firebaseTools";
import SugarPile from "../../components/svgs/avatars/1-sugarPile.svg";
import SugarCube from "../../components/svgs/avatars/2-sugarCube.svg";
import Marshmellow from "../../components/svgs/avatars/3-marshmellow.svg";
import Dots from "../../components/svgs/avatars/AvatarProgressDots.svg";
import { PrevPeronalAvatarDiv, CurrPeronalAvatarDiv, IndicationText } from "../designSystem/common";

/**
 * display personal avatar
 */
export function PersonalAvatarRow(props) {

    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        const loginUser = auth.currentUser;
        if (!loginUser) {
          console.log("no user is logged in");
          return;
        }
    
        // The function gets the data of the user from the database
        const fetchUser = (userId) => {
          const userPromise = getUserDocumentData(userId);
          userPromise.then((doc) => {
            if (doc.exists) {
              const userData = { ...doc.data(), id: doc.id };
              setCurrUser(userData);
              
            }
          });
        };
    
        fetchUser(loginUser.uid);      
      }, []);

    const userLevel = currUser ? currUser.level : "no cur user"

    if (userLevel == 1) {
        return (
            <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <IndicationText>Sugar Pile</IndicationText>
                    <CurrPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={SugarPile} alt="sugar pile"/>
                    </CurrPeronalAvatarDiv>
                </div>
            </div>
        );
    } else if (userLevel == 2) {
        return (
            <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <IndicationText>Sugar Pile</IndicationText>
                    <PrevPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={SugarPile} alt="sugar pile"/>
                    </PrevPeronalAvatarDiv>
                </div>
                <img src={Dots} alt="progress dots" className="m-5"/>
                <div className="d-flex flex-column align-items-center">
                    <IndicationText>Sugar Cube</IndicationText>
                    <CurrPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={SugarCube} alt="sugar cube"/>
                    </CurrPeronalAvatarDiv>
                </div>
            </div>
        );
    } else if (userLevel == 3) {
        return (
            <div className="d-flex flex-row align-items-center justify-content-around">
                <div className="d-flex flex-column align-items-center">
                    <IndicationText>Sugar Pile</IndicationText>
                    <PrevPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={SugarPile} alt="sugar pile"/>
                    </PrevPeronalAvatarDiv>
                </div>
                <img src={Dots} alt="progress dots" className="m-3"/>
                <div className="d-flex flex-column align-items-center">
                    <IndicationText>Sugar Cube</IndicationText>
                    <PrevPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={SugarCube} alt="sugar cube"/>
                    </PrevPeronalAvatarDiv>
                </div>
                <img src={Dots} alt="progress dots" className="m-3"/>
                <div className="d-flex flex-column align-items-center">
                    <IndicationText>Marshmellow</IndicationText>
                    <CurrPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={Marshmellow} alt="Marshmellow"/>
                    </CurrPeronalAvatarDiv>
                </div>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-row align-items-center">
                <IndicationText>Loading...</IndicationText>
            </div>
        );
    }
}