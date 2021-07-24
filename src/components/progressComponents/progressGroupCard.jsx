import React, { useEffect, useState } from "react";
import { auth } from "../../firebase"
import { getGroupDocumentData, getGroupMembersData, getUserDocumentData } from "../../server/firebaseTools";
import { VoteBox, SubTitle } from "../designSystem/common";
import { GroupStatBox } from "./groupStatBox";
import { Separator } from '../../components/marginer/marginer';
import { GroupAvatarRow } from "./groupAvatarRow";


export function GroupProgressCard(props) {

  const [currUser, setCurrUser] = useState();
  const [currGroup, setCurrGroup] = useState();
  const [groupMembers, setGroupMembers] = useState();

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

  useEffect(() => {
    // The function gets the data of the group members from the database
    const fetchGroupMembers = () => {
     
    if (currGroup == null) {
      return;
    }
    const groupMembersPromise = getGroupMembersData(currGroup.id);
    groupMembersPromise.then((doc) => {
      const members = doc;
      setGroupMembers(members);
    });
  };
  fetchGroupMembers()
  }, [currGroup])

  const sumGroupScore = () => {
    if (groupMembers == null) {
      return
    } else {
      const scoresArr = groupMembers.map((member) => member.score)
      console.log(scoresArr)
      var totalScore = scoresArr.reduce((result,number)=> result+number);
      return totalScore
    }
  } 
  const challenges = currGroup ? currGroup.pastChallenges.length : " ";

  return (
      <VoteBox>
      <div className="row">
        <SubTitle>
          <b>Who’s the sweetest?</b>
        </SubTitle>
        <Separator className="mt-2"/>
        <div className="Row d-flex justify-content-end">
          <GroupAvatarRow />
        </div>
        <Separator className="mt-4"/>
        <div className="statCardSection row">
          <div className="StatRow row">
            <div className="col-6">
              <GroupStatBox className="" title={challenges} subtitle="Challenges completed by all group members"/>
            </div>
            <div className="col-6">
                <GroupStatBox className="" title={sumGroupScore()} subtitle="Points earned by the group members"/>
            </div>
            {/* <div className="col-6">
              <GroupStatBox className="" title="7" subtitle="Days of joint group streak"/>
            </div> */}
          </div>
          {/* <div className="StatRow row"> */}
            {/* <div className="col-6">
              <GroupStatBox className="" title="2" subtitle="Takeovers of the top spot in the last month"/>
            </div> */}
          {/* </div> */}
        </div>
      </div>
      </VoteBox>
  );
}
