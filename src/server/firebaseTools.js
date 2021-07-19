import firebase from "firebase/app";
import { db, auth, storage } from "../firebase";


/** INCREMENT FUNCTIONS **/
const increment = firebase.firestore.FieldValue.increment(1);
const increment5 = firebase.firestore.FieldValue.increment(5);
const increment10 = firebase.firestore.FieldValue.increment(10);
const increment15 = firebase.firestore.FieldValue.increment(15);
const increment20 = firebase.firestore.FieldValue.increment(20);

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
export const generateUserDocument = async (user, groupId, name, pic) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const email = user.email;
    const challengeVotes = [];
    const notification = [];
    const score = 0;
    const level = 1;
    try {
      await userRef.set({
        email: user.email,
        challengeVotes: [],
        notification: [],
        score: 0,
        level: 1,
        groupId: groupId,
        userName: name,
        profilePic: pic,
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
 * the function takes docID - the id of the vote - and return a promise of the document of the vote.
 * the function does not return the doc, it returns the promise.
 * USAGE: to update the document do: getVoteDocument(docID).then(doc => { doc.update({...})  })
 */
export const getVoteDocument = (voteId) => {
  return getDocument("votes", voteId);
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

  /*
 * the function takes docID - the id of the challenge - and return a promise of the document of the challenge.
 * the function does not return the doc, it returns the promise.
 * USAGE: to get the data of the document do: getChallengeDocumentData(docID).then(doc => { //if(doc.exists) {do something with.doc.data() or doc.id} })
 */
export const getChallengeDocumentData = (challengeId) => {
  return getDocumentData("challenges-autogenerated-ids", challengeId);
};


/*
 * the function takes docID - the id of the group - and return a promise of the document of the user.
 * the function does not return the doc, it returns the promise.
 * USAGE: to update the document do: getGroupDocument(docID).then(doc => { doc.update({...})  })
 */
export const getGroupDocument = (groupId) => {
  return getDocument("groups", groupId);
};

/*
 * the function takes docID - the id of the challengeLog - and return a promise of the document of the challengeLog.
 * the function does not return the doc, it returns the promise.
 * USAGE: to update the document do: getChallengeLogDocument(docID).then(doc => { doc.update({...})  })
 */
export const getChallengeLogDocument = (challengeLogId) => {
  return getDocument("challengeLog", challengeLogId);
};

/*
 * the function return a promise of challenge's documents.
 * the function does not return the doc, it returns the promise.
 * USAGE: to get the data of the document do: getChallengesData().then(doc => { doc is an array of challenges})
 */
export const getChallengesData = async () => {
  const challenges = await db
    .collection("challenges-autogenerated-ids")
    .orderBy("level")
    .limit(10)
    .get();
  const challengesArr = challenges.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return challengesArr;
};


/*
 * the function takes challengeId and groupId - and return a promise of the document of the vote.
 * the function does not return the doc, it returns the promise.
 * USAGE: to get the data of the document do: getVoteDocData(challengeId, groupId).then(doc => { //if(doc != null) {do something with.doc })
 * is it important to check if(doc != null)
 */
export const getVoteDocData = async (challengeId, groupId) => {
  const voteDoc = await db
    .collection("votes")
    .where("challengeId", "==", challengeId)
    .where("groupId", "==", groupId)
    .get();

  const votesArr = voteDoc.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return votesArr[0];

};

/**
 * The function creates new challengeLog object
 */
 export const generateChallengeLog = (groupMembers, challengeId) => {
  
  groupMembers.forEach((member) => {
    const logObjPromise = getChallengeLogData(challengeId, member.id)
    logObjPromise.then(async (logObj) => {
      if(!logObj) {
        await db.collection("challengeLog").add({
          groupId: member.groupId,
          userId: member.id,
          challengeId: challengeId,
          counterSuccess: 0,
          dateSuccess: null,
        });
      }
    })
  });
};

/**
 * The function updates the current challenge of the group
 * @param {groupData} group
 * @param {userData} user
 * @param {update according to specific case} caseUpdate
 */
 export const updateCurrentChallenge = (group, caseUpdate) => {
  
  const groupPromise = getGroupDocument(group.id);
  groupPromise.then((doc) => {
    var dateStart = new Date();
    var dateEnd = new Date();

    if (caseUpdate === CLASSIC_UPDATE) {
      // CASE 2: update new current challenge after curr is not valid
      const nextCurrentChallengeId = group.approvedChallenges[0];
      const currentChallengeId = group.currentChallenge;

      doc.update({
        currentChallenge: nextCurrentChallengeId,
        timeStampStart: dateStart,
        timeStampEnd: dateEnd.setDate(dateEnd.getDate() + 7),
        timeStampEnd2: dateEnd,
        approvedChallenges: firebase.firestore.FieldValue.arrayRemove(
          nextCurrentChallengeId
        ),
        pastChallenges:
          firebase.firestore.FieldValue.arrayUnion(currentChallengeId),
      });

    } else if (caseUpdate === NO_APPROVED_UPDATE) {
      // CASE 3: update current challenge while the is not another challenge
      const currentChallengeId = group.currentChallenge;

      doc.update({
        currentChallenge: "",
        timeStampStart: null,
        timeStampEnd: null,
        timeStampEnd2: null,
        pastChallenges:
          firebase.firestore.FieldValue.arrayUnion(currentChallengeId),
      });

    } else if (caseUpdate === NO_CURR_UPDATE) {
      // CASE 4: init new current challenge
      const nextCurrentChallengeId = group.approvedChallenges[0];

      doc.update({
        currentChallenge: nextCurrentChallengeId,
        timeStampStart: dateStart,
        timeStampEnd: dateEnd.setDate(dateEnd.getDate() + 7),
        timeStampEnd2: dateEnd,
        approvedChallenges: firebase.firestore.FieldValue.arrayRemove(
          nextCurrentChallengeId
        ),
      });
    }
  });
};

/*
 * update the notifications of the group members.
 */
export const notiForGroupMembers = async (groupMembersData, currUserId, notiId) => {

  //get all the members of the group except the the current user
  const filteredGroupMembers = groupMembersData.filter(
    (member) => member.id !== currUserId
  );

  const groupMembers = (notiId === NEW_CHALLENGE) ? groupMembersData : filteredGroupMembers;
  groupMembers.map((user) => updateNoti(user, notiId));
};


/**
 * The function updates the notification cache of the user
 * @param {user data} user
 * @param {notification id} notiId
 */
 export const updateNoti = (user, notiId) => {
  const currNoti = user.notification;
  const filterNoti = currNoti.filter((noti) => noti !== notiId);
  filterNoti.push(notiId);
  
  
  const userPromise = getUserDocument(user.id);
  userPromise.then((doc) => {
    if (doc){
      doc.update({
        notification: filterNoti,
      });
    }
  });
};


/*
 * the function takes challengeId and userId - and return a promise of the document of the challengeLog.
 * the function does not return the doc, it returns the promise.
 * USAGE: to get the data of the document do: getChallengeLogData(challengeId, userId).then(doc => { //if(doc.exists) {do something with.doc.field} })
 */
export const getChallengeLogData = async (challengeId, userId) => {
  
  const challengeLogRef = await db
    .collection("challengeLog")
    .where("challengeId", "==", challengeId)
    .where("userId", "==", userId)
    .get();

    const arrayObj = challengeLogRef.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
  });
  return arrayObj[0];
};

// /**
//  * 
//  * @param {*} groupMembers 
//  * @param {*} user 
//  * @param {*} currentChallengeId 
//  */
//  export const updateScore = (groupMembers, currentChallengeId, currUserId, successChallenge) => {
//   const userDataPromise = getDocumentData(currUserId)
//   userDataPromise.then(doc => {
//     if (doc) {
//       const successArray = doc.data().successChallenge
//       console.log("test success array: ", successArray)
//       if (successArray){
//         const found = successArray.find(element => element === currentChallengeId);
//         console.log("test found: ", found)

//         if (!found){
//           const userPromise = getUserDocument(currUserId);
//           userPromise.then((userDoc) => {
//             const logObjPromise = getChallengeLogData(currentChallengeId, currUserId);
//             logObjPromise.then((logDoc) => {
//               if (!logDoc){
//                 return;
//               }
//               console.log("updateScore 2 : ")
//               const duration = 7;
//               if (logDoc.counterSuccess * 2 >= duration) {
//                 console.log("updateScore 3: ")
//                 userDoc.update({
//                 score: increment70,
//                 successChallenge: firebase.firestore.FieldValue.arrayUnion(currentChallengeId),
//             });
//               }
//             })
//           })
//         }
//       }
//     }
//   })
//  }
  
  

/*
 * creates new vote from userId and challengeId, and saves it to firestore server.
 */
export const generateVotesDocument = async (currUserData, challengeData, groupMembersData) => {
  if (!currUserData || !challengeData) return;

  const currGroupId = currUserData.groupId;
  const challengeId = challengeData.id;

  // update the user's voted challenge array
  var userPromise = getUserDocument(currUserData.id);
  userPromise.then((user) => {
     user.update({
      challengeVotes: firebase.firestore.FieldValue.arrayUnion(challengeId),
    });
  });

  //check if group member has already voted on the challenge
  const dataVotes = await db
    .collection("votes")
    .where("challengeId", "==", challengeId)
    .where("groupId", "==", currGroupId)
    .get();

   // if no vote, then creates a new doc in votes collection with relevant info
   if (dataVotes.empty) {
    var votesId = [currUserData.id];
    const res = await db.collection("votes").add({
      groupId: currGroupId,
      challengeId: challengeId,
      votersId: votesId,
      voterCounter: 1,
    });
  } else {
    // add a members group vote
    const voteIdArray = dataVotes.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    updateVotes(voteIdArray[0], currUserData.id);
  }
} 

/*
 * the function takes vote object (with all the data) and userId.
 * updates voters, and if needed update the approvedChallenges of the group.
 */
const updateVotes = async (voteObj, userId) => {
  var voteIdPromise = getVoteDocument(voteObj.id);

  // updates voters
  voteIdPromise.then((vote) => {
    vote.update({
      votersId: firebase.firestore.FieldValue.arrayUnion(userId),
      voterCounter: increment,
    });
  });

  // update the approvedChallenges of the group
  var groupPromise = getGroupDocument(voteObj.groupId);
  groupPromise.then((doc) => {
    doc.get().then((group) => {
      if (group.data().countGroup > ((voteObj.voterCounter + 1)/2)) {
        doc.update({
          approvedChallenges: firebase.firestore.FieldValue.arrayUnion(
            voteObj.challengeId
          ),
        });
      }
    });
  });
};

/**
 * The function update the challenge counter success of the user
 * and send notification to the other members of the group about their friend success
 */
 export const updateSuccessChallengeLog = (userId, challengeId) => {
  const logObjPromise = getChallengeLogData(challengeId, userId);
  logObjPromise.then((logObj) => {
    if (!logObj) {
      console.log("logObj not found");
    }
    const challengeLogPromise = getChallengeLogDocument(logObj.id);
    challengeLogPromise.then((doc) => {
      var date = new Date();
      doc.update({
        counterSuccess: increment,
        dateSuccess: date.getDate(),
      });
    });
  });

};


export const updateScore = (userId, challengeId) => {
  const challengePromise = getChallengeDocumentData(challengeId);
  challengePromise.then((challenge) => {
    if (challenge) {
      const challengeXP = challenge.data().challengeXp;
      console.log("updateScore exp: ", challengeXP)
      const incrementScore =
      challengeXP >= 100
      ? (challengeXP === 100
      ? increment15
      : increment20)
      : (challengeXP === 50
      ? increment5
      : increment10);

      const userDocPromise = getUserDocument(userId)
      if (!userDocPromise){
        console.log("userDoc not found");
      }
      userDocPromise.then(doc => {
        doc.update({
          score: incrementScore,
        })
      })
      
    
      }
      
    })
}