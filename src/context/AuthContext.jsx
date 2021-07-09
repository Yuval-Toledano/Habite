import React, { useState, useEffect, useContext, useRef } from "react";
import firebase from "firebase/app";
import { auth, db, storage} from "../firebase";
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
    //add profile picture to firebase storage.
    const userImagePath = "users/" + email + "/profile";
        return storage.ref(userImagePath).put(pic).on(
          "state_changed",
          (snapshot) => {}, 
          error => {console.log("Error adding image to storage", error)},
          () => {
            storage.ref(userImagePath).getDownloadURL().then((url) => {
              // creates user
              auth.createUserWithEmailAndPassword(email, password).then((user) => {
                db.doc(`users/${user.user.uid}`).set({
                  email: email,
                  challengeVotes: [],
                  notification: [],
                  score: 0,
                  level: 1,
                  groupId: user.user.uid,
                  userName: name,
                  profilePic: url,
                  successChallenge: []
                });
                // creates group
                db.doc(`groups/${user.user.uid}`).set({
                  usersInGroup: [user.user.uid],
                  countGroup: 1,
                  currentChallenge: "",
                  approvedChallenges: [],
                  pastChallenges: [],
            })
          }
        )
        })})  
  }

  // The function creates new user and updates the group info
  async function signUpJG(email, password, groupId, name, pic) {
      //add profile picture to firebase storage.
       const userImagePath = "users/" + email + "/profile";
        return storage.ref(userImagePath).put(pic).on(
          "state_changed",
          (snapshot) => {}, 
          error => {console.log("Error adding image to storage", error)},
          () => {
            storage.ref(userImagePath).getDownloadURL().then((url) => {
              // creates user
              auth.createUserWithEmailAndPassword(email, password).then( async (user) => {
                db.doc(`users/${user.user.uid}`).set({
                  email: email,
                  challengeVotes: [],
                  notification: [],
                  score: 0,
                  level: 1,
                  groupId: groupId,
                  userName: name,
                  profilePic: url,
                  successChallenge: []
                });
                // update group
                const groupRef = db.collection("groups").doc(groupId)
                  groupRef.update({
                    usersInGroup: firebase.firestore.FieldValue.arrayUnion(user.user.uid),
                    countGroup: increment,
                  })
                  // .then(() => {
                  //   console.log("check groupref: ", groupRef.get())
                  //   groupRef.get().then(doc => {
                  //         console.log("check doc: ", doc)
                  //         console.log("check doc: ", doc.currentChallenge)
                  //         if (doc.currentChallenge){
                            
                  //           db.collection("challengeLog").add({
                  //           groupId: doc.id,
                  //           userId: user.user.uid,
                  //           challengeId: doc.currentChallenge,
                  //           counterSuccess: 0,
                  //           dateSuccess: null,
                  //         });
                  //       }
                  //       forceRender();
                  //     })
                  // }).catch(err => console.log("Error with update group", err));
                  
                  // adding challenge log if current challenge exists already
                  //console.log("check what is groupref: ",groupRef.get())
                  //const currChallenge = groupRef.get().currentChallenge 
                  //console.log("check what is challenge: ",groupRef.get().currentChallenge)
                  const data = await groupRef.get()
                  console.log("check data: ", data)
                  if (data.data().currentChallenge) {
                    db.collection("challengeLog").add({
                      groupId: data.data().id,
                      userId: user.user.uid,
                      challengeId: data.data().currentChallenge,
                      counterSuccess: 0,
                      dateSuccess: null,
                    }).then(() => forceRender());
                  }
                
              }).catch(err => console.log("Error with join group: ", err));
            })
          }
        )
  }

  function logIn(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  // the function sign out the user
  function logOut() {
    return auth.signOut().then(() => {
      setUserId(null);
      setUserData(null);
      setGroupData(null);
      setGroupMemberData([]);
    });
  }

  // the function force page render
  function forceRender() {
    setUpdateVal((prevVal) => prevVal + 1);
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;}


  useEffect(() => {
    // the function load the user data from the db
    const fetchUser = async () => {
      if (userId) {
        db.collection("users")
          .doc(userId)
          .get()
          .then((user) => {
            const dataUser = { ...user.data(), id: user.id };
            if(Object.keys(dataUser).length < 8){
              forceRender();
              return;
            }
            setUserData(dataUser);
          });
      } else {
        console.log("ERROR: no userId")
        setUserData(null);
        setGroupData(null);
        setGroupMemberData([]);
        setLoadData(false);
      }
    };
    fetchUser();
  }, [userId, updateVal]);

  useEffect(() => {
    // the function load the group data and the group members data from the db
    const fetchGroup = () => {
      if (userData) {
        // load group data
        db.collection("groups")
          .doc(userData.groupId)
          .get()
          .then((group) => {
            const dataGroup = { ...group.data(), id: group.id };
            if(Object.keys(dataGroup).length < 5){
              forceRender();
              return;
            }
            setGroupData(dataGroup);
          });
        //load group members data
        const groupMembers = getGroupMembersData(userData.groupId);
        groupMembers.then((doc) => {
          setGroupMemberData(doc);
          setLoadData(false);
        });
      } else {
        console.log("no userData")
        // setUserId(null);
        setUserData(null);
        setGroupData(null);
        setGroupMemberData([]);
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
    loadData,
    signUpNG,
    signUpJG,
    logIn,
    logOut,
    forceRender,
    usePrevious
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && !loadData && children}
    </AuthContext.Provider>
  );
}
