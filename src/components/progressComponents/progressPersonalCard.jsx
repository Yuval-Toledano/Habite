import React, { useEffect, useState } from "react";
import { auth } from "../../firebase"
import { getGroupDocumentData, getUserDocumentData } from "../../server/firebaseTools";
import { VoteBox, SubTitle } from "../designSystem/common";
import { PersonalStatBox } from "./personalStatBox";
import { PersonalAvatarRow } from "./personalAvatarRow";
import { Separator } from '../../components/marginer/marginer';

/**
 * Single Group Stat Box component
 */
export function PersonalProgressCard() {

  // data variables of the user and group
  const [currUser, setCurrUser] = useState();
  const [currGroup, setCurrGroup] = useState();
  
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

  useEffect(() => {
    // The function gets the data of the group from the database
  const fetchGroup = () => {
      if (currUser == null) {
        return;
      }
      const groupPromise = getGroupDocumentData(currUser.groupId);
      groupPromise.then((doc) => {
        if (doc.exists) {
          const groupData = { ...doc.data(), id: doc.id };
          setCurrGroup(groupData);
        } else{console.log("document does not exist");}
      });
    };
    fetchGroup();
   
}, [currUser])

  // saving the relevant details in specific variables
  const level = currUser ? currUser.level : " "
  const score = currUser ? currUser.score : " "
  const challenges = currGroup ? currGroup.pastChallenges.length : " ";
  
  return (
      <VoteBox>
      <div className="row">
        <SubTitle>
          <b>Nice work, keep going!</b>
        </SubTitle>
        <Separator className="mt-2"/>
        <div className="Row">
          <PersonalAvatarRow />
        </div>
        <Separator className="mt-4"/>
        <div className="statCardSection row">
          <div className="StatRow row">
            <div className="col-4">
              <PersonalStatBox className="" title={challenges} subtitle="Challenges completed"/>
            </div>
            <div className="col-4">
              <PersonalStatBox className="" title={level} subtitle="Character level"/>
            </div>
            <div className="col-4">
                <PersonalStatBox className="" title={score} subtitle="Points overall"/>
            </div>
          </div>
        </div>
      </div>
      </VoteBox>
  );
}
