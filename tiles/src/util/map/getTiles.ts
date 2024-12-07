import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export default async function getTiles(userID: string) : Promise<DocumentData[]> {
  try {
    const groupsRef = collection(db, "groups");
    const groupsQuery = query(groupsRef, where("memberIDs", "array-contains", userID));
    const groupSnapshot = await getDocs(groupsQuery);
    const groupDocs = groupSnapshot.docs;

    const membersRef = collection(groupDocs[0].ref, "members");
    const membersSnapshot = await getDocs(membersRef);
    const membersDocs = membersSnapshot.docs.map((doc) => doc.data());
    
    console.log(membersDocs);
    return membersDocs;

  } catch (err) {
    console.error("[ ERROR ] Couldn't fetch tiles: ", err);
  }
}