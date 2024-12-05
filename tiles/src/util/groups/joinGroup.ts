import { arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';

export default async function joinGroup(userID: string, joinCode: string) {
  try {
    const groupsRef = collection(db, "groups");
    const groupQuery = query(groupsRef, where("joinCode", "==", joinCode));
    const groupDocs = await getDocs(groupQuery);

    const groupDoc = groupDocs.docs[0];

    await updateDoc(groupDoc.ref, {
      memberIDs: arrayUnion(userID)
    });

    console.log(`[ INFO ] Successfully added ${userID} to group.`);

    const groupID = groupDoc.data().groupID;

    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("userID", "==", userID));
    const userDocs = await getDocs(usersQuery);
    const userDoc = userDocs.docs[0];

    await updateDoc(userDoc.ref, {
      joinedGroups: arrayUnion(groupID)
    })

    console.log("[ INFO ] Successfully updated user's joined groups.")
    
  } catch (err) {
    console.error("[ ERROR ] Could not join group: ", err);
  }
}