import React, {useState, useEffect} from 'react';
import { auth } from "../../firebase"
import { useAuth } from "../../context/AuthContext";
import { getUserDocumentData } from "../../server/firebaseTools";
import { SubTitle, BadgeCollectionDiv, BadgePosterDiv} from "../designSystem/common";
import { Separator } from '../../components/marginer/marginer';
import SpoonFull from '../../components/svgs/Badges/sugarSpoonPoster.svg';
import Bottle from '../../components/svgs/Badges/bottlePoster.svg';
import NonGuilty from '../../components/svgs/Badges/dessertPoster.svg';

export function BadgeProgressCard(props) {

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

    return (
    <BadgeCollectionDiv>
        <div className="d-flex flex-column">
            <div>
                <SubTitle>
                <b>Take a look at your achievements so far:</b>
                </SubTitle>
            </div>
            <Separator className="mt-2"/>
            <BadgePosterDiv className="d-flex flex-row">
            {userBadges && userBadges.map((poster) => {

                  return (
                     <div className="BadgePosterDiv d-flex m-3">
                         <img src={poster} alt="Badge poster" style={{height: "20rem"}}/>
                     </div>
                  );
                })}
            </BadgePosterDiv>
        </div>
    </BadgeCollectionDiv>
    );
    }