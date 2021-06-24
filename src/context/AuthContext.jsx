import React, { useState, useEffect, useContext } from "react";
import { auth, db} from "../firebase";
import {
  generateUserDocument,
  generateGroupDocument,
  generateUserInGroupDocument,
  updatedUserInfo,
  getUserDocumentData,
  getGroupMembersData,
  getGroupDocumentData,
} from "../server/firebaseTools";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [userData, setUserData] = useState();
  const [groupData, setGroupData] = useState();
  const [groupMemberData, setGroupMemberData] = useState();
  const [loadData, setLoadData] = useState(true);
  const [userName, setUserName] = useState("");

  const [updateVal, setUpdateVal] = useState(0);
  const [loading, setLoading] = useState(true);

  // The function creates new user and new group documents
  function signUpNG(email, password) {
    
    return auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
             db.doc(`users/${user.user.uid}`).set({
                email: email,
                challengeVotes: [],
                notification: [],
                score: 0,
                level: 1,
                groupId: user.user.uid,
            })
            db.doc(`groups/${user.user.uid}`).set({
                usersInGroup: [user.user.uid],
                countGroup: 1,
                currentChallenge: "",
                approvedChallenges: [],
                pastChallenges: [],
        })})
        
}

  // The function creates new user and updates the group info
  async function signUpJG(email, password, groupId) {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          generateUserDocument(user, user.user.uid);
          generateUserInGroupDocument(user.user.uid, groupId);
        });
    } catch (error) {
      console.error("Error with signUp join group: " + error);
    }
  }

  // the function update the user's document with new info
  function updateUserInfo(name, image) {
    updatedUserInfo(name, image, currUser.uid);
  }

  function logOut() {
    setUserData(null);
    setGroupData(null);
    setGroupMemberData(null);
    return auth.signOut();
  }

  function forceRender() {
      setUpdateVal(prevVal => prevVal + 1)
  }

  useEffect(() => {
      setLoadData(true)
      const fetchData = async () => {
        if(currUser){
            db.collection("users").doc(currUser.uid).get().then(user =>{
                const dataUser = {...user.data(), id: user.id}
                setUserData(dataUser)
                db.collection("groups").doc(user.data().groupId).get().then(group =>{
                    const dataGroup = {...group.data(), id: group.id}
                    setGroupData(dataGroup)
                    setLoadData(false)
                })
            })
        } else {
            setLoadData(false)
        }
      }
      fetchData();
  }, [currUser, userName])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currUser,
    userData,
    groupData,
    groupMemberData,
    signUpNG,
    signUpJG,
    updateUserInfo,
    logOut,
    forceRender,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && !loadData && children}
    </AuthContext.Provider>
  );
}
