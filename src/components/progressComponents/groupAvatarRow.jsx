import React, {useEffect, useState} from 'react';
import { auth } from "../../firebase"
import { getGroupDocumentData, getGroupMembersData, getUserDocumentData } from "../../server/firebaseTools";
import SugarPile from "../../components/svgs/avatars/1-sugarPile.svg";
import SugarCube from "../../components/svgs/avatars/2-sugarCube.svg";
import Marshmellow from "../../components/svgs/avatars/3-marshmellow.svg";
import { PrevPeronalAvatarDiv, CurrPeronalAvatarDiv, IndicationText } from "../designSystem/common";


/**
 * GroupAvatarRow component
 */
export function GroupAvatarRow(props) {

    // variables for the user and group data
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

    // sorting the group array acording to level
    const sortedGroupMemberData = groupMembers ? [].concat(groupMembers) : false;
    if (sortedGroupMemberData) {
        sortedGroupMemberData.sort((a, b) => (a.level < b.level) ? 1 : -1);
    }

    // function for choosing the correct avatar according to the user's level
    function userAvatarPhoto(userLevel) {
        if (userLevel === 1) {
            return SugarPile;
        } else if (userLevel === 2) {
            return SugarCube;
        } else if (userLevel === 3) {
            return Marshmellow;
        } else {
            return "Level 4 and above";
        }
    }

    if (currUser != null && sortedGroupMemberData) {
        return (
            // leading user section (first on the left)
            <div className="d-flex flex-row align-items-center justify-content-evenly">
                <div className="d-flex flex-column align-items-center" id={currUser.id}>
                    <IndicationText>{sortedGroupMemberData[0].userName}</IndicationText>
                    <CurrPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                        <img src={userAvatarPhoto(sortedGroupMemberData[0].level)} alt="user avatar"/>
                    </CurrPeronalAvatarDiv>
                </div>
                {sortedGroupMemberData &&
                sortedGroupMemberData.slice(1,).map((member) => {
                    const userLevel = member.level
                // mapping the avatars of the other group members
                  return (
                      <div className="d-flex flex-column align-items-center" id={currUser.id}>
                          <IndicationText>{member.userName}</IndicationText>
                          <PrevPeronalAvatarDiv className="d-flex justify-content-center align-items-center m-2">
                            <img src={userAvatarPhoto(userLevel)} alt="user avatar"/>
                          </PrevPeronalAvatarDiv>
                      </div>
                  );
                })}
            </div>
        );
    } else {
      // handling cases in which data was not pulled from DB/place holders until data is pulled
        return (
            <IndicationText>Loading...</IndicationText>
        );
    }
}