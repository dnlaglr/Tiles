import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import getUser from '../users/getUser';

export default async function getGroups(userID: string) {
  try {
    const userData = await getUser(userID);
    const groupIDs = userData.joinedGroups;
  
    if (!groupIDs || groupIDs.length === 0) {
      console.log(`User with ID ${userID} has no groups joined`);
      return [];
    }
  
    const groupsRef = collection(db, "groups");
    if (groupIDs.length <= 10) {
      const groupQuery = query(groupsRef, where("groupID", "in", groupIDs));
      const groupDocs = await getDocs(groupQuery);
  
      return groupDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  } catch (error) {
    console.log("Error retrieving documents: ", error);
    return []
  }
}