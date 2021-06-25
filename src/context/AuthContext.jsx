import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import { auth, db } from "../firebase";
import {
  getGroupMembersData,
} from "../server/firebaseTools";

const AuthContext = React.createContext();
const increment = firebase.firestore.FieldValue.increment(1);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [groupData, setGroupData] = useState();
  const [groupMemberData, setGroupMemberData] = useState();
  const [loadData, setLoadData] = useState(true);

  const [updateVal, setUpdateVal] = useState(0);
  const [loading, setLoading] = useState(true);

  // The function creates new user and new group documents
  async function signUpNG(email, password, name, pic) {
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      db.doc(`users/${user.user.uid}`).set({
        email: email,
        challengeVotes: [],
        notification: [],
        score: 0,
        level: 1,
        groupId: user.user.uid,
        userName: name,
        profilePic: "",
      });
      db.doc(`groups/${user.user.uid}`).set({
        usersInGroup: [user.user.uid],
        countGroup: 1,
        currentChallenge: "",
        approvedChallenges: [],
        pastChallenges: [],
      });
    });
  }

  // The function creates new user and updates the group info
  async function signUpJG(email, password, groupId, name, pic) {
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      db.doc(`users/${user.user.uid}`).set({
        email: email,
        challengeVotes: [],
        notification: [],
        score: 0,
        level: 1,
        groupId: groupId,
        userName: name,
        profilePic: "",
      });
      const groupRef = db.collection("groups").doc(groupId)
        console.log("group ref", groupRef)
        groupRef.update({
          usersInGroup: firebase.firestore.FieldValue.arrayUnion(user.user.uid),
          countGroup: increment,
        }).catch(err => console.log("Error with update group", err));
        forceRender();
    }).catch(err => console.log("Error with join group: ", err));
  }

  // the function sign out the user
  function logOut() {
    setUserData(null);
    setGroupData(null);
    setGroupMemberData(null);
    return auth.signOut();
  }

  // the function force page render
  function forceRender() {
    setUpdateVal((prevVal) => prevVal + 1);
  }

  useEffect(() => {
    // setLoadData(true);
    // the function load the user data from the db
    const fetchUser = async () => {
      if (userId) {
        db.collection("users")
          .doc(userId)
          .get()
          .then((user) => {
            const dataUser = { ...user.data(), id: user.id };
            setUserData(dataUser);
          });
      } else {
        setUserData(null);
        setGroupData(null);
        setGroupMemberData(null);
        setLoadData(false);
      }
    };
    fetchUser();
  }, [userId, updateVal]);

  useEffect(() => {
    // setLoadData(true);
    // the function load the group data and the group members data from the db
    const fetchGroup = () => {
      if (userData) {
        // load group data
        db.collection("groups")
          .doc(userData.groupId)
          .get()
          .then((group) => {
            const dataGroup = { ...group.data(), id: group.id };
            setGroupData(dataGroup);
          });
        //load group members data
        const groupMembers = getGroupMembersData(userData.groupId);
        groupMembers.then((doc) => {
          setGroupMemberData(doc);
          setLoadData(false);
        });
      } else {
        setLoadData(false);
      }
    };
    fetchGroup();
  }, [userData, updateVal]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        setUserId(user.uid)
      }
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
    logOut,
    forceRender,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && !loadData && children}
    </AuthContext.Provider>
  );
}
