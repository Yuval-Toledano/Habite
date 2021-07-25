import React, {useState, useEffect} from 'react';
import { auth } from "../../../firebase"
import { useAuth } from "../../../context/AuthContext";
import { getUserDocumentData } from "../../../server/firebaseTools";
import SpoonFull from '../../../components/svgs/Badges/sugarSpoonPoster.svg';
import Bottle from '../../../components/svgs/Badges/bottlePoster.svg';
import NonGuilty from '../../../components/svgs/Badges/dessertPoster.svg';
import { MobileBadgeDiv, StyledTitle } from "../../designSystem/mobileDS";

/**
 * mobile badge component
 */
export function MobileBadges(props) {

    const badgesArr = {"pEJUfZGBTNMObhPGPY0P": SpoonFull, "fJxrW00NGZqDVLcxhAv1": Bottle,
    "gp0L3ZobXb6cYT5oRGc4": NonGuilty}
    const [currUser, setCurrUser] = useState();
    const { userData } = useAuth()

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

    const userChallenges = userData ? userData.successChallenge : "No user data"
    var userBadges = [];

    for (var key in badgesArr) {
        if (userChallenges.indexOf(key) > -1) {
            userBadges.push(badgesArr[key]);
        }
    }

// Static poster for the live presentation - remove after!
return (
  <MobileBadgeDiv className="d-flex flex-column align-items-start">
      <div className="d-flex m-2">
          <StyledTitle type="subtitle" >Badges</StyledTitle>
      </div>
      <div className="d-flex flex-row">
        <div className="d-flex m-2">
            <img src={SpoonFull} alt="Badge poster" />
        </div>
        <div className="d-flex m-2">
            <img src={Bottle} alt="Badge poster" />
        </div>
        <div className="d-flex m-2">
            <img src={NonGuilty} alt="Badge poster" />
        </div>
      </div>
  </MobileBadgeDiv>
);

// return (
//     <MobileBadgeDiv className="d-flex flex-column align-items-start">
//         <div className="d-flex m-2">
//             <StyledTitle type="subtitle" >Badges</StyledTitle>
//         </div>
//         <div className="d-flex flex-row">
//         {userBadges && userBadges.map((poster) => {

//             return (
//             <div className="d-flex m-2">
//                 <img src={poster} alt="Badge poster" />
//             </div>
//             );
//         })}
//         </div>
//     </MobileBadgeDiv>
// );
}