import firebase from "firebase/app";
import { db, auth, storage } from "../firebase";

/** INCREMENT FUNCTIONS **/
const increment = firebase.firestore.FieldValue.increment(1);
const increment130 = firebase.firestore.FieldValue.increment(130);
const increment50 = firebase.firestore.FieldValue.increment(50);
const increment100 = firebase.firestore.FieldValue.increment(100);
const increment70 = firebase.firestore.FieldValue.increment(70);

/** CONSTANTS **/

const CLASSIC_UPDATE = 1;
const NO_APPROVED_UPDATE = 2;
const NO_CURR_UPDATE = 3;

const TO_LEVEL_2 = 300;
const TO_LEVEL_3 = 700;

// types of notifications
const GO_VOTE = 0;
const MEMBER_VOTED = 1;
const MEMBER_SUCCESS = 2;
const NEW_CHALLENGE = 3;



/************************** AUTH FUNCTIONS **************************/

/**
 * The function creates new user document in the db
 */
export const generateUserDocument = async (user, groupId) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const email = user.user.email;
    console.log("email: " + email);
    const challengeVotes = [];
    const notification = [];
    const score = 0;
    const level = 1;
    try {
      await userRef.set({
        email,
        challengeVotes,
        notification,
        score,
        level,
        groupId: groupId,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

/**
 * The function creates new group document in the db
 */
export const generateGroupDocument = async (id) => {
  if (!id) return;

  const groupRef = db.doc(`groups/${id}`);
  const snapshot = await groupRef.get();

  if (!snapshot.exists) {
    var userId = [id];
    var challengeArr = [];
    var challengePastArr = [];
    try {
      await groupRef.set({
        usersInGroup: userId,
        countGroup: 1,
        currentChallenge: "",
        approvedChallenges: challengeArr,
        pastChallenges: challengePastArr,
      });
    } catch (error) {
      console.error("Error creating group document", error);
    }
  }
};

/**
 * The function adds new group member to the document in the db
 */
export const generateUserInGroupDocument = async (userId, groupCode) => {
  if (!userId) return;
  var groupIdRef = await db.collection("groups").doc(groupCode);
  groupIdRef.update({
    usersInGroup: firebase.firestore.FieldValue.arrayUnion(userId),
    countGroup: increment,
  });

  return;
};

/*
 * update user info to user's document.
 */
export const updatedUserInfo = (userName, profilePic, userId) => {  
    // add profile picture to firebase storage.
    const userImagePath = "users/" + userId + "/profile.jpg";
    const uploadTask = storage.ref(userImagePath).put(profilePic);  
    uploadTask.on("state_changed", 
    snapshot => {}, 
    error => {console.log("ERROR with upload profile picture ", error)},
    () => {
        storage.ref(userImagePath).getDownloadURL().then((url) => {
            var userPromise = getUserDocument(auth.currentUser.uid);
            userPromise.then((user) => {
              user.update({
                  userName: userName,
                  profilePic: url,
                })
                .then(() => {
                  console.log("Document successfully updated!");
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            });

        })
    }
    )
  
  };


/************************** GET & UPDATE FUNCTIONS **************************/

/*
 * the function takes docID and collection name and return a promise of the document.
 * the function does not return the doc, it returns the promise.
 * USAGE: to update the document do: get{*collection*}Document(docID).then((doc) => { doc.update({...}) })
 */
const getDocument = async (collection, id) => {
    const promiseDoc = await db.collection(collection).doc(id);
    return promiseDoc;
  };
  
  /*
   * the function takes docID - the id of the user - and return a promise of the document of the user.
   * the function does not return the doc, it returns the promise.
   * USAGE: to update the document do: getUserDocument(docID).then(doc => { doc.update({...})  })
   */
  export const getUserDocument = (userId) => {
    return getDocument("users", userId);
  };

  /*
 * the function takes docID and collection name and return a promise of the document.
 * the function does not return the doc, it returns the promise.
 * USAGE: to get the data of the document do: get{*collection*}Document(docID).then(doc => { //if(doc.exists) {do something with.doc.data() or doc.id} })
 */
export const getDocumentData = async (collection, id) => {
    const promiseDoc = await db.collection(collection).doc(id).get();
    return promiseDoc;
  };
  
  /*
   * the function takes docID - the id of the user - and return a promise of the document of the user.
   * the function does not return the doc, it returns the promise.
   * USAGE: to get the data of the document do: getUserDocument(docID).then(doc => { //if(doc.exists) {do something with.doc.data() or doc.id} })
   */
  export const getUserDocumentData = (userId) => {
    return getDocumentData("users", userId);
  };
  
  /*
   * the function takes docID - the id of the group - and return a promise of the document of the group.
   * the function does not return the doc, it returns the promise.
   * USAGE: to get the data of the document do: getGroupDocumentData(docID).then(doc => { //if(doc.exists) {do something with.doc.data() or doc.id} })
   */
  export const getGroupDocumentData = (groupId) => {
    return getDocumentData("groups", groupId);
  };

  /*
 * the function takes docID - the id of the group - and return a promise of the document of the group members.
 * the function does not return the doc, it returns the promise.
 * USAGE: to get the data of the document do: getGroupMembersData(docID).then(doc => { //if(doc.exists) {do something with.doc.data() or doc.id} })
 */
export const getGroupMembersData = async (groupId) => {
    // get all the members of the group
    const usersData = await db
      .collection("users")
      .where("groupId", "==", groupId)
      .get();
  
    // get the data of all the members of the group
    const arrGroupMemberData = usersData.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return arrGroupMemberData;
  };